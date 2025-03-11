export const getPatients = async ()=> {
    try {
      const response = await fetch("https://randomuser.me/api/?results=5");
      if (!response.ok) throw new Error("Patients not found");
      const data = await response.json();
    return data.results; 
   
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }
  