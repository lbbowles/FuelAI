import React from "react";

interface DeepThinkButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function DeepThinkButton({
  onClick,
  disabled = false,
  loading = false,
}: DeepThinkButtonProps) {
  return (
    <div className="mt-6 text-center">
      <p className="text-base-content/70 mb-3 italic">
        Don’t like the results? Let us think harder.
      </p>

      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          btn relative overflow-hidden px-6 py-3 rounded-xl 
          bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 
          text-white font-semibold shadow-md hover:shadow-lg transition-all
          hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="loading loading-spinner text-white"></span>
            Thinking deeply...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            🧠 Deep Think
          </span>
        )}
      </button>
    </div>
  );
}
