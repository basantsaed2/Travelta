// import React, { createContext, useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// // import { Toaster } from "react-hot-toast";
// import axios from 'axios';
// // Create a context
// const AuthContext = createContext();

// // Provide the context
// export const ContextProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const userData = localStorage.getItem('user');
//     return userData ? JSON.parse(userData) : null;
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//       localStorage.removeItem("sidebarState")
//     }
//   }, [user]);

//   const login = (userData) => {
//     // const user = JSON.parse(localStorage.getItem('user')); // Retrieve and parse the user object from localStorage
//     setUser(userData);
//   };

// const logout = async () => {
//   setUser(null);
//   localStorage.clear();

// };


//   const toastSuccess = (text) => {
//     toast.success(text);

//   };
//   const toastError = (text) => {
//     toast.error(text);

//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, toastSuccess, toastError }}>
//       <ToastContainer />
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   return React.useContext(AuthContext);
// };


import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try loading Agent user first
    const agentUser = localStorage.getItem('agent_user');
    if (agentUser) return JSON.parse(agentUser);

    // Then try loading SuperAdmin user
    const superadminUser = localStorage.getItem('superadmin_user');
    if (superadminUser) return JSON.parse(superadminUser);

    return null;
  });

  useEffect(() => {
    if (user) {
      const key = user.roles.includes('agent') ? 'agent_user' : 'superadmin_user';
      localStorage.setItem(key, JSON.stringify(user));
    } else {
      localStorage.removeItem('agent_user');
      localStorage.removeItem('superadmin_user');
      localStorage.removeItem('sidebarState');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('agent_user');
    localStorage.removeItem('superadmin_user');
    localStorage.removeItem('sidebarState');
  };

  const toastSuccess = (text) => {
    toast.success(text);
  };

  const toastError = (text) => {
    toast.error(text);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toastSuccess, toastError }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};