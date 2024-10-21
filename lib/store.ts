import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import pluginReducer from './slices/pluginSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    plugins: pluginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;