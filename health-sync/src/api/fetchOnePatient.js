export const fetchOnePatient = async (id) => {
  try {
    const response = await fetch(`https://pkny-medi.onrender.com/patients/${id}`);
    const data = await response.json();
  
    if (Array.isArray(data.patient)) {
    return data.patient;
  }} catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
