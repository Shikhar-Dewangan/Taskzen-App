import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Store/authSlice';
import authService from '../../AppWrite/auth';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("🔴 Logout button clicked");
    
    try {
      // Step 1: Appwrite se logout
      await authService.logout();
      console.log("🔴 Appwrite logout successful");
      
      // Step 2: Redux se user clear
      dispatch(logout());
      console.log("🔴 Redux logout dispatched");
      
      // Step 3: Redirect to login
      navigate('/login');
      console.log("🔴 Redirected to login");
      
    } catch (error) {
      console.error("🔴 Logout error:", error);
      // ✅ Error aane par bhi Redux clear kar do
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
     className="px-3 py-1 sm:px-4 sm:py-2 bg-red-400 text-blue-800 rounded-lg font-medium hover:bg-blue-50 transition"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;