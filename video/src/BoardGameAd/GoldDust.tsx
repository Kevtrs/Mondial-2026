import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const PARTICLE_COUNT = 36;

export const GoldDust: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const startX = seededRandom(i * 1.7) * width;
    const baseY = seededRandom(i * 3.1) * height;
    const speed = 8 + seededRandom(i * 5.3) * 18;
    const sway = 20 + seededRandom(i * 7.9) * 40;
    const size = 2 + seededRandom(i * 2.3) * 4;
    const phase = seededRandom(i * 4.4) * Math.PI * 2;

    const y = ((baseY - (frame * speed) / durationInFrames) % (height + 100) + height + 100) % (height + 100) - 50;
    const x = startX + Math.sin(frame / 40 + phase) * sway;
    const opacity = 0.25 + 0.35 * Math.abs(Math.sin(frame / 50 + phase));

    return { x, y, size, opacity, key: i };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.key}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#f4d98a",
            opacity: p.opacity,
            boxShadow: "0 0 6px 2px rgba(244,217,138,0.6)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
