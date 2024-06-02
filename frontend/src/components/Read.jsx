import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    skills: "",
    experience: "",
    department: ""
  });

  const fuse = new Fuse(data, {
    keys: ["name", "department", "skills", "experience", "performanceReview"],
    threshold: 0.3, // Adjust the threshold for fuzzy search
  });

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "DELETE",
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  async function getData() {
    const response = await fetch("http://localhost:8000");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setFilteredData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, filterOptions]);

  const handleSearchAndFilter = () => {
    let result = data;

    // Apply fuzzy search
    if (searchQuery) {
      result = fuse.search(searchQuery).map(({ item }) => item);
    }

    // Apply filters
    if (filterOptions.skills) {
      result = result.filter((item) =>
        item.skills.toLowerCase().includes(filterOptions.skills.toLowerCase())
      );
    }
    if (filterOptions.experience) {
      result = result.filter(
        (item) => item.experience.toString() === filterOptions.experience
      );
    }
    if (filterOptions.department) {
      result = result.filter((item) =>
        item.department.toLowerCase().includes(filterOptions.department.toLowerCase())
      );
    }

    setFilteredData(result);
  };

  const handleFilterChange = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger"> {error} </div>}
      
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by skills"
          name="skills"
          value={filterOptions.skills}
          onChange={handleFilterChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by experience"
          name="experience"
          value={filterOptions.experience}
          onChange={handleFilterChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by department"
          name="department"
          value={filterOptions.department}
          onChange={handleFilterChange}
        />
      </div>

      <div className="row">
        {filteredData.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Department: {ele.department}</h6>
                <p className="card-text">Skills: {ele.skills}</p>
                <p className="card-text">Experience: {ele.experience} years</p>
                <p className="card-text">Performance Review: {ele.performanceReview}</p>
                <Link className="card-link" onClick={() => handleDelete(ele._id)}>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
