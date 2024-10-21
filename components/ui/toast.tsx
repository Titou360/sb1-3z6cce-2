'use client';

import { useToast } from '@/hooks/use-toast';

export function Toast() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 p-6 space-y-4">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`bg-white border rounded-md shadow-lg p-4 ${
            toast.variant === 'destructive' ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="text-sm text-gray-500">{toast.description}</p>}
          <button
            onClick={() => dismissToast(index)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}