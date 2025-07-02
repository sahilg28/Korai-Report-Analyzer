import React, { useRef, useState } from 'react';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import StatusBadge from './ui/StatusBadge';
import { extractTextFromPDF } from '../utils/pdfExtraction';
import { extractTextFromImage } from '../utils/ocrUtils';

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
const MAX_SIZE_MB = 5;

const UploadSection = ({ onExtracted, onReset }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | extracting | done | error
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    setError('');
    setFile(file);
    setStatus('extracting');
    let text = '';
    try {
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type.startsWith('image/')) {
        text = await extractTextFromImage(file);
      } else {
        setError('Unsupported file type.');
        setStatus('error');
        return;
      }
      if (!text || text.trim().length < 10) {
        setError("Couldn't read this file, try a clearer version.");
        setStatus('error');
        return;
      }
      setStatus('done');
      onExtracted({ file, text });
    } catch (e) {
      setError('Extraction failed. Try again.');
      setStatus('error');
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Unsupported file type.');
      setStatus('error');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError('File too large (max 5MB).');
      setStatus('error');
      return;
    }
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Unsupported file type.');
      setStatus('error');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError('File too large (max 5MB).');
      setStatus('error');
      return;
    }
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRetry = () => {
    setFile(null);
    setStatus('idle');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleUploadAnother = () => {
    setFile(null);
    setStatus('idle');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
    if (onReset) onReset();
  };

  return (
    <section className="w-full max-w-xl mx-auto mt-6 p-8 bg-white rounded-2xl shadow-lg border border-[#E5E3DF] flex flex-col items-center transition-transform duration-200 hover:scale-[1.01]">
      <label
        htmlFor="file-upload"
        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#8B7355] rounded-xl p-8 cursor-pointer hover:bg-[#F5F3F0] focus-within:ring-2 focus-within:ring-[#8B7355] transition"
        tabIndex={0}
        aria-label="Upload your lab report"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <span className="text-[#8B7355] font-semibold mb-2">Drag & drop your PDF or image here</span>
        <span className="text-[#CCCCCC] text-sm mb-4">or click to select a file</span>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          ref={inputRef}
          onChange={handleInputChange}
        />
        <Button
          type="button"
          onClick={() => inputRef.current && inputRef.current.click()}
          ariaLabel="Select file"
          className="mt-2"
        >
          Choose File
        </Button>
      </label>
      {file && (
        <div className="mt-4 flex flex-col items-center gap-2 w-full">
          <span className="truncate max-w-xs text-[#8B7355]">{file.name}</span>
          {status === 'extracting' && <LoadingSpinner />}
          {status === 'done' && <StatusBadge status="success">Extracted</StatusBadge>}
          {status === 'error' && <StatusBadge status="error">Error</StatusBadge>}
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-600 text-sm text-center">{error}</div>
      )}
      {status === 'error' && (
        <Button onClick={handleRetry} className="mt-2" ariaLabel="Retry extraction">Retry</Button>
      )}
      {status === 'done' && (
        <Button onClick={handleUploadAnother} className="mt-2" ariaLabel="Upload another report">Upload Another Report</Button>
      )}
    </section>
  );
};

export default UploadSection; 