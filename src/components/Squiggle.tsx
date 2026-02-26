export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center opacity-40 dark:opacity-20 my-12 ${className}`}>
      <svg
        width="200"
        height="20"
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 10C20 10 20 0 40 0C60 0 60 20 80 20C100 20 100 0 120 0C140 0 140 20 160 20C180 20 180 10 200 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
