import { Brain, Cpu, Fingerprint, Shield } from "lucide-react";
import { useInView } from "../hooks/useInView";

const pillars = [
  {
    number: "01",
    icon: Fingerprint,
    title: "Human Signal Sensing",
    description:
      "Biometric and physiological data captured through integrated sensors at the palm and finger contact surface.",
    color: "#d4960a",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Signal Processing",
    description:
      "Edge AI processes raw bioelectric signals in real-time with sub-100ms latency — no cloud dependency.",
    color: "#b07d0e",
  },
  {
    number: "03",
    icon: Brain,
    title: "Emotion Recognition Intelligence",
    description:
      "Proprietary neural models classify emotional states and distress signals with high accuracy.",
    color: "#f0b429",
  },
  {
    number: "04",
    icon: Shield,
    title: "Adaptive Safety Response",
    description:
      "Context-aware protocols activate personalized safety responses automatically when distress is detected.",
    color: "#d4960a",
  },
];

const connectionXPositions = [240, 460, 680] as const;

function AnimatedFlowLine({ visible }: { visible: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 pointer-events-none hidden lg:block"
      viewBox="0 0 900 32"
      preserveAspectRatio="none"
    >
      <title>Data flow pipeline</title>
      {/* Base line */}
      <path
        d="M 80 16 L 820 16"
        stroke="oklch(0.72 0.22 75 / 0.15)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Animated flow */}
      {visible && (
        <path
          d="M 80 16 L 820 16"
          stroke="oklch(0.72 0.22 75)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="40 860"
          style={{
            animation: "flow-dash 2.5s linear infinite",
            filter: "drop-shadow(0 0 4px oklch(0.72 0.22 75))",
          }}
        />
      )}
      {/* Connection dots */}
      {connectionXPositions.map((x) => (
        <circle
          key={x}
          cx={x}
          cy={16}
          r={4}
          fill="none"
          stroke="oklch(0.72 0.22 75 / 0.3)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

export function TechFlowDiagram() {
  const [containerRef, inView] = useInView<HTMLDivElement>(0.1);

  return (
    <div ref={containerRef} className="relative">
      <AnimatedFlowLine visible={inView} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.number}
              className={`card-glass rounded-xl p-6 flex flex-col gap-4 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Number badge */}
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold font-display"
                style={{
                  background: `${pillar.color}18`,
                  border: `1px solid ${pillar.color}40`,
                  color: pillar.color,
                  boxShadow: `0 0 12px ${pillar.color}30`,
                }}
              >
                {pillar.number}
              </div>

              {/* Icon */}
              <Icon
                size={28}
                style={{
                  color: pillar.color,
                  filter: `drop-shadow(0 0 8px ${pillar.color}60)`,
                }}
              />

              <div>
                <h3 className="font-display font-bold text-base text-foreground mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom indicator line */}
              <div
                className="h-px w-full mt-auto"
                style={{
                  background: `linear-gradient(90deg, ${pillar.color}60, transparent)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
