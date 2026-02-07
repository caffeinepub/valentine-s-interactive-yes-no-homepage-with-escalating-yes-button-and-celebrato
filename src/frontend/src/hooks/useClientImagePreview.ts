import { useState, useCallback } from 'react';

interface UseClientImagePreviewReturn {
  previewSrc: string | null;
  error: string | null;
  isLoading: boolean;
  handleFileSelect: (file: File | null) => void;
  clearPreview: () => void;
}

export function useClientImagePreview(defaultSrc?: string): UseClientImagePreviewReturn {
  const [previewSrc, setPreviewSrc] = useState<string | null>(defaultSrc || null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = useCallback((file: File | null) => {
    // Clear previous error
    setError(null);

    // If no file selected (user canceled), do nothing
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('Image file is too large. Please select an image smaller than 10MB.');
      return;
    }

    setIsLoading(true);

    // Create FileReader to read the file
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setPreviewSrc(result);
        setError(null);
      } else {
        setError('Unable to preview the selected image. Please try another file.');
      }
      setIsLoading(false);
    };

    reader.onerror = () => {
      setError('An error occurred while reading the image. Please try again.');
      setIsLoading(false);
    };

    // Read the file as data URL
    reader.readAsDataURL(file);
  }, []);

  const clearPreview = useCallback(() => {
    setPreviewSrc(defaultSrc || null);
    setError(null);
    setIsLoading(false);
  }, [defaultSrc]);

  return {
    previewSrc,
    error,
    isLoading,
    handleFileSelect,
    clearPreview,
  };
}
