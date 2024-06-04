import React, { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", number: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/users");
        if (!res.ok) {
          throw new Error("Network Error");
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Network Error");
      }
      const data = await res.json();
      setUsers([...users, data]);
      setFormData({ name: "", email: "", number: "" }); // Clear form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData.name} id="name" onChange={handleChange} />
        <input type="text" value={formData.email} id="email" onChange={handleChange} />
        <input type="text" value={formData.number} id="number" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <p>{user.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
