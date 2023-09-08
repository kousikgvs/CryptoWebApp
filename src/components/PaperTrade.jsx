import React from "react";

const NotificationExample = () => {
  const showNotification = () => {
    if ("Notification" in window) {
      // Check if the Notification API is available in the browser
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            new Notification("Notification Title", {
              body: "This is the notification message.",
              icon: "path-to-icon-image.png",
            });
          }
        })
        .catch((error) => {
          console.error("Error requesting notification permission:", error);
        });
    }
  };

  return (
    <div>
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};

export default NotificationExample;
