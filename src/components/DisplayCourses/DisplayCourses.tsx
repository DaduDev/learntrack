import React from 'react';
import './DisplayCourses.css'; 

interface Course {
    id: number;
    name: string;
    description: string;
}

const courses: Course[] = [
    {
        id: 1,
        name: 'Computer Science Engineering',
        description: 'Learn the fundamentals of computer science, algorithms, and programming languages.'
    },
    {
        id: 2,
        name: 'Information Technology',
        description: 'Focus on IT infrastructure, network management, and database systems.'
    },
    {
        id: 3,
        name: 'Mechanical Engineering',
        description: 'Explore principles of mechanics, thermodynamics, and material science.'
    },
    {
        id: 4,
        name: 'Electrical Engineering',
        description: 'Study electrical circuits, systems, and electronic devices.'
    },
    {
        id: 5,
        name: 'Civil Engineering',
        description: 'Understand the design and construction of infrastructure projects.'
    },
];

const DisplayCourses: React.FC = () => {
    return (
        <div className="course-card-container">
            <h2>Available Courses in Engineering and Technology</h2>
            <div className="course-cards">
                {courses.map((course) => (
                    <div className="course-card" key={course.id}>
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayCourses;
