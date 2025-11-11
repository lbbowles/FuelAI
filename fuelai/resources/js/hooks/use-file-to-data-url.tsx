import { useState } from "react";

/**
 * Converts a File to a normalized base64 data URL string.
 * Normalizes image/jpg → image/jpeg for compatibility with OpenRouter GPT-4o.
 */
export function useFileToDataURL() {
  const [dataURL, setDataURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = async (file: File) => {
    setLoading(true);
    setError(null);

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        let result = reader.result as string;
        if (result.startsWith("data:image/jpg")) {
          result = result.replace("data:image/jpg", "data:image/jpeg");
        }
        setDataURL(result);
        setLoading(false);
        resolve(result);
      };

      reader.onerror = () => {
        setError("Failed to read file.");
        setLoading(false);
        reject("Failed to read file.");
      };

      reader.readAsDataURL(file);
    });
  };

  return { dataURL, loading, error, convert };
}
