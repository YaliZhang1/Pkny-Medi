export const deleteOnePatient = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/patients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
