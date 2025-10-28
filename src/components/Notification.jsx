import { createContext, useContext, useState, useCallback } from "react";
import "./Notification.css";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe usarse dentro de NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(({ title, message, type = "success", duration = 3000 }) => {
    const id = Date.now() + Math.random();
    const notification = { id, title, message, type, hiding: false };

    setNotifications(prev => [...prev, notification]);

    // Auto-ocultar después de la duración especificada
    setTimeout(() => {
      hideNotification(id);
    }, duration);
  }, []);

  const hideNotification = useCallback((id) => {
    // Marcar como "hiding" para activar la animación de salida
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, hiding: true } : notif
      )
    );

    // Eliminar después de que termine la animación
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 300);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map(notif => (
          <Notification
            key={notif.id}
            {...notif}
            onClose={() => hideNotification(notif.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

const Notification = ({ title, message, type, hiding, onClose }) => {
  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ"
  };

  return (
    <div className={`notification ${type} ${hiding ? "hiding" : ""}`}>
      <div className="notification-icon">{icons[type] || icons.success}</div>
      <div className="notification-content">
        {title && <div className="notification-title">{title}</div>}
        <div className="notification-message">{message}</div>
      </div>
      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

