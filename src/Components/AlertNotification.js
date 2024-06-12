import { useEffect } from 'react';

// Show notifications based on props
const AlertNotification = ({ errorMessage, messageColor }) => {
  useEffect(() => {
    if (errorMessage) {
      // Display alert with appropriate prefix
      alert(`${messageColor === 'redMessage' ? 'Error: ' : 'Success: '}${errorMessage}`);
    }
  }, [errorMessage, messageColor]); // Run effect on errorMessage 

  return null; 
};

export default AlertNotification;
