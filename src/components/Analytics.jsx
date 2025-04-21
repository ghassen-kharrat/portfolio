import React, { useEffect, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();
  const [pageViewsSent, setPageViewsSent] = useState(0);
  const [sessionId, setSessionId] = useState('');
  
  // Generate a unique session ID on component mount
  useEffect(() => {
    const generateSessionId = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
    
    // Get existing session ID or create a new one
    const existingSessionId = localStorage.getItem('portfolio_session_id');
    const newSessionId = existingSessionId || generateSessionId();
    
    if (!existingSessionId) {
      localStorage.setItem('portfolio_session_id', newSessionId);
    }
    
    setSessionId(newSessionId);
    
    // Track initial page load
    trackPageView(location.pathname);
    
    // Clean up function
    return () => {
      // Track user leaving the site
      trackEvent('user_exit', { exitPage: location.pathname });
    };
  }, []);
  
  // Track page views when location changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  
  // Track page view
  const trackPageView = useCallback((path) => {
    try {
      const data = {
        sessionId,
        path,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        viewCount: pageViewsSent + 1,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
      };
      
      // Log pageview to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics - Page View:', data);
      }
      
      // In a real implementation, you would send this data to your analytics service
      // Example: sendToAnalyticsService('pageview', data);
      
      setPageViewsSent(prev => prev + 1);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [sessionId, pageViewsSent]);
  
  // Track custom events
  const trackEvent = useCallback((eventName, eventData = {}) => {
    try {
      const data = {
        sessionId,
        event: eventName,
        path: location.pathname,
        timestamp: new Date().toISOString(),
        ...eventData
      };
      
      // Log event to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics - Event:', data);
      }
      
      // In a real implementation, you would send this data to your analytics service
      // Example: sendToAnalyticsService('event', data);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, [sessionId, location.pathname]);
  
  // Track scroll depth
  useEffect(() => {
    let scrollDepthMarkers = [25, 50, 75, 100];
    let markersSent = [];
    
    const handleScroll = () => {
      // Calculate scroll depth as percentage
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      // Don't track if document isn't scrollable
      if (docHeight <= windowHeight) return;
      
      const scrollPercent = Math.round((scrollTop / (docHeight - windowHeight)) * 100);
      
      // Check if we've passed any depth markers
      scrollDepthMarkers.forEach(marker => {
        if (scrollPercent >= marker && !markersSent.includes(marker)) {
          trackEvent('scroll_depth', { depth: marker });
          markersSent.push(marker);
        }
      });
    };
    
    const throttledHandleScroll = throttle(handleScroll, 500);
    window.addEventListener('scroll', throttledHandleScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [trackEvent]);
  
  // Track user engagement time
  useEffect(() => {
    let engagementInterval;
    let engagementTime = 0;
    let isActive = true;
    
    // Track active/inactive state
    const handleVisibilityChange = () => {
      isActive = document.visibilityState === 'visible';
      trackEvent('visibility_change', { isVisible: isActive });
    };
    
    // Update engagement time every 10 seconds if page is visible
    engagementInterval = setInterval(() => {
      if (isActive) {
        engagementTime += 10;
        
        // Track engagement milestones (30s, 1m, 2m, 5m)
        if ([30, 60, 120, 300].includes(engagementTime)) {
          trackEvent('engagement_milestone', { seconds: engagementTime });
        }
      }
    }, 10000);
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(engagementInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Track final engagement time
      trackEvent('total_engagement', { seconds: engagementTime });
    };
  }, [trackEvent]);
  
  // Utility function to throttle function calls
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Create a globally accessible analytics API
  useEffect(() => {
    // Expose analytics methods globally for use in other components
    window.portfolioAnalytics = {
      trackEvent,
      pageView: trackPageView
    };
    
    // Add click tracking to interactive elements
    const addClickTracking = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(element => {
        if (!element.hasAttribute('data-analytics-attached')) {
          element.setAttribute('data-analytics-attached', 'true');
          element.addEventListener('click', (e) => {
            const targetEl = e.currentTarget;
            const data = {
              targetType: targetEl.tagName.toLowerCase(),
              targetId: targetEl.id || null,
              targetClass: targetEl.className || null,
              targetText: targetEl.innerText || null,
              targetHref: targetEl.href || null
            };
            trackEvent('element_click', data);
          });
        }
      });
    };
    
    // Add tracking to all interactive elements, and monitor DOM changes
    addClickTracking();
    
    // Set up a mutation observer to track dynamic content
    const observer = new MutationObserver(addClickTracking);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => {
      delete window.portfolioAnalytics;
      observer.disconnect();
    };
  }, [trackEvent, trackPageView]);
  
  // This component doesn't render anything visible
  return null;
};

export default Analytics; 