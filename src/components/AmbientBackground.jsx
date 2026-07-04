'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Simple 3D noise function (Simplex/Perlin derivative)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
             
    float n_ = 1.0/7.0; 
    vec3  ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Noise value varying from -1 to 1 based on position and time
    float noise = snoise(vec3(position.x * 0.8 + uTime * 0.2, position.y * 0.8 + uTime * 0.3, position.z * 0.8));
    
    // Displace vertices to create organic blob shape
    vec3 newPosition = position + normal * noise * 0.4;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    // Normalize vectors
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Fresnel effect for outer glow rim
    float fresnel = dot(viewDir, normal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 3.0);
    
    // Colors for the iridescent look
    vec3 colorBlue = vec3(0.37, 0.41, 0.82); 
    vec3 colorPurple = vec3(0.54, 0.36, 0.96);
    vec3 colorGold = vec3(0.99, 0.49, 0.17);  
    
    // Mix colors based on UV and time to create moving liquid gradient
    float mixFactor = sin(vUv.x * 5.0 + uTime * 0.5) * 0.5 + 0.5;
    vec3 baseColor = mix(colorBlue, colorPurple, mixFactor);
    
    float mixFactor2 = cos(vUv.y * 4.0 - uTime * 0.3) * 0.5 + 0.5;
    baseColor = mix(baseColor, colorGold, mixFactor2 * 0.7); 
    
    // Add glowing white edge from Fresnel
    vec3 finalColor = baseColor + vec3(0.8) * fresnel * 1.5;
    
    // Darken center to make it look like deep liquid and give a 3D feel
    finalColor *= (0.4 + clamp(dot(viewDir, normal), 0.0, 1.0) * 0.8);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function Blob() {
  const mesh = useRef();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      // Slowly rotate the entire mesh to add more randomness to the morph
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={2.3}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export default function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'var(--bg)', // Fallback dark background
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Subtle ambient light */}
        <ambientLight intensity={0.5} />
        {/* Deep space drifting particles */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <Blob />
      </Canvas>
    </div>
  );
}
