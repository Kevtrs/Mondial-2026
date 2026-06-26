import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const RevealWords: React.FC<{
  text: string;
  style: React.CSSProperties;
  staggerFrames?: number;
}> = ({ text, style, staggerFrames = 4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.3em" }}>
      {words.map((word, i) => {
        const delay = i * staggerFrames;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 16, mass: 0.5 },
        });
        const translateY = interpolate(progress, [0, 1], [24, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <span
            key={i}
            style={{
              ...style,
              display: "inline-block",
              transform: `translateY(${translateY}px)`,
              opacity,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
