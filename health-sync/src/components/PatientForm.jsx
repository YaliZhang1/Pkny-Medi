import React, { useState, useEffect } from "react";
import { getPatients } from "../../src/api/fetchPatients";
import "../styles/patientForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../components/ui/modal";

export default function PatientForm({ onAddPatient }) {
  const [patient, setPatient] = useState({
    name: "",
    location: {
      postcode: "",
    },
    dateHour: new Date(), //Initially the current time
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const handleChangeName = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeNumber = (e) => {
    const postcodeValue = e.target.value;
    setPatient(prevPatient => ({
      ...prevPatient,
      location: {
        ...prevPatient.location,
        postcode: postcodeValue
      }
    }));
  };
  const handleDateChange = (date) => {
    setPatient({
      ...patient,
      dateHour: date, // Store Date objects
    });
    setIsDatePickerOpen(false);
  };

  const handleAddPatient = () => {
    if (!patient.name || !patient.location.postcode || !patient.dateHour) {
      alert("Please fill in complete patient information");
      return;
    }

    // 💡 Make sure the format is correct and convert to ISO standard format
    const formattedDate = patient.dateHour.toISOString();

    const newPatient = {
      name: { first: patient.name, last: "" },
      location: { postcode: patient.location.postcode },
      registered: { date: formattedDate }, // Save to database format
    };

    onAddPatient(newPatient); // Call the method passed by `Dashboard` to update the data
    setPatient({ name: "", location: { postcode: "" }, dateHour: new Date() }); // Clear input box
  };
  return (
    <div className="taskListsContainer">
      <div className="taskLists">
        <input
          type="text"
          name="name"
          className="taskItem"
          placeholder="Patient's Name"
          value={patient.name}
          onChange={handleChangeName}
        />
        <input
          type="text"
          name="postcode"
          className="taskItem"
          placeholder="Patient's Personal Number"
          value={patient.location.postcode}
          onChange={handleChangeNumber}
        />
        <button
          className="datePicker-button taskItem chooseTimeIcon"
          onClick={() => setIsDatePickerOpen(true)}
        >
          Choose time
        </button>
      </div>

      <button className="button dashboard-button" onClick={handleAddPatient}>
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
