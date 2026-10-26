import * as THREE from 'three';
import { highlights } from '@/data/portfolio';
import { STUDIO_STATIONS, STATION_MAP } from './studioConfig';
import {
  makeGlowTexture,
  makeLabelSprite,
  makePosterTexture,
  makeRugTexture,
  makeScreenTexture,
  makeWindowTexture,
} from './studioTextures';

/**
 * Vanilla Three.js engine for the Virtual Studio.
 *
 * Design notes:
 * - The scene is intentionally low-poly and asset-free. Every prop, label,
 *   poster, and texture is generated from built-in geometries or canvas 2D.
 * - React owns the HUD/modals. The engine owns the canvas, input, camera,
 *   raycasting, and per-frame animation.
 * - The only per-frame React communication is state *changes* (hover,
 *   proximity, open, travel), never raw frame updates.
 */

const UP = new THREE.Vector3(0, 1, 0);
const CAMERA_OFFSET = new THREE.Vector3(13.5, 16, 13.5);
const PLAYER_START = new THREE.Vector3(0, 0, 1.8);
const PLAYER_RADIUS = 0.44;
const MAX_SPEED = 5.4;
const ROOM_BOUNDS = { minX: -9.35, maxX: 9.35, minZ: -7.35, maxZ: 7.35 };
const FLOOR_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

const COLLIDERS = [
  { minX: -7.25, maxX: -1.95, minZ: -7.35, maxZ: -3.32 }, // desk + chair
  { minX: 4.5, maxX: 7.1, minZ: -7.35, maxZ: -5.4 }, // server rack
  { minX: 6.0, maxX: 7.6, minZ: 3.95, maxZ: 5.7 }, // mailbox
  { minX: -3.35, maxX: 0.35, minZ: 4.9, maxZ: 6.75 }, // couch
  { minX: -2.8, maxX: -0.2, minZ: 3.5, maxZ: 4.8 }, // coffee table
  { minX: -9.85, maxX: -9.15, minZ: -2.0, maxZ: 2.0 }, // gallery bench
];

function makeStandard(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.08,
    ...options,
  });
}

function addBox(parent, width, height, depth, material, x = 0, y = 0, z = 0, cast = true, receive = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  return mesh;
}

function addCylinder(parent, radiusTop, radiusBottom, height, segments, material, x = 0, y = 0, z = 0, cast = true) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments),
    material
  );
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addSphere(parent, radius, widthSegments, heightSegments, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    material
  );
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function damp(current, target, lambda, delta) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

function dampAngle(current, target, lambda, delta) {
  const deltaAngle = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + deltaAngle * (1 - Math.exp(-lambda * delta));
}

function resolveInteractive(object) {
  let current = object;
  while (current) {
    if (current.userData && current.userData.interactiveId) {
      return current.userData.interactiveId;
    }
    current = current.parent;
  }
  return null;
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}

function isActionTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('a, button, [role="button"], [role="link"], [role="menuitem"]'));
}

/* ------------------------------------------------------------------ */
/* Room construction                                                   */
/* ------------------------------------------------------------------ */

function buildRoom(scene, textures) {
  const room = new THREE.Group();
  scene.add(room);

  const floorMat = makeStandard(0x1b1924, { roughness: 0.84, metalness: 0.06 });
  const wallMat = makeStandard(0x151622, { roughness: 0.92, metalness: 0.02 });
  const trimMat = makeStandard(0x1d1f2b, { roughness: 0.6, metalness: 0.3 });
  const darkMetal = makeStandard(0x0b0c12, { roughness: 0.38, metalness: 0.72 });

  // Infinite-feeling dark ground under the room.
  addBox(room, 90, 0.3, 90, makeStandard(0x04050a, { roughness: 1 }), 0, -0.62, 0, false, true);

  const floor = addBox(room, 20.6, 0.45, 16.6, floorMat, 0, -0.225, 0, false, true);
  floor.receiveShadow = true;

  // Two back walls, open toward the camera.
  const northWall = addBox(room, 20.6, 7.2, 0.45, wallMat, 0, 3.6, -8.3, false, true);
  northWall.receiveShadow = true;
  const westWall = addBox(room, 0.45, 7.2, 16.6, wallMat, -10.3, 3.6, 0, false, true);
  westWall.receiveShadow = true;

  // Baseboards + neon wall accents.
  addBox(room, 20.4, 0.2, 0.08, trimMat, 0, 0.1, -8.04, false, true);
  addBox(room, 0.08, 0.2, 16.4, trimMat, -10.04, 0.1, 0, false, true);

  const orangeNeon = new THREE.MeshBasicMaterial({ color: 0xfe7f2d, toneMapped: false });
  const cyanNeon = new THREE.MeshBasicMaterial({ color: 0x22d3ee, toneMapped: false });
  addBox(room, 18.8, 0.035, 0.035, orangeNeon, 0, 6.35, -8.05, false, false);
  addBox(room, 0.035, 0.035, 15.1, cyanNeon, -10.05, 6.35, 0, false, false);

  // Subtle wall seams for a paneled, architectural feel.
  for (let x = -8; x <= 8; x += 4) {
    addBox(room, 0.025, 5.9, 0.02, trimMat, x, 3.0, -8.06, false, false);
  }
  for (let z = -6; z <= 6; z += 4) {
    addBox(room, 0.02, 5.9, 0.025, trimMat, -10.06, 3.0, z, false, false);
  }

  // Rug
  const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(9.2, 6.8),
    new THREE.MeshStandardMaterial({
      map: textures.rug,
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide,
    })
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0.4, 0.03, 1.55);
  rug.receiveShadow = true;
  scene.add(rug);

  // Window with a procedural neon-city view.
  const windowGroup = new THREE.Group();
  windowGroup.position.set(0.8, 4.15, -7.94);
  const windowFrame = makeStandard(0x08090e, { roughness: 0.42, metalness: 0.55 });
  addBox(windowGroup, 5.9, 3.15, 0.14, windowFrame, 0, 0, 0, false, true);
  const view = new THREE.Mesh(
    new THREE.PlaneGeometry(5.35, 2.62),
    new THREE.MeshBasicMaterial({ map: textures.window, toneMapped: false })
  );
  view.position.set(0, 0, 0.09);
  windowGroup.add(view);
  // Mullions
  addBox(windowGroup, 0.06, 2.62, 0.05, windowFrame, -1.35, 0, 0.12, false, false);
  addBox(windowGroup, 0.06, 2.62, 0.05, windowFrame, 1.35, 0, 0.12, false, false);
  addBox(windowGroup, 5.35, 0.06, 0.05, windowFrame, 0, 0, 0.12, false, false);
  addBox(windowGroup, 6.2, 0.16, 0.4, trimMat, 0, -1.62, 0.16, true, true);
  scene.add(windowGroup);

  // Wall clock
  const clockGroup = new THREE.Group();
  clockGroup.position.set(7.6, 5.05, -7.96);
  const clockFace = new THREE.Mesh(
    new THREE.CircleGeometry(0.58, 32),
    makeStandard(0x0a0b11, { roughness: 0.35, metalness: 0.2 })
  );
  clockGroup.add(clockFace);
  const clockRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.58, 0.035, 8, 32),
    makeStandard(0xd1d5db, { roughness: 0.25, metalness: 0.8 })
  );
  clockGroup.add(clockRim);
  const handMat = new THREE.MeshBasicMaterial({ color: 0xfe7f2d, toneMapped: false });
  addBox(clockGroup, 0.035, 0.36, 0.02, handMat, 0, 0.14, 0.04, false, false);
  addBox(clockGroup, 0.24, 0.035, 0.02, handMat, 0.1, 0, 0.04, false, false);
  for (let i = 0; i < 12; i += 1) {
    const angle = (i / 12) * Math.PI * 2;
    addBox(
      clockGroup,
      0.018,
      0.07,
      0.015,
      darkMetal,
      Math.sin(angle) * 0.46,
      Math.cos(angle) * 0.46,
      0.045,
      false,
      false
    );
  }
  scene.add(clockGroup);

  // Hanging pendant lights.
  addPendant(scene, 0.2, 1.4, 6.8, 5.15, 0xfe7f2d, 14);
  addPendant(scene, -6.2, -4.2, 6.8, 5.0, 0xffd7b0, 10);

  return room;
}

function addPendant(scene, x, z, ceilingY, shadeY, color, intensity) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const cordMat = makeStandard(0x101117, { roughness: 0.8 });
  addCylinder(group, 0.012, 0.012, ceilingY - shadeY, 5, cordMat, 0, (ceilingY + shadeY) / 2, 0, false);
  const shadeMat = makeStandard(0x171821, { roughness: 0.5, metalness: 0.35 });
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.34, 16, 1, true), shadeMat);
  shade.position.y = shadeY;
  shade.castShadow = true;
  group.add(shade);

  const bulbMat = new THREE.MeshBasicMaterial({ color, toneMapped: false });
  addSphere(group, 0.09, 10, 8, bulbMat, 0, shadeY - 0.2, 0);

  const light = new THREE.PointLight(color, intensity, 10, 2);
  light.position.y = shadeY - 0.18;
  group.add(light);
  scene.add(group);
}

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

