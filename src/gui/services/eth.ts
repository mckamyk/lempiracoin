import {ethers, providers} from 'ethers';
import {LempiraCoin} from '../../types';
import {abi, address} from './lempira';
import {setAccounts} from './redux/ethSlice';
import {store} from './redux/store';
import {watch} from './lempira';

declare const window: Window & typeof globalThis & {
  ethereum: any;
};

export let provider: providers.Web3Provider;
export let signer: providers.JsonRpcSigner;
export let contract: LempiraCoin;

export const isConnected = async (): Promise<boolean> => {
	const accounts = await window.ethereum.request({method: 'eth_accounts'}) as string[];
	return accounts.length > 0;
};

export const connect = async () => {
	if (!await isConnected()) {
		window.ethereum.request({method: 'eth_requestAccounts'});
	}
};

const setupAccounts = (accounts: string[]) => {
	store.dispatch(setAccounts(accounts));
	if (accounts.length) {
		provider = new ethers.providers.Web3Provider(window.ethereum);
		signer = provider.getSigner();
		contract = new ethers.Contract(address, abi, signer) as LempiraCoin;
		watch();
	}
};

const listenToAccounts = () => {
	window.ethereum.on('accountsChanged', setupAccounts);
};

const tryConnect = async () => {
	const accounts = await window.ethereum.request({method: 'eth_accounts'}) as string[];
	if (accounts.length) {
		setupAccounts(accounts);
	}
};

tryConnect();
listenToAccounts();
