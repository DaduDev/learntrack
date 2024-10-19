import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faChalkboardTeacher, faThumbsUp, faVrCardboard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import Profile from '../StudentPage/Profile';
import Faculty from '../StudentPage/Faculty';
import VRExperience from '../StudentPage/VRExperience';
import Courses from '../StudentPage/Courses';
import ChatBot from '@/components/ChatBot/ChatBot';
import Recommendations from '../StudentPage/Recommendations';
import Logout from '../StudentPage/Logout';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-app">
      {/* Sidebar */}
      <nav className="sidebar">
        <h1 className="company-name" style={{
          color: 'white',
        }}>Learn Track</h1>
        <ul>
          <li
            className={activeSection === 'profile' ? 'active' : ''}
            onClick={() => handleSectionClick('profile')} style={{
              display: 'flex',
              padding: '10px 20px',
            }}
          >
            <>
              <FontAwesomeIcon icon={faUser} /> <span style={{
                marginLeft: '10px',
              }}>Profile</span>
            </>
          </li>
          <li
            className={activeSection === 'courses' ? 'active' : ''}
            onClick={() => handleSectionClick('courses')}style={{
              display: 'flex',
              padding: '10px 20px',
            }}
          >
            <FontAwesomeIcon icon={faBook} /> <span style={{
                marginLeft: '10px',
              }}>Courses</span>
          </li>
          <li
            className={activeSection === 'faculty' ? 'active' : ''}
            onClick={() => handleSectionClick('faculty')}style={{
              display: 'flex',
              padding: '10px 20px',
            }}
          >
            <FontAwesomeIcon icon={faChalkboardTeacher} /> <span style={{
                marginLeft: '10px',
              }}>Faculty Members</span>
          </li>
          <li
            className={activeSection === 'recommendations' ? 'active' : ''}
            onClick={() => handleSectionClick('recommendations')}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> <span style={{
                marginLeft: '10px',
              }}>Recommendations</span>
          </li>
          <li
            className={activeSection === 'vr' ? 'active' : ''}
            onClick={() => handleSectionClick('vr')}style={{
              display: 'flex',
              padding: '10px 20px',
            }}
          >
            <FontAwesomeIcon icon={faVrCardboard} /> <span style={{
                marginLeft: '10px',
              }}>VR Experience</span>
          </li>
          <li
            className={activeSection === 'logout' ? 'active' : ''}
            onClick={() => handleSectionClick('logout')}style={{
              display: 'flex',
              padding: '10px 20px',
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> <span style={{
                marginLeft: '10px',
              }}>Logout</span>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="dashboard-content">
        {activeSection === 'profile' && (
          <section id="profile">
            <Profile />
          </section>
        )}

        {activeSection === 'courses' && (
          <section id="courses">
            <Courses />
          </section>
        )}

        {activeSection === 'faculty' && (
          <section id="faculty">
            <Faculty />
          </section>
        )}

        {activeSection === 'recommendations' && (
          <section id="recommendations">
            <Recommendations />
          </section>
        )}

        {activeSection === 'vr' && (
          <section id="vr">
            <VRExperience />
          </section>
        )}

        {activeSection === 'logout' && (
          <section id="logout">
            <Logout />
          </section>
        )}
      </div>
      <ChatBot />
    </div>
  );
};

export default Dashboard;
