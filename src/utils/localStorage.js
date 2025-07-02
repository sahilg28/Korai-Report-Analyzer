// localStorage.js

const REPORTS_KEY = 'korai_reports';

export const saveReport = (report) => {
  const reports = loadReports();
  reports.unshift(report);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports.slice(0, 3)));
};

export const loadReports = () => {
  try {
    const data = localStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}; 