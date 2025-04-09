export const fetchPatientsData = async () => {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorId = doctor?._id;

  try {
    const response = await fetch(`http://localhost:3001/patients`, {
      headers: {
        "Content-Type": "application/json",
        "doctor-id": doctorId,
      },
    });
    const data = await response.json();

    // make sure it is array
    if (Array.isArray(data.patients)) {
      return data.patients;
    } else {
      console.error("Unexpected response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
