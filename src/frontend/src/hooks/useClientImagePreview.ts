import { useState, useCallback, useRef, useEffect } from 'react';

interface UseClientImagePreviewReturn {
  displaySrc: string;
  error: string | null;
  isLoading: boolean;
  hasUserSelection: boolean;
  handleFileSelect: (file: File | null) => void;
  handleImageLoadSuccess: () => void;
  handleImageLoadError: () => void;
  clearPreview: () => void;
}

export function useClientImagePreview(defaultSrc: string): UseClientImagePreviewReturn {
  const [userPreviewSrc, setUserPreviewSrc] = useState<string | null>(null);
  const [lastGoodPreviewSrc, setLastGoodPreviewSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Track the current selection token to prevent stale reads
  const selectionTokenRef = useRef(0);
  
  // Track object URLs for cleanup
  const objectUrlRef = useRef<string | null>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

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

    // Increment selection token to invalidate any in-flight reads
    selectionTokenRef.current += 1;
    const currentToken = selectionTokenRef.current;

    setIsLoading(true);

    // Revoke previous object URL if it exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    // Create FileReader to read the file
    const reader = new FileReader();

    reader.onload = (e) => {
      // Only update if this is still the current selection
      if (currentToken !== selectionTokenRef.current) {
        return;
      }

      const result = e.target?.result;
      if (typeof result === 'string') {
        setUserPreviewSrc(result);
        setError(null);
      } else {
        setError('Unable to preview the selected image. Please try another file.');
      }
      setIsLoading(false);
    };

    reader.onerror = () => {
      // Only update if this is still the current selection
      if (currentToken !== selectionTokenRef.current) {
        return;
      }
      
      setError('An error occurred while reading the image. Please try again.');
      setIsLoading(false);
    };

    // Abort any in-flight read (FileReader doesn't support abort directly, but token handles it)
    // Read the file as data URL
    reader.readAsDataURL(file);
  }, []);

  const handleImageLoadSuccess = useCallback(() => {
    // When image loads successfully, save it as last known good
    if (userPreviewSrc) {
      setLastGoodPreviewSrc(userPreviewSrc);
      setError(null);
    }
  }, [userPreviewSrc]);

  const handleImageLoadError = useCallback(() => {
    // When image fails to load, show error but keep last known good preview
    setError('Failed to load the selected image. Please try another file.');
  }, []);

  const clearPreview = useCallback(() => {
    // Revoke object URL if it exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    
    setUserPreviewSrc(null);
    setLastGoodPreviewSrc(null);
    setError(null);
    setIsLoading(false);
    selectionTokenRef.current += 1;
  }, []);

  // Determine what to display:
  // 1. If user has selected an image, show it (or last known good if current failed)
  // 2. Otherwise show default
  const displaySrc = userPreviewSrc || lastGoodPreviewSrc || defaultSrc;
  const hasUserSelection = userPreviewSrc !== null || lastGoodPreviewSrc !== null;

  return {
    displaySrc,
    error,
    isLoading,
    hasUserSelection,
    handleFileSelect,
    handleImageLoadSuccess,
    handleImageLoadError,
    clearPreview,
  };
}
