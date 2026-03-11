import {
  Activity,
  ArrowDown,
  Brain,
  CheckCircle,
  Cpu,
  Eye,
  Fingerprint,
  Globe,
  Heart,
  Loader2,
  Lock,
  Menu,
  Send,
  Smartphone,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HeroScene } from "./components/HeroScene";
import { ProductMockup } from "./components/ProductMockup";
import { TechFlowDiagram } from "./components/TechFlowDiagram";
import { useInView } from "./hooks/useInView";
import { useSubmitForm } from "./hooks/useQueries";

// ─── Utility: animated progress bar ────────────────────────────────────────
function ProgressBar({
  label,
  value,
  color = "#d4960a",
  delay = 0,
}: {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) {
      const t = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, animated, delay]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "oklch(0.22 0.020 50)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${value}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Section wrapper with scroll animation ─────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  const cls =
    direction === "up"
      ? "fade-in-up"
      : direction === "left"
        ? "fade-in-left"
        : "fade-in-right";

  return (
    <div
      ref={ref}
      className={`${cls}${inView ? " visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Innovation", id: "innovation" },
    { label: "Technology", id: "technology" },
    { label: "Vision", id: "vision" },
    { label: "Status", id: "status" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: scrolled
          ? "oklch(0.08 0.010 50 / 0.92)"
          : "oklch(0.08 0.010 50 / 0.6)",
        borderBottom: scrolled
          ? "1px solid oklch(0.72 0.22 75 / 0.12)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          type="button"
        >
          <img
            src="/assets/uploads/1771415224864-1.png"
            alt="Zeiiyu Technologies"
            className="w-9 h-9 object-contain"
            style={{
              mixBlendMode: "screen",
              filter: "drop-shadow(0 0 8px oklch(0.72 0.22 75 / 0.5))",
            }}
          />
          <span
            className="font-display font-black text-lg tracking-[0.15em]"
            style={{
              color: "oklch(0.72 0.22 75)",
              textShadow: "0 0 16px oklch(0.72 0.22 75 / 0.5)",
            }}
          >
            ZEIIYU
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              type="button"
              data-ocid={`nav.link.${i + 1}`}
              className="text-sm font-medium transition-all duration-200 hover:text-cyan-brand"
              style={{ color: "oklch(0.72 0.012 50)" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          className="hidden lg:flex btn-primary-glow px-5 py-2 rounded-lg text-sm font-bold"
        >
          Get In Touch
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-ocid="nav.toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ color: "oklch(0.72 0.22 75)" }}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden py-4 px-6 space-y-1 border-t"
          style={{
            borderColor: "oklch(0.72 0.22 75 / 0.1)",
            background: "oklch(0.08 0.010 50 / 0.97)",
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              type="button"
              data-ocid={`nav.link.${i + 1}`}
              onClick={() => scrollTo(link.id)}
              className="w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all hover:bg-cyan-glow-sm"
              style={{ color: "oklch(0.80 0.012 50)" }}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="w-full btn-primary-glow py-3 rounded-lg text-sm font-bold"
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-atmosphere"
    >
      {/* Three.js canvas */}
      <div className="absolute inset-0 z-0">
       <img src="/assets/logo.png" alt="Zeiiyu Logo" style={{ width: 140, margin: "20px" }} />
        <HeroScene />
      </div>

      {/* Layered vignette — pulls focus left, lets canvas breathe right */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.065 0.014 50 / 0.92) 0%, oklch(0.065 0.014 50 / 0.7) 40%, oklch(0.065 0.014 50 / 0.15) 70%, transparent 100%)",
        }}
      />
      {/* Bottom fade for section transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.065 0.014 50))",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-36 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-9">
          {/* Kicker tag */}
          <div
            className="section-kicker inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{
              background: "oklch(0.72 0.22 75 / 0.07)",
              border: "1px solid oklch(0.72 0.22 75 / 0.22)",
              color: "oklch(0.72 0.22 75)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "oklch(0.72 0.22 75)",
                boxShadow: "0 0 6px oklch(0.72 0.22 75)",
                animation: "pulse-glow 1.8s ease-in-out infinite",
              }}
            />
            Deep Technology · Prototype Stage
          </div>

          {/* Headline — pushed to larger clamp, tighter tracking */}
          <h1
            className="section-heading-xl"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)" }}
          >
            <span className="block" style={{ color: "oklch(0.94 0.008 50)" }}>
              Technology That
            </span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(125deg, oklch(0.80 0.22 75) 0%, oklch(0.72 0.22 75) 40%, oklch(0.62 0.20 45) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px oklch(0.72 0.22 75 / 0.45))",
              }}
            >
              Understands
            </span>
            <span className="block" style={{ color: "oklch(0.94 0.008 50)" }}>
              Human Emotions
            </span>
          </h1>

          {/* Subheadline — slightly more luminous, wider leading */}
          <p
            className="text-base lg:text-[1.125rem] leading-[1.75] max-w-lg"
            style={{ color: "oklch(0.70 0.012 50)" }}
          >
            Zeiiyu Technologies is building the next generation of emotion-aware
            devices that enable safer, smarter human-device interaction.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-1">
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("innovation")}
              className="btn-primary-glow px-8 py-[14px] rounded-xl text-[0.9375rem] font-bold flex items-center gap-2.5 tracking-wide"
            >
              Explore Innovation
              <ArrowDown size={15} />
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("about")}
              className="btn-outline-glow px-8 py-[14px] rounded-xl text-[0.9375rem] tracking-wide"
            >
              Learn About Zeiiyu
            </button>
          </div>

          {/* Micro stats — with a vertical divider treatment */}
          <div
            className="flex gap-0 pt-3 border-t"
            style={{ borderColor: "oklch(0.72 0.22 75 / 0.1)" }}
          >
            {[
              { value: "7+", label: "Sensor Types" },
              { value: "AI", label: "Edge Processing" },
              { value: "R&D", label: "Active Stage" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex-1 pt-5 pr-6"
                style={{
                  borderRight:
                    i < 2 ? "1px solid oklch(0.72 0.22 75 / 0.1)" : "none",
                  paddingLeft: i > 0 ? "1.5rem" : 0,
                }}
              >
                <div
                  className="font-display font-black tracking-tight leading-none mb-1"
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    color: "oklch(0.72 0.22 75)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="section-kicker"
                  style={{ color: "oklch(0.52 0.012 50)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: product preview hint on desktop */}
        <div className="hidden lg:block" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div
          className="section-kicker"
          style={{ color: "oklch(0.45 0.012 50)" }}
        >
          Scroll to explore
        </div>
        <ArrowDown
          size={14}
          style={{
            color: "oklch(0.72 0.22 75 / 0.5)",
            animation: "float 2.5s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────
function AboutSection() {
  const focusAreas = [
    {
      icon: Activity,
      title: "Physiological Sensing",
      description:
        "Proprietary sensing technology that detects subtle physiological signals through natural human contact.",
    },
    {
      icon: Cpu,
      title: "Embedded Electronics",
      description:
        "Custom-engineered electronics architecture designed for discreet, everyday integration.",
    },
    {
      icon: Brain,
      title: "AI Signal Processing",
      description:
        "Proprietary AI models that process physiological signals locally and intelligently.",
    },
    {
      icon: Heart,
      title: "Emotional Awareness Technology",
      description:
        "Proprietary algorithms that translate raw biometric data into actionable emotional state classifications in real time.",
    },
  ];

  return (
    <>
      {/* Section divider — glow seam between hero and about */}
      <div className="section-divider" />
      <section
        id="about"
        className="py-24 lg:py-32 relative"
        style={{ background: "oklch(0.085 0.012 50)" }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 85% 45%, oklch(0.62 0.20 45 / 0.05) 0%, transparent 65%)",
          }}
        />

        {/* Rotating logo watermark */}
        <style>{`
          @keyframes logoRotate {
            from { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
            50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.05); }
            to { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
          }
        `}</style>
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            width: "500px",
            height: "500px",
            opacity: 0.07,
            mixBlendMode: "screen",
            zIndex: 0,
            animation: "logoRotate 20s linear infinite",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="/assets/uploads/1771415224864-1.png"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="max-w-7xl mx-auto px-6 lg:px-12"
          style={{ position: "relative", zIndex: 1 }}
        >
          <AnimatedSection className="text-center mb-16">
            <p
              className="section-kicker mb-5"
              style={{ color: "oklch(0.72 0.22 75)" }}
            >
              Who We Are
            </p>
            <h2
              className="section-heading text-foreground mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)" }}
            >
              About Zeiiyu Technologies
            </h2>
            <p
              className="text-[1.0625rem] max-w-2xl mx-auto leading-[1.8]"
              style={{ color: "oklch(0.64 0.012 50)" }}
            >
              We are a deep-technology startup pioneering the intersection of
              physiological sensing, embedded AI, and human emotional awareness.
              Our research-driven approach is building the foundation for a new
              paradigm of human-device intelligence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {focusAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <AnimatedSection key={area.title} delay={i * 100}>
                  <div className="card-glass rounded-2xl p-8 h-full group cursor-default transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: "oklch(0.72 0.22 75 / 0.1)",
                          border: "1px solid oklch(0.72 0.22 75 / 0.25)",
                        }}
                      >
                        <Icon
                          size={22}
                          style={{
                            color: "oklch(0.72 0.22 75)",
                            filter:
                              "drop-shadow(0 0 6px oklch(0.72 0.22 75 / 0.7))",
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground mb-2">
                          {area.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "oklch(0.62 0.012 50)" }}
                        >
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── INNOVATION ────────────────────────────────────────────────────────────
function InnovationSection() {
  const highlights = [
    {
      icon: Fingerprint,
      title: "Advanced Physiological Sensing",
      description:
        "Detects meaningful physiological indicators through natural contact with the case surface.",
    },
    {
      icon: Zap,
      title: "Real-Time Emotional Signal Detection",
      description:
        "Ultra-fast signal analysis is performed entirely on-device, ensuring complete privacy with no external data transmission.",
    },
    {
      icon: Lock,
      title: "Privacy-Focused AI Processing",
      description:
        "All processing occurs locally on the device — your personal data remains entirely private and secure at all times.",
    },
    {
      icon: Smartphone,
      title: "Seamless Smartphone Integration",
      description:
        "Engineered for seamless compatibility with existing smartphones through our proprietary wireless integration technology.",
    },
  ];

  return (
    <>
      <div className="section-divider" />
      <section
        id="innovation"
        className="py-24 lg:py-36 relative overflow-hidden"
        style={{ background: "oklch(0.075 0.010 50)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 18% 50%, oklch(0.72 0.22 75 / 0.05) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p
              className="section-kicker mb-5"
              style={{ color: "oklch(0.62 0.20 45)" }}
            >
              Flagship Innovation
            </p>
            <h2
              className="section-heading text-foreground mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)" }}
            >
              Zeiiyu Smartphone{" "}
              <span
                style={{
                  background:
                    "linear-gradient(125deg, oklch(0.80 0.22 75), oklch(0.62 0.20 45))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Smart Case
              </span>
            </h2>
            <p
              className="text-[1.0625rem] max-w-2xl mx-auto leading-[1.75]"
              style={{ color: "oklch(0.64 0.012 50)" }}
            >
              A sensor-integrated smartphone case that detects emotional
              distress through palm and finger contact, enabling intelligent
              safety responses.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: feature cards */}
            <div className="space-y-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection
                    key={item.title}
                    direction="left"
                    delay={i * 100}
                  >
                    <div className="card-glass rounded-xl p-5 flex items-start gap-4 group cursor-default">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: "oklch(0.72 0.22 75 / 0.08)",
                          border: "1px solid oklch(0.72 0.22 75 / 0.2)",
                        }}
                      >
                        <Icon
                          size={18}
                          style={{ color: "oklch(0.72 0.22 75)" }}
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "oklch(0.60 0.012 50)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                      <CheckCircle
                        size={16}
                        className="ml-auto flex-shrink-0"
                        style={{ color: "oklch(0.72 0.22 75 / 0.5)" }}
                      />
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Right: product mockup */}
            <AnimatedSection direction="right" delay={200}>
              <ProductMockup />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── TECHNOLOGY ────────────────────────────────────────────────────────────
function TechnologySection() {
  return (
    <>
      <div className="section-divider" />
      <section
        id="technology"
        className="py-24 lg:py-36 relative"
        style={{ background: "oklch(0.085 0.012 50)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 100%, oklch(0.72 0.22 75 / 0.04) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p
              className="section-kicker mb-5"
              style={{ color: "oklch(0.72 0.22 75)" }}
            >
              Architecture
            </p>
            <h2
              className="section-heading text-foreground mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)" }}
            >
              The Technology Platform
            </h2>
            <p
              className="text-[1.0625rem] max-w-2xl mx-auto leading-[1.75]"
              style={{ color: "oklch(0.64 0.012 50)" }}
            >
              A modular, four-layer intelligence stack designed for real-time
              emotional awareness at the edge.
            </p>
          </AnimatedSection>

          <TechFlowDiagram />
        </div>
      </section>
    </>
  );
}

// ─── VISION ────────────────────────────────────────────────────────────────
function VisionSection() {
  const visions = [
    {
      icon: Smartphone,
      title: "Emotion-Aware Smartphones",
      description:
        "Devices that dynamically adapt their behavior, interface, and responses to your emotional context.",
      color: "#d4960a",
    },
    {
      icon: Eye,
      title: "Intelligent Personal Safety Devices",
      description:
        "Wearables and accessories that detect distress in real time and activate personalized safety protocols.",
      color: "#f0b429",
    },
    {
      icon: Globe,
      title: "Human-Centered AI Interfaces",
      description:
        "AI systems architected around emotional and physiological feedback loops — not just commands.",
      color: "#b07d0e",
    },
  ];

  return (
    <>
      <div className="section-divider" />
      {/* Vision — intentionally large vertical breathing room, it's the emotional peak */}
      <section
        id="vision"
        className="py-32 lg:py-52 relative overflow-hidden vision-atmosphere"
      >
        {/* No extra div overlay — atmosphere is baked into section background */}

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p
              className="section-kicker mb-6"
              style={{ color: "oklch(0.62 0.20 45)" }}
            >
              Long-Term Vision
            </p>
            {/* XL heading treatment — this is the emotional moment */}
            <h2
              className="section-heading-xl text-foreground mb-10"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              Our Vision
            </h2>
            {/* Separator bar */}
            <div
              className="w-16 h-px mx-auto mb-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.62 0.20 45 / 0.7), transparent)",
              }}
            />
            <p
              className="max-w-3xl mx-auto leading-[1.85] font-medium"
              style={{
                fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
                color: "oklch(0.74 0.012 50)",
              }}
            >
              We are building an ecosystem where technology genuinely
              understands human emotional states — enabling a new paradigm of
              safety, intelligence, and connection.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visions.map((v, i) => {
              const Icon = v.icon;
              return (
                <AnimatedSection key={v.title} delay={i * 130}>
                  <div
                    className="rounded-2xl p-9 h-full group cursor-default transition-all duration-350 hover:-translate-y-2"
                    style={{
                      background: "oklch(0.095 0.014 50 / 0.75)",
                      backdropFilter: "blur(24px)",
                      border: `1px solid ${v.color}15`,
                      transition:
                        "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = `${v.color}45`;
                      el.style.boxShadow = `0 0 40px ${v.color}12, 0 16px 40px oklch(0 0 0 / 0.3)`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = `${v.color}15`;
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-7"
                      style={{
                        background: `${v.color}10`,
                        border: `1px solid ${v.color}25`,
                      }}
                    >
                      <Icon
                        size={22}
                        style={{
                          color: v.color,
                          filter: `drop-shadow(0 0 8px ${v.color}60)`,
                        }}
                      />
                    </div>
                    <h3
                      className="font-display font-bold text-foreground mb-3"
                      style={{ fontSize: "1.125rem", lineHeight: 1.3 }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-sm leading-[1.75]"
                      style={{ color: "oklch(0.60 0.012 50)" }}
                    >
                      {v.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── STATUS ────────────────────────────────────────────────────────────────
function StatusSection() {
  const progress = [
    { label: "Hardware Prototyping", value: 65, delay: 0 },
    { label: "Sensor Calibration", value: 45, delay: 200 },
    { label: "AI Signal Modeling", value: 55, delay: 400 },
    { label: "System Architecture Development", value: 75, delay: 600 },
  ];

  return (
    <>
      <div className="section-divider" />
      <section
        id="status"
        className="py-24 lg:py-36 relative"
        style={{ background: "oklch(0.085 0.012 50)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p
              className="section-kicker mb-5"
              style={{ color: "oklch(0.72 0.22 75)" }}
            >
              Development Transparency
            </p>
            <h2
              className="section-heading text-foreground mb-8"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)" }}
            >
              Innovation Status
            </h2>

            {/* Stage badge — refined amber glow, sharper */}
            <div
              className="section-kicker inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
              style={{
                border: "1px solid oklch(0.62 0.20 45 / 0.55)",
                color: "oklch(0.62 0.20 45)",
                boxShadow:
                  "0 0 16px oklch(0.62 0.20 45 / 0.2), 0 0 36px oklch(0.62 0.20 45 / 0.08)",
                background: "oklch(0.62 0.20 45 / 0.05)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "oklch(0.62 0.20 45)",
                  boxShadow: "0 0 6px oklch(0.62 0.20 45)",
                  animation: "pulse-glow 1.5s ease-in-out infinite",
                }}
              />
              Prototype Development Stage
            </div>

            <p
              className="text-[1.0625rem] max-w-xl mx-auto leading-[1.75]"
              style={{ color: "oklch(0.64 0.012 50)" }}
            >
              Zeiiyu Smartphone Smart Case is currently in active prototype
              development across hardware, sensing, and AI layers.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="card-glass rounded-2xl p-8 space-y-8">
                {progress.map((item) => (
                  <ProgressBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    delay={item.delay}
                  />
                ))}
              </div>
            </AnimatedSection>

            {/* Timeline */}
            <AnimatedSection className="mt-12" delay={400}>
              <div className="relative">
                <div
                  className="absolute left-4 top-0 bottom-0 w-px"
                  style={{ background: "oklch(0.72 0.22 75 / 0.2)" }}
                />
                <div className="space-y-6">
                  {[
                    {
                      phase: "Phase 1",
                      label: "Hardware Design & Fabrication",
                      status: "active",
                    },
                    {
                      phase: "Phase 2",
                      label: "Sensor Integration & Firmware",
                      status: "active",
                    },
                    {
                      phase: "Phase 3",
                      label: "AI Model Training & Validation",
                      status: "upcoming",
                    },
                    {
                      phase: "Phase 4",
                      label: "Alpha Testing & Partnerships",
                      status: "upcoming",
                    },
                  ].map((item, phaseIdx) => (
                    <div
                      key={item.phase}
                      className="flex items-center gap-6 pl-10 relative"
                    >
                      <div
                        className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background:
                            item.status === "active"
                              ? "oklch(0.72 0.22 75 / 0.15)"
                              : "oklch(0.22 0.020 50)",
                          border:
                            item.status === "active"
                              ? "2px solid oklch(0.72 0.22 75 / 0.8)"
                              : "1px solid oklch(0.35 0.022 50)",
                          color:
                            item.status === "active"
                              ? "oklch(0.72 0.22 75)"
                              : "oklch(0.45 0.015 50)",
                          boxShadow:
                            item.status === "active"
                              ? "0 0 12px oklch(0.72 0.22 75 / 0.4)"
                              : "none",
                        }}
                      >
                        {phaseIdx + 1}
                      </div>
                      <div>
                        <span
                          className="text-xs font-bold uppercase tracking-wider block"
                          style={{
                            color:
                              item.status === "active"
                                ? "oklch(0.72 0.22 75)"
                                : "oklch(0.45 0.015 50)",
                          }}
                        >
                          {item.phase}
                          {item.status === "active" && " · Active"}
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{
                            color:
                              item.status === "active"
                                ? "oklch(0.85 0.012 50)"
                                : "oklch(0.50 0.012 50)",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PARTNERSHIP ───────────────────────────────────────────────────────────
function PartnershipSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div className="section-divider" />
      <section
        id="partnership"
        className="py-24 lg:py-36 relative"
        style={{ background: "oklch(0.075 0.010 50)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 75% at 50% 50%, oklch(0.62 0.20 45 / 0.06) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <AnimatedSection>
            <p
              className="section-kicker mb-5"
              style={{ color: "oklch(0.62 0.20 45)" }}
            >
              Collaboration
            </p>
            <h2
              className="section-heading text-foreground mb-10"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)" }}
            >
              Partner With Zeiiyu
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            {/* Signature glow card — the focal CTA has the richest glow on the page */}
            <div className="card-signature rounded-3xl p-10 lg:p-14">
              <p
                className="leading-[1.85] mb-10"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                  color: "oklch(0.72 0.012 50)",
                }}
              >
                We are actively seeking research partnerships, strategic
                collaborations, and investors who share our vision for
                emotion-aware technology that genuinely improves human safety
                and well-being.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { label: "Research Partners", color: "#d4960a" },
                  { label: "Strategic Collaborators", color: "#f0b429" },
                  { label: "Deep Tech Investors", color: "#b07d0e" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="section-kicker px-5 py-2 rounded-full"
                    style={{
                      background: `${tag.color}10`,
                      border: `1px solid ${tag.color}35`,
                      color: tag.color,
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <button
                type="button"
                data-ocid="partnership.primary_button"
                onClick={() => scrollTo("contact")}
                className="btn-primary-glow px-10 py-[14px] rounded-xl text-[0.9375rem] font-bold inline-flex items-center gap-2.5 tracking-wide"
              >
                <Users size={17} />
                Get In Touch
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────
function ContactSection() {
  const {
    mutate: submitForm,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useSubmitForm();
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm({
      name: form.name,
      email: form.email,
      organization: form.organization || null,
      message: form.message,
    });
  };

  const handleReset = () => {
    reset();
    setForm({ name: "", email: "", organization: "", message: "" });
  };

  return (
    <>
      <div className="section-divider" />
      <section
        id="contact"
        className="py-24 lg:py-36 relative"
        style={{ background: "oklch(0.085 0.012 50)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.72 0.22 75 / 0.04) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-2xl mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <p
              className="section-kicker mb-5"
              style={{ color: "oklch(0.72 0.22 75)" }}
            >
              Let's Talk
            </p>
            <h2
              className="section-heading text-foreground mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)" }}
            >
              Connect With Us
            </h2>
            <p
              className="text-[1.0625rem] leading-[1.75] mb-4"
              style={{ color: "oklch(0.64 0.012 50)" }}
            >
              Whether you're a researcher, investor, or fellow innovator — we'd
              love to hear from you.
            </p>
            <a
              href="mailto:info@zeiiyu.com"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: "oklch(0.72 0.22 75)" }}
            >
              <Send size={14} />
              info@zeiiyu.com
            </a>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div
              className="rounded-2xl p-8 lg:p-10"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid oklch(0.72 0.22 75 / 0.15)",
                boxShadow: "0 0 40px oklch(0.72 0.22 75 / 0.06)",
              }}
            >
              {isSuccess ? (
                <div
                  data-ocid="contact.success_state"
                  className="text-center py-12 space-y-4"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{
                      background: "oklch(0.72 0.22 75 / 0.12)",
                      border: "2px solid oklch(0.72 0.22 75 / 0.6)",
                    }}
                  >
                    <CheckCircle
                      size={28}
                      style={{ color: "oklch(0.72 0.22 75)" }}
                    />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    Message Sent!
                  </h3>
                  <p style={{ color: "oklch(0.65 0.012 50)" }}>
                    Thank you for reaching out. We'll be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-outline-glow px-6 py-3 rounded-xl text-sm font-semibold mt-4"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "oklch(0.65 0.012 50)" }}
                      >
                        Name{" "}
                        <span style={{ color: "oklch(0.72 0.22 75)" }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        data-ocid="contact.input"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder:text-muted-foreground"
                        style={{
                          background: "oklch(0.12 0.014 50)",
                          border: "1px solid oklch(0.72 0.22 75 / 0.2)",
                          color: "oklch(0.92 0.008 50)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor =
                            "oklch(0.72 0.22 75 / 0.6)";
                          e.target.style.boxShadow =
                            "0 0 12px oklch(0.72 0.22 75 / 0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "oklch(0.72 0.22 75 / 0.2)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "oklch(0.65 0.012 50)" }}
                      >
                        Email{" "}
                        <span style={{ color: "oklch(0.72 0.22 75)" }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        data-ocid="contact.input"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder:text-muted-foreground"
                        style={{
                          background: "oklch(0.12 0.014 50)",
                          border: "1px solid oklch(0.72 0.22 75 / 0.2)",
                          color: "oklch(0.92 0.008 50)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor =
                            "oklch(0.72 0.22 75 / 0.6)";
                          e.target.style.boxShadow =
                            "0 0 12px oklch(0.72 0.22 75 / 0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "oklch(0.72 0.22 75 / 0.2)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "oklch(0.65 0.012 50)" }}
                    >
                      Organization{" "}
                      <span style={{ color: "oklch(0.45 0.012 50)" }}>
                        (optional)
                      </span>
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      data-ocid="contact.input"
                      value={form.organization}
                      onChange={(e) =>
                        setForm({ ...form, organization: e.target.value })
                      }
                      placeholder="Your company or institution"
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder:text-muted-foreground"
                      style={{
                        background: "oklch(0.12 0.014 50)",
                        border: "1px solid oklch(0.72 0.22 75 / 0.2)",
                        color: "oklch(0.92 0.008 50)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor =
                          "oklch(0.72 0.22 75 / 0.6)";
                        e.target.style.boxShadow =
                          "0 0 12px oklch(0.72 0.22 75 / 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor =
                          "oklch(0.72 0.22 75 / 0.2)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "oklch(0.65 0.012 50)" }}
                    >
                      Message{" "}
                      <span style={{ color: "oklch(0.72 0.22 75)" }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      data-ocid="contact.textarea"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us about your interest, research area, or collaboration idea..."
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder:text-muted-foreground resize-none"
                      style={{
                        background: "oklch(0.12 0.014 50)",
                        border: "1px solid oklch(0.72 0.22 75 / 0.2)",
                        color: "oklch(0.92 0.008 50)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor =
                          "oklch(0.72 0.22 75 / 0.6)";
                        e.target.style.boxShadow =
                          "0 0 12px oklch(0.72 0.22 75 / 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor =
                          "oklch(0.72 0.22 75 / 0.2)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {isError && (
                    <div
                      data-ocid="contact.error_state"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                      style={{
                        background: "oklch(0.62 0.22 25 / 0.1)",
                        border: "1px solid oklch(0.62 0.22 25 / 0.4)",
                        color: "oklch(0.80 0.15 25)",
                      }}
                    >
                      Something went wrong. Please try again.
                    </div>
                  )}

                  {isPending && (
                    <div
                      data-ocid="contact.loading_state"
                      className="flex items-center justify-center gap-2 py-2 text-sm"
                      style={{ color: "oklch(0.65 0.012 50)" }}
                    >
                      <Loader2 size={16} className="animate-spin" />
                      Sending your message...
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    data-ocid="contact.submit_button"
                    className="w-full btn-primary-glow py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {isPending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const footerLinks = [
    { label: "About", id: "about" },
    { label: "Innovation", id: "innovation" },
    { label: "Technology", id: "technology" },
    { label: "Vision", id: "vision" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer
      className="relative pt-12 pb-8"
      style={{
        background: "oklch(0.07 0.012 50)",
        borderTop: "1px solid oklch(0.72 0.22 75 / 0.12)",
        boxShadow: "0 -1px 0 0 oklch(0.72 0.22 75 / 0.05)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.22 75 / 0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/1771415224864-1.png"
                alt="Zeiiyu Technologies"
                className="w-9 h-9 object-contain"
                style={{
                  mixBlendMode: "screen",
                  filter: "drop-shadow(0 0 6px oklch(0.72 0.22 75 / 0.4))",
                }}
              />
              <span
                className="font-display font-black text-lg tracking-[0.15em]"
                style={{ color: "oklch(0.72 0.22 75)" }}
              >
                ZEIIYU
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.52 0.012 50)" }}
            >
              Building the next generation of emotion-aware technology.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="section-kicker mb-4"
              style={{ color: "oklch(0.40 0.012 50)" }}
            >
              Navigation
            </h4>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="block text-sm transition-colors hover:text-cyan-brand"
                  style={{ color: "oklch(0.55 0.012 50)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Company info */}
          <div>
            <h4
              className="section-kicker mb-4"
              style={{ color: "oklch(0.40 0.012 50)" }}
            >
              Company
            </h4>
            <p
              className="text-sm mb-2"
              style={{ color: "oklch(0.55 0.012 50)" }}
            >
              Zeiiyu Technologies Private Limited
            </p>
            <a
              href="mailto:info@zeiiyu.com"
              className="block text-sm mb-3 transition-colors hover:text-cyan-brand"
              style={{ color: "oklch(0.60 0.012 50)" }}
            >
              info@zeiiyu.com
            </a>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
              style={{
                background: "oklch(0.62 0.20 45 / 0.08)",
                border: "1px solid oklch(0.62 0.20 45 / 0.3)",
                color: "oklch(0.62 0.20 45)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-brand" />
              Active R&D
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid oklch(0.22 0.020 50)",
            color: "oklch(0.42 0.012 50)",
          }}
        >
          <span>
            © {new Date().getFullYear()} Zeiiyu Technologies Private Limited.
            All rights reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cyan-brand"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT APP ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "oklch(0.08 0.010 50)" }}
    >
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <InnovationSection />
        <TechnologySection />
        <VisionSection />
        <StatusSection />
        <PartnershipSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