function buildDesk(scene, textures) {
  const group = new THREE.Group();
  group.position.set(-4.6, 0, -5.9);

  const wood = makeStandard(0x3b2b23, { roughness: 0.62, metalness: 0.06 });
  const woodLight = makeStandard(0x51392c, { roughness: 0.6, metalness: 0.05 });
  const dark = makeStandard(0x101118, { roughness: 0.42, metalness: 0.5 });
  const soft = makeStandard(0x1c1e29, { roughness: 0.8, metalness: 0.05 });

  addBox(group, 4.6, 0.18, 2.0, wood, 0, 1.26, 0);
  addBox(group, 4.7, 0.03, 2.06, orangeStripMat(), 0, 1.16, 0, false, false);

  [-2.0, 2.0].forEach((x) => {
    [-0.82, 0.82].forEach((z) => {
      addBox(group, 0.14, 1.2, 0.14, dark, x, 0.6, z);
    });
  });
  addBox(group, 3.85, 0.08, 0.08, dark, 0, 0.28, -0.78, false, true);

  // Monitor
  addBox(group, 1.25, 0.06, 0.55, dark, 0, 1.38, 0.18);
  addBox(group, 0.12, 0.55, 0.12, dark, 0, 1.68, 0.18);
  addBox(group, 2.35, 1.35, 0.1, dark, 0, 2.28, 0.18);
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.18, 1.18),
    new THREE.MeshBasicMaterial({ map: textures.screen, toneMapped: false })
  );
  screen.position.set(0, 2.28, 0.245);
  group.add(screen);

  // Desk glow from the monitor
  const monitorGlow = new THREE.PointLight(0xfe9a55, 5.5, 4.5, 2);
  monitorGlow.position.set(0, 2.3, 0.35);
  group.add(monitorGlow);

  // Keyboard, mouse, mug
  addBox(group, 1.55, 0.05, 0.5, soft, 0, 1.39, 0.96);
  addBox(group, 1.38, 0.012, 0.34, makeStandard(0x272a38, { roughness: 0.5 }), 0, 1.42, 0.96, false, false);
  const mouse = addSphere(group, 0.14, 10, 8, dark, 1.05, 1.4, 0.96);
  mouse.scale.set(0.8, 0.62, 1.1);
  addCylinder(group, 0.11, 0.12, 0.22, 12, makeStandard(0xd6d3cc, { roughness: 0.55 }), 1.62, 1.46, 0.55);
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.075, 0.018, 6, 12),
    makeStandard(0xd6d3cc, { roughness: 0.55 })
  );
  handle.rotation.y = Math.PI / 2;
  handle.position.set(1.72, 1.46, 0.55);
  group.add(handle);

  // Lamp
  addCylinder(group, 0.19, 0.23, 0.05, 12, dark, -1.88, 1.37, -0.55);
  addCylinder(group, 0.026, 0.026, 0.82, 8, dark, -1.88, 1.78, -0.55);
  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.34, 14, 1, true),
    makeStandard(0x2a211b, { roughness: 0.7, emissive: 0xfe7f2d, emissiveIntensity: 0.14 })
  );
  shade.position.set(-1.88, 2.2, -0.55);
  shade.rotation.z = -0.34;
  shade.castShadow = true;
  group.add(shade);
  const lampLight = new THREE.PointLight(0xfe7f2d, 13, 7, 2);
  lampLight.position.set(-1.8, 2.12, -0.45);
  group.add(lampLight);

  // Chair
  addCylinder(group, 0.05, 0.05, 0.45, 8, dark, 0, 0.33, 2.05);
  addCylinder(group, 0.38, 0.42, 0.06, 16, dark, 0, 0.1, 2.05);
  addBox(group, 1.15, 0.13, 1.0, soft, 0, 0.63, 2.05);
  addBox(group, 1.15, 0.95, 0.14, soft, 0, 1.12, 2.5);
  addBox(group, 1.38, 0.1, 0.12, woodLight, 0, 1.61, 2.5, false, true);
  [-0.63, 0.63].forEach((x) => {
    addBox(group, 0.1, 0.1, 0.95, dark, x, 0.82, 2.05);
  });

  // A tiny plant on the desk
  addCylinder(group, 0.12, 0.15, 0.24, 8, makeStandard(0x6b3f2a, { roughness: 0.9 }), 2.02, 1.48, -0.45);
  const leafMat = makeStandard(0x2f6f4f, { roughness: 0.85 });
  for (let i = 0; i < 5; i += 1) {
    const leaf = addSphere(group, 0.13, 6, 4, leafMat, 2.02 + Math.sin(i * 1.7) * 0.13, 1.72 + (i % 3) * 0.08, -0.45 + Math.cos(i * 1.9) * 0.11);
    leaf.scale.set(0.55, 1.5, 0.42);
    leaf.rotation.z = Math.sin(i) * 0.5;
  }

  scene.add(group);
  return group;
}

function orangeStripMat() {
  return new THREE.MeshBasicMaterial({ color: 0xfe7f2d, toneMapped: false });
}

function buildGallery(scene) {
  const group = new THREE.Group();
  const frameMat = makeStandard(0x0b0c12, { roughness: 0.35, metalness: 0.65 });
  const plaqueMat = makeStandard(0x181a22, { roughness: 0.5, metalness: 0.3 });

  const posterSeeds = highlights.slice(0, 3);
  const framePositions = [-3.35, 0, 3.35];

  posterSeeds.forEach((poster, index) => {
    const z = framePositions[index];
    addBox(group, 0.14, 2.45, 1.75, frameMat, -9.88, 3.65, z);
    const art = new THREE.Mesh(
      new THREE.PlaneGeometry(1.52, 2.2),
      new THREE.MeshBasicMaterial({
        map: makePosterTexture({
          title: poster.title,
          category: poster.tags ? poster.tags[0] : 'Selected work',
          accent: poster.accent || '#A78BFA',
          index,
        }),
        toneMapped: false,
      })
    );
    art.rotation.y = Math.PI / 2;
    art.position.set(-9.79, 3.65, z);
    group.add(art);

    addBox(group, 0.06, 0.03, 1.5, new THREE.MeshBasicMaterial({ color: poster.accent || 0xa78bfa, toneMapped: false }), -9.78, 2.38, z, false, false);
    addBox(group, 0.05, 0.18, 1.0, plaqueMat, -9.78, 2.16, z, false, false);
  });

  // Low gallery bench
  const benchMat = makeStandard(0x2a1f1a, { roughness: 0.7 });
  addBox(group, 0.55, 0.14, 3.5, benchMat, -9.48, 0.56, 0);
  addBox(group, 0.08, 0.5, 3.1, makeStandard(0x13141b, { roughness: 0.5, metalness: 0.4 }), -9.48, 0.28, 0);
  addBox(group, 0.7, 0.06, 3.7, makeStandard(0x17131a, { roughness: 0.9 }), -9.48, 0.03, 0, false, true);

  // Gallery wash light
  const galleryLight = new THREE.PointLight(0xa78bfa, 16, 8, 2);
  galleryLight.position.set(-8.7, 4.8, 0);
  group.add(galleryLight);

  scene.add(group);
  return group;
}

