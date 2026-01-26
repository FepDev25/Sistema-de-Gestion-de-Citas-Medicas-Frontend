import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Placeholder components - will be replaced by real pages
const Login = () => <div className="p-4">Login Page</div>;
const Dashboard = () => <div className="p-4">Dashboard</div>;
const NotFound = () => <div className="p-4">404 Not Found</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
