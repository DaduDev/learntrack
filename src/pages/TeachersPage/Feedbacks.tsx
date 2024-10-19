import React from 'react';

const Feedbacks: React.FC = () => {
    return (
        <div>
            <h2>Feedbacks Section</h2>
            <p>Check student feedback here.</p>
            <ul>
                <li>
                    <strong>Student A:</strong> Great lectures!
                </li>
                <li>
                    <strong>Student B:</strong> Needs to explain concepts more clearly.
                </li>
            </ul>
        </div>
    );
};

export default Feedbacks;
