import { db } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import './Profile.css';

const Profile: React.FC = () => {
  const [studentData, setStudentData] = useState<DocumentData | null>(null);
  const [courses, setCourses] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setStudentData(userData);
          
          // Fetch enrolled courses using the subjects field
          if (userData.subjects && userData.subjects.length > 0) {
            fetchCourses(userData.subjects);
          }
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No user is signed in');
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [auth]);

  // Fetch course details for enrolled subjects
  const fetchCourses = async (subjects: string[]) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const enrolledCourses: DocumentData[] = [];
      
      querySnapshot.forEach((doc) => {
        const courseData = doc.data();
        if (subjects.includes(courseData.name)) {
          enrolledCourses.push(courseData);
        }
      });

      setCourses(enrolledCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!studentData) return <p>No student data found.</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">{studentData.avatar}</div>
        <h1 className="profile-name">{studentData.name}</h1>
        <p className="profile-info">{studentData.username}</p>
        <p className="profile-info">{studentData.role}</p>
        <p className="profile-info">{studentData.course}</p>
      </div>

      <div className="courses-container">
        <h1 className="courses-header">Your Enrolled Courses</h1>
        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <h2>{course.name}</h2>
                <p>{course.description}</p>
                <p>Instructor: {course.instructor}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
