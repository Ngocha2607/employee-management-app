import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './reducers/employee-slice';
import uiSlice from './reducers/ui-slice';
import userSlice from './reducers/user-slice';

export const store = configureStore({
  reducer: {
    employee: employeeSlice,
    ui: uiSlice,
    user: userSlice,
  },
});
