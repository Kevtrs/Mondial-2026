import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Pawn: React.FC<{
  color: string;
  size: number;
  delay: number;
}> = ({ color, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  const translateY = interpolate(entrance, [0, 1], [80, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: size,
        height: size * 1.4,
        opacity,
        transform: `translateY(${translateY}px)`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          boxShadow: "0 14px 24px rgba(0,0,0,0.35)",
        }}
      />
      <div
        style={{
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: "50%",
          background: color,
          margin: "0 auto",
          marginTop: -size * 0.18,
          boxShadow: "0 10px 16px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
};
