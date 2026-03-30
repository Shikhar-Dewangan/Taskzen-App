import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask } from '../Store/taskSlice';
import StatsCard from '../Components/dashboard/StatusCard';
import ProgressChart from '../Components/dashboard/ProgressTask';
import RecentTasks from '../Components/dashboard/ReacentTask';
import QuickAddTask from '../Components/dashboard/QuickAddTask';
import { Container } from '../Components/Index';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { tasks, status } = useSelector((state) => state.tasks);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });

  // ✅ Fetch tasks when user changes
  useEffect(() => {
    if (user) {
      console.log("📊 Dashboard: Fetching tasks for user:", user.$id);
      dispatch(fetchTask(user.$id));
    }
  }, [user, dispatch]);

  // ✅ Update stats whenever tasks change (real-time)
  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const completed = tasks.filter(task => task.completed === true).length;
      const total = tasks.length;
      const pending = total - completed;
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      console.log("📊 Dashboard Stats:", { total, completed, pending, completionRate });
      
      setStats({
        total,
        completed,
        pending,
        completionRate
      });
    }
  }, [tasks]);

  if (status === 'loading' && (!tasks || tasks.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.name}! Here's your task overview.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
            icon="📋"
            color="bg-blue-500"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon="✅"
            color="bg-green-500"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon="⏳"
            color="bg-yellow-500"
          />
          <StatsCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            icon="📊"
            color="bg-purple-500"
          />
        </div>

        {/* Charts and Quick Add */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ProgressChart completionRate={stats.completionRate} />
          <QuickAddTask />
        </div>

        {/* Recent Tasks */}
        <div className="grid grid-cols-1 gap-8">
          <RecentTasks tasks={tasks || []} />
        </div>
      </Container>
    </div>
  );
};


export default Dashboard;