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

	address owner;
	Manager[] managers;

  constructor() ERC20("Lempria Coin", "HNLC") {
		owner = msg.sender;
  }

	function promote(address promotee, string calldata name) public hasOwner {
		bool found = false;
		for (uint i = 0; i < managers.length; i++) {
			if (promotee == managers[i].addr) {
				managers[i].enabled = true;
				found = true;
				break;
			}
		}

		if (!found) {
			managers.push(Manager({name: name, addr: promotee, enabled: true}));
		}
		emit ManagersUpdated(managers);
	}

	function demote(address demotee) public hasOwner {
		bool found = false;
		uint index = 0;
		for (uint i = 0; i < managers.length; i++) {
			if (managers[i].addr == demotee) {
				managers[i].enabled = false;
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

	function getManagers() public hasOwner view returns(Manager[] memory) {
		return managers;
	}

  function deposit(address account, uint256 amount) public hasManager {
    _mint(account, amount);
  }

	function withdraw(address account, uint256 amount) public hasManager {
		_burn(account, amount);
	}

	function isManager() public view hasManager {
	}

	function isOwner() public view hasOwner {
	}

	modifier hasManager {
		bool isOwnr = msg.sender == owner;

		bool isMgr = false;
		for (uint i = 0; i < managers.length; i++) {
			if (managers[i].addr == msg.sender) {
				isMgr = managers[i].enabled;
				break;
			}
		}

		require(isMgr || isOwnr, "Must be at least manager to do that.");
		_;
	}

	modifier hasOwner {
		require (msg.sender == owner, "Must be owner to do that.");
		_;
	}
}
