const TPU = artifacts.require("TPU");
const CoinFlipContract = artifacts.require('CoinFlipContract');
const FCEscrow = artifacts.require('FCEscrow');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(CoinFlipContract);
  let coinFlip = await CoinFlipContract.deployed();
  console.log('Coin Flip: ', coinFlip.address);

  await deployer.deploy(TPU, coinFlip.address, accounts[1], "0x8129fc1c");
  let coinFlipProxy = await TPU.deployed();
  console.log('coinFlipProxy: ', coinFlipProxy.address);

  await deployer.deploy(FCEscrow);
  let escrow = await FCEscrow.deployed();
  console.log('Escrow: ', escrow.address);
};
