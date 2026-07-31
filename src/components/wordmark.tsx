export function WordmarkText({ className }: { className?: string }) {
  return (
    <div className={`wordmark-text ${className ?? ""}`}>
      <div className="wordmark-sea">
        <span>S</span>
        <span>.</span>
        <span>E</span>
        <span>.</span>
        <span>A</span>
      </div>
      <div className="wordmark-subtitle">Group of Institutions</div>
    </div>
  );
}

