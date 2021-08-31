/* eslint-disable prefer-arrow-callback */
/* eslint-env mocha */
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {expect, assert} from 'chai';
import {ethers} from 'hardhat';
import {LempiraCoin} from '../../src/types';

describe('Token Contract', function () {
	let owner: SignerWithAddress;
	let manager: SignerWithAddress;
	let customer: SignerWithAddress;
	let contract: LempiraCoin;
	before(async function () {
		[owner, manager, customer] = await ethers.getSigners();
		contract = await ethers.getContractFactory('LempiraCoin', owner).then(con => con.deploy()) as LempiraCoin;
	});

	this.beforeEach(async () => {
		await contract.addManager(await manager.getAddress(), 'manager');
	});

	it('Deploys', async function () {
		expect(contract && contract.address !== '');
	});

	it('Deploys with no supply', async () => {
		const supply = await contract.totalSupply();
		expect(supply.eq(0)).to.eq(true);
	});

	it('Promotes address to manager', async () => {
		await contract.connect(manager).isManager();
	});

	it('Demotes from Manager', async () => {
		// First make sure hes promoted
		await contract.isManager();

		// Then Demote him
		await contract.removeManager(await manager.getAddress());
		try {
			// Make sure this reverts
			await contract.isManager();
			assert(false);
		} catch {
			assert(true);
		} finally {
			// Make him manager again
			await contract.addManager(await manager.getAddress(), 'manager1');
		}
	});

	it('Restricts promotion/demotion to Owner', async () => {
		const fails: boolean[] = [];
		try {
			await contract.connect(manager).addManager(await customer.getAddress(), 'manager1');
			fails.push(true);
		} catch {

		}

		try {
			await contract.connect(customer).addManager(await manager.getAddress(), 'manager1');
			fails.push(true);
		} catch {

		}

		try {
			await contract.connect(manager).removeManager(await customer.getAddress());
			fails.push(true);
		} catch {

		}

		try {
			await contract.connect(customer).removeManager(await manager.getAddress());
			fails.push(true);
		} catch {

		}

		expect(fails.length).eq(0);
	});

	it('Restricts Manager', async () => {
		try {
			await contract.connect(customer).isManager();
			assert(false);
		} catch {
			assert(true);
		}
	});

	it('Can Deposit', async () => {
		const bal = await contract.totalSupply();
		await contract.deposit(await owner.getAddress(), 1000);
		const after = await contract.totalSupply();
		expect(bal.toNumber()).lessThan(after.toNumber());
	});

	it('Manager Can Deposit', async () => {
		const con = contract.connect(manager);
		const before = await con.totalSupply();
		await con.deposit(await customer.getAddress(), 1000);
		const after = await con.totalSupply();
		expect(before.lt(after)).eq(true);
	});

	it('Can Withdraw', async () => {
		const before = await contract.totalSupply();
		await contract.withdraw(await owner.getAddress(), 500);
		const after = await contract.totalSupply();
		expect(before.gt(after)).eq(true);
	});

	it('Manager Can Withdraw', async () => {
		const con = contract.connect(manager);
		const before = await con.totalSupply();
		await con.withdraw(await customer.getAddress(), 1000);
		const after = await con.totalSupply();
		expect(before.gt(after)).eq(true);
	});

	it('Deposits Correct Amount', async () => {
		const amount = ethers.utils.parseEther('1000');
		await contract.deposit(await customer.getAddress(), amount);
		const balance = await contract.balanceOf(await customer.getAddress());
		expect(amount.eq(balance)).eq(true);
	});
});

