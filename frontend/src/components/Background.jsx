import React from "react";
import { cn } from "../utils/background";

const Background = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white">
      {/* Grid pattern background */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]"
        )}
      />

      {/* Removed mask-image layer to ensure text is visible */}
      {/* Optional: You can use a soft transparent overlay instead if needed */}

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default Background;
