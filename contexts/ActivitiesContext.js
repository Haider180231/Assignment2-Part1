import React from 'react';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const ActivitiesContext = React.createContext();

export default ActivitiesContext;

export const ActivitiesProvider = ({ children }) => {
    const removeActivity = async (id) => {
      const db = getFirestore();
      const activityRef = doc(db, 'activities', id);
    
      try {
        await deleteDoc(activityRef);
        console.log(`Activity with id ${id} has been deleted`);
      } catch (error) {
        console.error("Error removing activity: ", error);
      }
    };

  
    return (
      <ActivitiesContext.Provider value={{ activities, addActivity, removeActivity }}>
        {children}
      </ActivitiesContext.Provider>
    );
  };
  