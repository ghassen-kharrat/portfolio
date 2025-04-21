import { useEffect, useRef, useState } from 'react';

// Fallback implementation of Canvas3DBackground if the real one fails to load
const FallbackBackground = (container) => {
  return {
    stop: () => {}
  };
};

const EnhancedBackground = () => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    // Safety check: only initialize if browser supports canvas
    const canvasTest = document.createElement('canvas');
    const isCanvasSupported = !!(canvasTest.getContext && canvasTest.getContext('2d'));

    if (!isCanvasSupported || !containerRef.current) {
      console.warn('Canvas not supported or container not ready');
      return;
    }

    try {
      // Initialize the 3D background - wrapped in a try-catch to handle Canvas3DBackground not being defined
      try {
        const Canvas3DBackground = require('./Canvas3DBackground').default;
        backgroundRef.current = new Canvas3DBackground(containerRef.current);
      } catch (e) {
        console.warn('Failed to load 3D background, using fallback', e);
        backgroundRef.current = FallbackBackground(containerRef.current);
      }
      
      // Try multiple audio paths in sequence
      const audioURLs = [
        '/audio/ambient.mp3',
        '/ambient.mp3',
        window.location.origin + '/audio/ambient.mp3',
        window.location.origin + '/ambient.mp3'
      ];

      // Function to try each audio URL until one works
      const tryLoadingAudio = (audio, urlIndex = 0) => {
        if (urlIndex >= audioURLs.length) {
          console.error('All audio URLs failed to load');
          return;
        }
        
        audio.src = audioURLs[urlIndex];
        
        audio.onerror = () => {
          console.log(`Failed to load audio from ${audioURLs[urlIndex]}, trying next URL...`);
          tryLoadingAudio(audio, urlIndex + 1);
        };
      };

      // Preload audio with proper error handling
      const setupAudio = () => {
        audioRef.current = new Audio();
        
        // Add event listeners before setting source to catch loading errors
        audioRef.current.addEventListener('canplaythrough', () => {
          setAudioLoaded(true);
          console.log('Audio loaded successfully');
        });
        
        audioRef.current.addEventListener('error', (e) => {
          console.warn('Audio failed to load:', e);
        });
        
        // Set audio properties
        audioRef.current.volume = 0.2;
        audioRef.current.loop = true;
        audioRef.current.preload = 'auto';
        
        // Try loading from multiple paths
        tryLoadingAudio(audioRef.current);
      };
      
      setupAudio();
      
      // Only play audio on user interaction to comply with browser policies
      const handleUserInteraction = () => {
        if (audioRef.current && audioLoaded) {
          audioRef.current.play()
            .catch(err => {
              console.warn('Audio playback failed', err);
              // Try with a fallback approach
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.play().catch(e => console.warn('Retry failed:', e));
                }
              }, 1000);
            });
        }
        // Still remove the listener even if audio fails
        document.removeEventListener('click', handleUserInteraction);
      };
      
      document.addEventListener('click', handleUserInteraction);
      
      return () => {
        // Clean up resources
        if (backgroundRef.current) {
          backgroundRef.current.stop();
        }
        
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
        
        document.removeEventListener('click', handleUserInteraction);
      };
    } catch (error) {
      console.error('Failed to initialize 3D background:', error);
      return () => {};
    }
  }, [audioLoaded]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};

export default EnhancedBackground; 