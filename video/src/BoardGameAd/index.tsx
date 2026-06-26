import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Emblem } from "./Emblem";
import { FadeWrapper } from "./FadeWrapper";

const NAVY = "#0b1622";
const GOLD = "#d4af37";
const CREAM = "#f4ead2";

const fontFamily = "Helvetica, Arial, sans-serif";

const HeroScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  const subtitleOpacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgScale = interpolate(frame, [0, durationInFrames], [1, 1.08]);

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: NAVY }}>
        <AbsoluteFill style={{ transform: `scale(${bgScale})` }}>
          <Img
            src={staticFile("assets/key-art.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,22,34,0.1) 0%, rgba(11,22,34,0.85) 100%)",
          }}
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 90,
            flexDirection: "column",
          }}
        >
          <Img
            src={staticFile("assets/logo.png")}
            style={{
              width: 760,
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          />
          <div
            style={{
              fontFamily,
              fontSize: 32,
              fontWeight: 600,
              color: CREAM,
              letterSpacing: 6,
              marginTop: 10,
              opacity: subtitleOpacity,
              textAlign: "center",
            }}
          >
            LE JEU DE STRATÉGIE QUI VA DIVISER VOTRE FAMILLE
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </FadeWrapper>
  );
};

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ textAlign: "center", opacity }}>
      <div style={{ fontFamily, fontSize: 64, fontWeight: 900, color: CREAM }}>
        {title}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 30,
          fontWeight: 500,
          color: GOLD,
          marginTop: 14,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

const FactionsScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => (
  <FadeWrapper durationInFrames={durationInFrames}>
    <AbsoluteFill
      style={{
        backgroundColor: "#15263a",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", gap: 50, marginBottom: 60 }}>
        <Emblem quadrant="top-left" size={140} delay={0} />
        <Emblem quadrant="top-right" size={140} delay={8} />
        <Emblem quadrant="bottom-left" size={140} delay={16} />
        <Emblem quadrant="bottom-right" size={140} delay={24} />
      </div>
      <SectionTitle
        title="DE 2 À 6 JOUEURS"
        subtitle="Choisissez votre faction. Alliances et trahisons commencent ici."
      />
    </AbsoluteFill>
  </FadeWrapper>
);

const StrategyScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 16, mass: 0.7 } });
  const rotateY = interpolate(cardSpring, [0, 1], [90, -6]);
  const scale = interpolate(cardSpring, [0, 1], [0.7, 1]);

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: "#1c1410",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: 60,
            transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
          }}
        >
          <Img
            src={staticFile("assets/card-event.png")}
            style={{
              height: 480,
              borderRadius: 18,
              boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
            }}
          />
        </div>
        <SectionTitle
          title="ALLIANCES & TRAHISONS"
          subtitle="Chaque carte peut faire basculer le royaume."
        />
      </AbsoluteFill>
    </FadeWrapper>
  );
};

const LifestyleScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [1.05, 1]);
  const textOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: NAVY }}>
        <AbsoluteFill style={{ transform: `scale(${scale})` }}>
          <Img
            src={staticFile("assets/lifestyle.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to top, rgba(11,22,34,0.92) 0%, rgba(11,22,34,0.1) 55%)",
          }}
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 80,
            opacity: textOpacity,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 58,
              fontWeight: 900,
              color: CREAM,
              textAlign: "center",
            }}
          >
            ENTRE AMIS, EN FAMILLE
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 30,
              fontWeight: 500,
              color: GOLD,
              marginTop: 14,
            }}
          >
            45 minutes pour devenir légende.
          </div>
        </AbsoluteFill>
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
    Math.floor(
      interpolate(frame, [40, 80], [0, 5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
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
        <Img
          src={staticFile("assets/box-cover.png")}
          style={{
            height: 600,
            transform: `scale(${boxScale}) rotate(${boxRotation}deg)`,
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 30 }}>
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
  const heroDuration = 150;
  const factionsDuration = 180;
  const strategyDuration = 180;
  const lifestyleDuration = 150;
  const boxDuration = 150;
  const ctaDuration = 90;

  let cursor = 0;
  const heroFrom = cursor;
  cursor += heroDuration;
  const factionsFrom = cursor;
  cursor += factionsDuration;
  const strategyFrom = cursor;
  cursor += strategyDuration;
  const lifestyleFrom = cursor;
  cursor += lifestyleDuration;
  const boxFrom = cursor;
  cursor += boxDuration;
  const ctaFrom = cursor;

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <Sequence from={heroFrom} durationInFrames={heroDuration}>
        <HeroScene durationInFrames={heroDuration} />
      </Sequence>

      <Sequence from={factionsFrom} durationInFrames={factionsDuration}>
        <FactionsScene durationInFrames={factionsDuration} />
      </Sequence>

      <Sequence from={strategyFrom} durationInFrames={strategyDuration}>
        <StrategyScene durationInFrames={strategyDuration} />
      </Sequence>

      <Sequence from={lifestyleFrom} durationInFrames={lifestyleDuration}>
        <LifestyleScene durationInFrames={lifestyleDuration} />
      </Sequence>

      <Sequence from={boxFrom} durationInFrames={boxDuration}>
        <BoxScene durationInFrames={boxDuration} />
      </Sequence>

      <Sequence from={ctaFrom} durationInFrames={ctaDuration}>
        <CtaScene durationInFrames={ctaDuration} />
      </Sequence>
    </AbsoluteFill>
  );
};
