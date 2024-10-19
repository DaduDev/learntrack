import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore'; 
import styles from './FacultyList.module.css';

const Faculty: React.FC = () => {
  interface FacultyMember {
    id: string;
    name: string;
    ratings: number[];
    researchProjects: string[];
    patents: string[];
    academicBackground: string;
    courses: string[];
  }

  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const db = getFirestore();

  const fetchFacultyData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const facultyData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          ratings: data.ratings,
          researchProjects: data.researchProjects,
          patents: data.patents,
          academicBackground: data.academicBackground,
          courses: data.courses,
        } as FacultyMember;
      });
      setFaculty(facultyData);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const handleFeedbackOpen = (facultyName: string) => {
    setSelectedFaculty(facultyName);
    setIsModalOpen(true);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Feedback submitted for ${selectedFaculty}: ${feedback}`);
    setFeedback('');

    if (feedback.trim() === '') return; 

    const teacherQuery = collection(db, 'teachers');
    const querySnapshot = await getDocs(teacherQuery);
    const teacherDoc = querySnapshot.docs.find(doc => doc.data().name === selectedFaculty);

    if (teacherDoc) {
        await updateDoc(teacherDoc.ref, {
            feedback: arrayUnion(feedback), 
        });
        alert('Feedback submitted successfully!');
        setFeedback(''); 
    } else {
        console.error("Error submitting feedback: Teacher not found");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFeedback('');
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Faculty List</h1>
      <ul className={styles.list}>
        {faculty.map((teacher) => (
          <li key={teacher.id} className={styles.listItem}>
            <div className={styles.card}>
              <h2 className={styles.facultyName}>{teacher.name}</h2>
              <p className={styles.facultyDetail}>
                <strong>Ratings:</strong> {teacher.ratings}
              </p>
              <p className={styles.facultyDetail}>
                <strong>Research Projects:</strong> {teacher.researchProjects}
              </p>
              <p className={styles.facultyDetail}>
                <strong>Patents:</strong> {teacher.patents}
              </p>
              <p className={styles.facultyDetail}>
                <strong>Academic Background:</strong> {teacher.academicBackground}
              </p>
              <p className={styles.facultyCourses}>
                <strong>Courses:</strong> {teacher.courses}
              </p>
              <button 
                className={styles.feedbackButton} 
                onClick={() => handleFeedbackOpen(teacher.name)}
              >
                Submit Feedback
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Feedback for {selectedFaculty}</h2>
            <textarea 
              className={styles.feedbackInput} 
              value={feedback} 
              onChange={(e) => setFeedback(e.target.value)} 
              placeholder="Enter your feedback here..."
            />
            <div className={styles.modalActions}>
              <button className={styles.submitButton} onClick={(e) => handleFeedbackSubmit(e)}>Submit</button>
              <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculty;


// // src/pages/TeachersList.tsx
// import React from 'react';
// import useTeachers from '../../useTeacher';
// import useAuth from '../../useAuth'; // Assume you have a hook to get the current user's IDs

// const Facultyt: React.FC = () => {
//     const { userId } = useAuth(); // Get user ID, could be current user's ID
//     const teachers = useTeachers(userId ? [userId] : []); // Fetch teachers based on user ID

//     return (
//         <div>
//             <h1>Teachers</h1>
//             <ul>
//                 {teachers.map(teacher => (
//                     <li key={teacher.id}>
//                         <h2>{teacher.name}</h2>
//                         <p>Subjects: {teacher.subjects.join(', ')}</p>
//                         <p>Feedback: {teacher.feedback.join(', ')}</p>
//                     </li>
//                 ))}
//             </ul>
//             {teachers.length === 0 && <p>No teachers found.</p>}
//         </div>
//     );
// };

// export default Facultyt;
