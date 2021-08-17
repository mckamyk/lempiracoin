import {BigNumber} from '@ethersproject/bignumber';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Manager} from '../../../managerType';

interface LempiraState {
  managers: Manager[];
	totalSupply: string;
	isOwner: boolean;
	isManager: boolean;
	balance: string;
}

const lempiraState: LempiraState = {
	managers: [],
	totalSupply: BigNumber.from(0).toHexString(),
	isOwner: false,
	isManager: false,
	balance: BigNumber.from(0).toHexString(),
};

export const managersSlice = createSlice({
	name: 'lempira',
	initialState: lempiraState,
	reducers: {
		setManagers: (state, action: PayloadAction<Manager[]>) => {
			state.managers = action.payload;
		},
		setTotalSupply: (state, action: PayloadAction<string>) => {
			state.totalSupply = action.payload;
		},
		setIsOwner: (state, action: PayloadAction<boolean>) => {
			state.isOwner = action.payload;
		},
		setIsManager: (state, action: PayloadAction<boolean>) => {
			state.isManager = action.payload;
		},
		setBalance: (state, action: PayloadAction<string>) => {
			state.balance = action.payload;
		},
	},
});

export const {setManagers, setTotalSupply, setIsOwner, setIsManager, setBalance} = managersSlice.actions;
export default managersSlice.reducer;
