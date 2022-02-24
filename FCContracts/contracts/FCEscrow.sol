// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./IFCEscrow.sol";

contract FCEscrow is Ownable, ReentrancyGuard
{
    constructor() {
    }

    receive() external payable {

    }

    fallback() external payable {

    }

    function requestWithdraw(address to, uint256 amount) external payable onlyOwner nonReentrant {
        require(to != address(0), "Externally owned account should not be zero");
        require(amount > 0, "Requested amount should be greator than 0");

        (bool sent, ) = payable(to).call{value: amount, gas:30000}("");
        require(sent == true, "Transfer failed");
    }
}
