import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

const PIP_LAYOUTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [25, 25],
    [75, 75],
  ],
  3: [
    [25, 25],
    [50, 50],
    [75, 75],
  ],
  4: [
    [25, 25],
    [75, 25],
    [25, 75],
    [75, 75],
  ],
  5: [
    [25, 25],
    [75, 25],
    [50, 50],
    [25, 75],
    [75, 75],
  ],
  6: [
    [25, 25],
    [75, 25],
    [25, 50],
    [75, 50],
    [25, 75],
    [75, 75],
  ],
};

export const Dice: React.FC<{
  value: number;
  size: number;
  color: string;
  delay: number;
}> = ({ value, size, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const rotation = interpolate(entrance, [0, 1], [-200, 0]);
  const scale = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: size,
        height: size,
        background: "white",
        borderRadius: size * 0.16,
        position: "relative",
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        transform: `rotate(${rotation}deg) scale(${scale})`,
        flexShrink: 0,
      }}
    >
      {PIP_LAYOUTS[value].map(([x, y], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: size * 0.16,
            height: size * 0.16,
            borderRadius: "50%",
            background: color,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};
