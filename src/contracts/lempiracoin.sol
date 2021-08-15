// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LempiraCoin is ERC20 {
  constructor() ERC20("Lempria Coin", "HNLC") {

  }

  function deposit(address account, uint256 amount) public {
    _mint(account, amount);
  }

	function withdraw(address account, uint256 amount) public {
		super._burn(account, amount);
	}
}
