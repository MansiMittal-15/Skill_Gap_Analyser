import React, { useState } from 'react';
import { X } from 'lucide-react'; // Optional: use any icon library or emoji


const Notification = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-blue-600 text-white text-center py-2 px-4 text-sm relative">
      <span>
        🎉 Limited Time Offer! Get 20% Off on all plans.
        <a href="/plans" className="underline font-semibold ml-1">View Plans</a>
      </span>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
        onClick={() => setVisible(false)}
        aria-label="Close Notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;
