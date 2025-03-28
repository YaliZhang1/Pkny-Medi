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
import { getPatients } from "../../api/fetchPatients";
import { fetchPatientsData } from "../../api/fetchPatientsData";

import PatientForm from "../../components/PatientForm";
import LeftNavigation from "../../components/LeftNavigation";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPatients, setAllPatients] = useState({}); //Store paginated data
  const [patients, setPatients] = useState([]); //Current page data
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = 5;

  const navigate = useNavigate();
  const handleMobileMenuClick = () => {
    navigate("/mobileMenuPage");
  };
  const handleSeeMoreBtn = () => {
    navigate("/appointmentPage");
  };

  const handleAddNewPatient = (newPatient) => {
    setPatients((prevPatients) => [newPatient, ...prevPatients]); // 添加到前面
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
          <div className="sheet">
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
                patients.map((patient, index) => (
                  <li key={index} className="patient-card ">
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
                    <img className="item" src="./send-sqaure.png" alt="" />
                    <div className="small-icons item">
                      <img src="./note.png" alt="" />
                      <img src="./ashbin.png" alt="" />
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
        </div>
      </div>
    </div>
  );
}
