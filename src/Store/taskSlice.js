import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskService } from '../Components/Index';  // ✅ Path sahi karo

// ==================== ASYNC THUNKS ====================

// ✅ Tasks fetch karne ke liye
export const fetchTask = createAsyncThunk(
    'tasks/fetchTask',
    async (userId) => {
        const tasks = await taskService.getTasks(userId);
        return tasks;
    }
);

// ✅ Naya task add karne ke liye
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({ userId, taskText }) => {  // ✅ Object destructuring
        const newTask = await taskService.createTask({
            userId,
            taskText
        });;
        return newTask;
    }
);

// ✅ Task edit karne ke liye
export const editTask = createAsyncThunk(
    'tasks/editTask',
    async ({ taskId, updatedData }) => {  // ✅ updatedData pass karna
        const updatedTask = await taskService.updateTask(taskId, updatedData);
        return updatedTask;
    }
);

// ✅ Task delete karne ke liye
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId) => {
        await taskService.deleteTask(taskId);
        return taskId;  // ✅ Delete ke baad ID return karo
    }
);

// ==================== SLICE ====================

const initialState = {
    tasks: [],
    status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};
const taskSlice = createSlice({
    name: "tasks",
    initialState,

    reducers: {
        clearTasks: (state) => {
            state.tasks = [];
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Fetch tasks cases
            .addCase(fetchTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // ✅ Add task case
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)

            })

            // ✅ Edit task case
            .addCase(editTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.$id === action.payload.$id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })

            // ✅ Delete task case (spelling sahi karo: fulfilled, NOT fullfilled)
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.$id !== action.payload);
            });
    },
});

// ==================== EXPORTS ====================
export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;