function buildServer(scene) {
  const group = new THREE.Group();
  group.position.set(5.8, 0, -6.55);

  const rackMat = makeStandard(0x14161f, { roughness: 0.38, metalness: 0.55 });
  const panelMat = makeStandard(0x0a0b11, { roughness: 0.42, metalness: 0.45 });
  const slotMat = makeStandard(0x1d2030, { roughness: 0.6, metalness: 0.25 });
  const cyan = 0x22d3ee;
  const leds = [];
  const fans = [];

  addBox(group, 2.0, 4.45, 1.7, rackMat, 0, 2.225, 0);
  addBox(group, 1.82, 4.05, 0.06, panelMat, 0, 2.225, 0.88);

  // Server slots + status LEDs.
  for (let i = 0; i < 8; i += 1) {
    const y = 0.62 + i * 0.45;
    addBox(group, 1.62, 0.2, 0.08, slotMat, 0, y, 0.92);
    addBox(group, 1.38, 0.025, 0.02, makeStandard(0x050609, { roughness: 0.9 }), 0, y + 0.03, 0.965, false, false);
    const ledColor = i % 3 === 0 ? 0xfe7f2d : i % 4 === 0 ? 0x4ade80 : cyan;
    const ledMat = makeStandard(0x050609, { emissive: ledColor, emissiveIntensity: 1.8, roughness: 0.4 });
    addBox(group, 0.055, 0.055, 0.025, ledMat, -0.69, y, 0.975, false, false);
    leds.push({ material: ledMat, phase: i * 0.9, base: 1.4 });
    const led2Mat = makeStandard(0x050609, { emissive: 0x4ade80, emissiveIntensity: 1.1, roughness: 0.4 });
    addBox(group, 0.035, 0.035, 0.02, led2Mat, 0.68, y, 0.975, false, false);
    leds.push({ material: led2Mat, phase: i * 1.3 + 2.4, base: 0.8 });
  }

  // Fans
  [-0.45, 0.45].forEach((x, index) => {
    const fan = new THREE.Group();
    fan.position.set(x, 3.72, 0.92);
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.025, 6, 20),
      makeStandard(0x2a2f42, { roughness: 0.4, metalness: 0.5 })
    );
    fan.add(rim);
    const bladeMat = makeStandard(0x171a25, { roughness: 0.6, metalness: 0.2 });
    for (let i = 0; i < 3; i += 1) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.045, 0.055), bladeMat);
      blade.position.set(Math.cos((i / 3) * Math.PI * 2) * 0.11, Math.sin((i / 3) * Math.PI * 2) * 0.11, 0.02);
      blade.rotation.z = (i / 3) * Math.PI * 2;
      fan.add(blade);
    }
    fan.userData.speed = index === 0 ? 9 : 7.5;
    group.add(fan);
    fans.push(fan);
  });

  // Status bars
  addBox(group, 1.3, 0.16, 0.04, makeStandard(0x0b0d14, { roughness: 0.5 }), 0, 2.85, 0.95);
  addBox(group, 0.95, 0.028, 0.02, new THREE.MeshBasicMaterial({ color: cyan, toneMapped: false }), -0.15, 2.86, 0.98, false, false);
  addBox(group, 0.4, 0.028, 0.02, new THREE.MeshBasicMaterial({ color: 0xfe7f2d, toneMapped: false }), -0.43, 2.78, 0.98, false, false);
  addBox(group, 0.22, 0.028, 0.02, new THREE.MeshBasicMaterial({ color: 0x4ade80, toneMapped: false }), 0.52, 2.78, 0.98, false, false);

  // Antenna
  addCylinder(group, 0.018, 0.018, 0.5, 5, makeStandard(0x2a2f42, { roughness: 0.5, metalness: 0.5 }), 0.72, 4.7, 0);
  const antennaTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 6),
    new THREE.MeshBasicMaterial({ color: cyan, toneMapped: false })
  );
  antennaTip.position.set(0.72, 4.98, 0);
  group.add(antennaTip);

  // Server wash light
  const serverLight = new THREE.PointLight(cyan, 15, 8, 2);
  serverLight.position.set(0, 3.3, 1.1);
  group.add(serverLight);

  scene.add(group);
  return { group, leds, fans };
}

function buildMailbox(scene) {
  const group = new THREE.Group();
  group.position.set(6.8, 0, 4.8);

  const metal = makeStandard(0x1c2028, { roughness: 0.45, metalness: 0.55 });
  const metalLight = makeStandard(0x2b303c, { roughness: 0.4, metalness: 0.5 });
  const green = 0x4ade80;

  addCylinder(group, 0.32, 0.4, 0.08, 12, metal, 0, 0.04, 0);
  addCylinder(group, 0.14, 0.18, 1.08, 10, metal, 0, 0.6, 0);
  addBox(group, 1.15, 1.0, 1.5, metal, 0, 1.62, 0);
  const lid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.58, 0.58, 1.52, 16, 1, false),
    metalLight
  );
  lid.rotation.x = Math.PI / 2;
  lid.position.set(0, 2.12, 0);
  lid.castShadow = true;
  lid.receiveShadow = true;
  group.add(lid);

  // Mail slot + glowing status strip.
  addBox(group, 0.58, 0.075, 0.035, makeStandard(0x050609, { roughness: 0.9 }), 0, 1.82, -0.765, false, false);
  addBox(group, 0.84, 0.028, 0.02, new THREE.MeshBasicMaterial({ color: green, toneMapped: false }), 0, 1.44, -0.765, false, false);

  // Flag
  addCylinder(group, 0.028, 0.028, 0.82, 6, metalLight, 0.68, 2.28, 0);
  addBox(group, 0.36, 0.24, 0.035, makeStandard(0x0b0c12, { roughness: 0.4, metalness: 0.3, emissive: 0xfe7f2d, emissiveIntensity: 0.55 }), 0.87, 2.56, 0, false, false);

  // A small welcome mat.
  addBox(group, 2.3, 0.025, 1.05, makeStandard(0x17131a, { roughness: 1 }), 0, 0.015, -1.55, false, true);
  addBox(group, 2.0, 0.012, 0.04, new THREE.MeshBasicMaterial({ color: 0xfe7f2d, toneMapped: false }), 0, 0.03, -1.04, false, false);

  const mailLight = new THREE.PointLight(green, 8, 5, 2);
  mailLight.position.set(0, 2.3, -0.8);
  group.add(mailLight);

  scene.add(group);
  return group;
}

function buildLounge(scene) {
  const group = new THREE.Group();
  group.position.set(-1.5, 0, 5.75);

  const fabric = makeStandard(0x1d2b2d, { roughness: 0.92 });
  const fabricLight = makeStandard(0x2d4244, { roughness: 0.9 });
  const legMat = makeStandard(0x241b16, { roughness: 0.7, metalness: 0.1 });
  const accent = makeStandard(0xfe7f2d, { roughness: 0.8, emissive: 0xfe7f2d, emissiveIntensity: 0.05 });

  addBox(group, 3.2, 0.34, 1.4, fabric, 0, 0.19, 0);
  addBox(group, 3.0, 0.22, 1.1, fabricLight, 0, 0.46, -0.05);
  addBox(group, 3.2, 1.05, 0.26, fabric, 0, 0.98, 0.57);
  [-1.55, 1.55].forEach((x) => {
    addBox(group, 0.25, 0.68, 1.4, fabric, x, 0.56, 0);
    addBox(group, 0.3, 0.08, 1.42, legMat, x, 0.9, 0, false, true);
  });
  [-0.7, 0.7].forEach((x) => {
    addBox(group, 1.28, 0.2, 0.9, fabricLight, x, 0.62, -0.08);
  });
  addBox(group, 0.65, 0.5, 0.18, accent, -1.02, 0.9, 0.34);
  addBox(group, 0.55, 0.42, 0.16, makeStandard(0x4b5563, { roughness: 0.85 }), 1.02, 0.86, 0.34);

  // Coffee table
  const table = new THREE.Group();
  table.position.set(0, 0, -1.65);
  addBox(table, 2.2, 0.1, 1.0, legMat, 0, 0.47, 0);
  addBox(table, 2.35, 0.04, 1.12, makeStandard(0x34251d, { roughness: 0.68 }), 0, 0.53, 0, false, true);
  [-0.92, 0.92].forEach((x) => {
    [-0.35, 0.35].forEach((z) => {
      addBox(table, 0.07, 0.44, 0.07, legMat, x, 0.23, z);
    });
  });
  // Books + mug
  addBox(table, 0.5, 0.08, 0.34, makeStandard(0x7c2d12, { roughness: 0.75 }), -0.45, 0.58, 0);
  addBox(table, 0.46, 0.06, 0.3, makeStandard(0x0f766e, { roughness: 0.75 }), -0.42, 0.65, 0.02);
  addCylinder(table, 0.085, 0.09, 0.17, 10, makeStandard(0xd6d3cc, { roughness: 0.55 }), 0.58, 0.63, 0);
  group.add(table);

  scene.add(group);
  return group;
}

function buildPlant(scene, x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.scale.setScalar(scale);

  const potMat = makeStandard(0x5a3326, { roughness: 0.9 });
  const soilMat = makeStandard(0x1b130f, { roughness: 1 });
  const leafMat = makeStandard(0x2f6f4f, { roughness: 0.86 });

  addCylinder(group, 0.32, 0.4, 0.48, 10, potMat, 0, 0.24, 0);
  addCylinder(group, 0.3, 0.3, 0.04, 10, soilMat, 0, 0.48, 0, false);
  for (let i = 0; i < 7; i += 1) {
    const stem = addCylinder(
      group,
      0.015,
      0.02,
      0.7 + (i % 3) * 0.22,
      5,
      makeStandard(0x254d38, { roughness: 0.9 }),
      Math.sin(i * 1.6) * 0.12,
      0.9,
      Math.cos(i * 1.4) * 0.12
    );
    stem.rotation.z = Math.sin(i * 1.2) * 0.24;
    const leaf = addSphere(
      group,
      0.17,
      6,
      4,
      leafMat,
      Math.sin(i * 1.6) * 0.34,
      1.2 + (i % 3) * 0.2,
      Math.cos(i * 1.4) * 0.34
    );
    leaf.scale.set(0.7, 1.6, 0.42);
    leaf.rotation.z = Math.sin(i) * 0.7;
    leaf.rotation.y = i * 0.9;
  }

  scene.add(group);
  return group;
}

