// Health insights rules/messages for extracted parameters
const healthInsights = {
  hba1c: {
    high: "Your HbA1c is high. This may indicate diabetes risk.",
    normal: "Your HbA1c is in the optimal range.",
    low: "Your HbA1c is low."
  },
  totalCholesterol: {
    high: "High cholesterol increases cardiovascular risk.",
    normal: "Cholesterol is in the healthy range.",
    low: "Cholesterol is low."
  },
  vitaminD: {
    high: "Vitamin D is high.",
    normal: "Vitamin D is sufficient.",
    low: "Vitamin D is low. Consider more sun exposure or supplements."
  },
  glucose: {
    high: "High blood glucose. Possible diabetes risk.",
    normal: "Blood glucose is normal.",
    low: "Blood glucose is low."
  },
  hemoglobin: {
    high: "Hemoglobin is high.",
    normal: "Hemoglobin is normal.",
    low: "Hemoglobin is low. Possible anemia."
  }
};
export default healthInsights; 