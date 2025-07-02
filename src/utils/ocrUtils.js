// ocrUtils.js
// Utility to extract text from image using tesseract.js
import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const { data: { text } } = await Tesseract.recognize(e.target.result, 'eng', {
          logger: () => {},
        });
        resolve(text);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}; 