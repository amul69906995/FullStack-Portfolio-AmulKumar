import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Admin from './components/Admin.jsx';
import Layout from './Layout.jsx';
import EmailVerification from './components/EmailVerification.jsx';
import Login from './components/Login.jsx';
import { ThemeProvider } from './common/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedLayout from './ProtectedLayout.jsx';
import Profile from './components/Profile.jsx';
import AddCompany from './components/AddCompany.jsx';
import AddTemplate from './components/AddTemplate.jsx';
import EditProfile from './components/EditProfile.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Admin />,
      },
      {
        path: 'emailverification',
        element: <EmailVerification />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'protected',
        element: <ProtectedLayout />,
        children: [
          {
            path: 'portfolio',
            element: <App />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'addcompany',
            element: <AddCompany />
          },
          {
            path: 'addtemplate',
            element: <AddTemplate/>
          },
          {
            path:"editprofile",
            element:<EditProfile/>
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
