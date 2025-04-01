export const fetchOnePatient = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/patients/${id}`);
    const data = await response.json();
  
    if (Array.isArray(data.patient)) {
    return data.patient;
  }} catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
