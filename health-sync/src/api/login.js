export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return {
      success: response.ok,
      user: data.user,
      message: data.message,
      error: data.error,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
};
