import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

const ParticleBackground = () => {
  const { theme } = useTheme();
  
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const isDark = theme === "dark" || !theme;
  const particleColor = isDark ? "#3b82f6" : "#2563eb"; 
  const linkColor = isDark ? "#1e40af" : "#93c5fd"; 

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10 pointer-events-none"
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.5 } },
          },
        },
        particles: {
          color: { value: particleColor },
          links: { color: linkColor, distance: 150, enable: true, opacity: 0.2, width: 1 },
          collisions: { enable: false },
          move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 0.6, straight: false },
          number: { density: { enable: true, area: 800 }, value: 40 },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
