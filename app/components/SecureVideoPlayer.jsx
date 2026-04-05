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
  }, [videoUrl, courseId]);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 group">
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-emerald-500 text-sm font-medium animate-pulse">Securing connection & Loading Player...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10 p-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-400 font-medium text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Plyr සඳහා Video Tag එක */}
      <video 
        ref={videoRef} 
        className={`w-full h-full transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        crossOrigin="use-credentials"
        controlsList="nodownload"
        playsInline
      />
    </div>
  );
}