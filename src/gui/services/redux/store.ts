import {configureStore} from '@reduxjs/toolkit';
import lempira from './lempiraSlice';
import eth from './ethSlice';

export const store = configureStore({
	reducer: {
		lempira, eth,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
