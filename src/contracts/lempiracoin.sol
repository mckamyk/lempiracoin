// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract LempiraCoin is ERC20 {
	struct Manager {
		address addr;
		string name;
		bool enabled;
	}

	event ManagersUpdated(Manager[]);
	event SupplyChange(uint);

	address[] owners;
	Manager[] managers;

  constructor() ERC20("Lempria Coin", "HNLC") {
		owners.push(msg.sender);
  }

	function toggleManager(address addr, bool enabled) public onlyOwner {
		for(uint i; i < managers.length; i++) {
			if (managers[i].addr == addr) {
				managers[i].enabled = enabled;
				emit ManagersUpdated(managers);
				break;
			}
		}
	}

	function addManager(address addr, string calldata name) public onlyOwner {
		for (uint i; i < managers.length; i++) {
			if (managers[i].addr == addr) {
				revert("This manager already exists. Did you mean to toggle?");
			}
		}

		managers.push(Manager({
			addr: addr, name: name, enabled: true
		}));

		emit ManagersUpdated(managers);
	}

	function removeManager(address demotee) public onlyOwner {
		bool found = false;
		uint index = 0;

		for (uint i = 0; i < managers.length; i++) {
			if (managers[i].addr == demotee) {
				found = true;
				index = i;
			}
		}

		if (found) {
			Manager memory lastManager = managers[managers.length-1];
			managers[managers.length-1] = managers[index];
			managers[index] = lastManager;
			managers.pop();
		}
		emit ManagersUpdated(managers);
	}

	function getManagers() public view returns(Manager[] memory) {
		return managers;
	}

  function deposit(address account, uint256 amount) public onlyManager {
    _mint(account, amount);
		emit SupplyChange(totalSupply());
  }

	function withdraw(address account, uint256 amount) public onlyManager {
		_burn(account, amount);
		emit SupplyChange(totalSupply());
	}

	function isManager() public view returns (bool) {
		bool isMgr = false;
		for (uint i = 0; i < managers.length; i++) {
			if (managers[i].addr == msg.sender) {
				isMgr = managers[i].enabled;
				break;
			}
		}

		return isMgr;
	}

	function isOwner() public view returns (bool) {
		for (uint i; i < owners.length; i++) {
			if (owners[i] == msg.sender) {
				return true;
			}
		}

		return false;
	}

	modifier onlyManager {
		require(isManager(), "Must be at least manager to do that.");
		_;
	}

	modifier onlyOwner {
		require(isOwner(), "Must be owner to do that.");
		_;
	}
}
