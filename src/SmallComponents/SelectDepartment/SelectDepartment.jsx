import "./SelectDepartment.css";

import { useState } from "react";

const SelectDepartment = ({ onDepartmentChange, styleSelectDepartment }) => {
  const facultyOptions = {
    Science: [
      "Biochemistry",
      "Biology",
      "Biotechnology",
      "Botany",
      "Chemistry",
      "Computer Science",
      "Geology",
      "Industrial Chemistry",
      "Mathematics",
      "Microbiology",
      "Physics",
      "Statistics",
      "Zoology",
    ],
    Engineering: [
      "Computer Engineering",
      "Electrical and Electronic Engineering",
      "Mechanical Engineering",
    ],
    Arts: [
      "Archaeology and Museum Studies",
      "English and Literary Studies",
      "History and International Studies",
      "Linguistics",
      "Philosophy and Religious Studies",
      "Theatre Arts",
    ],
    SocialSciences: [
      "Economics",
      "Geography",
      "Mass Communication",
      "Political Science",
      "Sociology",
    ],
    Management: [
      "Accounting",
      "Banking and Finance",
      "Business Administration",
      "Public Administration",
    ],
    Education: [
      "Arts and Social Science Education",
      "Educational Foundations",
      "Library and Information Science",
      "Science Education",
    ],
  };

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleFacultyChange = (e) => {
    const faculty = e.target.value;
    setSelectedFaculty(faculty);
    setSelectedDepartment("");
    onDepartmentChange(""); // Reset in parent
  };

  const handleDepartmentChange = (e) => {
    const dept = e.target.value;
    setSelectedDepartment(dept);
    onDepartmentChange(dept); // Send to parent
  };

  return (
    <div className="select-department-div">
      <div>
        <img src="./Images/department.png" alt="department" />

        <select
          value={selectedFaculty}
          onChange={handleFacultyChange}
          className={styleSelectDepartment}
          required
        >
          <option value="" className="select-department-placeholder">
            Select Faculty
          </option>
          {Object.keys(facultyOptions).map((faculty) => (
            <option key={faculty} value={faculty}>
              {faculty}
            </option>
          ))}
        </select>
      </div>

      <div>
        <img src="./Images/department.png" alt="department" />

        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          disabled={!selectedFaculty}
          className={styleSelectDepartment}
          required
        >
          <option value="" className="select-department-placeholder">
            Select Department
          </option>
          {selectedFaculty &&
            facultyOptions[selectedFaculty].map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default SelectDepartment;
