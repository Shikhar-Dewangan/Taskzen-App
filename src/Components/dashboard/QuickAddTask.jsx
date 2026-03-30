import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchTask } from '../../Store/taskSlice';

const QuickAddTask = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [taskText, setTaskText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskText.trim()) {
      alert('Please enter a task!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await dispatch(addTask({
        userId: user.$id,
        taskText: taskText.trim()
      }));
      
      // Refresh tasks
      await dispatch(fetchTask(user.$id));
      
      setTaskText('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Task add error:', error);
      alert('Task add nahi hua!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Add Task</h3>
      
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          ✅ Task added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Write your task here..."
          rows="3"
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
        >
          {isSubmitting ? 'Adding...' : '+ Add Task'}
        </button>
      </form>
    </div>
  );
};

export default QuickAddTask;