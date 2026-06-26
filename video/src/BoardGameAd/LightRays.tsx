import React from "react";
import { useCurrentFrame } from "remotion";

export const LightRays: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const rotation = frame * 0.4;

  return (
    <div
      style={{
        position: "absolute",
        width: 1800,
        height: 1800,
        transform: `rotate(${rotation}deg)`,
        opacity: 0.35,
        pointerEvents: "none",
        background: `repeating-conic-gradient(${color} 0deg 4deg, transparent 4deg 18deg)`,
        borderRadius: "50%",
        maskImage: "radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)",
      }}
    />
  );
};
