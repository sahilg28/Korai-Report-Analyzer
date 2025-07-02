import { useState } from "react";
import { extractTextFromFile, sanitizeExtractedText } from "../utils/ocrUtils";

export const useOCR = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runOCR = async (file) => {
    setLoading(true);
    setError("");
    try {
      const raw = await extractTextFromFile(file);
      setText(sanitizeExtractedText(raw));
    } catch {
      setError("OCR failed.");
    } finally {
      setLoading(false);
    }
  };

  return { text, loading, error, runOCR };
}; 