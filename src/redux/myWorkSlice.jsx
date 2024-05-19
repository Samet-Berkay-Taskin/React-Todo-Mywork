import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toDay: [],
    important: [],
    planned: [],
    tasks: [],
    completedTasks: [],
    isOpen: false,
}

export const MyWorkSlice = createSlice({
    name: 'myWrok',
    initialState,
    reducers: {
        addTaskToday: (state, action) => {
            state.toDay.push(action.payload)
            state.tasks.push(action.payload)
        },
        deteleteTaskToday: (state, action) => {
            const taskIdToDelete = action.payload;
            state.toDay = state.toDay.filter(task => task.id !== taskIdToDelete);
            state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
        },
        addTaskImportant: (state, action) => {
            state.important.push(action.payload)
            state.tasks.push(action.payload)
        },
        deteleteTaskImportant: (state, action) => {
            const taskIdToDelete = action.payload;
            state.important = state.important.filter(task => task.id !== taskIdToDelete);
            state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
        },
        addTaskPlanned: (state, action) => {
            state.planned.push(action.payload)
            state.tasks.push(action.payload)
        },
        deteleteTaskPlanned: (state, action) => {
            const taskIdToDelete = action.payload;
            state.planned = state.planned.filter(task => task.id !== taskIdToDelete);
            state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
        },
        addTaskTasks: (state, action) => {
            state.tasks.push(action.payload)
        },
        deteleteTask: (state, action) => {
            const taskIdToDelete = action.payload?.id;
            if (action.payload?.taskPlace === 'tasks')
                state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
            else {
                const taskPlace = action.payload?.taskPlace
                console.log("taskPlace", taskPlace)
                state[taskPlace] = state[taskPlace].filter(task => task.id !== taskIdToDelete);
                state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
            }
        },
        addCompletedTask: (state, action) => {
            state.completedTasks.push(action.payload)
        },
        deleteCompletedTask: (state, action) => {
            state.completedTasks = state.completedTasks.filter((item) => item.id !== action.payload)
        },
        setOpen: (state, action) => {
            state.isOpen = action.payload
        }
    },
})

export const {
    addTaskToday,
    deteleteTaskToday,
    addTaskImportant,
    deteleteTaskImportant,
    addTaskPlanned,
    deteleteTaskPlanned,
    addTaskTasks,
    deteleteTask,
    addCompletedTask,
    deleteCompletedTask,
    setOpen
} = MyWorkSlice.actions

export default MyWorkSlice.reducer
