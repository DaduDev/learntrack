import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faClipboard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './SidebarTeacher.css';
import { getAuth, signOut } from 'firebase/auth';

interface SidebarProps {
    onSelectSection: (section: string) => void;
}

const SidebarTeacher: React.FC<SidebarProps> = ({ onSelectSection }) => {
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully');
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <div className="sidebar">
            <div className="logo-container">
                <h1>Learn Track</h1>
            </div>
            <ul>
                <li onClick={() => onSelectSection('Profile')}>
                    <FontAwesomeIcon icon={faUser} className="fa-icon" />
                    <span>Profile</span>
                </li>
                <li onClick={() => onSelectSection('Feedbacks')}>
                    <FontAwesomeIcon icon={faComments} className="fa-icon" />
                    <span>Feedbacks</span>
                </li>
                <li onClick={() => onSelectSection('Assignments')}>
                    <FontAwesomeIcon icon={faClipboard} className="fa-icon" />
                    <span>Assignments</span>
                </li>
                <li onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" />
                    <span>Logout</span>
                </li>
            </ul>
        </div>
    );
}

export default SidebarTeacher;