function buildPlayer(scene) {
  const player = new THREE.Group();
  player.position.copy(PLAYER_START);

  // `rig` is the yaw/bob root. `upper` pivots at the waist so the robot can
  // lean into a walk without tilting the legs or lifting the feet.
  const rig = new THREE.Group();
  player.add(rig);

  const upper = new THREE.Group();
  upper.position.y = 0.9;
  rig.add(upper);

  // Charcoal shell with a lighter chest plate, black joints, and the same
  // orange accent used by the room signage.
  const shellMat = makeStandard(0x1b1f2b, { metalness: 0.7, roughness: 0.34 });
  const panelMat = makeStandard(0x2a2f3d, { metalness: 0.55, roughness: 0.44 });
  const jointMat = makeStandard(0x090a10, { metalness: 0.85, roughness: 0.28 });
  const accentMat = new THREE.MeshBasicMaterial({ color: 0xfe7f2d, toneMapped: false });
  const visorMat = new THREE.MeshBasicMaterial({ color: 0xffa35e, toneMapped: false });

  // Hips ------------------------------------------------------------
  addBox(rig, 0.34, 0.18, 0.24, jointMat, 0, 0.88, 0);
  addBox(rig, 0.3, 0.07, 0.26, panelMat, 0, 0.95, 0);

  // Torso -----------------------------------------------------------
  addBox(upper, 0.3, 0.18, 0.2, jointMat, 0, 0.05, 0);
  addBox(upper, 0.5, 0.38, 0.3, shellMat, 0, 0.31, 0);
  addBox(upper, 0.32, 0.24, 0.035, panelMat, 0, 0.32, 0.16);
  addBox(upper, 0.09, 0.06, 0.02, accentMat, 0, 0.36, 0.182, false, false);
  addBox(upper, 0.3, 0.26, 0.1, panelMat, 0, 0.31, -0.19);
  addBox(upper, 0.16, 0.03, 0.02, accentMat, 0, 0.34, -0.245, false, false);

  // Neck + head -----------------------------------------------------
  addCylinder(upper, 0.07, 0.08, 0.09, 8, jointMat, 0, 0.57, 0, false);
  const head = new THREE.Group();
  head.position.set(0, 0.65, 0);
  upper.add(head);

  addBox(head, 0.3, 0.25, 0.27, shellMat, 0, 0, 0);
  addBox(head, 0.26, 0.04, 0.28, panelMat, 0, 0.115, 0, false, false);
  addBox(head, 0.22, 0.065, 0.02, visorMat, 0, 0.005, 0.14, false, false);
  addBox(head, 0.24, 0.02, 0.02, jointMat, 0, -0.065, 0.14, false, false);
  const earLeft = addCylinder(head, 0.055, 0.055, 0.035, 8, jointMat, -0.155, 0.01, 0, false);
  earLeft.rotation.z = Math.PI / 2;
  const earRight = addCylinder(head, 0.055, 0.055, 0.035, 8, jointMat, 0.155, 0.01, 0, false);
  earRight.rotation.z = Math.PI / 2;

  addCylinder(head, 0.012, 0.012, 0.16, 5, jointMat, 0.1, 0.2, 0, false);
  addSphere(head, 0.028, 6, 4, accentMat, 0.1, 0.29, 0);

  // Arms ------------------------------------------------------------
  function buildArm(side) {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.3, 0.47, 0);
    shoulder.rotation.z = side * 0.055;
    upper.add(shoulder);

    addBox(shoulder, 0.17, 0.15, 0.2, panelMat, 0, 0.01, 0);
    addBox(shoulder, 0.11, 0.27, 0.13, shellMat, 0, -0.2, 0);
    addBox(shoulder, 0.02, 0.12, 0.04, accentMat, side * 0.058, -0.2, 0.02, false, false);

    const elbow = new THREE.Group();
    elbow.position.set(0, -0.35, 0);
    shoulder.add(elbow);

    addSphere(elbow, 0.068, 6, 4, jointMat, 0, 0, 0);
    addBox(elbow, 0.1, 0.24, 0.11, shellMat, 0, -0.15, 0);
    addBox(elbow, 0.09, 0.1, 0.1, jointMat, 0, -0.31, 0);

    return { shoulder, elbow };
  }

  const armLeft = buildArm(-1);
  const armRight = buildArm(1);

  // Legs ------------------------------------------------------------
  function buildLeg(side) {
    const hip = new THREE.Group();
    hip.position.set(side * 0.14, 0.82, 0);
    rig.add(hip);

    const hipJoint = addCylinder(hip, 0.085, 0.085, 0.13, 8, jointMat, 0, 0, 0, false);
    hipJoint.rotation.z = Math.PI / 2;
    addBox(hip, 0.16, 0.34, 0.19, shellMat, 0, -0.19, 0);
    addBox(hip, 0.02, 0.14, 0.05, accentMat, side * 0.085, -0.2, 0.02, false, false);

    const knee = new THREE.Group();
    knee.position.set(0, -0.38, 0);
    hip.add(knee);

    addSphere(knee, 0.075, 6, 4, jointMat, 0, 0, 0);
    addBox(knee, 0.13, 0.32, 0.16, shellMat, 0, -0.18, 0);

    const ankle = new THREE.Group();
    ankle.position.set(0, -0.36, 0);
    knee.add(ankle);
    addBox(ankle, 0.17, 0.1, 0.3, panelMat, 0, -0.015, 0.05);

    return { hip, knee, ankle };
  }

  const legLeft = buildLeg(-1);
  const legRight = buildLeg(1);

  // Floor halo acts as a locator ring at the robot's feet, not a hover glow.
  const haloGroup = new THREE.Group();
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xfe7f2d,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
    toneMapped: false,
  });
  const halo = new THREE.Mesh(new THREE.RingGeometry(0.38, 0.56, 32), haloMat);
  halo.rotation.x = -Math.PI / 2;
  haloGroup.add(halo);
  haloGroup.position.set(PLAYER_START.x, 0.04, PLAYER_START.z);
  scene.add(haloGroup);

  player.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  scene.add(player);

  return {
    player,
    rig,
    upper,
    head,
    armLeft,
    armRight,
    legLeft,
    legRight,
    haloGroup,
    halo,
  };
}

