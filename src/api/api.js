import axios from "axios";

// Fetch all companies with overdue and today's highlights
export const fetchCompanies = async () => {
  try {
    const response = await axios.get("/api/companies");
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

// Log a new communication for a specific company
export const logCommunication = async (data) => {
  try {
    const response = await axios.post("/api/companies/log-communication", data);
    return response.data;
  } catch (error) {
    console.error("Error logging communication:", error);
    throw error;
  }
};

// Fetch all methods
export const fetchMethods = async () => {
  try {
    const response = await axios.get("/api/methods");
    return response.data;
  } catch (error) {
    console.error("Error fetching methods:", error);
    throw error;
  }
};

// Delete a method
export const deleteMethod = async (methodId) => {
  try {
    const response = await axios.delete(`/api/methods/${methodId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting method:", error);
    throw error;
  }
};
