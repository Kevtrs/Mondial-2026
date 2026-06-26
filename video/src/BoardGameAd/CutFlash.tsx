import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const CutFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 9], [0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity,
        background:
          "radial-gradient(circle, rgba(244,234,210,0.95) 0%, rgba(212,175,55,0.45) 40%, rgba(0,0,0,0) 75%)",
      }}
    />
  );
};
