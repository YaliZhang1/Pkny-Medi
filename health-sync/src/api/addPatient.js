export const addPatient = async (formData) => {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorId = doctor?._id;

  try {
    const response = await fetch("http://pkny-medi.onrender.com/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "doctor-id": doctorId,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message, error: data.error };
  } catch (error) {
    console.error("Error:", error.message || error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
};
