export default function BotAvatar({ size = 32, className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="Corex 91 assistant"
      className={className}
    >
      <circle cx="50" cy="50" r="48" fill="#0B2E4F" />

      {/* Hexagonal head */}
      <polygon
        points="50,18 70,29 70,53 50,64 30,53 30,29"
        fill="#0E3559"
        stroke="#3FC1C9"
        strokeWidth="2"
      />
      <polygon
        points="50,26 58,30.5 58,39.5 50,44 42,39.5 42,30.5"
        fill="none"
        stroke="#3FC1C9"
        strokeWidth="1.4"
        opacity="0.8"
      />
      <circle cx="50" cy="35" r="2.2" fill="#3FC1C9" />
      <line x1="30" y1="34" x2="24" y2="30" stroke="#3FC1C9" strokeWidth="1.4" opacity="0.7" />
      <line x1="70" y1="34" x2="76" y2="30" stroke="#3FC1C9" strokeWidth="1.4" opacity="0.7" />

      {/* Eyes */}
      <circle cx="41" cy="50" r="6" fill="#0B2E4F" stroke="#3FC1C9" strokeWidth="2.2" />
      <circle cx="41" cy="50" r="2.4" fill="#3FC1C9" />
      <circle cx="59" cy="50" r="6" fill="#0B2E4F" stroke="#3FC1C9" strokeWidth="2.2" />
      <circle cx="59" cy="50" r="2.4" fill="#3FC1C9" />
      <line x1="47" y1="50" x2="53" y2="50" stroke="#3FC1C9" strokeWidth="1.2" opacity="0.6" />

      <path
        d="M30,56 L30,62 L50,68 L70,62 L70,56"
        fill="none"
        stroke="#3FC1C9"
        strokeWidth="1.4"
        opacity="0.6"
      />

      {/* Shoulders / collar */}
      <path
        d="M22,80 Q50,92 78,80 L74,66 Q50,76 26,66 Z"
        fill="#0E3559"
        stroke="#3FC1C9"
        strokeWidth="2"
      />
      <line x1="50" y1="68" x2="50" y2="76" stroke="#3FC1C9" strokeWidth="1.6" opacity="0.7" />
    </svg>
  );
}
