import {configureStore} from '@reduxjs/toolkit';
import managerReducer from './managersSlice';

export const store = configureStore({
	reducer: {
		managers: managerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
