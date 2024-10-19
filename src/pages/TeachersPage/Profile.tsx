// Profile.tsx
import React from 'react';

const Profile: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null'); // Get user data from local storage

    // Inline styles
    const containerStyle: React.CSSProperties = {
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        maxWidth: '600px',
        margin: '20px auto',
    };

    const headingStyle: React.CSSProperties = {
        fontSize: '24px',
        color: '#333',
    };

    const infoStyle: React.CSSProperties = {
        fontSize: '18px',
        color: '#555',
        margin: '8px 0',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Profile Section</h2>
            {user ? (
                <div>
                    <h3 style={headingStyle}>Your Information</h3>
                    <p style={infoStyle}>Name: {user.name}</p>
                    <p style={infoStyle}>Email: {user.email}</p>
                    <p style={infoStyle}>Department: Engineering</p> {/* You might want to fetch this from the backend if it's dynamic */}
                </div>
            ) : (
                <p style={infoStyle}>No profile data available. Please log in.</p>
            )}
        </div>
    );
};

export default Profile;
