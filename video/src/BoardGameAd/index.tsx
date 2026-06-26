import React from "react";
import {
  AbsoluteFill,
  Audio,
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
import { Vignette } from "./Vignette";
import { Grain } from "./Grain";
import { GoldDust } from "./GoldDust";
import { Glow } from "./Glow";
import { RevealWords } from "./RevealText";
import { LightRays } from "./LightRays";
import { CutFlash } from "./CutFlash";

const NAVY = "#0b1622";
const GOLD = "#d4af37";
const CREAM = "#f4ead2";

const fontFamily = "Georgia, 'Times New Roman', serif";

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

  const bgScale = interpolate(frame, [0, durationInFrames], [1.12, 1.22]);
  const bgPanX = interpolate(frame, [0, durationInFrames], [0, -30]);

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: NAVY }}>
        <AbsoluteFill
          style={{ transform: `scale(${bgScale}) translateX(${bgPanX}px)` }}
        >
          <Img
            src={staticFile("assets/key-art.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,22,34,0.15) 0%, rgba(11,22,34,0.9) 100%)",
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
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 140,
            }}
          >
            <Glow size={500} color="rgba(212,175,55,0.5)" />
          </AbsoluteFill>
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
              letterSpacing: 5,
              marginTop: 14,
              opacity: subtitleOpacity,
              textAlign: "center",
              maxWidth: 1000,
              fontStyle: "italic",
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
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
  const subtitleOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ textAlign: "center" }}>
      <RevealWords
        text={title}
        staggerFrames={5}
        style={{
          fontFamily,
          fontSize: 76,
          fontWeight: 700,
          color: CREAM,
          letterSpacing: 2,
        }}
      />
      <div
        style={{
          fontFamily,
          fontSize: 30,
          fontWeight: 600,
          fontStyle: "italic",
          color: GOLD,
          marginTop: 18,
          letterSpacing: 0.5,
          opacity: subtitleOpacity,
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

const FactionsScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [1, 1.06]);
  const punch = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const punchScale = interpolate(punch, [0, 1], [1.18, 1]);

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: "#15263a",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          transform: `scale(${drift * punchScale})`,
        }}
      >
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(212,175,55,0.12) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
        <CutFlash />
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
};

const StrategyScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 16, mass: 0.7 } });
  const rotateY = interpolate(cardSpring, [0, 1], [90, -6]);
  const scale = interpolate(cardSpring, [0, 1], [0.7, 1]);
  const idleRotate = Math.sin(frame / 25) * 2;
  const drift = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const punch = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const punchScale = interpolate(punch, [0, 1], [1.18, 1]);

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: "#1c1410",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          transform: `scale(${drift * punchScale})`,
        }}
      >
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Glow size={700} color="rgba(178,57,40,0.35)" />
        </AbsoluteFill>
        <CutFlash />
        <div
          style={{
            marginBottom: 60,
            transform: `perspective(1000px) rotateY(${rotateY + idleRotate}deg) scale(${scale})`,
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
  const { fps } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.1, 1.0]);
  const punch = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const punchScale = interpolate(punch, [0, 1], [1.15, 1]);

  return (
    <FadeWrapper durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: NAVY }}>
        <AbsoluteFill style={{ transform: `scale(${scale * punchScale})` }}>
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
        <CutFlash />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 80,
          }}
        >
          <RevealWords
            text="ENTRE AMIS, EN FAMILLE"
            staggerFrames={4}
            style={{
              fontFamily,
              fontSize: 64,
              fontWeight: 700,
              color: CREAM,
              letterSpacing: 1,
            }}
          />
          <div
            style={{
              fontFamily,
              fontSize: 30,
              fontWeight: 600,
              fontStyle: "italic",
              color: GOLD,
              marginTop: 18,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              opacity: interpolate(frame, [30, 55], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
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
  const idleFloat = Math.sin(frame / 20) * 6;

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
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Glow size={650} color="rgba(212,175,55,0.4)" />
        </AbsoluteFill>
        <CutFlash />
        <Img
          src={staticFile("assets/box-cover.png")}
          style={{
            height: 600,
            transform: `translateY(${idleFloat}px) scale(${boxScale}) rotate(${boxRotation}deg)`,
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 30 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const lit = i < starsCount;
            const pop = spring({
              frame: frame - (40 + i * 8),
              fps,
              config: { damping: 10, mass: 0.4 },
            });
            const starScale = lit ? interpolate(pop, [0, 1], [0.3, 1]) : 1;
            return (
              <span
                key={i}
                style={{
                  fontSize: 56,
                  color: lit ? GOLD : "#3a4654",
                  display: "inline-block",
                  transform: `scale(${starScale})`,
                  textShadow: lit ? "0 0 16px rgba(212,175,55,0.8)" : "none",
                }}
              >
                ★
              </span>
            );
          })}
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
  const idlePulse = 1 + Math.sin(frame / 14) * 0.02;
  const scale = interpolate(pulse, [0, 1], [0.85, 1]) * idlePulse;

  return (
    <FadeWrapper durationInFrames={durationInFrames} fadeFrames={10}>
      <AbsoluteFill
        style={{
          backgroundColor: GOLD,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <LightRays color="rgba(11,22,34,0.5)" />
        </AbsoluteFill>
        <CutFlash />
        <div
          style={{
            fontFamily,
            fontSize: 94,
            fontWeight: 700,
            color: NAVY,
            letterSpacing: 3,
            transform: `scale(${scale})`,
            textAlign: "center",
            textShadow: "0 6px 20px rgba(0,0,0,0.25)",
          }}
        >
          EN VENTE MAINTENANT
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 32,
            fontWeight: 400,
            fontStyle: "italic",
            color: NAVY,
            marginTop: 20,
            letterSpacing: 1,
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
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
      <Audio src={staticFile("assets/audio.wav")} />

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

      <GoldDust />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
