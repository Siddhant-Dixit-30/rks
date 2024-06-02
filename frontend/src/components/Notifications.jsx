import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  async function getNotifications() {
    try {
      const response = await fetch("http://localhost:8000/notifications");
      const result = await response.json();
      if (response.ok) {
        setNotifications(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch notifications");
    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="container my-2">
      <h2>Notifications and Alerts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {notifications.map((notification) => (
          <li key={notification.id} className="list-group-item">
            <h5>{notification.title}</h5>
            <p>{notification.message}</p>
            <small>{new Date(notification.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
