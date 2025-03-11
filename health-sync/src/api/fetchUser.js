export const checkUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };
  
