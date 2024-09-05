import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './services/api';
import UserForm from './UserForm.jsx';
import UsersList from './UsersList.jsx';
import './App.css'
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = async (user) => {
    try {
      const response = await createUser(user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async (user) => {
    try {
      await updateUser(user.id, user);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        onSubmit={selectedUser ? handleUpdate : handleCreate}
        selectedUser={selectedUser}
      />
      <UsersList users={users} onEdit={setSelectedUser} onDelete={handleDelete} />
    </div>
  );
}

export default App;
