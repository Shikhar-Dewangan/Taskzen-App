import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask, clearTasks } from '../Store/taskSlice'  // ✅ Named import
import { TaskForm, Container, TaskList, HeroSection } from '../Components/Index';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // ✅ Pehle define
  

  // ✅ Debug - User check
  console.log("Home rendered - User:", user ? user.name : "No user");

  useEffect(() => {
    // Agar user login hai tabhi tasks fetch karo
    if (user) {
      console.log("Fetching tasks for user:", user.$id);
      dispatch(fetchTask(user.$id));
    }

    // Cleanup function
    return () => {
      if (user) {
        dispatch(clearTasks());
      }
    };
  }, [user, dispatch]);


  // ✅ Agar user nahi hai to HeroSection dikhao
  if (!user) {
    return <HeroSection />;
  }

  // ✅ User hai to Task Manager dikhao
  return (

    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your tasks efficiently</p>
          </div>
          <TaskForm />
          <TaskList />
        </div>
      </div>
  
  );
};

export default Home;