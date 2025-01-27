import React, { useEffect, useState } from 'react';

const TestingPage = () => {
  const [permission, setPermission] = useState(Notification.permission);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermission(permission);
  };

  useEffect(() => {
    if (permission === 'granted') {
      // You can now show notifications
      console.log('Notifications granted!');
    }
  }, [permission]);

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Hello!', {
        body: 'This is a browser notification from React!',
        icon: 'https://your-icon-url.com/icon.png', // Optional icon
      });
    }
  };

  const delayNotification = () => {
    setTimeout(() => {
      showNotification();
    }, 5000); // Delay for 5 seconds
  }

  return (
    <div>
      <button onClick={requestNotificationPermission}>Request Permission</button>
      <button onClick={delayNotification}>Show Notification</button>
      <p>Current Permission: {permission}</p>
    </div>
  );
};

export default TestingPage;
