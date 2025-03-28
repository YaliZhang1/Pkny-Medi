export const fetchPatientsData = async () => {
  try {
    const response = await fetch("http://localhost:3001/patients");
    if (!response.ok) throw new Error("Patients not found");
    const data = await response.json();
    console.log("Fetched Patients Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching patients data", error);
    return [];
  }
};
