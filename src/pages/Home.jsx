import React, { useState } from 'react';
import UploadSection from '../components/UploadSection';
import PatientInfoCard from '../components/PatientInfoCard';
import HealthParametersTable from '../components/HealthParametersTable';
import TrendsSection from '../components/TrendsSection';
import Button from '../components/ui/Button';
import { extractPatientInfo, extractParameters } from '../utils/dataExtraction';
import { saveReport } from '../utils/localStorage';

const Home = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [parameters, setParameters] = useState([]);
  const [patientInfo, setPatientInfo] = useState({ name: null, age: null, gender: null, date: null });
  const [uploaded, setUploaded] = useState(false);

  const handleExtracted = ({ file, text }) => {
    setFile(file);
    setExtractedText(text);
    const params = extractParameters(text);
    setParameters(params);
    const info = extractPatientInfo(text);
    setPatientInfo({ ...info, date: new Date().toISOString().slice(0, 10) });
    setUploaded(true);
    // Save to localStorage
    const report = {
      date: new Date().toISOString().slice(0, 10),
      parameters: params,
    };
    saveReport(report);
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText('');
    setParameters([]);
    setPatientInfo({ name: null, age: null, gender: null, date: null });
    setUploaded(false);
  };

  // Inline Header
  const Header = () => (
    <header className="w-full flex items-center justify-between py-4 px-4 bg-white shadow-md border-b border-[#E5E3DF] z-10">
      <div className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#937460] drop-shadow-sm tracking-tight text-left">
          Health Report Analyzer
        </h1>
      </div>
      <a
        href="https://koraihealth.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#8B7355] text-white px-4 py-2 rounded-xl shadow font-semibold text-sm md:text-base transition-colors duration-200 hover:bg-white hover:text-[#8B7355] border border-[#8B7355] flex items-center gap-1"
      >
        Check More <span className="ml-1">→</span>
      </a>
    </header>
  );

  // Inline Footer
  const Footer = () => (
    <footer className="w-full py-6 mt-10 flex flex-col items-center text-[#997156] text-sm bg-[#F5F3F0]">
      <span className="mt-1">Made with ❤️ by Sahil Gupta | <a href="https://github.com/sahilg28" className="text-amber-900 hover:text-black">Github</a></span>
    </footer>
  );

  // Inline LandingHero
  const LandingHero = ({ onExtracted, onReset }) => (
    <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-12 px-4">
      {/* Left: Text section */}
      <div className="flex flex-col justify-center items-start h-full">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold font-serif text-black leading-tight mb-2">
          Understand Your Health Reports,
          <span className="ml-2 italic text-[#997156] font-semibold">With Clarity</span>
        </h2>
        <hr className="w-full border-t-2 border-gray-300 my-4" />
        <div className="text-base sm:text-lg md:text-2xl font-sans text-gray-700">
          <div>We track your reports, shows early risks, and keeps all reports safe.</div>
          <div className="italic text-gray-800 mt-1">Making health easier for Indian families.</div>
        </div>
      </div>
      {/* Right: Upload section */}
      <div className="w-full flex justify-center md:justify-end items-center h-full">
        <UploadSection onExtracted={onExtracted} onReset={onReset} />
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3F0] font-sans">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-center px-2 md:px-0">
        {!uploaded ? (
          <LandingHero onExtracted={handleExtracted} onReset={handleReset} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mt-8">
            <div className="order-1 md:order-2 flex flex-col gap-6">
              <PatientInfoCard {...patientInfo} />
              <TrendsSection parameters={parameters} />
            </div>
            <div className="order-2 md:order-1 md:row-span-2">
              <HealthParametersTable parameters={parameters} />
            </div>
            <div className="md:col-span-2 flex justify-end mb-2 order-3 md:order-3">
              <Button onClick={handleReset} className="bg-[#8B7355] text-white px-4 py-2 rounded-xl shadow hover:bg-[#6d5a3a] transition" ariaLabel="Back to dashboard">
                ← Back to Home
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home; 