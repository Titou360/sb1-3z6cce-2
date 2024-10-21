'use client';

import { useState, useCallback } from 'react';

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    setToasts((prevToasts) => [...prevToasts, options]);
  }, []);

  const dismissToast = useCallback((index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  }, []);

  return { toast, toasts, dismissToast };
}