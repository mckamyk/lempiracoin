import {ethers} from 'hardhat';

const main = async () => {
	const [deployer] = await ethers.getSigners();

	console.log('Deploying contracts with the account: ', deployer.address);

	console.log('Account Balance: ', (await deployer.getBalance()).toString);

	const LepiraCoin = await ethers.getContractFactory('LempiraCoin');
	const lc = await LepiraCoin.deploy();

	console.log('LempiraCoin Address (Rinkeby): ', lc.address);
};

main().then(() => process.exit(0)).catch((err: any) => {
	console.log(err);
	process.exit(1);
});
