import { getParameterStatus } from "../utils/healthAnalysis";
import healthInsights from "../data/healthInsights";

export function useHealthAnalysis(parameters) {
  return parameters.map(param => {
    const status = getParameterStatus(param.name, param.value);
    const insight = healthInsights[param.name]?.[status] || "";
    return { ...param, status, insight };
  });
} 