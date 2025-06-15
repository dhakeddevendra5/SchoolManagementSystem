import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Lazy loading for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Students = lazy(() => import('./pages/Students'));
const StudentView = lazy(() => import('./components/students/StudentView'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const StudentForm = lazy(() => import('./components/students/StudentForm'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const routes = [
  {
    path: '/',
    element: <Home />,
    exact: true
  },
  {
    path: '/login',
    element: <Login /> // Add this route
  },
  {
    path: '/register',
    element: <Register /> // Add this route
  },
  {
    path: '/students/new',
    element: <StudentForm />,
    protected: true
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/students',
    element: <Students />,
    protected: false
  },
  {
    path: '/students/:id',
    element: <StudentView />,
    protected: true
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
];

export default routes;