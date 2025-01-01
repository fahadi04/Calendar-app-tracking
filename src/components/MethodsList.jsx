import React, { useState, useEffect } from "react";
import { fetchMethods, deleteMethod } from "../api/api"; 

function MethodsList() {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    const getMethods = async () => {
      try {
        const response = await fetchMethods(); // Fetch all methods
        setMethods(response.data);
      } catch (error) {
        console.error("Error fetching methods:", error);
      }
    };
    getMethods();
  }, []); 

  const handleDelete = async (methodId) => {
    const updatedMethods = methods.filter((method) => method._id !== methodId);
    setMethods(updatedMethods); 

    try {
      await deleteMethod(methodId);
      console.log("Method deleted successfully");

     sync
      const response = await fetchMethods();
      setMethods(response.data);
    } catch (error) {
      console.error("Error deleting method:", error);

      const originalMethod = methods.find((method) => method._id === methodId);
      setMethods((prevMethods) => [...prevMethods, originalMethod]);
    }
  };

  return (
    <div>
      <h2>Methods</h2>
      <ul>
        {methods.map((method) => (
          <li key={method._id}>
            {method.name} 
            <button onClick={() => handleDelete(method._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MethodsList;
