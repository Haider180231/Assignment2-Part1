import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';

const useFirestoreActivities = (importantOnly = false) => {
  const [activities, setActivities] = useState([]);
  const db = getFirestore(); 

  useEffect(() => {
    let q = collection(db, 'activities');
    if (importantOnly) {
      q = query(q, where('important', '==', true)); 
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newActivities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivities(newActivities);
    });

    return () => unsubscribe();
  }, [importantOnly, db]);

  return activities;
};

export default useFirestoreActivities;
