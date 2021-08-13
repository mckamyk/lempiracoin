import {providers} from 'ethers';
import {ethers} from 'hardhat';
import {LempiraCoin} from '../../types';
import {} from '#artifacts/src/contracts/lempiracoin.sol/LempiraCoin';

declare const window: Window & typeof globalThis & {
  ethereum: any;
};

let provider: providers.Web3Provider;
let signer: providers.JsonRpcSigner;
let contract: LempiraCoin;

export const connect = () => {
	if (!window.ethereum.isConnected()) {
		window.ethereum.request({method: 'eth_requestAccounts'});
		provider = new ethers.providers.Web3Provider(window.ethereum);
		signer = provider.getSigner();
		contract = ethers.getContractAt();
	}
};

