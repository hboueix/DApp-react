// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

import "hardhat/console.sol";
import "contracts/IERC20.sol";

contract PepiCoin is IERC20 {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    uint private _totalSupply;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() payable {
        minter = msg.sender;
        console.log(minter);
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        _totalSupply += amount;
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }

    function totalSupply() external view override returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint) {
        return balances[account];
    }

    function transfer(address recipient, uint amount) external override returns (bool) {
        _totalSupply += amount;
        balances[recipient] += amount;
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint) {
        return 1;
    }

    function approve(address spender, uint amount) external override returns (bool) {
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external override returns (bool) {
        require(amount <= balances[sender], "Insufficient balance.");
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }
}
