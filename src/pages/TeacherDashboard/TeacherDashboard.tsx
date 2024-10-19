import React, { useState } from 'react';
import SidebarTeacher from '../../components/TeachersPage/SidebarTeacher';
import Profile from '../TeachersPage/Profile';
import Feedbacks from '../TeachersPage/Feedbacks';
import Assignments from '../TeachersPage/Assignments';
import './TeacherDashboard.css';
import ChatBot from '@/components/ChatBot/ChatBot';

const TeacherDashboard: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('Profile');

    const renderContent = () => {
        switch (selectedSection) {
            case 'Profile':
                return <Profile />;
            case 'Feedbacks':
                return <Feedbacks />;
            case 'Assignments':
                return <Assignments />;
            case 'Logout':
                return <h1>Logout</h1>;
            default:
                return <Profile />;
        }
    }

    return (
        <div className="dashboard-app">
            <SidebarTeacher onSelectSection={setSelectedSection} />
            <div className="dashboard-content">
                {renderContent()}
            </div>
            <ChatBot />
        </div>
    );
}

export default TeacherDashboard;