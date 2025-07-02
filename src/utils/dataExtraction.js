// dataExtraction.js
// Utility to extract patient info and parameters from text
import { normalRanges } from '../data/normalRanges';
import { parameterUnits } from '../data/parameterUnits';

export const extractPatientInfo = (text) => {
  // Try to extract Name, Age, Gender from the first 20 lines
  const lines = text.split(/\r?\n/).slice(0, 20);
  let name = null, age = null, gender = null;
  for (const line of lines) {
    if (!name) {
      const m = line.match(/(?:Name|Patient Name)\s*[:\-]?\s*([A-Za-z .]+)/i);
      if (m) name = m[1].trim();
    }
    if (!age) {
      const m = line.match(/Age\s*[:\-]?\s*(\d{1,3})/i);
      if (m) age = m[1].trim();
    }
    if (!gender) {
      const m = line.match(/(?:Gender|Sex)\s*[:\-]?\s*([MFmaleFemale]+)/i);
      if (m) gender = m[1].replace(/male/i, 'M').replace(/female/i, 'F').toUpperCase();
    }
  }
  return { name, age, gender };
};

export const extractParameters = (text) => {
  // Match lines like: Parameter 12.5 g/dl 13.5–17.5
  const lines = text.split(/\r?\n/);
  const params = [];
  for (const line of lines) {
    // Try to match: ParameterName Value Unit Range
    const m = line.match(/([A-Za-z0-9\- ]+)\s+(\d+(?:\.\d+)?)\s*([a-zA-Z%/\^\d]*)\s+(\d+(?:\.\d+)?[–-]\d+(?:\.\d+)?)/);
    if (m) {
      const parameter = m[1].trim();
      const value = parseFloat(m[2]);
      // Always use data file if available
      const unit = parameterUnits[parameter] || (m[3] ? m[3].trim() : null) || null;
      const range = normalRanges[parameter] || null;
      // Abnormal detection
      let abnormal = false;
      if (range && typeof value === 'number') {
        const [low, high] = range.split(/[–-]/).map(Number);
        if (!isNaN(low) && !isNaN(high)) {
          if (value < low || value > high) abnormal = true;
        }
      }
      params.push({ parameter, value, unit, range, abnormal });
    }
  }
  return params;
}; 