// @ts-ignore
import lempira from '#artifacts/src/contracts/lempiracoin.sol/LempiraCoin.json';
import {BigNumber, ethers} from 'ethers';
// @ts-ignore
import addr from '../../address';
import {setTotalSupply, setManagers, setIsManager, setIsOwner, setBalance} from './redux/lempiraSlice';
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

const getBalance = async () => {
	const account = store.getState().eth.accounts[0];
	return contract.balanceOf(account);
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
	const watchers = contract.listeners('SupplyChange');
	if (watchers.length) {
		return;
	}

	contract.on('SupplyChange', async (supply: BigNumber) => {
		store.dispatch(setTotalSupply(supply.toHexString()));
	});
};

const watchManagers = () => {
	const watchers = contract.listeners('ManagersUpdated');
	if (watchers.length) {
		return;
	}

	contract.on('ManagersUpdated', (managers: Manager[]) => {
		store.dispatch(setManagers(managers));
	});
};

const watchBalance = () => {
	const watchers = contract.listeners('Transfer');
	if (watchers.length) {
		contract.off('Transfer', watchers[0]);
	}

	contract.on('Transfer', async (from: string, to: string) => {
		const wallet = store.getState().eth.accounts[0].toLowerCase();
		const addresses = [from.toLowerCase(), to.toLowerCase()];
		if (addresses.includes(wallet)) {
			const balance = await getBalance();
			store.dispatch(setBalance(balance.toHexString()));
		}
	});
};

export const watch = async () => {
	getTotalSupply();
	getManagers();
	const balance = await getBalance();
	store.dispatch(setBalance(balance.toHexString()));
	watchManagers();
	watchTotalSupply();
	watchBalance();
};

export const refreshPermissions = async () => {
	const owner = await isOwner();
	const mgr = await isManager();

	store.dispatch(setIsManager(mgr));
	store.dispatch(setIsOwner(owner));
};

export const isOwner = async () => contract.isOwner();

export const isManager = async () => contract.isManager();
