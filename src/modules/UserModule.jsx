import React, { useState, useEffect } from "react";
import { fetchCompanies, logCommunication } from "../api/api";
import CalendarView from "../components/CalendarView";
import TaskModal from "../components/TaskModal";
import "../css/UserModule.css";
import "../../src/styles.css";

function UserModule() {
  const [companies, setCompanies] = useState([
    // { name: "ABC Corp", lastFive: [], next: "2024-12-27", overdue: false },
    // { name: "XYZ Ltd", lastFive: [], next: "2024-12-25", overdue: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await fetchCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    getCompanies();
  }, []);

  const handleLogCommunication = async (task) => {
    try {
      await logCommunication(task);
      const response = await fetchCompanies();
      setCompanies(response.data);
      setShowModal(false);
      setSelectedCompany([]);
    } catch (error) {
      console.error("Error logging communication:", error);
    }
  };

  const toggleSelectCompany = (companyName) => {
    console.log("Company selected:", companyName);
    setSelectedCompany((prev) =>
      prev.includes(companyName)
        ? prev.filter((name) => name !== companyName)
        : [...prev, companyName]
    );
    // console.log(setSelectedCompany);
  };

  return (
    <div className="user-module-container">
      <h1>User Module</h1>
      {/* Dashboard */}
      <div className="dashboard">
        <h2>Dashboard</h2>
        <table className="dashboard-grid">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Last Five Communications</th>
              <th>Next Scheduled Communication</th>
            </tr>
          </thead>
          <tbody>
            <tbody>
              {Array.isArray(companies) && companies.length > 0 ? (
                companies.map((company, index) => (
                  <tr
                    key={index}
                    className={`company-row ${
                      company.overdue ? "overdue" : ""
                    } ${
                      company.next === new Date().toISOString().split("T")[0]
                        ? "due-today"
                        : ""
                    }`}
                    onClick={() => toggleSelectCompany(company.name)}
                  >
                    <td>{company.name}</td>
                    <td>
                      {company.lastFive && company.lastFive.length > 0
                        ? company.lastFive.map((comm, i) => (
                            <span
                              key={i}
                              className="communication-tooltip"
                              title={comm.notes}
                            >
                              {comm.type} ({comm.date})
                            </span>
                          ))
                        : "N/A"}
                    </td>
                    <td>{company.next || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    No companies available or data is incorrect.
                  </td>
                </tr>
              )}
            </tbody>
          </tbody>
        </table>

        {/* Notifications  */}
        <div className="notification-section">
          <h2>Notifications</h2>
          <div className="notification-grid">
            <div>
              <h3>Overdue Communications</h3>
              <ul>
                {Array.isArray(companies) && companies.length > 0 ? (
                  companies
                    .filter((company) => company.overdue)
                    .map((company, index) => (
                      <li key={index}>{company.name}</li>
                    ))
                ) : (
                  <li>No data available</li> // In case companies is not an array or is empty
                )}
              </ul>
            </div>
            <div>
              <h3>Today's Communications</h3>
              <ul>
                {Array.isArray(companies) && companies.length > 0 ? (
                  companies
                    .filter((company) => {
                      const today = new Date().toISOString().split("T")[0];
                      return company.next === today;
                    })
                    .map((company, index) => (
                      <li key={index}>{company.name}</li>
                    ))
                ) : (
                  <li>No data available</li> // In case companies is not an array or is empty
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <h2>Calendar View</h2>
        <CalendarView
          tasks={
            Array.isArray(companies) && companies.length > 0
              ? companies.flatMap((company) =>
                  company.lastFive?.map((comm) => ({
                    company: company.name,
                    type: comm.type,
                    date: comm.date,
                  }))
                )
              : []
          }
        />

        {/* Log Communication Button */}
        <button
          className="log-communication-btn"
          onClick={() => {
            console.log("Button Clicked");
            setShowModal(true);
          }}
          disabled={selectedCompany.length === 0}
        >
          Log Communication
        </button>

        {/* Task Modal */}
        {showModal && (
          <TaskModal
            companies={selectedCompany}
            onClose={() => {
              console.log("Closing modal");
              setShowModal(false);
            }}
            onSave={(task) => logCommunication(task)}
          />
        )}
      </div>
    </div>
  );
}

export default UserModule;
