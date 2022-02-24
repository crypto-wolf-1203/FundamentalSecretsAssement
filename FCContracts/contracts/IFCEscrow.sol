// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface IFCEscrow {
    function requestWithdraw(address to, uint256 amount) external payable;
    function transferOwnership(address newOwner) external;
}
