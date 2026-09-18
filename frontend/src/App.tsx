import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeChat from './pages/EmployeeChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<EmployeeChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;