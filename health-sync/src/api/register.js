export const register= async (formData) => {
  try {
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return { success: response.ok, message: data.message, error: data.error };  
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
};
