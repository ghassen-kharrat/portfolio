import React, { createContext, useContext, useState } from 'react';
import NotificationToast from '../components/NotificationToast';

// Create context
const NotificationContext = createContext();

/**
 * Context provider for managing notifications across the app
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Add a notification to the stack
  const addNotification = (notification) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
    return id;
  };
  
  // Helper functions for common notification types
  const showSuccess = (message, options = {}) => {
    return addNotification({ message, type: 'success', ...options });
  };
  
  const showError = (message, options = {}) => {
    return addNotification({ message, type: 'error', ...options });
  };
  
  const showInfo = (message, options = {}) => {
    return addNotification({ message, type: 'info', ...options });
  };
  
  const showWarning = (message, options = {}) => {
    return addNotification({ message, type: 'warning', ...options });
  };
  
  // Remove a notification from the stack
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning
      }}
    >
      {children}
      
      {/* Render all current notifications */}
      <div className="notification-container">
        {notifications.map(notification => (
          <NotificationToast
            key={notification.id}
            {...notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

/**
 * Hook for using the notification system
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};

export default NotificationContext; 