import { createContext, useContext } from "react"
import { useCustomWallet } from "../WalletContext"
import CoinFlipContract from './abi/CoinFlipContract.json'

import BigNumber from 'bignumber.js'

import { COINFLIP_ADDRESS } from './address'

export const ContractContext = createContext();

export const ContractProvider = (props) => {

    const { wallet } = useCustomWallet();

    const makeTx = async (addr, tx, value) => {
        const web3 = window.web3;
        const [gasPrice, gasCost] = await Promise.all([
            web3.eth.getGasPrice(),
            tx.estimateGas({ from: wallet.address, value: value }),
        ]);
        const data = tx.encodeABI();
        const txData = {
            from: wallet.address,
            value: value,
            to: addr,
            data,
            gas: gasCost,
            gasPrice
        };
        const receipt = await web3.eth.sendTransaction(txData);
        return receipt;
    }

    const commitFlip = async (value) => {
        const web3 = window.web3;
        let tt = BigNumber(value).times(BigNumber(`1e18`)).toFixed();

        const coinFlipContract = new web3.eth.Contract(CoinFlipContract.abi, COINFLIP_ADDRESS);

        let tx = await makeTx(COINFLIP_ADDRESS, coinFlipContract.methods.flip(), tt.toString());

        return tx;
    }

    const getMyBalance = async () => {
        const web3 = window.web3;
        let tt =  await web3?.eth?.getBalance(wallet.address);

        return BigNumber(tt).div(BigNumber('1e18')).toNumber();
    }

    return (
        <ContractContext.Provider value={{ commitFlip, getMyBalance }}>
            {props.children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    const contractManager = useContext(ContractContext)
    return contractManager || [{}, async () => { }]
}
