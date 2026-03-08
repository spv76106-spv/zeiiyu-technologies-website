import { useEffect, useRef } from "react";

const sensorNodes = [
  { top: "18%", left: "68%", color: "#d4960a", id: "node-1" },
  { top: "32%", left: "22%", color: "#f0b429", id: "node-2" },
  { top: "48%", left: "72%", color: "#d4960a", id: "node-3" },
  { top: "62%", left: "28%", color: "#b07d0e", id: "node-4" },
  { top: "75%", left: "65%", color: "#f0b429", id: "node-5" },
  { top: "42%", left: "45%", color: "#d4960a", id: "node-6" },
];

const gridLines = [0, 1, 2, 3, 4];

export function ProductMockup() {
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const rafIds: number[] = [];

    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      const duration = 1500 + i * 300;
      const start = Date.now();
      const capturedNode = node;

      const tick = () => {
        const elapsed = (Date.now() - start) % duration;
        const progress = elapsed / duration;
        const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.3;
        const opacity = 0.6 + Math.sin(progress * Math.PI * 2) * 0.4;
        capturedNode.style.transform = `translate(-50%, -50%) scale(${scale})`;
        capturedNode.style.opacity = String(opacity);
        const rafId = requestAnimationFrame(tick);
        rafIds.push(rafId);
      };

      const rafId = requestAnimationFrame(tick);
      rafIds.push(rafId);
    });

    return () => {
      for (const id of rafIds) {
        cancelAnimationFrame(id);
      }
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ minHeight: 380 }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.22 75 / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Phone case 3D CSS */}
      <div
        style={{
          perspective: "900px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative"
          style={{
            width: 180,
            height: 360,
            transformStyle: "preserve-3d",
            transform: "rotateY(-18deg) rotateX(6deg)",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          {/* Main face */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.14 0.020 50), oklch(0.09 0.014 50))",
              border: "1.5px solid oklch(0.72 0.22 75 / 0.3)",
              boxShadow:
                "0 0 30px oklch(0.72 0.22 75 / 0.15), 0 0 60px oklch(0.72 0.22 75 / 0.08), inset 0 1px 0 oklch(0.72 0.22 75 / 0.2)",
            }}
          >
            {/* Scan line animation */}
            <div
              className="absolute inset-x-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.72 0.22 75 / 0.6), transparent)",
                animation: "scan-line 3s linear infinite",
                top: 0,
              }}
            />

            {/* Sensor grid */}
            <div className="absolute inset-0 opacity-20">
              {gridLines.map((i) => (
                <div
                  key={i}
                  className="absolute left-4 right-4 h-px"
                  style={{
                    top: `${20 + i * 15}%`,
                    background: "oklch(0.72 0.22 75 / 0.4)",
                  }}
                />
              ))}
            </div>

            {/* Logo text */}
            <div className="absolute inset-x-0 bottom-8 flex justify-center">
              <span
                className="text-xs font-display font-bold tracking-widest"
                style={{ color: "oklch(0.72 0.22 75 / 0.5)" }}
              >
                ZEIIYU
              </span>
            </div>

            {/* Camera bump */}
            <div
              className="absolute rounded-full"
              style={{
                top: 16,
                right: 20,
                width: 20,
                height: 20,
                background: "oklch(0.08 0.012 50)",
                border: "1px solid oklch(0.72 0.22 75 / 0.2)",
                boxShadow: "0 0 8px oklch(0.72 0.22 75 / 0.3)",
              }}
            />
          </div>

          {/* Right face depth */}
          <div
            className="absolute top-0 right-0 bottom-0 rounded-r-3xl"
            style={{
              width: 16,
              background:
                "linear-gradient(to right, oklch(0.12 0.016 50), oklch(0.08 0.012 50))",
              transform: "translateX(8px) rotateY(90deg)",
              transformOrigin: "left",
              border: "1px solid oklch(0.72 0.22 75 / 0.15)",
            }}
          />

          {/* Sensor nodes */}
          {sensorNodes.map((node, i) => (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="absolute rounded-full"
              style={{
                top: node.top,
                left: node.left,
                width: 10,
                height: 10,
                background: node.color,
                boxShadow: `0 0 10px ${node.color}, 0 0 20px ${node.color}80`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating labels */}
      <div
        className="absolute left-0 top-1/4 text-xs font-medium"
        style={{ color: "oklch(0.72 0.22 75 / 0.7)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-px"
            style={{ background: "oklch(0.72 0.22 75 / 0.4)" }}
          />
          Sensor Array
        </div>
      </div>
      <div
        className="absolute right-0 bottom-1/3 text-xs font-medium text-right"
        style={{ color: "oklch(0.62 0.20 45 / 0.7)" }}
      >
        <div className="flex items-center gap-2 justify-end">
          Edge AI Core
          <div
            className="w-6 h-px"
            style={{ background: "oklch(0.62 0.20 45 / 0.4)" }}
          />
        </div>
      </div>
    </div>
  );
}
