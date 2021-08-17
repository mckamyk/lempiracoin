import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface EthState {
	accounts: string[];
	connected: boolean;
}

const ethState: EthState = {
	accounts: [],
	connected: false,
};

export const ethSlice = createSlice({
	name: 'eth',
	initialState: ethState,
	reducers: {
		setAccounts: (state, action: PayloadAction<string[]>) => {
			state.accounts = action.payload;

			const hasAccounts = action.payload.length > 0;
			if (hasAccounts && !state.connected) {
				state.connected = true;
			}

			if (!hasAccounts && state.connected) {
				state.connected = false;
			}
		},
	},
});

export const {setAccounts} = ethSlice.actions;
export default ethSlice.reducer;
