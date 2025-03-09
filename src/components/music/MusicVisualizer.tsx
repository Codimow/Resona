import React, { useRef, useEffect } from "react";

interface MusicVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  visualizerType?: "bars" | "wave" | "circle";
  color?: string;
}

const MusicVisualizer = ({
  audioRef,
  isPlaying,
  visualizerType = "bars",
  color = "#8b5cf6", // Default to primary color
}: MusicVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    // Initialize audio context and analyzer
    const initAudio = () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          sourceRef.current = audioContextRef.current.createMediaElementSource(
            audioRef.current,
          );
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
          analyserRef.current.fftSize = 256;
        }
      } catch (error) {
        console.error("Error initializing audio analyzer:", error);
      }
    };

    // Draw the visualizer
    const draw = () => {
      if (!canvasRef.current || !analyserRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Get frequency data
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      if (visualizerType === "bars") {
        drawBars(ctx, width, height, bufferLength, dataArray);
      } else if (visualizerType === "wave") {
        drawWave(ctx, width, height, bufferLength, dataArray);
      } else if (visualizerType === "circle") {
        drawCircle(ctx, width, height, bufferLength, dataArray);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const drawBars = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      bufferLength: number,
      dataArray: Uint8Array,
    ) => {
      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;

        // Create gradient
        const gradient = ctx.createLinearGradient(
          0,
          height,
          0,
          height - barHeight,
        );
        gradient.addColorStop(0, `${color}33`); // More transparent at bottom
        gradient.addColorStop(1, color);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    const drawWave = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      bufferLength: number,
      dataArray: Uint8Array,
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Fill area under the line
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = `${color}33`;
      ctx.fill();
    };

    const drawCircle = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      bufferLength: number,
      dataArray: Uint8Array,
    ) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 4;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = `${color}66`;
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (radius * 1.5);
        const angle = (i * 2 * Math.PI) / bufferLength;

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;

        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    if (isPlaying) {
      try {
        initAudio();
        draw();
      } catch (error) {
        console.error("Visualizer error:", error);
      }
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioRef, isPlaying, visualizerType, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      width={280}
      height={280}
    />
  );
};

export default MusicVisualizer;
