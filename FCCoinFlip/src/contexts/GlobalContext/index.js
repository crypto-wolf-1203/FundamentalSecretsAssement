import React, { createContext, useCallback, useContext } from "react"
import { UseWalletProvider } from 'use-wallet'

import walletConfig from '../WalletContext/config'

const POLLING_INTERVAL = 12000
const rpcUrl = walletConfig.rpcUrls[0]
const chainId = parseInt(walletConfig.chainId, 16);

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {

  return (
    <React.StrictMode>
      <UseWalletProvider
        chainId={chainId}
        autoConnect={true}
        connectors={{
          injected: {
            chainId: [chainId,],
            rpc: {
              [chainId]: rpcUrl
            }
          },
          walletconnect: {
            rpc: {
              [chainId]: rpcUrl
            },
            bridge: 'https://bridge.walletconnect.org',
            pollingInterval: POLLING_INTERVAL,
          }
        }}
      >
        <GlobalContext.Provider value={{ }}>
          {children}
        </GlobalContext.Provider>
      </UseWalletProvider>
    </React.StrictMode>
  )
}

export const useGlobal = () => {
  const globalManager = useContext(GlobalContext)
  return globalManager || [{}, async () => { }]
}