function buildDust(scene, glowTexture) {
  const count = 150;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const base = new Float32Array(count * 3);
  const orange = new THREE.Color(0xfe7f2d);
  const cyan = new THREE.Color(0x22d3ee);

  for (let i = 0; i < count; i += 1) {
    const x = (Math.random() - 0.5) * 18;
    const y = 0.45 + Math.random() * 5.6;
    const z = (Math.random() - 0.5) * 14;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    base[i * 3] = x;
    base[i * 3 + 1] = y;
    base[i * 3 + 2] = z;

    const color = Math.random() > 0.35 ? orange : cyan;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.1,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    toneMapped: false,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  return { points, base, positions };
}

/* ------------------------------------------------------------------ */
/* Engine                                                              */
/* ------------------------------------------------------------------ */

export function createStudio({
  canvas,
  onReady,
  onNearby,
  onHover,
  onOpen,
  onTravel,
  onError,
}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionScale = reducedMotion ? 0 : 1;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
  } catch {
    onError?.('WebGL is unavailable on this device. The classic view has everything.');
    return {
      destroy() {},
      setPaused() {},
      setJoystick() {},
      interact() {},
      pulse() {},
    };
  }

  const isCompact = window.innerWidth < 800 || window.matchMedia('(pointer: coarse)').matches;
  const maxPixelRatio = Math.min(window.devicePixelRatio || 1, isCompact ? 1.5 : 1.65);
  let pixelRatio = maxPixelRatio;

  renderer.setPixelRatio(pixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.31;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // The room is static apart from the robot. Refreshing the shadow map only
  // while it moves keeps the largest off-screen pass out of most frames.
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05060b);
  scene.fog = new THREE.Fog(0x05060b, 34, 62);

  const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 140);
  const smoothFocus = new THREE.Vector3(0, 1.2, 0.5);
  const desiredFocus = new THREE.Vector3();
  camera.position.copy(smoothFocus).add(CAMERA_OFFSET);
  camera.lookAt(smoothFocus);

  // Lighting
  scene.add(new THREE.HemisphereLight(0x9db8ff, 0x2a1a10, 1.08));
  scene.add(new THREE.AmbientLight(0xffffff, 0.42));

  const keyLight = new THREE.DirectionalLight(0xffd8b0, 3.15);
  keyLight.position.set(8, 15, 9);
  keyLight.castShadow = true;
  const shadowSize = isCompact ? 1024 : 1536;
  keyLight.shadow.mapSize.set(shadowSize, shadowSize);
  keyLight.shadow.camera.left = -14;
  keyLight.shadow.camera.right = 14;
  keyLight.shadow.camera.top = 14;
  keyLight.shadow.camera.bottom = -14;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 42;
  keyLight.shadow.bias = -0.0004;
  keyLight.shadow.normalBias = 0.04;
  scene.add(keyLight);
  scene.add(keyLight.target);

  const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.05);
  fillLight.position.set(-9, 10, -7);
  scene.add(fillLight);

  const frontFill = new THREE.DirectionalLight(0xffe2c4, 0.58);
  frontFill.position.set(2, 9, 18);
  scene.add(frontFill);

  // Procedural textures
  const textures = {
    screen: makeScreenTexture(),
    window: makeWindowTexture(),
    rug: makeRugTexture(),
    glow: makeGlowTexture(),
  };

  buildRoom(scene, textures);

  const desk = buildDesk(scene, textures);
  const gallery = buildGallery(scene);
  const server = buildServer(scene);
  const mailbox = buildMailbox(scene);
  buildLounge(scene);
  buildPlant(scene, -8.7, 6.45, 1.15);
  buildPlant(scene, 8.75, -0.4, 0.9);
  buildPlant(scene, -8.55, -6.65, 0.8);

  const playerRig = buildPlayer(scene);
  const { player, rig, upper, head, armLeft, armRight, legLeft, legRight, haloGroup, halo } = playerRig;
  const playerBounds = new THREE.Box3().setFromObject(player);
  const playerHeight = playerBounds.max.y - playerBounds.min.y;
  let playerMeshCount = 0;
  player.traverse((object) => {
    if (object.isMesh) playerMeshCount += 1;
  });
  const dust = buildDust(scene, textures.glow);

  // One shared accent light follows whichever station is highlighted, instead
  // of keeping four extra point lights in every material shader.
  const stationGlowLight = new THREE.PointLight(0xffffff, 0, 7, 2);
  stationGlowLight.position.y = 2.4;
  scene.add(stationGlowLight);

  /* ---------------------------------------------------------------- */
  /* Interactive stations                                             */
  /* ---------------------------------------------------------------- */

  const raycastTargets = [];
  const stationVisuals = {};

  const stationGroups = {
    about: desk,
    projects: gallery,
    skills: server.group,
    contact: mailbox,
  };

  STUDIO_STATIONS.forEach((station) => {
    const group = stationGroups[station.id];
    const accent = new THREE.Color(station.accent);
    const glowMaterials = [];
    const seenMaterials = new Set();

    group.traverse((object) => {
      object.userData.interactiveId = station.id;
      if (!object.isMesh) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        if (!material || !material.emissive || seenMaterials.has(material)) return;
        seenMaterials.add(material);
        glowMaterials.push({
          material,
          baseEmissive: material.emissive.clone(),
          baseIntensity: material.emissiveIntensity ?? 1,
        });
      });
    });

    // Floor marker
    const markerGroup = new THREE.Group();
    markerGroup.position.set(station.marker[0], 0.04, station.marker[1]);
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });
    const markerRing = new THREE.Mesh(new THREE.RingGeometry(0.72, 0.9, 32), markerMaterial);
    markerRing.rotation.x = -Math.PI / 2;
    markerGroup.add(markerRing);
    const markerDot = new THREE.Mesh(
      new THREE.CircleGeometry(0.18, 16),
      new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        toneMapped: false,
      })
    );
    markerDot.rotation.x = -Math.PI / 2;
    markerDot.position.y = 0.002;
    markerGroup.add(markerDot);
    scene.add(markerGroup);

    // Floating label
    const label = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeLabelSprite(station.label, station.subtitle, station.accent),
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        toneMapped: false,
      })
    );
    label.position.set(station.labelPosition[0], station.labelPosition[1], station.labelPosition[2]);
    label.scale.set(3.75, 1.054, 1);
    label.userData.interactiveId = station.id;
    scene.add(label);
    raycastTargets.push(label);

    raycastTargets.push(group);

    stationVisuals[station.id] = {
      group,
      label,
      markerGroup,
      markerRing,
      markerDot,
      glowMaterials,
      accent,
      glow: 0,
      flash: 0,
      labelBaseY: station.labelPosition[1],
      labelBaseScale: new THREE.Vector3(3.75, 1.054, 1),
    };
  });

  /* ---------------------------------------------------------------- */
  /* State + input                                                     */
  /* ---------------------------------------------------------------- */

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(10, 10);
  const keys = new Set();
  const joystick = new THREE.Vector2();
  const velocity = new THREE.Vector2();
  const cameraForward = new THREE.Vector3();
  const cameraRight = new THREE.Vector3();
  const moveTarget = { position: null };
  const clickPoint = new THREE.Vector3();
  let navPoints = [];
  let navIndex = 0;
  let walkPhase = 0;

  let paused = false;
  let pointerInside = false;
  let pointerDirty = true;
  let lastHoverCheck = -1;
  let hoveredId = null;
  let nearbyId = null;
  let pendingInteraction = null;
  let rafId = 0;
  let lastTime = performance.now();
  let firstFrame = true;
  let destroyed = false;
  let needsRender = true;
  let renderedFrames = 0;
  let fps = 0;
  let fpsFrames = 0;
  let fpsWindowStart = performance.now();
  let frameMsAvg = 16.7;
  let lastShadowRefresh = 0;
  let shadowRefreshes = 0;
  let lastShadowX = player.position.x;
  let lastShadowZ = player.position.z;
  let lastQualityCheck = 0;
  let qualityWarmupUntil = performance.now() + 3200;

  const movementCodes = new Set([
    'KeyW',
    'KeyA',
    'KeyS',
    'KeyD',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
  ]);

  function setHover(id) {
    if (hoveredId === id) return;
    hoveredId = id;
    onHover?.(id);
    canvas.style.cursor = id ? 'pointer' : paused ? 'default' : 'grab';
  }

  function setNearby(id) {
    if (nearbyId === id) return;
    nearbyId = id;
    onNearby?.(id);
  }

  function cancelTravel() {
    if (!pendingInteraction) return;
    pendingInteraction = null;
    onTravel?.(null);
  }

  function stationDistance(station) {
    return Math.hypot(player.position.x - station.anchor[0], player.position.z - station.anchor[1]);
  }

  function clearNavigation() {
    navPoints = [];
    navIndex = 0;
    moveTarget.position = null;
  }

  function openStation(id, { pulse = true } = {}) {
    if (paused || !stationVisuals[id]) return;
    if (pulse) stationVisuals[id].flash = 1.15;
    pendingInteraction = null;
    clearNavigation();
    velocity.set(0, 0);
    onOpen?.(id);
  }

  function walkTo(x, z) {
    const point = findWalkablePoint(x, z);
    const path = findPath(player.position.x, player.position.z, point.x, point.z);
    if (!path.length) {
      clearNavigation();
      return false;
    }
    navPoints = path;
    navIndex = 0;
    moveTarget.position = new THREE.Vector3(point.x, 0, point.z);
    return true;
  }

  function approachStation(id) {
    const station = STATION_MAP[id];
    if (!station) return;
    pendingInteraction = id;
    if (!walkTo(station.approach[0], station.approach[1])) {
      pendingInteraction = null;
      onTravel?.(null);
      return;
    }
    onTravel?.(id);
  }

  function collides(x, z) {
    if (
      x < ROOM_BOUNDS.minX + PLAYER_RADIUS ||
      x > ROOM_BOUNDS.maxX - PLAYER_RADIUS ||
      z < ROOM_BOUNDS.minZ + PLAYER_RADIUS ||
      z > ROOM_BOUNDS.maxZ - PLAYER_RADIUS
    ) {
      return true;
    }

    return COLLIDERS.some(
      (box) =>
        x > box.minX - PLAYER_RADIUS &&
        x < box.maxX + PLAYER_RADIUS &&
        z > box.minZ - PLAYER_RADIUS &&
        z < box.maxZ + PLAYER_RADIUS
    );
  }

  function findWalkablePoint(x, z) {
    const clampedX = THREE.MathUtils.clamp(x, ROOM_BOUNDS.minX + PLAYER_RADIUS, ROOM_BOUNDS.maxX - PLAYER_RADIUS);
    const clampedZ = THREE.MathUtils.clamp(z, ROOM_BOUNDS.minZ + PLAYER_RADIUS, ROOM_BOUNDS.maxZ - PLAYER_RADIUS);
    if (!collides(clampedX, clampedZ)) return { x: clampedX, z: clampedZ };

    for (let radius = 0.5; radius <= 4.5; radius += 0.5) {
      for (let step = 0; step < 16; step += 1) {
        const angle = (step / 16) * Math.PI * 2;
        const candidateX = THREE.MathUtils.clamp(
          clampedX + Math.cos(angle) * radius,
          ROOM_BOUNDS.minX + PLAYER_RADIUS,
          ROOM_BOUNDS.maxX - PLAYER_RADIUS
        );
        const candidateZ = THREE.MathUtils.clamp(
          clampedZ + Math.sin(angle) * radius,
          ROOM_BOUNDS.minZ + PLAYER_RADIUS,
          ROOM_BOUNDS.maxZ - PLAYER_RADIUS
        );
        if (!collides(candidateX, candidateZ)) return { x: candidateX, z: candidateZ };
      }
    }

    return { x: player.position.x, z: player.position.z };
  }

  const NAV_CELL = 0.45;
  const NAV_DIRECTIONS = [
    [1, 0, 1],
    [-1, 0, 1],
    [0, 1, 1],
    [0, -1, 1],
    [1, 1, Math.SQRT2],
    [1, -1, Math.SQRT2],
    [-1, 1, Math.SQRT2],
    [-1, -1, Math.SQRT2],
  ];

  const navKey = (gx, gz) => `${gx}:${gz}`;

  function lineClear(ax, az, bx, bz) {
    const dx = bx - ax;
    const dz = bz - az;
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.18));
    for (let step = 1; step <= steps; step += 1) {
      const t = step / steps;
      if (collides(ax + dx * t, az + dz * t)) return false;
    }
    return true;
  }

  function findCellNear(x, z) {
    const baseX = Math.round(x / NAV_CELL);
    const baseZ = Math.round(z / NAV_CELL);

    for (let ring = 0; ring <= 14; ring += 1) {
      for (let ox = -ring; ox <= ring; ox += 1) {
        for (let oz = -ring; oz <= ring; oz += 1) {
          if (ring > 0 && Math.max(Math.abs(ox), Math.abs(oz)) !== ring) continue;
          const gx = baseX + ox;
          const gz = baseZ + oz;
          const wx = gx * NAV_CELL;
          const wz = gz * NAV_CELL;
          if (!collides(wx, wz) && lineClear(x, z, wx, wz)) {
            return { gx, gz, x: wx, z: wz };
          }
        }
      }
    }
    return null;
  }

  function smoothPath(sx, sz, points) {
    if (!points.length) return [];
    const smoothed = [];
    let cursorX = sx;
    let cursorZ = sz;
    let index = 0;

    while (index < points.length) {
      let next = index;
      for (let probe = points.length - 1; probe > index; probe -= 1) {
        if (lineClear(cursorX, cursorZ, points[probe].x, points[probe].z)) {
          next = probe;
          break;
        }
      }
      const point = points[next];
      smoothed.push(point);
      cursorX = point.x;
      cursorZ = point.z;
      index = next + 1;
    }

    return smoothed;
  }

  /**
   * A* over a coarse walkable grid. The room is small, so this runs once per
   * click and is cheap; the alternative (straight-line travel) walks the robot
   * into the desk whenever two stations sit on opposite sides of the room.
   */
  function findPath(sx, sz, tx, tz) {
    const start = findCellNear(sx, sz);
    const goal = findCellNear(tx, tz);
    if (!start || !goal) return [];
    if (start.gx === goal.gx && start.gz === goal.gz) {
      return lineClear(sx, sz, tx, tz) ? [{ x: tx, z: tz }] : [];
    }

    const heuristic = (gx, gz) => {
      const dx = Math.abs(gx - goal.gx);
      const dz = Math.abs(gz - goal.gz);
      return Math.max(dx, dz) + (Math.SQRT2 - 1) * Math.min(dx, dz);
    };

    const startKey = navKey(start.gx, start.gz);
    const open = new Map([
      [startKey, { gx: start.gx, gz: start.gz, g: 0, f: heuristic(start.gx, start.gz), parent: null }],
    ]);
    const bestG = new Map([[startKey, 0]]);
    const closed = new Set();
    let found = null;

    while (open.size) {
      let currentKey = null;
      let current = null;
      for (const [key, node] of open) {
        if (!current || node.f < current.f) {
          current = node;
          currentKey = key;
        }
      }

      open.delete(currentKey);
      if (current.gx === goal.gx && current.gz === goal.gz) {
        found = current;
        break;
      }
      closed.add(currentKey);

      for (const [ox, oz, cost] of NAV_DIRECTIONS) {
        const gx = current.gx + ox;
        const gz = current.gz + oz;
        const key = navKey(gx, gz);
        if (closed.has(key)) continue;

        const wx = gx * NAV_CELL;
        const wz = gz * NAV_CELL;
        if (collides(wx, wz)) continue;

        // Do not cut diagonally through the corner of a collider.
        if (ox !== 0 && oz !== 0) {
          if (
            collides(current.gx * NAV_CELL + ox * NAV_CELL, current.gz * NAV_CELL) ||
            collides(current.gx * NAV_CELL, current.gz * NAV_CELL + oz * NAV_CELL)
          ) {
            continue;
          }
        }

        const g = current.g + cost;
        if (bestG.has(key) && g >= bestG.get(key)) continue;
        bestG.set(key, g);
        open.set(key, { gx, gz, g, f: g + heuristic(gx, gz), parent: current });
      }
    }

    if (!found) return [];

    const cells = [];
    let node = found;
    while (node) {
      cells.push(node);
      node = node.parent;
    }
    cells.reverse();

    const raw = cells.slice(1).map((cell) => ({ x: cell.gx * NAV_CELL, z: cell.gz * NAV_CELL }));
    const lastCell = cells[cells.length - 1];
    if (
      lineClear(
        lastCell.gx * NAV_CELL,
        lastCell.gz * NAV_CELL,
        tx,
        tz
      )
    ) {
      raw.push({ x: tx, z: tz });
    }

    return smoothPath(sx, sz, raw);
  }

  function interact() {
    if (paused) return;
    if (nearbyId) {
      openStation(nearbyId);
      return;
    }
    if (hoveredId) {
      const station = STATION_MAP[hoveredId];
      if (stationDistance(station) <= station.radius) openStation(hoveredId);
      else approachStation(hoveredId);
    }
  }

  function updatePointerFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function raycastInteractive() {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(raycastTargets, true);
    for (let i = 0; i < hits.length; i += 1) {
      const id = resolveInteractive(hits[i].object);
      if (id) return id;
    }
    return null;
  }

  function handleClick() {
    if (paused) return;
    const id = raycastInteractive();
    if (id) {
      const station = STATION_MAP[id];
      if (stationDistance(station) <= station.radius) openStation(id);
      else approachStation(id);
      return;
    }

    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(FLOOR_PLANE, clickPoint)) {
      cancelTravel();
      walkTo(clickPoint.x, clickPoint.z);
    }
  }

  function onPointerMove(event) {
    if (event.pointerType === 'touch') return;
    updatePointerFromEvent(event);
    pointerInside = true;
    pointerDirty = true;
  }

  function onPointerEnter(event) {
    if (event.pointerType === 'touch') return;
    updatePointerFromEvent(event);
    pointerInside = true;
    pointerDirty = true;
  }

  function onPointerLeave() {
    pointerInside = false;
    setHover(null);
  }

  function onPointerDown(event) {
    if (event.pointerType === 'touch') {
      // React's joystick/action buttons live above the canvas and never reach here.
      updatePointerFromEvent(event);
    } else if (event.button !== 0) {
      return;
    }
    handleClick();
  }

  function onKeyDown(event) {
    if (paused) return;
    if (isEditableTarget(event.target)) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (movementCodes.has(event.code)) {
      event.preventDefault();
      keys.add(event.code);
      clearNavigation();
      cancelTravel();
      return;
    }

    if (event.code === 'KeyE') {
      // E has no native meaning, so it can always open the nearby station.
      if (event.repeat) return;
      event.preventDefault();
      interact();
      return;
    }

    if (event.code === 'Enter') {
      // Never swallow activation for the focused HUD link/button.
      if (event.repeat || isActionTarget(event.target)) return;
      event.preventDefault();
      interact();
    }
  }

  function onKeyUp(event) {
    keys.delete(event.code);
  }

  function onBlur() {
    keys.clear();
    joystick.set(0, 0);
  }

  function onVisibilityChange() {
    lastTime = performance.now();
    needsRender = true;
    fpsFrames = 0;
    fpsWindowStart = performance.now();

    if (document.hidden) {
      keys.clear();
      joystick.set(0, 0);
    }

    scheduleFrame();
  }

  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerenter', onPointerEnter);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('keydown', onKeyDown, { passive: false });
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);
  document.addEventListener('visibilitychange', onVisibilityChange);

  /* ---------------------------------------------------------------- */
  /* Update loop                                                       */
  /* ---------------------------------------------------------------- */

  function updateCamera(delta) {
    desiredFocus.set(player.position.x, 1.15, player.position.z);
    smoothFocus.lerp(desiredFocus, 1 - Math.exp(-5.4 * delta));
    camera.position.copy(smoothFocus).add(CAMERA_OFFSET);
    camera.lookAt(smoothFocus);
  }

  function updateMovement(delta) {
    let inputX = 0;
    let inputY = 0;

    if (keys.has('KeyD') || keys.has('ArrowRight')) inputX += 1;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) inputX -= 1;
    if (keys.has('KeyW') || keys.has('ArrowUp')) inputY += 1;
    if (keys.has('KeyS') || keys.has('ArrowDown')) inputY -= 1;

    inputX += joystick.x;
    inputY += joystick.y;

    const inputLength = Math.hypot(inputX, inputY);
    if (inputLength > 1) {
      inputX /= inputLength;
      inputY /= inputLength;
    }

    const hasManualInput = Math.hypot(inputX, inputY) > 0.05;

    if (hasManualInput) {
      cancelTravel();
      clearNavigation();
    }

    let targetX = 0;
    let targetZ = 0;

    if (hasManualInput) {
      camera.getWorldDirection(cameraForward);
      cameraForward.y = 0;
      cameraForward.normalize();
      cameraRight.crossVectors(cameraForward, UP).normalize();

      targetX = cameraForward.x * inputY + cameraRight.x * inputX;
      targetZ = cameraForward.z * inputY + cameraRight.z * inputX;

      const targetLength = Math.hypot(targetX, targetZ);
      if (targetLength > 0) {
        targetX = (targetX / targetLength) * MAX_SPEED;
        targetZ = (targetZ / targetLength) * MAX_SPEED;
      }
    } else if (moveTarget.position) {
      // Advance through the smoothed A* waypoints.
      while (
        navIndex < navPoints.length - 1 &&
        Math.hypot(
          player.position.x - navPoints[navIndex].x,
          player.position.z - navPoints[navIndex].z
        ) < 0.34
      ) {
        navIndex += 1;
      }

      const waypoint = navPoints.length
        ? navPoints[Math.min(navIndex, navPoints.length - 1)]
        : moveTarget.position;
      const isFinal = navPoints.length === 0 || navIndex >= navPoints.length - 1;
      const dx = waypoint.x - player.position.x;
      const dz = waypoint.z - player.position.z;
      const distance = Math.hypot(dx, dz);

      if (isFinal && distance < 0.14) {
        clearNavigation();
        targetX = 0;
        targetZ = 0;
      } else {
        const remaining = Math.hypot(
          moveTarget.position.x - player.position.x,
          moveTarget.position.z - player.position.z
        );
        const speed = isFinal
          ? THREE.MathUtils.clamp(remaining * 2.4, 0.6, MAX_SPEED)
          : Math.min(MAX_SPEED, 3.6);
        targetX = (dx / distance) * speed;
        targetZ = (dz / distance) * speed;
      }
    }

    velocity.x = damp(velocity.x, targetX, hasManualInput ? 14 : 9, delta);
    velocity.y = damp(velocity.y, targetZ, hasManualInput ? 14 : 9, delta);

    // Axis-separated movement gives natural sliding along furniture.
    const nextX = player.position.x + velocity.x * delta;
    if (!collides(nextX, player.position.z)) {
      player.position.x = nextX;
    } else {
      velocity.x = 0;
      if (moveTarget.position) clearNavigation();
    }

    const nextZ = player.position.z + velocity.y * delta;
    if (!collides(player.position.x, nextZ)) {
      player.position.z = nextZ;
    } else {
      velocity.y = 0;
      if (moveTarget.position) clearNavigation();
    }

    // A very small idle drift keeps the robot feeling alive without being distracting.
    const speed = Math.hypot(velocity.x, velocity.y);
    const speedRatio = Math.min(speed / MAX_SPEED, 1);

    if (speed > 0.08) {
      const targetYaw = Math.atan2(velocity.x, velocity.y);
      rig.rotation.y = dampAngle(rig.rotation.y, targetYaw, 9, delta);
    }

    const now = performance.now();
    if (!reducedMotion) {
      walkPhase += delta * (2.6 + speed * 1.75);
    }

    const stride = Math.sin(walkPhase) * 0.42 * speedRatio * motionScale;
    const strideRight = Math.sin(walkPhase + Math.PI) * 0.42 * speedRatio * motionScale;

    legLeft.hip.rotation.x = damp(legLeft.hip.rotation.x, stride, 14, delta);
    legRight.hip.rotation.x = damp(legRight.hip.rotation.x, strideRight, 14, delta);

    // Knees bend only while the leg swings through, so the boots lift clear
    // of the floor instead of dragging. The ankle counter-rotates to keep the
    // sole close to level.
    const kneeLeft = Math.max(0, Math.sin(walkPhase)) * 0.62 * speedRatio * motionScale;
    const kneeRight = Math.max(0, Math.sin(walkPhase + Math.PI)) * 0.62 * speedRatio * motionScale;
    legLeft.knee.rotation.x = damp(legLeft.knee.rotation.x, kneeLeft, 16, delta);
    legRight.knee.rotation.x = damp(legRight.knee.rotation.x, kneeRight, 16, delta);
    legLeft.ankle.rotation.x = damp(legLeft.ankle.rotation.x, -(legLeft.hip.rotation.x + legLeft.knee.rotation.x) * 0.8, 16, delta);
    legRight.ankle.rotation.x = damp(legRight.ankle.rotation.x, -(legRight.hip.rotation.x + legRight.knee.rotation.x) * 0.8, 16, delta);

    const armSwing = -stride * 0.78;
    const armSwingRight = -strideRight * 0.78;
    armLeft.shoulder.rotation.x = damp(armLeft.shoulder.rotation.x, armSwing, 10, delta);
    armRight.shoulder.rotation.x = damp(armRight.shoulder.rotation.x, armSwingRight, 10, delta);
    armLeft.elbow.rotation.x = damp(armLeft.elbow.rotation.x, -0.16 - Math.max(0, stride) * 0.5, 10, delta);
    armRight.elbow.rotation.x = damp(armRight.elbow.rotation.x, -0.16 - Math.max(0, strideRight) * 0.5, 10, delta);

    // Drop the hips by the amount the forward boot rises when the leg swings,
    // so the robot stays planted instead of skating above the floor. The
    // breathing offset is tiny and disappears during reduced motion.
    const gaitDrop = 0.805 * (1 - Math.cos(stride));
    const bob = reducedMotion ? 0 : Math.sin(now * 0.0016) * 0.006 - gaitDrop;
    rig.position.y = damp(rig.position.y, bob, 14, delta);

    const lean = speedRatio * 0.1 * motionScale;
    upper.rotation.x = damp(upper.rotation.x, lean, 7, delta);

    const idleLook = reducedMotion ? 0 : Math.sin(now * 0.00055) * 0.14 * (1 - speedRatio);
    head.rotation.y = damp(head.rotation.y, idleLook, 3, delta);
    head.rotation.x = damp(head.rotation.x, -lean * 0.6, 7, delta);

    haloGroup.position.set(player.position.x, 0.04, player.position.z);
    haloGroup.rotation.y += delta * 0.36;
    halo.material.opacity = 0.18 + speedRatio * 0.12;
    halo.scale.setScalar(1 + speedRatio * 0.07);
  }

  function updateInteraction(delta, time) {
    // Nearest station
    let nearest = null;
    let nearestDistance = Infinity;
    STUDIO_STATIONS.forEach((station) => {
      const distance = stationDistance(station);
      if (distance < station.radius && distance < nearestDistance) {
        nearest = station.id;
        nearestDistance = distance;
      }
    });
    setNearby(nearest);

    // Auto-open only after the robot actually reaches the approach point.
    // Using a fixed timer here cuts the interaction short on slower devices.
    if (pendingInteraction) {
      const station = STATION_MAP[pendingInteraction];
      const atApproach =
        Math.hypot(
          player.position.x - station.approach[0],
          player.position.z - station.approach[1]
        ) < 0.6;

      if (!moveTarget.position) {
        if (atApproach) {
          openStation(pendingInteraction);
        } else {
          // The path was blocked and the robot stopped short.
          pendingInteraction = null;
          onTravel?.(null);
        }
      }
    }

    // Hover raycasting is capped at ~13Hz: the camera drifts slowly, so a
    // per-frame raycast across every interactive mesh buys nothing.
    if (pointerInside && !paused) {
      if (pointerDirty || time - lastHoverCheck > 0.075) {
        pointerDirty = false;
        lastHoverCheck = time;
        setHover(raycastInteractive());
      }
    } else if (hoveredId) {
      setHover(null);
    }

    // Highlight + labels + floor markers.
    let strongestStation = null;
    let strongestIntensity = 0;

    STUDIO_STATIONS.forEach((station) => {
      const visual = stationVisuals[station.id];
      const isHovered = hoveredId === station.id;
      const isNear = nearbyId === station.id;
      const targetGlow = isHovered ? 1 : isNear ? 0.72 : 0;
      visual.glow = damp(visual.glow, targetGlow, 7, delta);

      if (visual.flash > 0) {
        visual.flash = Math.max(0, visual.flash - delta * 1.35);
      }

      const pulse = reducedMotion ? 0.72 : 0.56 + Math.sin(time * 5 + station.order) * 0.44;
      const intensity = Math.min(1.25, visual.glow * pulse + visual.flash);

      if (intensity > strongestIntensity) {
        strongestIntensity = intensity;
        strongestStation = station;
      }

      visual.glowMaterials.forEach((entry) => {
        const mix = Math.min(1, intensity);
        entry.material.emissive.copy(entry.baseEmissive).lerp(visual.accent, mix);
        entry.material.emissiveIntensity = entry.baseIntensity + mix * 1.7;
      });

      visual.markerRing.material.opacity = 0.12 + intensity * 0.5;
      visual.markerDot.material.opacity = 0.16 + intensity * 0.32;
      visual.markerGroup.scale.setScalar(1 + intensity * 0.07);
      visual.markerGroup.rotation.y += delta * (0.18 + intensity * 0.32);

      if (!reducedMotion) {
        visual.label.position.y = visual.labelBaseY + Math.sin(time * 1.25 + station.order) * 0.055;
      }
      const labelScale = 1 + intensity * 0.06 + (reducedMotion ? 0 : Math.sin(time * 2 + station.order) * 0.006);
      visual.label.scale.set(
        visual.labelBaseScale.x * labelScale,
        visual.labelBaseScale.y * labelScale,
        1
      );
      visual.label.material.opacity = 0.7 + Math.min(1, intensity) * 0.3;
    });

    if (strongestStation) {
      const visual = stationVisuals[strongestStation.id];
      stationGlowLight.position.set(strongestStation.anchor[0], 2.4, strongestStation.anchor[1]);
      stationGlowLight.color.copy(visual.accent);
      stationGlowLight.intensity = strongestIntensity * 12;
    } else {
      stationGlowLight.intensity = 0;
    }
  }

  function updateEnvironment(delta, time) {
    server.fans.forEach((fan) => {
      fan.rotation.z += delta * fan.userData.speed;
    });

    server.leds.forEach((led) => {
      const blink = reducedMotion ? 0.9 : 0.55 + Math.sin(time * 3.1 + led.phase) * 0.45;
      led.material.emissiveIntensity = led.base * (0.55 + blink);
    });

    const positions = dust.points.geometry.attributes.position.array;
    for (let i = 0; i < positions.length / 3; i += 1) {
      const baseIndex = i * 3;
      positions[baseIndex] = dust.base[baseIndex] + Math.sin(time * 0.25 + i * 0.7) * 0.18 * motionScale;
      positions[baseIndex + 1] = dust.base[baseIndex + 1] + Math.sin(time * 0.38 + i * 1.3) * 0.22 * motionScale;
      positions[baseIndex + 2] = dust.base[baseIndex + 2] + Math.cos(time * 0.22 + i * 0.9) * 0.15 * motionScale;
    }
    dust.points.geometry.attributes.position.needsUpdate = true;
  }

  function update(delta, time) {
    updateMovement(delta);
    updateCamera(delta);
    updateInteraction(delta, time);
    updateEnvironment(delta, time);
  }

  function refreshShadows(now) {
    // Refresh at ~9Hz while the robot walks. The room never moves, so
    // rendering the depth pass every frame only produces a sharper shadow
    // on a small, fast-moving object.
    const moved = Math.hypot(player.position.x - lastShadowX, player.position.z - lastShadowZ);
    if (moved > 0.012 && now - lastShadowRefresh > 110) {
      lastShadowX = player.position.x;
      lastShadowZ = player.position.z;
      lastShadowRefresh = now;
      shadowRefreshes += 1;
      renderer.shadowMap.needsUpdate = true;
    }
  }

  function sampleFrame(rawDelta, now) {
    if (!Number.isFinite(rawDelta) || rawDelta <= 0) return;

    // Cap tab switches and long debugger pauses so they cannot dominate the
    // average, but still count genuinely slow frames on weak hardware.
    const frameMs = Math.min(rawDelta, 250);
    frameMsAvg += (frameMs - frameMsAvg) * 0.09;
    fpsFrames += 1;

    const elapsed = now - fpsWindowStart;
    if (elapsed >= 700) {
      fps = Math.round((fpsFrames * 1000) / elapsed);
      fpsFrames = 0;
      fpsWindowStart = now;
    }

    if (now < qualityWarmupUntil || now - lastQualityCheck < 2200) return;
    lastQualityCheck = now;

    // Resolution is the cheapest visual-preserving quality lever here.
    // Step down only; never oscillate back up and cause visible shimmer.
    if (frameMsAvg > 23.5 && pixelRatio > 0.9) {
      pixelRatio = Math.max(0.9, Math.round((pixelRatio - 0.2) * 100) / 100);
      resize();
    }
  }

  function scheduleFrame() {
    if (destroyed || rafId) return;
    rafId = window.requestAnimationFrame(animate);
  }

  function animate(now) {
    if (destroyed) return;
    rafId = 0;

    const rawDelta = now - lastTime;
    const delta = Math.min(rawDelta / 1000, 0.05);
    lastTime = now;

    // While an overlay is open the room is frozen. Render one frame after the
    // pause transition (or a resize), then stop the loop entirely so the GPU
    // and CPU stay idle behind the dialog.
    if (paused) {
      if (!needsRender) return;
      renderer.render(scene, camera);
      needsRender = false;
      renderedFrames += 1;
      if (firstFrame) {
        firstFrame = false;
        onReady?.();
      }
      return;
    }

    update(delta, now / 1000);
    refreshShadows(now);
    renderer.render(scene, camera);
    needsRender = false;
    renderedFrames += 1;
    sampleFrame(rawDelta, now);

    if (firstFrame) {
      firstFrame = false;
      onReady?.();
    }

    scheduleFrame();
  }

  /* ---------------------------------------------------------------- */
  /* Sizing                                                            */
  /* ---------------------------------------------------------------- */

  function resize() {
    const parent = canvas.parentElement;
    const width = Math.max(1, parent ? parent.clientWidth : window.innerWidth);
    const height = Math.max(1, parent ? parent.clientHeight : window.innerHeight);
    const aspect = width / height;
    const viewHeight = aspect < 0.8 ? 33 : aspect < 1.15 ? 25 : 22;

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.left = (-viewHeight * aspect) / 2;
    camera.right = (viewHeight * aspect) / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();
    needsRender = true;
    renderer.shadowMap.needsUpdate = true;
    scheduleFrame();
  }

  const resizeObserver = new ResizeObserver(resize);
  if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
  window.addEventListener('resize', resize);
  resize();

  // WebGL context-loss handling: fail soft into the classic view.
  function onContextLost(event) {
    event.preventDefault();
    onError?.('The 3D context was lost. Switch to the classic view to continue.');
  }
  canvas.addEventListener('webglcontextlost', onContextLost, false);

  /* ---------------------------------------------------------------- */
  /* Public API                                                        */
  /* ---------------------------------------------------------------- */

  scheduleFrame();

  return {
    setPaused(value) {
      const next = Boolean(value);
      if (paused === next) return;

      paused = next;
      needsRender = true;
      lastTime = performance.now();

      if (paused) {
        keys.clear();
        joystick.set(0, 0);
        velocity.set(0, 0);
        clearNavigation();
        cancelTravel();
        setHover(null);
        canvas.style.cursor = 'default';
      } else {
        canvas.style.cursor = 'grab';
        frameMsAvg = 16.7;
        fpsFrames = 0;
        fpsWindowStart = lastTime;
        qualityWarmupUntil = lastTime + 2600;
        lastQualityCheck = lastTime;
        lastShadowX = player.position.x;
        lastShadowZ = player.position.z;
        renderer.shadowMap.needsUpdate = true;
      }

      scheduleFrame();
    },
    setJoystick(x, y) {
      joystick.set(
        THREE.MathUtils.clamp(x, -1, 1),
        THREE.MathUtils.clamp(y, -1, 1)
      );
    },
    travelTo(id) {
      if (paused || !STATION_MAP[id]) return;
      approachStation(id);
    },
    interact,
    pulse(id) {
      if (stationVisuals[id]) stationVisuals[id].flash = 1.15;
    },
    getState() {
      return {
        x: Number(player.position.x.toFixed(2)),
        z: Number(player.position.z.toFixed(2)),
        paused,
        nearbyId,
        hoveredId,
        pendingInteraction,
        moveTarget: moveTarget.position
          ? { x: Number(moveTarget.position.x.toFixed(2)), z: Number(moveTarget.position.z.toFixed(2)) }
          : null,
        path: navPoints.map((point) => ({
          x: Number(point.x.toFixed(2)),
          z: Number(point.z.toFixed(2)),
        })),
        pathIndex: navIndex,
        velocity: { x: Number(velocity.x.toFixed(2)), z: Number(velocity.y.toFixed(2)) },
        player: {
          height: Number(playerHeight.toFixed(2)),
          meshes: playerMeshCount,
          heading: Number(rig.rotation.y.toFixed(2)),
        },
        render: {
          calls: renderer.info.render.calls,
          triangles: renderer.info.render.triangles,
          points: renderer.info.render.points,
          textures: renderer.info.memory.textures,
          geometries: renderer.info.memory.geometries,
          frames: renderedFrames,
          fps,
          frameMs: Number(frameMsAvg.toFixed(1)),
          shadowRefreshes,
        },
        pixelRatio: renderer.getPixelRatio(),
        maxPixelRatio,
      };
    },
    destroy() {
      destroyed = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('webglcontextlost', onContextLost);

      const disposedTextures = new Set();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
        materials.forEach((material) => {
          Object.values(material).forEach((value) => {
            if (value && value.isTexture && !disposedTextures.has(value)) {
              disposedTextures.add(value);
              value.dispose();
            }
          });
          material.dispose();
        });
      });

      renderer.dispose();
      if (renderer.forceContextLoss) renderer.forceContextLoss();
    },
  };
}
