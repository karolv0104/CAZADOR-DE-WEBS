const ASPECT = 130 / 60;

function nameFontSize(name) {
  if (name.length <= 8) return 4.6;
  if (name.length <= 12) return 4.0;
  if (name.length <= 16) return 3.4;
  return 3.0;
}

export default function VialGraphic({
  name,
  weight,
  price,
  lot,
  size = 84,
  className = "",
}) {
  const width = size;
  const height = Math.round(size * ASPECT);
  const priceLabel =
    typeof price === "number" ? `$${price.toFixed(2)}` : price;

  return (
    <svg
      viewBox="0 0 60 130"
      width={width}
      height={height}
      role="img"
      aria-label={`${name} vial, ${weight}${priceLabel ? `, ${priceLabel}` : ""}`}
      className={className}
    >
      {/* Silver flip-top cap */}
      <rect x="13" y="0" width="34" height="20" rx="3" fill="#C7CDD3" />
      <rect x="16" y="2" width="5" height="16" fill="#DCE1E5" opacity="0.7" />
      <rect x="39" y="2" width="5" height="16" fill="#B8BFC6" opacity="0.7" />
      <ellipse cx="30" cy="2.5" rx="16" ry="2.2" fill="#DCE1E5" />
      <rect x="13" y="13" width="34" height="1" fill="#9FA7AF" />

      {/* Rubber gasket peeking below the cap */}
      <rect x="15" y="20" width="30" height="4" fill="#2A2E33" />
      <ellipse cx="30" cy="24" rx="15" ry="1.5" fill="#9FA7AF" />

      {/* Clear glass body — straight cylindrical sides, flat base */}
      <path
        d="M15,24 Q10,27 10,31 L10,120 Q10,126 16,126 L44,126 Q50,126 50,120 L50,31 Q50,27 45,24 Z"
        fill="#EFF6F8"
        stroke="#C4D3D9"
        strokeWidth="0.8"
        opacity="0.55"
      />
      <rect x="13" y="30" width="3" height="90" rx="1.5" fill="#FFFFFF" opacity="0.4" />

      {/* Lyophilized powder settled at the bottom, visible through the glass */}
      <path
        d="M12,116 Q16,106 24,109 Q32,102 40,108 Q46,105 48,112 L48,120 Q30,124 12,120 Z"
        fill="#F2EFE9"
        opacity="0.9"
      />

      {/* Wrapped navy label */}
      <rect x="10" y="40" width="40" height="52" rx="1" fill="#0B2E4F" />

      {/* Brand mark */}
      <rect x="25.5" y="44" width="9" height="8" rx="2" fill="#3FC1C9" />
      <rect x="29.2" y="45.5" width="1.6" height="5" fill="#FFFFFF" />
      <rect x="26.5" y="47.3" width="7" height="1.6" fill="#FFFFFF" />
      <text
        x="30"
        y="58"
        textAnchor="middle"
        className="font-display"
        fontWeight="700"
        fontSize="5"
      >
        <tspan fill="#FFFFFF">COREX</tspan>
        <tspan fill="#3FC1C9">91</tspan>
      </text>
      <text
        x="30"
        y="62.5"
        textAnchor="middle"
        fontSize="2"
        letterSpacing="0.2"
        fill="#3FC1C9"
      >
        RESEARCH SCIENCES
      </text>
      <rect x="16" y="66" width="28" height="0.4" fill="#3A5570" />

      {/* Product details */}
      <text
        x="30"
        y="73"
        textAnchor="middle"
        className="font-body"
        fontWeight="700"
        fontSize={nameFontSize(name)}
        fill="#FFFFFF"
      >
        {name}
      </text>
      <text x="30" y="79" textAnchor="middle" fontSize="3.4" fill="#B8C4CE">
        {weight} &middot; Lot C91-{lot}
      </text>

      {priceLabel && (
        <text
          x="30"
          y="87"
          textAnchor="middle"
          className="font-display"
          fontWeight="700"
          fontSize="5.5"
          fill="#3FC1C9"
        >
          {priceLabel}
        </text>
      )}

      <text
        x="30"
        y="90.5"
        textAnchor="middle"
        fontWeight="700"
        fontSize="1.9"
        letterSpacing="0.3"
        fill="#7A93AC"
      >
        FOR RESEARCH ONLY
      </text>
    </svg>
  );
}
