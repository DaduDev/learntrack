import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login.tsx'
import App from './App.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import Logout from './pages/StudentPage/Logout.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Profile from './pages/StudentPage/Profile.tsx'
import Courses from './pages/StudentPage/Courses.tsx'
import Faculty from './pages/StudentPage/Faculty.tsx'
import Recommendations from './pages/StudentPage/Recommendations.tsx'
import VRExperience from './pages/StudentPage/VRExperience.tsx'
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard.tsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/courses',
    element: <Courses />,
  },
  {
    path: '/admin',
    element: <TeacherDashboard />
  },
  {path: '/faculty', element: <Faculty />},
  {path: '/recommendations', element: <Recommendations />},
  {path: '/vr-experience', element: <VRExperience />},
  {path: '/logout', element: <Logout />},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
