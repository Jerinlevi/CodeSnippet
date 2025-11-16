import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Snippets from './pages/Snippets';
import AddSnippet from './pages/AddSnippet';

function App() {
  const { token } = useContext(AuthContext); // Use token from AuthContext

  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/snippets"
            element={
              <ProtectedRoute>
                <Snippets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets/new"
            element={
              <ProtectedRoute>
                <AddSnippet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets/:id"
            element={
              <ProtectedRoute>
                <AddSnippet />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/snippets" : "/login"} replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
