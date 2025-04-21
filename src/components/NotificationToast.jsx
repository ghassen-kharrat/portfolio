import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiInfo, FiAlertTriangle } from 'react-icons/fi';

/**
 * Configurable notification toast for user feedback
 * Supports different types (success, error, info, warning)
 */
const NotificationToast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  position = 'bottom-right'
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose && onClose();
        }, 300); // Allow exit animation to complete
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  // Icons based on notification type
  const icons = {
    success: <FiCheck className="text-green-400" />,
    error: <FiX className="text-red-400" />,
    info: <FiInfo className="text-blue-400" />,
    warning: <FiAlertTriangle className="text-yellow-400" />
  };
  
  // Colors based on notification type
  const colors = {
    success: 'border-green-400 bg-green-400/10',
    error: 'border-red-400 bg-red-400/10',
    info: 'border-blue-400 bg-blue-400/10',
    warning: 'border-yellow-400 bg-yellow-400/10'
  };
  
  // Position classes
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  };
  
  // Calculate progress
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (duration !== Infinity) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [duration]);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed z-[1000] ${positions[position]} max-w-sm w-full pointer-events-auto`}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          layout
        >
          <motion.div 
            className={`rounded-lg shadow-lg p-4 border-l-4 ${colors[type]} backdrop-blur-md bg-opacity-80 flex items-start`}
            initial={{ x: 20 }}
            animate={{ x: 0 }}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {icons[type]}
            </div>
            
            {/* Content */}
            <div className="flex-1 mr-2">
              <p className="text-sm text-light-gray">{message}</p>
            </div>
            
            {/* Close button */}
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(() => onClose && onClose(), 300);
              }}
              className="flex-shrink-0 text-light-gray hover:text-lightest-gray transition-colors"
              aria-label="Close notification"
            >
              <FiX />
            </button>
          </motion.div>
          
          {/* Progress bar */}
          {duration !== Infinity && (
            <motion.div 
              className="h-1 bg-secondary rounded-b-lg origin-left"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Notification manager component that handles multiple notifications
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Add a new notification
  const addNotification = (notification) => {
    const id = Date.now().toString();
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { ...notification, id }
    ]);
    return id;
  };
  
  // Remove a notification by id
  const removeNotification = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  // Context value
  const contextValue = {
    notifications,
    addNotification,
    removeNotification
  };
  
  return (
    <>
      {children}
      
      {/* Render notifications */}
      <div className="notification-container">
        {notifications.map(notification => (
          <NotificationToast
            key={notification.id}
            {...notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </>
  );
};

export default NotificationToast; 