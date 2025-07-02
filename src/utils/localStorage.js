// Local storage helpers for report history will be implemented here. 

const STORAGE_KEY = "korai_lab_reports";

export function saveReport(report) {
  const reports = getReports();
  reports.push(report);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function getReports() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
} 