import axios from "axios";

// Fetch all companies with overdue and today's highlights
export const fetchCompanies = async () => {
  try {
    const response = await axios.get("/api/companies"); // Adjust the API endpoint if needed
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error; // Re-throw the error for handling at the component level
  }
};

// Log a new communication for a specific company
export const logCommunication = async (data) => {
  try {
    const response = await axios.post("/api/companies/log-communication", data);
    return response.data;
  } catch (error) {
    console.error("Error logging communication:", error);
    throw error; // Re-throw the error for handling at the component level
  }
};
