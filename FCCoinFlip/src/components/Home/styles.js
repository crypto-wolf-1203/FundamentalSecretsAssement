import styled from 'styled-components'

export const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .main-pane {
    padding: 20px;
    background: rgba(255,255,255,0.03);
    border-radius: 20px;

    display: flex;
    flex-direction: column;

    .wallet-state {
      font-size: 14px;
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(0,0,0,0.1);

      .wallet-connect-button {
        cursor: pointer;
        width: 100%;
        text-align: center;
  
        border-radius: 40px;
        background: rgba(255,100,20,0.8);
        transition: all 0.1s ease-in-out;
        padding: 4px 0px;
  
        &:hover {
          background: rgba(255,20,100,0.6);
          transition: all 0.2s ease-in-out;
        }
  
        &:active {
          background: rgba(180,70,11,0.4);
          color: #ccc;
        }
      }
    }

    .wallet-balance-frame {
      margin: 4px 0px;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: center;

      span {
        color: #F2A0A0;
        font-size: 14px;
      }

      .wallet-balance {
        padding: 8px 10px;
        border-radius: 10px;
        background: rgba(0,0,0,0.1);
      }
    }

    .toss-frame {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .toss-button {
        cursor: pointer;
        width: 100%;
        text-align: center;
  
        border-radius: 40px;
        background: rgba(255,100,20,0.8);
        transition: all 0.1s ease-in-out;
        padding: 4px 0px;
  
        &:hover {
          background: rgba(255,20,100,0.6);
          transition: all 0.2s ease-in-out;
        }
  
        &:active {
          background: rgba(180,70,11,0.4);
          color: #ccc;
        }
      }

      input {
        margin: 0px 20px;
        border: none;
        outline: none;
        // background: rgba(255,255,255,0.4);
        padding: 10px;
        border-radius: 10px;
        color: rgb(255,100,20);

        width: 80%;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .tx-err {
      border: 1px solid rgba(255,255,255,0.1);
      margin: 10px 0px;
      padding-left: 6px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      border-left-width: 4px;
      max-width:  400px;
      width: 100%;
      overflow-wrap: anywhere;

      font-size: 12px;
    }

    .result-frame {
      margin: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
`;

export const CoinFrameContainer = styled.div`
  opacity: ${props => props.op / 100};
`;
