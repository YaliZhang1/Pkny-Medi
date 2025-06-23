export const register = async (formData) => {
  try {
    const response = await fetch("http://pkny-medi.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      alert("Registration failed:", data.message || "Registration failed");
      return {
        success: false,
        message: data.message || "Registration failed",
        error: data.error || "Unknown error",
      };
    }
    return {
      success: true,
      message: "Registration successful",
      error: null,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
};
