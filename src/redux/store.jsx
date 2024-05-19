import { configureStore } from '@reduxjs/toolkit'
import myWorkReducer from '../redux/myWorkSlice'

export const store = configureStore({
  reducer: {
    myWork: myWorkReducer, // myWork reducerin ismi, myWorkReducer kendi belirlediğim myWorkSlice'ten çektiğim reducer
  },
})