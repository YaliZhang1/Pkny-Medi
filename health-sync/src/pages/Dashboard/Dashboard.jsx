import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
import "./Dashboard.css";
import "../../styles/button.css";
import Header from "../../components/Header";
import PatientForm from "../../components/PatientForm";
import LeftNavigation from "../../components/LeftNavigation";

import { fetchPatientsData } from "../../api/fetchPatientsData";
import { fetchOnePatient } from "../../api/fetchOnePatient";
import { updatePatient } from "../../api/updatePatient";
import { deleteOnePatient } from "../../api/deleteOnePatient";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [allPatients, setAllPatients] = useState({}); //Store paginated data
  const [patients, setPatients] = useState([]); //Current page data

  const [currentPage, setCurrentPage] = useState(1);
  const [personalFileVisible, setPersonalFileVisible] = useState({});
  const [currentPatientID, setCurrentPatientID] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null); // Stores the currently edited patient data

  const pageSize = 5;
  const totalPages = 5;

  const navigate = useNavigate();
  const handleMobileMenuClick = () => {
    navigate("/mobileMenuPage");
  };
  const handleSeeMoreBtn = () => {
    navigate("/appointmentPage");
  };

  // useEffect(() => {
  //   setPatients((prev) => {
  //     const sortedPatients = sortPatientsByTime(prev);
  //     // 只有在排序后数据发生变化时才更新 state，避免死循环
  //     return JSON.stringify(prev) === JSON.stringify(sortedPatients) ? prev : sortedPatients;
  //   });
  // }, []);
  useEffect(() => {
    const fetchPatients = async () => {
      const data = await fetchPatientsData();
      console.log("Patients fetched:", data);
      setAllPatients(paginateData(data, pageSize));
      setPatients(data.slice(0, pageSize)); // 只设置当前页的数据
    };
    fetchPatients();
  }, []);

  const handleAddNewPatient = async (newPatient) => {
    setPatients((prevPatients) => [newPatient, ...prevPatients]);

    // Re-pull data to ensure data synchronization
    const updatedPatients = await fetchPatientsData();
    setPatients(updatedPatients);
  };

  const togglePersonalFile = (patientID) => {
    if (currentPatientID === patientID) {
      setPersonalFileVisible((prev) => ({
        ...prev,
        [patientID]: !prev[patientID], // Toggle the visibility
      }));

      setCurrentPatientID(null); //If the clicked icon is already displayed, close the patient's file
    } else {
      setCurrentPatientID(patientID); // If the icon clicked is a new patient, display the patient's files
      setPersonalFileVisible((prev) => ({
        ...prev,
        [patientID]: true,
      }));
    }
  };
  const handleEditPatient = (patient) => {
    console.log("Editing patient:", patient);
    setEditingPatient(patient);
    setIsEditModalOpen(true);
  };
  const handleUpdatePatient = async (updatedPatient) => {
    console.log("Updating patient:", updatedPatient);
    const result = await updatePatient(updatedPatient._id, updatedPatient);
    if (result.success) {
      alert("Patient updated successfully!");
      const refreshedPatient = await fetchOnePatient(updatedPatient._id);
      setPatients((prevPatients) =>
        prevPatients.map((p) =>
          p.patientID === updatedPatient._id ? refreshedPatient : p
        )
      );
      setIsEditModalOpen(false);
    } else {
      alert(`Failed to update patient: ${result.message || "Unknown error"}`);
    }
  };
  const handleDeletePatient = async (patient) => {
    console.log("Deleting patient:", patient);
    const result = await deleteOnePatient(patient._id);
    if (result.success) {
      alert("Patient deleted successfully!");
      const updatedPatients = await fetchPatientsData();
      setPatients(
        updatedPatients.filter((p) => p.patientID!== patient._id)
      );
    } else {
      alert(`Failed to delete patient: ${result.message || "Unknown error"}`);
    }
  };

  const sortPatientsByTime = (patients) => {
    return [...patients].sort((a, b) => {
      const timeA = new Date(a.registered.date);
      const timeB = new Date(b.registered.date);
      return (
        timeA.getHours() * 60 +
        timeA.getMinutes() -
        (timeB.getHours() * 60 + timeB.getMinutes())
      );
    });
  };

  const paginateData = (data, size) => {
    let paginated = {};
    for (let i = 1; i <= totalPages; i++) {
      paginated[i] = data.slice((i - 1) * size, i * size);
    }
    return paginated;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPatients(allPatients[page] || []);
  };
  console.log({ currentPage });

  return (
    <div className="dashboardPage-container">
      <Header className="headerCell" />
      <div className="nav-content-container">
        <div className="pageNavigate">
          <LeftNavigation />
        </div>
        <div className="dashboardContent">
          <div className="text-button-group">
            <h1 className="dash">Dashboard</h1>
            <button className="mobil-menu" onClick={handleMobileMenuClick}>
              <img src="./mobilMenu.svg" alt="" />
            </button>

            <div className="textContainer">
              <h1>Daily Schedule</h1>
              <p> {selectedDate.toLocaleDateString()}</p>
            </div>
            <div className="calendar">
              <Button onClick={() => setIsModalOpen(true)}>
                <CalendarIcon className="calendarIcon" />
              </Button>
            </div>
          </div>
          <div style={{ position: "relative" }} className="sheet">
            <div className="sheetHead">
              <ul className="oneRow">
                <li>Time</li>
                <li className="shortName">Name</li>
                <li className="fullName">Patient's Name</li>
                <li className="perNum">Personal Number </li>
                <li>Personal File</li>
                <li>Actions</li>
              </ul>
            </div>
            <ul className="patients">
              {patients && patients.length > 0 ? (
                patients.map((patient) => (
                  <li key={patient.patientID} className="patient-card ">
                    <div className="item">
                      {new Date(
                        patient?.registered?.date || new Date()
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="item">
                      {patient?.patientName || "Unknown"}
                    </div>
                    <div className="item numberForBigView">
                      {patient?.patientID || "N/A"}
                    </div>

                    <div className="item">
                      {/* Display button to toggle personal file */}
                      <button
                        onClick={() => togglePersonalFile(patient.patientID)}
                        className="toggleFileButton"
                      >
                        <img
                          src="./messages.svg"
                          alt="Toggle File"
                          className="toggleFileIcon"
                          style={{
                            borderRadius: "5px",
                            backgroundColor: personalFileVisible[
                              patient.patientID
                            ]
                              ? "#FF6B6B"
                              : "rgb(38, 161, 150)",
                            transition: "filter 0.3s ease",
                          }}
                        />
                      </button>

                      <div
                        style={{
                          position: "absolute",
                          // top: "20vh",
                          bottom: "0.2vh",
                          right: "12vw",
                          width: "80%",
                          height: "20%",
                          backgroundColor: personalFileVisible[
                            patient.patientID
                          ]
                            ? "rgba(240, 240, 240, 0.95)"
                            : "transparent",
                          padding: "10px",
                          borderRadius: "5px",
                          zIndex: 1,
                        }}
                      >
                        {/* Conditionally display Personal File */}
                        {currentPatientID === patient.patientID && (
                          <p>{patient?.patientFile || "No file available"}</p>
                        )}
                      </div>
                    </div>

                    <div className="small-icons item">
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="updateButton"
                      >
                        <img
                          src="./note.png"
                          alt="updatePatient"
                          className="updatePatientIcon"
                        />
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient)}
                        className="deleteButton"
                      >
                        <img
                          src="./ashbin.png"
                          alt="deletePatient"
                          className="deletePatientIcon"
                        />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p style={{ textAlign: "center", padding: "20px" }}>
                  No data available
                </p>
              )}
            </ul>
            <Button className="seeMore button" onClick={handleSeeMoreBtn}>
              See More
            </Button>
          </div>
          <div className="taskContainer">
            <h1> Add Your Task To The Schedule </h1>
            <div className="task">
              <div className="taskContent">
                <PatientForm onAddPatient={handleAddNewPatient} />

                <div className="journalContainer">
                  <div className="medicalJournal">
                    <img
                      className="attachIcon"
                      src="./attach_file.png"
                      alt=""
                    />
                    <h1 className="medicalText">Medical Journal</h1>
                  </div>
                  <div className="JournalFirstRow-bigView mOneRow">
                    <p className="JournalText">Medical Journal</p>
                    <img className="fileIcon" src="./file-text.png" alt="" />
                  </div>
                  <div className="JournalSecondRow-bigView mOneRow">
                    <p className="JournalText">Treatment</p>
                    <img
                      className="attachIconBig"
                      src="./attach_file.png"
                      alt=""
                    />
                  </div>
                  <div className="JournalThirdRow-bigView mOneRow">
                    <p className="JournalText">Other Details</p>
                    <img
                      className="attachIconBig"
                      src="./attach_file.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
            />
          </Modal>
          <Modal
            className="editModal"
            overlayClassName="modalOverlay"
            isOpen={isEditModalOpen}
            closeModal={() => setIsEditModalOpen(false)}
          >
            <h2>Edit Patient information</h2>
            {editingPatient ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdatePatient(editingPatient);
                }}
              >
                <label>
                  Patient's Name:
                  <input
                    type="text"
                    value={editingPatient.patientName}
                    onChange={(e) =>
                      setEditingPatient((prev) => ({
                        ...prev,
                        patientName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Personal Number:
                  <input
                    type="text"
                    value={editingPatient.patientID}
                    onChange={(e) =>
                      setEditingPatient((prev) => ({
                        ...prev,
                        patientID: e.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Personal File:
                  <textarea
                    value={editingPatient.patientFile}
                    onChange={(e) =>
                      setEditingPatient((prev) => ({
                        ...prev,
                        patientFile: e.target.value,
                      }))
                    }
                  />
                </label>
                <div className="button-group">
                  <button type="submit">Save Changes</button>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p>Loading...</p>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
