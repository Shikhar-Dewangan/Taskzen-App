import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './Store/authSlice';
import { Header, Footer } from './Components/Index';
import { Outlet } from 'react-router-dom';
import authService from './AppWrite/auth';

function App() {
  const [loading, setloading] = useState(true);  // ✅ boolean se start
  const dispatch = useDispatch();

 useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      }).finally(() => {
        setloading(false);
      });
  }, []);

  // ✅ Loading state handle
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
   <div className=" flex flex-col bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="flex-1 px-6 sm:px-6 py-6" >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;