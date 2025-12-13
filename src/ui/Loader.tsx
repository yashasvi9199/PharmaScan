import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Analyzing image structure...",
  "Enhancing contrast & sharpness...",
  "Reading text content...",
  "Identifying pharmaceutical terms...",
  "Cross-referencing database...",
  "Finalizing results..."
];

export function Loader() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        {/* Inner Pulse */}
        <div className="absolute inset-4 bg-accent/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="h-8 flex items-center justify-center">
        <p className="text-primary font-medium text-lg animate-fadeIn key={msgIndex}">
          {MESSAGES[msgIndex]}
        </p>
      </div>
    </div>
  );
}
