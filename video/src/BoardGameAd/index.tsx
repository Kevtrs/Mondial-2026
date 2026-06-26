import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Dice } from "./Dice";
import { Pawn } from "./Pawn";
import { FadeWrapper } from "./FadeWrapper";

const NAVY = "#0b1622";
const GOLD = "#d4af37";
const RED = "#b3392c";
const CREAM = "#f4ead2";

const fontFamily = "Helvetica, Arial, sans-serif";

const LogoScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const titleScale = interpolate(titleSpring, [0, 1], [0.4, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: NAVY,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 160,
            fontWeight: 900,
            color: GOLD,
            letterSpacing: 12,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textShadow: "0 0 60px rgba(212,175,55,0.5)",
          }}
        >
          ELDORIA
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 36,
            fontWeight: 600,
            color: CREAM,
            letterSpacing: 8,
            marginTop: 24,
            opacity: subtitleOpacity,
          }}
        >
          LE JEU DE STRATÉGIE QUI VA DIVISER VOTRE FAMILLE
        </div>
      </AbsoluteFill>
    </FadeWrapper>
  );
};

const FeatureScene: React.FC<{
  durationInFrames: number;
  background: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ durationInFrames, background, title, subtitle, children }) => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: background,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 60,
            alignItems: "flex-end",
            marginBottom: 70,
          }}
        >
          {children}
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 72,
            fontWeight: 900,
            color: CREAM,
            opacity: textOpacity,
            textAlign: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 34,
            fontWeight: 500,
            color: GOLD,
            opacity: textOpacity,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      </AbsoluteFill>
    </FadeWrapper>
  );
};

const BoxScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxSpring = spring({ frame, fps, config: { damping: 14 } });
  const boxScale = interpolate(boxSpring, [0, 1], [0.6, 1]);
  const boxRotation = interpolate(boxSpring, [0, 1], [-8, -4]);

  const starsCount = Math.min(
    5,
    Math.floor(interpolate(frame, [40, 80], [0, 5], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })),
  );

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: NAVY,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: 360,
            height: 480,
            background: `linear-gradient(160deg, ${RED}, #7a2118)`,
            borderRadius: 16,
            border: `6px solid ${GOLD}`,
            transform: `scale(${boxScale}) rotate(${boxRotation}deg)`,
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 54,
              fontWeight: 900,
              color: GOLD,
              letterSpacing: 4,
            }}
          >
            ELDORIA
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 20,
              color: CREAM,
              marginTop: 12,
              letterSpacing: 2,
            }}
          >
            ÉDITION COLLECTOR
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 40 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: 56,
                color: i < starsCount ? GOLD : "#3a4654",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </FadeWrapper>
  );
};

const CtaScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = spring({ frame, fps, config: { damping: 200, mass: 0.3 } });
  const scale = interpolate(pulse, [0, 1], [0.85, 1]);

  return (
    <FadeWrapper durationInFrames={durationInFrames} fadeFrames={10}>
      <AbsoluteFill
        style={{
          backgroundColor: GOLD,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 90,
            fontWeight: 900,
            color: NAVY,
            letterSpacing: 4,
            transform: `scale(${scale})`,
            textAlign: "center",
          }}
        >
          EN VENTE MAINTENANT
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 34,
            fontWeight: 600,
            color: NAVY,
            marginTop: 20,
            letterSpacing: 2,
          }}
        >
          eldoria-lejeu.fr
        </div>
      </AbsoluteFill>
    </FadeWrapper>
  );
};

export const BoardGameAd: React.FC = () => {
  const logoDuration = 150;
  const feature1Duration = 270;
  const feature2Duration = 270;
  const boxDuration = 120;
  const ctaDuration = 90;

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <Sequence from={0} durationInFrames={logoDuration}>
        <LogoScene durationInFrames={logoDuration} />
      </Sequence>

      <Sequence from={logoDuration} durationInFrames={feature1Duration}>
        <FeatureScene
          durationInFrames={feature1Duration}
          background="#15263a"
          title="DE 2 À 6 JOUEURS"
          subtitle="Alliances, trahisons, et un seul royaume à la fin."
        >
          <Pawn color={GOLD} size={90} delay={5} />
          <Pawn color={RED} size={90} delay={15} />
          <Pawn color="#4f7942" size={90} delay={25} />
          <Pawn color="#3a6ea5" size={90} delay={35} />
        </FeatureScene>
      </Sequence>

      <Sequence
        from={logoDuration + feature1Duration}
        durationInFrames={feature2Duration}
      >
        <FeatureScene
          durationInFrames={feature2Duration}
          background="#1c1410"
          title="45 MINUTES DE PARTIE"
          subtitle="Le temps d'une pizza. Le temps de devenir légende."
        >
          <Dice value={6} size={120} color={NAVY} delay={5} />
          <Dice value={3} size={120} color={RED} delay={18} />
        </FeatureScene>
      </Sequence>

      <Sequence
        from={logoDuration + feature1Duration + feature2Duration}
        durationInFrames={boxDuration}
      >
        <BoxScene durationInFrames={boxDuration} />
      </Sequence>

      <Sequence
        from={logoDuration + feature1Duration + feature2Duration + boxDuration}
        durationInFrames={ctaDuration}
      >
        <CtaScene durationInFrames={ctaDuration} />
      </Sequence>
    </AbsoluteFill>
  );
};
