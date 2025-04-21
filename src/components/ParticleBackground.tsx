import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground = ({ className = "" }: ParticleBackgroundProps) => {
  const [isParticlesAvailable, setIsParticlesAvailable] = useState(true);

  useEffect(() => {
    // Check if browser can handle particles
    try {
      const canvas = document.createElement('canvas');
      const isWebGLSupported = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      
      if (!isWebGLSupported) {
        setIsParticlesAvailable(false);
      }
    } catch (e) {
      console.warn('WebGL not supported, disabling particles', e);
      setIsParticlesAvailable(false);
    }
  }, []);

  const particlesInit = async (engine: Engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error('Failed to initialize particles:', error);
      setIsParticlesAvailable(false);
    }
  };

  if (!isParticlesAvailable) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        {/* Fallback static gradient background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full filter blur-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#64ffda",
            },
            links: {
              color: "#64ffda",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 30,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground; 