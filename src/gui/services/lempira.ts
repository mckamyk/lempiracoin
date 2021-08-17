// @ts-ignore
import lempira from '#artifacts/src/contracts/lempiracoin.sol/LempiraCoin.json';
import {ethers} from 'ethers';
// @ts-ignore
import addr from '../../address';
import {setTotalSupply, setManagers} from './redux/lempiraSlice';
import {store} from './redux/store';

export const {abi} = lempira;
export const {address} = addr;

import {contract} from './eth';
import {Manager} from '../../managerType';

export const deposit = async (amount: string, address: string) => {
	const amt = ethers.utils.parseEther(amount);
	contract.deposit(address, amt);
};

export const withdraw = async (amount:string, address: string) => {
	const amt = ethers.utils.parseEther(amount);
	contract.withdraw(address, amt);
};

const getTotalSupply = async () => {
	const sup = await contract.totalSupply();
	store.dispatch(setTotalSupply(sup.toHexString()));
};

const getManagers = async () => {
	const managers = await contract.getManagers();
	store.dispatch(setManagers(managers));
};

const watchTotalSupply = () => {
	contract.on('Transfer', async (from: string, to: string) => {
		const zero = '0x0000000000000000000000000000000000000000';
		if (from === zero || to === zero) {
			const sup = await contract.totalSupply();
			store.dispatch(setTotalSupply(sup.toHexString()));
		}
	});
};

const watchManagers = () => contract.on('ManagersUpdated', (managers: Manager[]) => {
	store.dispatch(setManagers(managers));
});

export const watch = () => {
	getTotalSupply();
	getManagers();
	watchManagers();
	watchTotalSupply();
};

export const isOwner = async () => {
	try {
		await contract.isOwner();
		return true;
	} catch {
		return false;
	}
};

export const isManager = async () => {
	try {
		await contract.isManager();
		return true;
	} catch {
		return false;
	}
};
