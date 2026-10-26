'use client';

import { useRef, useState } from 'react';

/**
 * Lightweight virtual joystick for touch devices.
 * It only communicates normalized values to the engine; no React state is
 * updated during the engine's animation loop.
 */
export default function StudioJoystick({ onChange, accent = '#FE7F2D' }) {
  const baseRef = useRef(null);
  const activeRef = useRef(false);
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  const updateFromPointer = (event) => {
    const base = baseRef.current;
    if (!base) return;

    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDistance = Math.max(12, rect.width / 2 - 30);

    let dx = event.clientX - centerX;
    let dy = event.clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }

    const x = dx / maxDistance;
    const y = dy / maxDistance;
    setKnob({ x, y });
    onChange?.(x, -y);
  };

  const reset = () => {
    activeRef.current = false;
    setKnob({ x: 0, y: 0 });
    onChange?.(0, 0);
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    activeRef.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromPointer(event);
  };

  const handlePointerMove = (event) => {
    if (!activeRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    updateFromPointer(event);
  };

  const handlePointerUp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    reset();
  };

  return (
    <div className="studio-joystick-wrap">
      <div
        ref={baseRef}
        className="studio-joystick"
        role="group"
        aria-label="Movement joystick. Drag to move the robot."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ '--joystick-accent': accent }}
      >
        <span className="studio-joystick__shadow" aria-hidden="true" />
        <span className="studio-joystick__hint studio-joystick__hint--up" aria-hidden="true">▲</span>
        <span className="studio-joystick__hint studio-joystick__hint--right" aria-hidden="true">▶</span>
        <span className="studio-joystick__hint studio-joystick__hint--down" aria-hidden="true">▼</span>
        <span className="studio-joystick__hint studio-joystick__hint--left" aria-hidden="true">◀</span>
        <span
          className="studio-joystick__knob"
          aria-hidden="true"
          style={{ transform: `translate(calc(-50% + ${knob.x * 32}px), calc(-50% + ${knob.y * 32}px))` }}
        >
          <span className="studio-joystick__core" />
        </span>
      </div>
      <span className="studio-joystick__label">Move</span>
    </div>
  );
}
