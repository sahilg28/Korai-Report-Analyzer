// Normal lab parameter ranges for health analysis
const normalRanges = {
  hba1c: { min: 4.0, max: 5.7, unit: "%", label: "4.0-5.7%" },
  totalCholesterol: { min: 0, max: 200, unit: "mg/dL", label: "<200 mg/dL" },
  vitaminD: { min: 30, max: 50, unit: "ng/mL", label: "30-50 ng/mL" },
  glucose: { min: 70, max: 100, unit: "mg/dL", label: "70-100 mg/dL" },
  hemoglobin: { min: 12.0, max: 17.5, unit: "g/dL", label: "12.0-17.5 g/dL" },
};
export default normalRanges; 