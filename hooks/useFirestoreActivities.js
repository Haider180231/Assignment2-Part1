import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';

const useFirestoreActivities = (specialOnly = false) => {
  const [activities, setActivities] = useState([]);
  const db = getFirestore(); 

  useEffect(() => {
    let q = collection(db, 'activities');
    if (specialOnly) {
      q = query(q, where('isSpecial', '==', true));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newActivities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivities(newActivities);
    });

    return () => unsubscribe();
  }, [specialOnly, db]); 

  return activities;
};

export default useFirestoreActivities;
