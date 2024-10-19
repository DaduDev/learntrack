import React, { useEffect, useState } from 'react';
import './Recommendations.css';

// Sample Faculty Data
const facultyData = [
    { name: 'Dr. Smith', subject: 'Data Structures', experience: 10, rating: 4.5 },
    { name: 'Dr. Johnson', subject: 'Algorithms', experience: 8, rating: 4.0 },
    { name: 'Dr. Williams', subject: 'Computer Networks', experience: 5, rating: 4.8 },
    { name: 'Dr. Brown', subject: 'Operating Systems', experience: 12, rating: 4.2 },
    { name: 'Dr. Jones', subject: 'Machine Learning', experience: 6, rating: 4.7 },
];

// Sample Courses Data
const coursesData = [
    { name: 'Data Structures' },
    { name: 'Algorithms' },
    { name: 'Computer Networks' },
    { name: 'Operating Systems' },
    { name: 'Machine Learning' },
];

const Recommendations = () => {
    const [subjects, setSubjects] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [recommendedFaculty, setRecommendedFaculty] = useState<{ name: string; subject: string; experience: number; rating: number; }[]>([]);

    useEffect(() => {
        // Initialize subjects from coursesData
        const fetchedSubjects = coursesData.map(course => course.name);
        setSubjects(fetchedSubjects);
    }, []);

    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const subject = event.target.value;
        setSelectedSubject(subject);
        recommendFaculty(subject);
    };

    const recommendFaculty = (subject: string) => {
        const filteredFaculty = facultyData.filter(faculty => faculty.subject === subject);
        setRecommendedFaculty(filteredFaculty);
    };

    return (
        <div className="recommendation-card">
            <h2>Faculty Recommendations</h2>
            <label htmlFor="subject-select">Select a Subject:</label>
            <select id="subject-select" onChange={handleSubjectChange} value={selectedSubject}>
                <option value="">--Please choose a subject--</option>
                {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                        {subject}
                    </option>
                ))}
            </select>

            {recommendedFaculty.length > 0 && (
                <div className="faculty-list">
                    <h3>Recommended Faculty:</h3>
                    <ul>
                        {recommendedFaculty.map((faculty, index) => (
                            <li key={index} className="faculty-item">
                                <strong>{faculty.name}</strong> - Experience: {faculty.experience} years, Rating: {faculty.rating} ⭐
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {recommendedFaculty.length === 0 && selectedSubject && (
                <p>No faculty members found for this subject.</p>
            )}
        </div>
    );
};

export default Recommendations;
