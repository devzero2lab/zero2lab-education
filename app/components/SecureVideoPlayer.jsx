'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
// @ts-ignore - plyr TypeScript definitions don't perfectly match bundler resolution for default export
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; // Plyr හි අලංකාර UI එක සඳහා අනිවාර්ය වේ

export default function SecureVideoPlayer({ videoUrl, courseId, cookiesReady }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let hls = null;
    let player = null;
    
    const initPlayer = async () => {
      try {
        setIsLoading(true);
        // 1. Signed Cookies ලබා ගැනීම — page.jsx already fetches these once for the
        //    whole course session, so skip the call if cookiesReady flag is set.
        if (!cookiesReady) {
          const response = await fetch(`/api/video-access?courseId=${courseId}&videoUrl=${encodeURIComponent(videoUrl)}`);
          if (!response.ok) {
            throw new Error('Failed to obtain secure video access cookies.');
          }
        }

        const video = videoRef.current;
        if (!video) return;

        // Plyr ප්ලේයරයේ මූලික සැකසුම් (Settings මෙනුව සෑදීම)
        const defaultOptions = {
          controls: [
            'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
          ],
          settings: ['quality', 'speed'], // Quality මෙනුව සක්‍රිය කිරීම
          i18n: {
            qualityLabel: {
              0: 'Auto', // 0 ලෙස එන Quality එක 'Auto' ලෙස පෙන්වීමට
            },
          },
        };

        // 2. HLS.js සහ Plyr සම්බන්ධ කිරීම
        if (Hls.isSupported()) {
          hls = new Hls({
            xhrSetup: (xhr) => {
              xhr.withCredentials = true; // ආරක්ෂිත Cookies යැවීම
            }
          });
          
          hls.loadSource(videoUrl);
          hls.attachMedia(video);
          
          // වීඩියෝවේ Master Playlist එක කියවා අවසන් වූ පසු
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // අපගේ වීඩියෝවේ ඇති Quality මට්ටම් ලබාගැනීම (උදා: 720, 360)
            const availableQualities = hls.levels.map((l) => l.height);
            availableQualities.unshift(0); // ලැයිස්තුවේ උඩටම 'Auto' (0) එකතු කිරීම

            // Plyr එකට Quality ලැයිස්තුව ලබා දීම
            defaultOptions.quality = {
              default: 0, // මුලින්ම ප්ලේ වෙන්නේ Auto mode එකෙනි
              options: availableQualities,
              forced: true,
              onChange: (newQuality) => {
                // සිසුවා Quality එක වෙනස් කළ විට සිදුවිය යුතු දේ
                if (newQuality === 0) {
                  hls.currentLevel = -1; // -1 යනු HLS හි Auto mode එකයි
                } else {
                  hls.levels.forEach((level, levelIndex) => {
                    if (level.height === newQuality) {
                      hls.currentLevel = levelIndex;
                    }
                  });
                }
              },
            };

            // Plyr UI එක ආරම්භ කිරීම
            player = new Plyr(video, defaultOptions);
            setIsLoading(false);
          });

          // දෝෂ හඳුනාගැනීම (Error Handling)
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  setError('Network error encountered. Please check your connection.');
                  hls?.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls?.recoverMediaError();
                  break;
                default:
                  setError('An unrecoverable playback error occurred.');
                  hls?.destroy();
                  break;
              }
            }
          });
        } 
        // 3. Apple Safari බ්‍රවුසරය සඳහා (එහි HLS ස්වභාවිකවම වැඩ කරයි)
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoUrl;
          player = new Plyr(video, defaultOptions);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err.message || 'An error occurred while initializing the secure player.');
        setIsLoading(false);
      }
    };

    initPlayer();

    // Component එක ඉවත් වන විට ප්ලේයරයද මතකයෙන් ඉවත් කිරීම (Memory Leak වැළැක්වීමට)
    return () => {
      if (hls) hls.destroy();
      if (player) player.destroy();
    };
  }, [videoUrl, courseId, cookiesReady]);

  return (
    <div className="relative w-full h-full bg-zinc-950 group flex items-center justify-center">
      {/* 
        Custom Plyr Theming 
        Using Zero2Lab Brand Colors: Navy (#090D24) and Lime (#D9FFA5)
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --plyr-color-main: #D9FFA5;
          --plyr-video-control-color: #ffffff;
          --plyr-video-control-color-hover: #090D24;
          --plyr-video-control-background-hover: #D9FFA5;
          --plyr-menu-background: rgba(9, 13, 36, 0.95);
          --plyr-menu-color: #ffffff;
          --plyr-tooltip-background: #090D24;
          --plyr-tooltip-color: #ffffff;
        }
        .plyr {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
        }
        .plyr__video-wrapper {
          background: #000 !important;
        }
        .plyr__video-wrapper video {
          object-fit: contain !important;
          width: 100% !important;
          height: 100% !important;
        }
        .plyr--video .plyr__control--overlaid {
          background: rgba(217, 255, 165, 0.85);
          color: #090D24;
        }
        .plyr--video .plyr__control--overlaid:hover {
          background: #D9FFA5;
        }
        .plyr--full-ui input[type=range] {
          color: #D9FFA5;
        }
        .plyr__control--pressed {
          color: #090D24 !important;
        }
      `}} />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#090D24]/90 z-20 backdrop-blur-md transition-all duration-500">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#D9FFA5]/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#D9FFA5] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-[#D9FFA5] text-lg font-bold tracking-tight animate-pulse">ZERO2LAB SECURE PLAYER</p>
              <p className="text-white/60 text-xs font-medium uppercase tracking-[0.2em]">Initializing Stream...</p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090D24] z-30 p-8 text-center animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-red-500/20">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">Playback Error</h3>
          <p className="text-white/60 font-medium max-w-md mx-auto mb-8 leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-[#D9FFA5] hover:bg-[#c4eb8a] text-[#090D24] rounded-2xl transition-all duration-300 text-sm font-bold shadow-lg shadow-lime-500/20 active:scale-95"
          >
            Reconnect & Try Again
          </button>
        </div>
      )}

      {/* Plyr Video Element */}
      <div className="w-full h-full flex items-center justify-center">
        <video 
          ref={videoRef} 
          className={`w-full h-full object-contain transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          crossOrigin="use-credentials"
          controlsList="nodownload"
          playsInline
        />
      </div>
    </div>
  );
}