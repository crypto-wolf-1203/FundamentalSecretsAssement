import React, { useEffect, useState } from 'react'
import { useContract } from '../../contexts/ContractContext'
import { useCustomWallet } from '../../contexts/WalletContext'

import { HomeContainer, CoinFrameContainer } from './styles'
import BackPng from '../../assets/images/coin-back.png'
import FrontPng from '../../assets/images/coin-front.png'

export const Home = (props) => {

  const { getMyBalance, commitFlip } = useContract();
  const { wallet, disconnectWallet, connectWallet } = useCustomWallet()
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0.0);

  const [amountCoin, setAmountCoin] = useState(0.0);

  const [tossTick, setTossTick] = useState(0);
  const [coinImage, setCoinImage] = useState(FrontPng);
  const [coinAlpha, setCoinAlpha] = useState(100);
  const [updateUI, setUpdateUI] = useState(0);

  const [txErr, setTxErr] = useState('');

  useEffect(() => {
    setLoggedIn(wallet.address !== '');
    getMyBalance()
      .then(r => {
        if (r) {
          setCoinAlpha(100);
          if (balance < r) {
            setCoinImage(FrontPng);
            if (balance > 0.0) {
              setTxErr('earned');
            }
          } else {
            setCoinImage(BackPng);
            setTxErr('lost');
          }
          setBalance(r);
        }
      })
  }, [wallet.address, updateUI])

  useEffect(() => {
    const MAXTICK = 4;
    let coin = Math.floor(tossTick / MAXTICK);
    let face = (coin % 2);
    // console.log('------------', coin, face);

    if (face == 0) {
      setCoinImage(FrontPng);
      let t = tossTick - coin * MAXTICK;
      t = t < MAXTICK / 2? t * (200 / MAXTICK): (MAXTICK - t) * (200 / MAXTICK);
      setCoinAlpha(t);
    } else {
      setCoinImage(BackPng);
      let t = MAXTICK - (tossTick - coin * MAXTICK);
      t = t < MAXTICK / 2? t * (200 / MAXTICK): (MAXTICK - t) * (200 / MAXTICK);
      setCoinAlpha(t);
    }
  }, [tossTick])

  const handleToss = () => {
    let tmr = setInterval(() => {
      setTossTick(t => t + 1)
    }, 30)

    setTxErr('')

    commitFlip(amountCoin)
      .then(r => {
        clearInterval(tmr);
        console.log(r);
        setUpdateUI(t => t + 1);
      })
      .catch(err => {
        clearInterval(tmr);
        console.log(`----------${err.message}----------`);
        setTxErr(err.message);
      })
  }

  const handleConnectWallet = () => {
    connectWallet('injected');
  }

  return (
    <HomeContainer>
      <div className='main-pane'>
        <div className='wallet-state'>{loggedIn === true ? `${wallet.address}` : <div className='wallet-connect-button' onClick={handleConnectWallet}>Connect wallet</div>}</div>
        <div className='wallet-balance-frame'>
          <span>Wallet balance</span>
          <div className='wallet-balance'>{balance}</div>
        </div>
        <div className='toss-frame'>
          <div className='toss-button' onClick={handleToss}>Toss</div>
          <input type='text' placeholder='coin' onChange={(e) => { setAmountCoin(parseFloat(e.target.value)) }}></input>
        </div>
        {txErr !== '' && <div className='tx-err'>{txErr}</div>}
        <div className='result-frame'>
          <CoinFrameContainer op={coinAlpha}>
            <img src={coinImage} alt='' />
          </CoinFrameContainer>
        </div>
      </div>
    </HomeContainer>
  )
}
