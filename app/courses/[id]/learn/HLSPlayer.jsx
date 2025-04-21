"use client";

import React, { useRef, useEffect } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

const HLSPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Initialize Plyr player
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "fullscreen",
          "speed", // Enable playback speed control
        ],
        settings: ["speed"], // Add speed settings
        speed: { selected: 1, options: [0.5, 1, 1.5, 2] }, // Configure speed options
        autoplay: false,
        fullscreen: { enabled: true, fallback: true, iosNative: true },
        theme: "#f0f0f0", // Light background theme
      });

      if (Hls.isSupported()) {
        const hls = new Hls();
        // Use the Next.js proxy route to fetch the video stream
        const proxyUrl = `/api/proxy?videoUrl=${encodeURIComponent(videoUrl)}`;
        hls.loadSource(proxyUrl); // Loading from proxy
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // No need for Redux, just wait for the video to load
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error(`HLS.js Error: ${data.type} - ${data.details}`);
          }
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // Fallback for Safari
        videoRef.current.src = `/api/proxy?videoUrl=${encodeURIComponent(
          videoUrl
        )}`;
        videoRef.current.addEventListener("loadeddata", () => {
          // Handle video loaded event
        });
        videoRef.current.addEventListener("error", () => {
          // Handle video error event
        });
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg plyr-container">
      <video ref={videoRef} className="w-full rounded-lg plyr" controls />
    </div>
  );
};

export default HLSPlayer;
