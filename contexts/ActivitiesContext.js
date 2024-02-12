import React from 'react';

const ActivitiesContext = React.createContext();

export default ActivitiesContext;

export const ActivitiesProvider = ({ children }) => {
    const [activities, setActivities] = React.useState([]);
  
    const addActivity = (activity) => {
      const newActivity = {
        ...activity,
        id: Date.now() 
      };
      setActivities([...activities, newActivity]);
    };
  
    const removeActivity = (id) => {
      setActivities(activities.filter((activity) => activity.id !== id));
    };

  
    return (
      <ActivitiesContext.Provider value={{ activities, addActivity, removeActivity }}>
        {children}
      </ActivitiesContext.Provider>
    );
  };
  