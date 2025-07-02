import React, { useRef } from "react";

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/heic"
];
const maxSize = 10 * 1024 * 1024;

const FileUpload = ({ onFileSelect, loading }) => {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      alert("Unsupported file type. Please upload PDF, JPG, PNG, or HEIC files.");
      return;
    }
    if (file.size > maxSize) {
      alert("File too large. Maximum size is 10MB.");
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (loading) return;
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      alert("Unsupported file type. Please upload PDF, JPG, PNG, or HEIC files.");
      return;
    }
    if (file.size > maxSize) {
      alert("File too large. Maximum size is 10MB.");
      return;
    }
    onFileSelect(file);
  };

  const handleClick = () => {
    if (loading) return;
    inputRef.current.click();
  };

  return (
    <div
      className="border-2 border-dashed border-[#8B7355] rounded-xl p-8 bg-white flex flex-col items-center justify-center cursor-pointer focus:ring-2 focus:ring-[#8B7355] outline-none transition-all duration-200"
      tabIndex={0}
      aria-label="Upload lab report file"
      aria-describedby="upload-instructions"
      onClick={handleClick}
      onKeyDown={e => e.key === "Enter" && handleClick()}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      role="button"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.heic"
        className="hidden"
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />
      <span className="text-[#8B7355] font-semibold text-lg mb-2">Drop files here or click to browse</span>
      <span className="text-gray-500 text-sm mb-2">PDF, JPG, PNG, HEIC up to 10MB</span>
      <div id="upload-instructions" className="sr-only">
        Upload PDF or image files up to 10MB. Supported formats: PDF, JPG, PNG, HEIC.
      </div>
    </div>
  );
};

export default FileUpload; 