// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./IFCEscrow.sol";

contract CoinFlipContract is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable
{
    address private escrow;
    uint256 private randomSeed;

    event CoinFlip(bool result);

    receive() external payable {

    }

    fallback() external payable {

    }

    function initialize() external initializer {
        __Ownable_init();
        __ReentrancyGuard_init();

        random(true);
    }

    function random(bool seedReset) internal returns (uint256) {
        uint256 curTimeStamp = block.timestamp;

        if (seedReset) {
            randomSeed = curTimeStamp;
        }

        // 2 Big prime numbers which are mutually coprime will make a safe random number due to Diopantus equation // Number Theory: eUgeigne.
        randomSeed = (((randomSeed & curTimeStamp) * 16095906970532733010342422905366867027 + 1531170596534094249064966829041812247) >> 16) & 0x7fffffffffffffffffffffffffffffff;
        return randomSeed;
    }

    function isContract(address addr) private view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function setEscrow(address _escrow) external onlyOwner {
        require(_escrow != address(0), "escrow address is invalid");
        require(isContract(_escrow) == true, "escrow should be a contract");

        escrow = _escrow;
    }

    function flip() external payable nonReentrant {
        uint256 rval = msg.value;
        require(rval > 0, "coin toss requires some chips");
        require(escrow != address(0), "escrow should be bound");

        uint256 ret = random(false);
        bool bres = ((ret & 1) == 0);
        if (bres == true) {
            require (escrow.balance >= rval * 2, "escrow balance is insufficient");
            IFCEscrow(escrow).requestWithdraw(msg.sender, rval * 2);
        } else {
            (bool sent, ) = payable(escrow).call{value: rval, gas:30000}("");
            require(sent == true, "Transfer to escrow failed");
        }

        emit CoinFlip(bres);
    }

    function recoverFromEscrow() external payable onlyOwner nonReentrant {
        require (escrow.balance > 0, "escrow balance is zero");
        IFCEscrow(escrow).requestWithdraw(msg.sender, escrow.balance);
    }

    function transferEscrowOwnership(address to) external onlyOwner {
        IFCEscrow(escrow).transferOwnership(to);
    }
}
