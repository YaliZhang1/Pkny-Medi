import React, { useState } from "react";

import { fetchPatientsData } from "../../src/api/fetchPatientsData";
import { addPatient } from "../../src/api/addPatient";
import "../styles/patientForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../components/ui/modal";

export default function PatientForm({ onAddPatient }) {
  const [allPatients, setAllPatients] = useState({});
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
      patientID: e.target.value, // Direct modification the patientID
    });
  };

  const handleDateChange = (date) => {
    setPatient((prev) => ({
      ...prev,
      dateHour: date,
    }));
    setIsDatePickerOpen(false);
  };

  const handleAddNewPatient = async () => {
    if (
      !patient?.patientName?.trim() ||
      !patient?.patientID?.trim() ||
      !patient?.patientFile?.trim()
    ) {
      alert("Please fill in complete patient information");
      return;
    }

    const formattedDate = patient.dateHour
      ? new Date(patient.dateHour).toISOString()
      : new Date().toISOString();

    const newPatient = {
      patientName: patient.patientName.trim(),
      patientID: patient.patientID.trim(),
      patientFile: patient.patientFile.trim(),
      registered: { date: formattedDate },
    };

    try {
      const result = await addPatient(newPatient); // Call API to send data

      if (result.success) {
        alert("Patient added successfully!");
        window.gtag("event", "add_patient", {
          user_group: "doctor",//or 'Nurse', in some other cases.
          patient_type: "new",
          method: "manual_entry",
          location: 'Stockholm'// clinic location
        });
        // Re-pull data to ensure data synchronization
        const updatedPatients = await fetchPatientsData();
        setAllPatients(updatedPatients);

        // Trigger an update of the parent component (if `onAddPatient` is passed)
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

    // Clear form
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

      <button className="button dashboard-button" onClick={handleAddNewPatient}>
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
}
