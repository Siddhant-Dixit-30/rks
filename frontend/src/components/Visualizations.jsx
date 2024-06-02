import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

const Visualizations = () => {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await fetch("http://localhost:8000");
    const result = await response.json();
    if (response.ok) {
      setData(result);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const departmentData = data.reduce((acc, curr) => {
    const department = curr.department;
    if (acc[department]) {
      acc[department]++;
    } else {
      acc[department] = 1;
    }
    return acc;
  }, {});

  

  const departmentChartData = Object.keys(departmentData).map(dept => ({
    name: dept,
    count: departmentData[dept]
  }));

  
  return (
    <div className="container my-2">
      <h2>Employee Demographics</h2>
      <BarChart
        width={600}
        height={300}
        data={departmentChartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      
    </div>
  );
};

export default Visualizations;
