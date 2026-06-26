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
          config: { damping: 11, mass: 0.4 },
        });
        const translateY = interpolate(progress, [0, 1], [36, 0]);
        const scale = interpolate(progress, [0, 1], [1.4, 1]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <span
            key={i}
            style={{
              ...style,
              display: "inline-block",
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
              textShadow: "0 0 24px rgba(212,175,55,0.55), 0 4px 10px rgba(0,0,0,0.6)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
