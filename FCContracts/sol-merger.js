const { merge } = require('sol-merger');
const fs = require('fs');

(async () => {
	let mergedCode2;
    mergedCode2 = await merge("./contracts/CoinFlipContract.sol");
    await fs.writeFileSync('./out/CoinFlipContract.sol', mergedCode2);

    mergedCode2 = await merge("./contracts/FCEscrow.sol");
    await fs.writeFileSync('./out/FCEscrow.sol', mergedCode2);

    mergedCode2 = await merge("./contracts/TPU.sol");
    await fs.writeFileSync('./out/TPU.sol', mergedCode2);
}) ();
