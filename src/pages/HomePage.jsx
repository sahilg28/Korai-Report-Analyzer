import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import FileUpload from "../components/features/FileUpload";
import ResultsTable from "../components/features/ResultsTable";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { extractTextFromFile, sanitizeExtractedText } from "../utils/ocrUtils";
import { extractParametersFromText } from "../utils/dataExtraction";

const HomePage = () => {
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (file) => {
    setLoading(true);
    setError("");
    setParameters([]);
    try {
      console.log("Selected file:", file);
      const rawText = await extractTextFromFile(file, (m) => console.log("OCR progress:", m));
      console.log("Extracted raw text:", rawText);
      const cleanText = sanitizeExtractedText(rawText);
      console.log("Sanitized text:", cleanText);
      const params = extractParametersFromText(cleanText);
      console.log("Extracted parameters:", params);
      setParameters(params);
    } catch (err) {
      setError("Failed to process file. Please try another report.");
      console.error("Extraction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <FileUpload onFileSelect={handleFileSelect} loading={loading} />
        {loading && <div className="flex justify-center my-8"><LoadingSpinner /></div>}
        {error && <div className="text-red-600 text-center my-4">{error}</div>}
        <ResultsTable parameters={parameters} />
      </div>
    </Layout>
  );
};

export default HomePage; 