import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'; 
import styles from './Courses.module.css'; // Import CSS module
import { getAuth } from 'firebase/auth';

interface Course {
    id: string;
    name: string;
    description: string;
    instructor: string;
}

const MAX_THEORY_ENROLLS = 5; // Maximum allowed theory subjects
const MAX_LAB_ENROLLS = 2; // Maximum allowed lab subjects

const CourseList: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]); // Track enrolled courses
    const [theoryCourses, setTheoryCourses] = useState<Course[]>([]); // Theory courses
    const [labCourses, setLabCourses] = useState<Course[]>([]); // Lab courses
    const db = getFirestore();
    const auth = getAuth(); 
    const currentUser = auth.currentUser;

    // Fetch all courses from Firestore
    const fetchCourses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "courses"));
            const coursesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Course[];
            setCourses(coursesData);
            filterCourses(coursesData); // Filter courses after fetching
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    // Separate theory and lab courses based on the 'name' field
    const filterCourses = (courses: Course[]) => {
        const theory = courses.filter(course => !course.name.toLowerCase().includes("lab"));
        const labs = courses.filter(course => course.name.toLowerCase().includes("lab"));
        setTheoryCourses(theory);
        setLabCourses(labs);
    };

    // Fetch enrolled courses of the current user
    const fetchUserEnrollments = async () => {
        if (!currentUser) return;
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        setEnrolledCourses(userDoc.data()?.subjects || []);
    };

    useEffect(() => {
        fetchCourses();
        fetchUserEnrollments();
    }, []);

    const countEnrolledTheory = () => {
        return enrolledCourses.filter(course => !course.toLowerCase().includes("lab")).length;
    };

    const countEnrolledLabs = () => {
        return enrolledCourses.filter(course => course.toLowerCase().includes("lab")).length;
    };

    // Handle enrollment with a limit for theory and lab courses
    const handleEnroll = async (courseName: string) => {
        if (!currentUser) return;
        
        const isLabCourse = courseName.toLowerCase().includes("lab");
        const theoryEnrolledCount = countEnrolledTheory();
        const labEnrolledCount = countEnrolledLabs();

        if (!isLabCourse && theoryEnrolledCount >= MAX_THEORY_ENROLLS) {
            alert(`You can only enroll in up to ${MAX_THEORY_ENROLLS - 1} theory subjects.`);
            return;
        }
        
        if (isLabCourse && labEnrolledCount >= MAX_LAB_ENROLLS) {
            alert(`You can only enroll in up to ${MAX_LAB_ENROLLS} lab subjects.`);
            return;
        }

        const userRef = doc(db, "users", currentUser.uid);

        try {
            const userDoc = await getDoc(userRef);
            const updatedSubjects = [...(userDoc.data()?.subjects || []), courseName];
            await updateDoc(userRef, { subjects: updatedSubjects });
            setEnrolledCourses(updatedSubjects);
            alert(`Enrolled in ${courseName}`);
        } catch (error) {
            console.error("Error enrolling subject:", error);
        }
    };

    // Handle unenrollment
    const handleUnenroll = async (courseName: string) => {
        if (!currentUser) return;

        const userRef = doc(db, "users", currentUser.uid);

        try {
            const updatedSubjects = enrolledCourses.filter(course => course !== courseName);
            await updateDoc(userRef, { subjects: updatedSubjects });
            setEnrolledCourses(updatedSubjects);
            alert(`Unenrolled from ${courseName}`);
        } catch (error) {
            console.error("Error unenrolling subject:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Available Courses</h1>
            
            {/* Display theory courses first */}
            <h2 className={styles.subTitle}>Theory Courses</h2>
            <div className={styles.courseGrid}>
                {theoryCourses.map((course) => (
                    <div key={course.id} className={styles.courseCard}>
                        <h2 className={styles.courseTitle}>{course.name}</h2>
                        <p className={styles.courseDescription}>
                            {course.description.length > 120 
                                ? `${course.description.slice(0, 120)}...` 
                                : course.description
                            }
                        </p>
                        <p className={styles.courseInstructor}>
                            <strong>Instructor:</strong> {course.instructor}
                        </p>
                        {enrolledCourses.includes(course.name) ? (
                            <div>
                                <button className={styles.enrolledButton} disabled>Enrolled</button>
                                <button className={styles.unenrollButton} onClick={() => handleUnenroll(course.name)}>
                                    Unenroll
                                </button>
                            </div>
                        ) : (
                            <button className={styles.enrollButton} onClick={() => handleEnroll(course.name)}>
                                Enroll Now
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Display lab courses next */}
            <h2 className={styles.subTitle}>Lab Courses</h2>
            <div className={styles.courseGrid}>
                {labCourses.map((course) => (
                    <div key={course.id} className={styles.courseCard}>
                        <h2 className={styles.courseTitle}>{course.name}</h2>
                        <p className={styles.courseDescription}>
                            {course.description.length > 120 
                                ? `${course.description.slice(0, 120)}...` 
                                : course.description
                            }
                        </p>
                        <p className={styles.courseInstructor}>
                            <strong>Instructor:</strong> {course.instructor}
                        </p>
                        {enrolledCourses.includes(course.name) ? (
                            <div>
                                <button className={styles.enrolledButton} disabled>Enrolled</button>
                                <button className={styles.unenrollButton} onClick={() => handleUnenroll(course.name)}>
                                    Unenroll
                                </button>
                            </div>
                        ) : (
                            <button className={styles.enrollButton} onClick={() => handleEnroll(course.name)}>
                                Enroll Now
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
