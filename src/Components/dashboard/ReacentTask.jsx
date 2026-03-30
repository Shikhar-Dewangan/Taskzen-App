import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editTask } from '../../Store/taskSlice'

const RecentTasks = ({ tasks }) => {
  const dispatch = useDispatch();

  const getStatusColor = (completed) => {
    return completed ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100';
  };

  const getStatusText = (completed) => {
    return completed ? 'Completed' : 'Pending';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';

    const date = new Date(dateString);
    const now = new Date();

    const diffTime = now - date; // no need for Math.abs
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      if (hours === 0) return "Just now";
      if (hours < 24) return `${hours}h ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  };
  // ✅ Toggle complete status from dashboard
  const handleToggleComplete = async (task) => {
    try {
      dispatch(editTask({
        taskId: task.$id,
        updatedData: { status: !task.status }
      }));
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  // Get last 5 tasks
  const recentTasks = tasks?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Tasks</h3>
        <Link
          to="/"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All →
        </Link>
      </div>

      {recentTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks yet. Add your first task!</p>
          <Link
            to="/"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recentTasks.map((task) => (
            <div
              key={task.$id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
            >
              <div className="flex items-center gap-3 flex-1">
                {/* ✅ Toggle Checkbox - Directly from Dashboard */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  className="w-5 h-5 cursor-pointer"
                />
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.taskText}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(task.$createdAt)}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.completed)}`}>
                {getStatusText(task.completed)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTasks;