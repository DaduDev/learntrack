// src/hooks/useTeachers.ts
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useTeachers = (userIds: string[]) => {
    interface Teacher {
        feedback: string [];
        subjects: string [];
        name: string;
        id: string;
        // Add other fields that a teacher object should have
        // For example:
        // name: string;
        // subject: string;
    }

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchTeachers = async () => {
            if (userIds.length > 0) {
                const teachersQuery = query(collection(db, 'teachers'), where('userId', 'in', userIds));
                const teachersSnap = await getDocs(teachersQuery);
                const teachersData = teachersSnap.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        feedback: data.feedback || [],
                        subjects: data.subjects || [],
                        name: data.name || '',
                        // Add other fields that a teacher object should have
                    };
                });
                setTeachers(teachersData);
            }
        };

        fetchTeachers();
    }, [userIds, db]);

    return teachers;
};

export default useTeachers;
