import { useState, useEffect, useRef } from 'react';
import { FiMusic, FiVolume2, FiVolumeX } from 'react-icons/fi';

const AudioAmbience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

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
      setAudioError(true);
      return;
    }
    
    audio.src = audioURLs[urlIndex];
    
    audio.onerror = () => {
      console.log(`Failed to load audio from ${audioURLs[urlIndex]}, trying next URL...`);
      tryLoadingAudio(audio, urlIndex + 1);
    };
  };

  useEffect(() => {
    let audio = null;
    
    try {
      // Create audio element
      audio = new Audio();
      audioRef.current = audio;
      
      // Add event listeners before setting the source
      audio.addEventListener('canplaythrough', () => {
        setAudioReady(true);
        setAudioError(false);
        console.log('Audio ambient ready');
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio failed to load:', e);
        // Don't set audioError yet, let the tryLoadingAudio function handle it
      });
      
      // Set audio properties
      audio.loop = true;
      audio.volume = 0.2;
      audio.preload = 'auto';
      
      // Try loading from multiple paths
      tryLoadingAudio(audio);
    } catch (e) {
      console.error('Failed to create audio element:', e);
      setAudioError(true);
    }
    
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        
        // Clean up event listeners
        audio.removeEventListener('canplaythrough', () => {});
        audio.removeEventListener('error', () => {});
      }
    };
  }, []);

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current || audioError) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
    
    setHasInteracted(true);
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (!audioRef.current || audioError) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    setHasInteracted(true);
  };

  // Play audio with handling for browser restrictions
  const playAudio = () => {
    if (!audioRef.current || !audioReady || audioError) return;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.warn('Playback prevented by browser:', error);
          setIsPlaying(false);
          
          // User interaction might be required
          if (error.name === 'NotAllowedError') {
            console.log('User interaction required before playback');
          }
        });
    }
  };

  // If audio failed to load, don't show the player
  if (audioError) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex items-center space-x-4 bg-tertiary/80 backdrop-blur-md p-3 rounded-full shadow-lg"
      aria-label="Audio controls"
    >
      <div 
        className={`relative transition-all duration-500 overflow-hidden ${hasInteracted ? 'w-auto' : 'w-0'}`}
      >
        <button
          onClick={toggleMute}
          disabled={!audioReady}
          className={`text-2xl p-2 rounded-full transition-colors ${
            !audioReady ? 'text-light-gray/50' : 
            isMuted ? 'text-light-gray' : 'text-secondary'
          }`}
          aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
        >
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </div>
      
      <button
        onClick={togglePlay}
        disabled={!audioReady}
        className={`flex items-center justify-center text-2xl p-2 rounded-full transition-all ${
          !audioReady ? 'bg-light-gray/10 text-light-gray/50' :
          isPlaying ? 'bg-secondary/20 text-secondary' : 'bg-light-gray/20 text-light-gray hover:text-lightest-gray'
        }`}
        aria-label={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
      >
        <div className={`flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
          <FiMusic />
        </div>
      </button>
      
      {/* Visual sound indicator */}
      {isPlaying && !isMuted && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-secondary/30 w-1 rounded-full"
                style={{
                  height: `${8 + (i * 4)}px`,
                  animation: `soundWave ${0.5 + (i * 0.2)}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Add a css keyframe for the sound visualization
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes soundWave {
    0% { height: 4px; }
    100% { height: 16px; }
  }
`;
document.head.appendChild(styleElement);

export default AudioAmbience; 