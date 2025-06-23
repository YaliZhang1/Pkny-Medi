export const updatePatient = async (id, updatedData) => {
    console.log("Updating patient with ID:", id, "Data:", updatedData);
    try {
      const response = await fetch(`http://pkny-medi.onrender.com/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      const data = await response.json();
      console.log("Response:", data);
      return { success: response.ok, message: data.message, error: data.error };
    } catch (error) {
      console.error("Error:", error.message || error);
      return {
        success: false,
        error: "Something went wrong. Please try again later.",
      };
    }
  };
  