import React from 'react';
import { getAuth } from 'firebase/auth';

const Logout: React.FC = () => {
  const handleLogout = async () => {
      const auth = getAuth();
      try {
        await auth.signOut();
        alert("You have been logged out.");
        // Optionally, redirect to a different page after logout
        window.location.href = '/login'; // Update this with your login route
      } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred while logging out. Please try again.");
      }
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
