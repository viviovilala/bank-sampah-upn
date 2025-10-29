export function UPNLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle */}
      <circle cx="50" cy="50" r="48" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />
      
      {/* Inner Shield */}
      <path
        d="M 50 15 L 70 25 L 70 50 Q 70 70, 50 80 Q 30 70, 30 50 L 30 25 Z"
        fill="white"
        stroke="#27AE60"
        strokeWidth="1.5"
      />
      
      {/* Star */}
      <path
        d="M 50 25 L 52 32 L 59 32 L 54 36 L 56 43 L 50 38 L 44 43 L 46 36 L 41 32 L 48 32 Z"
        fill="#27AE60"
      />
      
      {/* Letters UPN */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="14"
        fill="#27AE60"
        fontFamily="Poppins, sans-serif"
      >
        UPN
      </text>
      
      {/* Bottom text */}
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fontSize="8"
        fill="#27AE60"
        fontFamily="Poppins, sans-serif"
      >
        JATIM
      </text>
    </svg>
  );
}
