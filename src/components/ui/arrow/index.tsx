type ArrowProps = {
  size?: number;
};

/** The diagonal that marks a link as leaving the site. */
export const Arrow = ({ size = 9 }: ArrowProps) => (
  <svg
    width={size}
    height={size}
    viewBox="2.4 2.4 9.2 9.2"
    fill="none"
    aria-hidden="true"
    focusable="false"
    style={{ verticalAlign: '1px' }}
  >
    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
