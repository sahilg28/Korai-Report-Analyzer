// Data extraction and regex logic will be implemented here. 

// Regex patterns for Indian lab reports
const labPatterns = {
  hba1c: [
    /(?:hba1c|hb\s*a1c|glycated\s*hemoglobin)[:\s]*(\d+\.?\d*)\s*(%|percent)/i,
    /hemoglobin\s*a1c[:\s]*(\d+\.?\d*)\s*%/i
  ],
  totalCholesterol: /(?:total\s*)?cholesterol[:\s]*(\d+)\s*mg[\/\s]*dl/i,
  hdlCholesterol: /hdl[:\s]*(\d+)\s*mg[\/\s]*dl/i,
  ldlCholesterol: /ldl[:\s]*(\d+)\s*mg[\/\s]*dl/i,
  vitaminD: [
    /vitamin\s*d[:\s]*(\d+\.?\d*)\s*ng[\/\s]*ml/i,
    /25\s*oh\s*vitamin\s*d[:\s]*(\d+\.?\d*)/i,
    /cholecalciferol[:\s]*(\d+\.?\d*)/i
  ],
  glucose: [
    /(?:glucose|blood\s*sugar)[:\s]*(\d+)\s*mg[\/\s]*dl/i,
    /fasting\s*glucose[:\s]*(\d+)/i,
    /random\s*glucose[:\s]*(\d+)/i,
    /pp\s*glucose[:\s]*(\d+)/i
  ],
  hemoglobin: /(?:hemoglobin|hb)(?!\s*a1c)[:\s]*(\d+\.?\d*)\s*g[\/\s]*dl/i,
  tsh: /tsh[:\s]*(\d+\.?\d*)\s*(?:miu[\/\s]*ml|uiu[\/\s]*ml)/i,
  t3: /t3[:\s]*(\d+\.?\d*)\s*ng[\/\s]*dl/i,
  t4: /t4[:\s]*(\d+\.?\d*)\s*ug[\/\s]*dl/i,
  sgpt: /(?:sgpt|alt)[:\s]*(\d+)\s*u[\/\s]*l/i,
  sgot: /(?:sgot|ast)[:\s]*(\d+)\s*u[\/\s]*l/i,
  creatinine: /creatinine[:\s]*(\d+\.?\d*)\s*mg[\/\s]*dl/i,
  urea: /urea[:\s]*(\d+)\s*mg[\/\s]*dl/i
};

export const extractParametersFromText = (text) => {
  const parameters = [];
  for (const [name, pattern] of Object.entries(labPatterns)) {
    if (Array.isArray(pattern)) {
      for (const p of pattern) {
        const match = text.match(p);
        if (match) {
          parameters.push({
            name,
            value: parseFloat(match[1]),
            unit: match[2] || getDefaultUnit(name),
            raw: match[0]
          });
          break;
        }
      }
    } else {
      const match = text.match(pattern);
      if (match) {
        parameters.push({
          name,
          value: parseFloat(match[1]),
          unit: match[2] || getDefaultUnit(name),
          raw: match[0]
        });
      }
    }
  }
  return parameters;
};

const getDefaultUnit = (name) => {
  switch (name) {
    case "hba1c": return "%";
    case "totalCholesterol":
    case "hdlCholesterol":
    case "ldlCholesterol":
    case "glucose":
    case "urea":
      return "mg/dL";
    case "vitaminD": return "ng/mL";
    case "hemoglobin": return "g/dL";
    case "tsh": return "mIU/mL";
    case "t3": return "ng/dL";
    case "t4": return "ug/dL";
    case "sgpt":
    case "sgot": return "U/L";
    case "creatinine": return "mg/dL";
    default: return "";
  }
}; 