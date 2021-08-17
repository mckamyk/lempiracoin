import {BigNumber} from '@ethersproject/bignumber';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Manager} from '../../../managerType';

interface LempiraState {
  managers: Manager[];
	totalSupply: string;
	isOwner: boolean;
	isManager: boolean;
}

const lempiraState: LempiraState = {
	managers: [],
	totalSupply: BigNumber.from(0).toHexString(),
	isOwner: false,
	isManager: false,
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
	},
});

export const {setManagers, setTotalSupply, setIsOwner, setIsManager} = managersSlice.actions;
export default managersSlice.reducer;
