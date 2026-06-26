import React from "react";
import { useCurrentFrame } from "remotion";

export const Glow: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.85 + 0.15 * Math.sin(frame / 12);

  return (
    <div
      style={{
        position: "absolute",
        width: size * pulse,
        height: size * pulse,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        filter: "blur(10px)",
        pointerEvents: "none",
      }}
    />
  );
};
