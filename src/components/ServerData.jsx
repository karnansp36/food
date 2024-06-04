import React, { useEffect, useState } from "react";

export default function ServerData() {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', number: '' });
  const [editingUser, setEditingUser] = useState(null);


  //Data FEtching
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8080/profile");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        console.log('Data not Sent');
      } else {
        console.log('Data Sent Successfully');
        const data = await res.json();
        setUser([...user, data]);
        setFormData({ name: '', email: '', number: '' });
      }
    } catch (error) {
      console.log(error);
    }
  }


  //Update User
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUser(user.map(u => (u.id === id ? data : u)));
      setEditingUser(null);
      setFormData({ name: '', email: '', number: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };




  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/profile/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setUser(user.filter(u => u.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="name" />
        <input type="text" id="email" value={formData.email} onChange={handleChange} placeholder="email" />
        <input type="text" id="number" value={formData.number} onChange={handleChange} placeholder="number" />
        <button type="submit">Submit</button>
      </form>

      {user.map((item) => (
        <div key={item.id}>
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.email}</p>
              <p className="card-text">{item.number}</p>
              <button onClick={() => {
                setEditingUser(item.id);
                setFormData({ name: item.name, email: item.email, number: item.number });
              }}>
                Edit
              </button>
              <button onClick={() => { deleteUser(item.id) }}>Delete</button>
            </div>
          </div>

          {editingUser === item.id && (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(item.id); }}>
              <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="name" />
              <input type="text" id="email" value={formData.email} onChange={handleChange} placeholder="email" />
              <input type="text" id="number" value={formData.number} onChange={handleChange} placeholder="number" />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}


