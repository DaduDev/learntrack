import React from 'react';

const Assignments: React.FC = () => {
    return (
        <div>
            <h2>Assignments Section</h2>
            <p>Manage and assign tasks here.</p>
            <div>
                <h3>Current Assignments</h3>
                <ul>
                    <li>Assignment 1: Introduction to Programming (Due: 2024-10-30)</li>
                    <li>Assignment 2: Data Structures (Due: 2024-11-05)</li>
                </ul>
            </div>
        </div>
    );
};

export default Assignments;
