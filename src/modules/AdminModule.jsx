import React, { useState, useEffect } from "react";
import "../css/AdminModule.css";
import "../../src/styles.css";

function AdminModule() {
  const [companies, setCompanies] = useState([]);
  const [methods, setMethods] = useState([]);
  
  // Fetch companies from backend
  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies`
      );
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Fetch methods from backend
  const fetchMethods = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/methods`
      );
      const data = await response.json();
      const sortedMethods = data.sort((a, b) => a.sequence - b.sequence);
      setMethods(data, sortedMethods);
    } catch (error) {
      console.error("Error fetching methods:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCompanies();
    fetchMethods();
  }, []);

  // Function to add a company
  const addCompany = async () => {
    const newCompany = {
      name: prompt("Enter company name:"),
      location: prompt("Enter company location:"),
      linkedin: prompt("Enter LinkedIn profile URL:"),
      emails: prompt("Enter emails (comma separated):").split(","),
      phoneNumbers: prompt("Enter phone numbers (comma separated):").split(","),
      comments: prompt("Enter comments or additional information:"),
      periodicity: prompt(
        "Enter communication periodicity (e.g., every 2 weeks):"
      ),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCompany),
        }
      );
      const data = await response.json();
      setCompanies([...companies, data]); 
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  // Function to add a communication method
  const addCommunicationMethod = async () => {
    const newMethod = {
      name: prompt("Enter method name:"),
      description: prompt("Enter method description:"),
      sequence: methods.length + 1,
      mandatory: false,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/methods`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMethod),
        }
      );
      const data = await response.json();
      fetchMethods();
    } catch (error) {
      console.error("Error adding communication method:", error);
    }
  };

  // Function to edit a company
  const editCompany = async (id) => {
    const updatedCompany = {
      name: prompt(
        "Enter new name:",
        companies.find((company) => company._id === id).name
      ),
      location: prompt(
        "Enter new location:",
        companies.find((company) => company._id === id).location
      ),
      linkedin: prompt(
        "Enter new LinkedIn profile URL:",
        companies.find((company) => company._id === id).linkedin
      ),
      emails: prompt(
        "Enter new emails (comma separated):",
        companies.find((company) => company._id === id).emails.join(",")
      ).split(","),
      phoneNumbers: prompt(
        "Enter new phone numbers (comma separated):",
        companies.find((company) => company._id === id).phoneNumbers.join(",")
      ).split(","),
      comments: prompt(
        "Enter new comments or additional information:",
        companies.find((company) => company._id === id).comments
      ),
      periodicity: prompt(
        "Enter new communication periodicity:",
        companies.find((company) => company._id === id).periodicity
      ),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCompany),
        }
      );
      const data = await response.json();
      setCompanies(
        companies.map((company) => (company._id === id ? data : company))
      ); 
    } catch (error) {
      console.error("Error editing company:", error);
    }
  };

  // Function to edit a communication method
  const editCommunicationMethod = async (id) => {
    const updatedMethod = {
      name: prompt(
        "Enter new method name:",
        methods.find((method) => method._id === id).name
      ),
      description: prompt(
        "Enter new method description:",
        methods.find((method) => method._id === id).description
      ),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/methods/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMethod),
        }
      );
      const data = await response.json();
      fetchMethods();
    } catch (error) {
      console.error("Error editing method:", error);
    }
  };

  // Function to delete a company
  const deleteCompany = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/api/companies/${id}`, {
        method: "DELETE",
      });
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  // Function to delete a method
  const deleteCommunicationMethod = async (id) => {
    const updatedMethods = methods.filter((method) => method._id !== id);
    setMethods(updatedMethods);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/methods/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete method");
      }

      await fetchMethods();
    } catch (error) {
      console.error("Error deleting method:", error);

      const originalMethod = methods.find((method) => method._id === id);
      setMethods((prevMethods) => [...prevMethods, originalMethod]);
    }
  };

  return (
    <div className="container">
      <h1>Admin Module</h1>

      {/* Company Management Section */}
      <div className="section">
        <h2>Company Management</h2>
        <button onClick={addCompany}>Add Company</button>
        <ul>
          {companies.map((company) => (
            <li key={company._id}>
              <strong>{company.name}</strong>
              <ul>
                <li>Location: {company.location}</li>
                <li>
                  LinkedIn:{" "}
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.linkedin}
                  </a>
                </li>
                <li>Emails: {company.emails.join(", ")}</li>
                <li>Phone Numbers: {company.phoneNumbers.join(", ")}</li>
                <li>Comments: {company.comments}</li>
                <li>Communication Periodicity: {company.periodicity}</li>
              </ul>
              <button onClick={() => editCompany(company._id)}>Edit</button>
              <button onClick={() => deleteCompany(company._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Communication Method Management Section */}
      <div className="section">
        <h2>Communication Method Management</h2>
        <button onClick={addCommunicationMethod}>Add Method</button>
        <ul>
          {methods.map((method) => (
            <li key={method._id}>
              <strong>{method.name}</strong> - {method.description} <br />
              Sequence: {method.sequence} | Mandatory:{" "}
              {method.mandatory ? "Yes" : "No"}
              <button onClick={() => editCommunicationMethod(method._id)}>
                Edit
              </button>
              <button onClick={() => deleteCommunicationMethod(method._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminModule;
