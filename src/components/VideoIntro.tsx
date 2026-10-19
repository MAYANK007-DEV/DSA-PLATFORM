import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, Play } from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';

export const VideoIntro: React.FC = () => {
  const { showIntroModal, setShowIntroModal } = useTracker();

  // Initialize visibility: true on first session load, or whenever showIntroModal is triggered manually
  const [isVisible, setIsVisible] = useState(() => {
    try {
      const hasSeen = sessionStorage.getItem('hasSeenIntro');
      return !hasSeen;
    } catch {
      return true;
    }
  });

  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync with context manual trigger
  useEffect(() => {
    if (showIntroModal) {
      setIsFadingOut(false);
      setIsVisible(true);
      setIsPlaying(false);
      setHasError(false);
    }
  }, [showIntroModal]);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      const vid = videoRef.current;
      vid.load();
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((error) => {
            console.warn('Autoplay blocked by browser:', error);
            setHasError(true);
            setIsPlaying(false);
          });
      }
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsFadingOut(true);
    try {
      sessionStorage.setItem('hasSeenIntro', 'true');
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsVisible(false);
      setShowIntroModal(false);
    }, 700);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.error('Manual play failed:', err);
          setHasError(true);
        });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#111119] flex items-center justify-center transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background cinematic container ship industrial intro video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onEnded={handleDismiss}
        onError={() => setHasError(true)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/intro-video.mp4" type="video/mp4" />
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark gradient overlay for cyber contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111119]/80 via-transparent to-[#111119]/40 pointer-events-none" />

      {/* Fallback play overlay if browser blocks autoplay */}
      {(hasError || !isPlaying) && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#111119]/90 backdrop-blur-md gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyber-glow bg-[#1a1a2e] shadow-2xl mb-2 flex items-center justify-center">
            <img src="/logo-icon.svg" alt="Practice Kit Coding" className="w-full h-full object-cover" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#ebf1f5]">Practice Kit Coding</h2>
            <p className="text-xs text-[#94a3b8] font-mono">Cinematic Placement &amp; DSA Edition</p>
          </div>
          <button
            onClick={handleManualPlay}
            className="mt-3 flex items-center gap-2 px-6 py-3 rounded-xl glow-gradient text-white text-sm font-bold shadow-xl shadow-[#ff2e93]/30 cursor-pointer hover:scale-105 transition-transform"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play Cinematic Intro</span>
          </button>
        </div>
      )}

      {/* Top Controls: Sound Toggle & Skip Intro */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#161622]/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#ebf1f5] hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all cursor-pointer shadow-lg"
          title={isMuted ? 'Unmute intro video' : 'Mute intro video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00e5ff]" />}
          <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Muted'}</span>
        </button>

        <button
          onClick={handleDismiss}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#161622]/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#ebf1f5] hover:border-[#ff2e93] hover:shadow-[0_0_15px_rgba(255,46,147,0.4)] transition-all cursor-pointer shadow-lg group"
          title="Skip Intro"
        >
          <span>Skip Intro</span>
          <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform text-[#ff2e93]" />
        </button>
      </div>

      {/* Bottom Branding Badge */}
      <div className="absolute bottom-8 left-8 z-40 pointer-events-none hidden sm:flex items-center gap-3 bg-[#161622]/70 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl">
        <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyber-glow flex items-center justify-center shrink-0">
          <img src="/logo-icon.svg" alt="Practice Kit Coding" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#ebf1f5] tracking-tight">Practice Kit Coding</span>
          <span className="text-[10px] text-[#00e5ff] font-mono">Cinematic 2026 Edition</span>
        </div>
      </div>
    </div>
  );
};
