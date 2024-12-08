const OptionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={3.5}
      cy={11.5}
      r={2.5}
      transform="rotate(-90 3.5 11.5)"
      fill="currentColor"
    />
    <circle
      cx={11.5}
      cy={11.5}
      r={2.5}
      transform="rotate(-90 11.5 11.5)"
      fill="currentColor"
    />
    <circle
      cx={19.5}
      cy={11.5}
      r={2.5}
      transform="rotate(-90 19.5 11.5)"
      fill="currentColor"
    />
  </svg>
);

export default OptionsIcon;
