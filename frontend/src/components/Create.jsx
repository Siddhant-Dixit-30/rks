import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [fname, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState(0);
  const [performanceReview, setPerformanceReview] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { fname, department, skills, experience, performanceReview };
    console.log(addUser);

    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setName("");
      setDepartment("");
      setSkills("");
      setExperience(0);
      setPerformanceReview("");
      setError("");
      navigate("/read");
    }
  };

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Fill the data</h1>

      {error && <div className="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={fname}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input
            type="text"
            className="form-control"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Experience (Years)</label>
          <input
            type="number"
            className="form-control"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Performance Review</label>
          <input
            type="text"
            className="form-control"
            value={performanceReview}
            onChange={(e) => setPerformanceReview(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
