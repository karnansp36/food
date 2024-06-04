import React, { useState, useEffect } from 'react'; // Import React and its hooks
import './Home.css'

const Test = () => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [formData, setFormData] = useState({ name: '', email: '', number: '' }); // State to store form data
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing a user
  const [editUserId, setEditUserId] = useState(null); // State to store the ID of the user being edited

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/profile'); // Fetch data from the API
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw error if the response is not ok
        }
        const data = await response.json(); // Parse the JSON data from the response
        setUsers(data); // Set the fetched data to the users state
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors that occur
      }
    };

    fetchUsers(); // Call the fetchUsers function
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (e) => {
    // Handle form input changes
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData(prevFormData => ({
      ...prevFormData, // Spread the previous form data
      [name]: value, // Update the current input's value
    }));
  };

  const handleSubmit = async (e) => {
    // Handle form submission
    e.preventDefault(); // Prevent the default form submission behavior

    if (isEditing) {
      await updateUser(editUserId, formData); // If editing, update the user
    } else {
      await addUser(formData); // If not editing, add a new user
    }

    setFormData({ name: '', email: '', number: '' }); // Reset the form data
    setIsEditing(false); // Reset the editing state
    setEditUserId(null); // Reset the edit user ID
  };

  const addUser = async (user) => {
    // Function to add a new user
    try {
      const response = await fetch('http://localhost:8000/profile', {
        method: 'POST', // Use the POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(user), // Convert the user object to a JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw error if the response is not ok
      }

      const data = await response.json(); // Parse the JSON data from the response
      setUsers([...users, data]); // Add the new user to the users state
    } catch (error) {
      console.error('Error adding user:', error); // Log any errors that occur
    }
  };

  const deleteUser = async (id) => {
    // Function to delete a user
    try {
      const response = await fetch(`http://localhost:8000/profile/${id}`, {
        method: 'DELETE', // Use the DELETE method
      });

      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw error if the response is not ok
      }

      setUsers(users.filter(user => user.id !== id)); // Remove the deleted user from the users state
    } catch (error) {
      console.error('Error deleting user:', error); // Log any errors that occur
    }
  };

  const updateUser = async (id, updatedUser) => {
    // Function to update a user
    try {
      const response = await fetch(`http://localhost:8000/profile/${id}`, {
        method: 'PUT', // Use the PUT method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(updatedUser), // Convert the updated user object to a JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw error if the response is not ok
      }

      const data = await response.json(); // Parse the JSON data from the response
      setUsers(users.map(user => (user.id === id ? data : user))); // Update the user in the users state
    } catch (error) {
      console.error('Error updating user:', error); // Log any errors that occur
    }
  };

  const handleEdit = (user) => {
    // Function to handle editing a user
    setIsEditing(true); // Set the editing state to true
    setEditUserId(user.id); // Set the ID of the user being edited
    setFormData({ name: user.name, email: user.email, number: user.number }); // Populate the form with the user's data
  };

  return (
    <div className="App">
      <h1>User List</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>
      
      <div className="card-container">
        {users.map(user => (
          <div key={user.id} className="card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Number: {user.number}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test; // Export the App component as the default export
