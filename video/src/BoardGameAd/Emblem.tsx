import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

type Quadrant = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const QUADRANT_POSITION: Record<Quadrant, { row: number; col: number }> = {
  "top-left": { row: 0, col: 0 },
  "top-right": { row: 0, col: 1 },
  "bottom-left": { row: 1, col: 0 },
  "bottom-right": { row: 1, col: 1 },
};

export const Emblem: React.FC<{
  quadrant: Quadrant;
  size: number;
  delay: number;
}> = ({ quadrant, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { row, col } = QUADRANT_POSITION[quadrant];

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const translateY = interpolate(entrance, [0, 1], [60, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: size,
        height: size * 1.5,
        overflow: "hidden",
        borderRadius: 12,
        opacity,
        transform: `translateY(${translateY}px)`,
        boxShadow: "0 16px 30px rgba(0,0,0,0.4)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <Img
        src={staticFile("assets/factions.png")}
        style={{
          position: "absolute",
          width: size * 2,
          height: size * 3,
          top: -row * size * 1.5,
          left: -col * size,
        }}
      />
    </div>
  );
};
