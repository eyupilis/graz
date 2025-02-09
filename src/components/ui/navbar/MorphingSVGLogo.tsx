import { useEffect, useRef } from 'react'

export const MorphingSVGLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        {/* Kedi Silüeti */}
        <svg
          className="absolute inset-0 morphing-logo"
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            className="morph-path"
            d="M15,25 Q25,20 35,25 M20,35 Q25,30 30,35 M5,15 Q25,0 45,15 Q45,45 25,45 Q5,45 5,15"
          />
        </svg>
        
        {/* Köpek Silüeti */}
        <svg
          className="absolute inset-0 morphing-logo"
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            className="morph-path"
            d="M15,25 Q25,15 35,25 M20,35 Q25,40 30,35 M5,15 Q25,5 45,15 Q40,45 25,45 Q10,45 5,15"
          />
        </svg>
      </div>
      
      {/* Logo Metni */}
      <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 
                     bg-clip-text text-transparent filter drop-shadow-glow">
        Pet Palace
      </span>

      <style>{`
        .morphing-logo {
          animation: morph 5s infinite;
        }

        .morphing-logo:nth-child(1) {
          opacity: 1;
          animation: morph1 5s infinite;
        }

        .morphing-logo:nth-child(2) {
          opacity: 0;
          animation: morph2 5s infinite;
        }

        @keyframes morph1 {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes morph2 {
          0%, 45% { opacity: 0; }
          50%, 95% { opacity: 1; }
          100% { opacity: 0; }
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
      `}</style>
    </div>
  )
}

export default MorphingSVGLogo 