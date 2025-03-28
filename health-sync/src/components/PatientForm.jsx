import React, { useState, useEffect } from "react";
import { getPatients } from "../../src/api/fetchPatients";
import { fetchPatientsData } from "../../src/api/fetchPatientsData";
import { addPatient } from "../../src/api/addPatient";
import "../styles/patientForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../components/ui/modal";

export default function PatientForm({ onAddPatient }) {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("PatientForm rendered");
  const [patient, setPatient] = useState({
    patientName: "",
    patientID: "",
    patientFile: "",
    dateHour: new Date(), //Initially the current time
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeNumber = (e) => {
    setPatient({
      ...patient,
      patientID: e.target.value, // 直接修改 patientID
    });
  };

  const handleDateChange = (date) => {
    setPatient((prev) => ({
      ...prev,
      dateHour: date,
    }));
    setIsDatePickerOpen(false);
  };

  // const handleAddPatient = () => {
  //   if (!patient.name || !patient.location.postcode || !patient.dateHour) {
  //     alert("Please fill in complete patient information");
  //     return;
  //   }

  //   // 💡 Make sure the format is correct and convert to ISO standard format
  //   const formattedDate = patient.dateHour.toISOString();

  //   const newPatient = {
  //     name: { first: patient.name, last: "" },
  //     location: { postcode: patient.location.postcode },
  //     registered: { date: formattedDate }, // Save to database format
  //   };

  //   onAddPatient(newPatient); // Call the method passed by `Dashboard` to update the data
  //   setPatient({ name: "", location: { postcode: "" }, dateHour: new Date() }); // Clear input box
  // };


  const handleAddNewPatient = async () => {
    if (!patient?.patientName?.trim() || !patient?.patientID?.trim() || !patient?.patientFile?.trim()) {
      alert("Please fill in complete patient information");
      return;
    }
  
    const formattedDate = patient.dateHour ? new Date(patient.dateHour).toISOString() : new Date().toISOString();
  
    const newPatient = {
      patientName: patient.patientName.trim(),
      patientID: patient.patientID.trim(),
      patientFile: patient.patientFile.trim(),
      registered: { date: formattedDate },
    };
  
    try {
      const result = await addPatient(newPatient); // 调用 API 发送数据
      console.log("API Response:", result);
      if (result.success) {
        alert("Patient added successfully!");
  
      
         // 重新拉取数据，确保数据同步
      const updatedPatients = await fetchPatientsData();
      setPatients(updatedPatients);
  
        // 触发父组件的更新（如果 `onAddPatient` 被传入）
        if (typeof onAddPatient === "function") {
          onAddPatient(newPatient);
        }
      } else {
        alert(`Failed to add patient: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Something went wrong. Please try again.");
    }
  
    // 清空表单
    setPatient({
      patientName: "",
      patientID: "",
      patientFile: "",
      dateHour: new Date(),
    });
  };
  
    return (
      <div className="taskListsContainer">
        <div className="taskLists">
          <input
            type="text"
            name="patientName"
            className="taskItem"
            placeholder="Patient's Name"
            value={patient.patientName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="patientID"
            className="taskItem"
            placeholder="Patient's Personal Number"
            value={patient.patientID}
            onChange={handleChangeNumber}
          />
          <textarea
            // id="message"
            name="patientFile"
            rows="5"
            cols="50"
            className="taskItem"
            placeholder="Patient's File"
            value={patient.patientFile}
            onChange={handleChange}
          />
          <button
            className="datePicker-button taskItem chooseTimeIcon"
            onClick={() => setIsDatePickerOpen(true)}
          >
            Choose time
          </button>
        </div>

        <button
          className="button dashboard-button"
          onClick={handleAddNewPatient}
        >
          Add
        </button>
        <Modal
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
        >
          <DatePicker
            selected={patient.dateHour}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="yyyy/MM/dd HH:mm"
            timeIntervals={5} // Control time interval
            inline
            table-caption
          />
        </Modal>
      </div>
    );
  };

