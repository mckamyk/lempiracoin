import {task, HardhatUserConfig} from 'hardhat/config';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'hardhat-watcher';
import * as fs from 'fs';
import * as path from 'path';

export const ownerAddress = '0xAB82910FE0a55E4Aa680DBc08bae45113566c309';
export const managerAddress = '0x1D7607a314BeD674BBd99B46469005f8Baead6cD';

task('dev', 'Main Development Task', async (args, hre) => {
	const watchProm = hre.run('watch', {watcherTask: 'rebuild'});

	hre.run('node');
	await hre.run('compile');
	await hre.run('init');

	await watchProm;
});

task('init', 'Initialized the contract state, and updates address reference', async (args, hre: HardhatRuntimeEnvironment) => {
	const {ethers} = hre;

	hre.network.provider.request({
		method: 'hardhat_impersonateAccount',
		params: [ownerAddress],
	});

	const signer = ethers.provider.getSigner(ownerAddress);
	const balance = await signer.getBalance();
	if (balance.lt(ethers.utils.parseEther('100'))) {
		const internalAccounts = await ethers.getSigners();
		const internalBalance = await internalAccounts[0].getBalance();
		if (internalBalance.gte(ethers.utils.parseEther('100'))) {
			await internalAccounts[0].sendTransaction({to: ownerAddress, value: ethers.utils.parseEther('100')});
		}
	}

	const lempiraFactory = await ethers.getContractFactory('LempiraCoin', signer);
	const lempira = await lempiraFactory.deploy();

	await lempira.addManager(managerAddress, 'manager1');

	const out = {address: lempira.address};
	fs.writeFileSync(path.join(__dirname, 'src', 'address.json'), JSON.stringify(out));
});

const config: HardhatUserConfig = {
	solidity: '0.8.4',
	networks: {
		rinkeby: {
			url: 'https://eth-rinkeby.alchemyapi.io/v2/PveVnhbB-ISvPOPFxkdDb9YJpdXWc3xm',
			// This is a dedicated Rinkeby wallet. Don't get any ideas.
			accounts: ['0xafa2bcc292857e4e4ab380511485829f2d2b4f3c947e875ef8f0a661e3bfbc52'],
		},
		hardhat: {
			forking: {
				url: 'https://eth-mainnet.alchemyapi.io/v2/V0nBEYPNRBYaZmLGh9psiWwTDwGEXlk7',
				blockNumber: 13000429,
			},
			logging: {
				omitMethods: ['eth_chainId', 'eth_blockNumber', 'eth_getFilterChanges'],
			},
			initialBaseFeePerGas: 0,
		},
	},
	watcher: {
		rebuild: {
			tasks: ['compile', 'init'],
		},
	},
	typechain: {
		outDir: './src/types',
		target: 'ethers-v5',
	},
	paths: {
		sources: './src/contracts',
	},
};

export default config;
