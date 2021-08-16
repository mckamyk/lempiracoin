import {BigNumber} from '@ethersproject/bignumber';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Manager} from '../../../managerType';

interface ManagerState {
  managers: Manager[];
	totalSupply: BigNumber;
}

const managerState: ManagerState = {
	managers: [],
	totalSupply: BigNumber.from('0'),
};

export const managersSlice = createSlice({
	name: 'managers',
	initialState: managerState,
	reducers: {
		setManagers: (state, action: PayloadAction<Manager[]>) => {
			state.managers = action.payload;
		},
		setTotalSupply: (state, action: PayloadAction<BigNumber>) => {
			state.totalSupply = action.payload;
		},
	},
});

export const {setManagers, setTotalSupply} = managersSlice.actions;
export default managersSlice.reducer;
