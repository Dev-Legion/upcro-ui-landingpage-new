import React, {useState, useEffect} from 'react'
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import useTokenBalance from "../../hooks/useTokenBalance";
import {  ROOTED_ADDRESS, STAKING_ADDRESS, STAKING_TICKER, VAULT_ADDRESS } from "../../constants";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
// import { TokenService } from "../../services/TokenServices";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { shortenAddress, supportedChain } from '../../utils'
import { getDisplayBalance, getFullDisplayBalance } from '../../utils/formatBalance';
import { TokenService } from '../../services/TokenServices';
import { PendingContent } from '../Button';
import { ErrorMessage } from '../ErrorMessage';
import TransactionCompletedModal from '../TransactionCompletedModal';
import { escapeRegExp } from '../../utils'
import { VaultService } from '../../services/VaultService';
import { VaultStakingInfo } from '../../dtos/VaultStakingInfo';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

enum Action {
    Stake,
    Unstake,
    Deposit,
    Withdraw
}

enum Status {
    None,
    Approving,
    Approved,
    Staking,
    Staked,
    Progress,
    Done  
}

const Stats = styled.div`
    color: ${({ theme }) => theme.text3};
    font-size: 0.825rem;
    display:grid;
    grid-gap: 0.5em;
    grid-template-columns: auto 1fr;
    align-items:center;
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        width: 100%;
        font-size: 0.575rem;
        grid-gap: 0.25em;
    `};
`

const InfoLoader = () => (
  <ContentLoader
      width={110}
      height={14}
      speed={1}
      animate={true}
      backgroundColor="#f6f6ef"
      foregroundColor="#e8e8e3"
      backgroundOpacity={0.06}
      foregroundOpacity={0.12}
  >
      <rect x="0" y="0" width="110" height="14" />
  </ContentLoader>)
  
export default function StakeTabTwo() {
    const { account, library, chainId } = useWeb3React();
    const stakingBalance = useTokenBalance(STAKING_ADDRESS);
    const [action,
        setAction
    ] = useState<Action>(Action.Deposit);
    const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));
    const [completedAction, setCompletedAction] = useState("");
    const [pendingAction, setPendingAction] = useState("");
    const [value, setValue] = useState<string>("");
    const [status, setStatus] = useState<Status>(Status.None);
    const [harvestStatus, setHarvestStatus] = useState<Status>(Status.None);
    const [compoundStatus, setCompoundStatus] = useState<Status>(Status.None);

    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [harvestTransactionHash, setHarvestTransactionHash] = useState<string>("");
    const [compoundTransactionHash, setCompoundTransactionHash] = useState<string>("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState<VaultStakingInfo | undefined>(undefined);
    const [loadingInfo, setLoadingInfo] = useState<boolean>(false);

    useEffect(() => {
        const getIsApprove = async () => {
            const service = new TokenService(library, account!, ROOTED_ADDRESS);
            const approved = await service.isApproved(STAKING_ADDRESS);
            setIsApproved(approved);
            if(approved) {
                setStatus(Status.Approved);
            }
        }
        if(account && chainId && supportedChain(chainId!)) {
            getIsApprove();
        }
    }, [library, account, chainId])
    
    useEffect(() => {
        setBalance(action === Action.Deposit ? stakingBalance : info ? info!.staked: new BigNumber(0))
    }, [action, info, stakingBalance])

    const getInfo = async () => {
      if (account && chainId && supportedChain(chainId!)) {
          setLoadingInfo(true);
          const vaultInfo = await new VaultService(library, account!).getInfo()
          setInfo(vaultInfo);
          if(action === Action.Withdraw) {
              setBalance(vaultInfo.staked);
          }
          setLoadingInfo(false);
      }
    }

    useEffect(() => {
      getInfo();    
      const timer = setInterval(() => getInfo(), 30000)
      return () => clearInterval(timer)
    }, [library, account, chainId, action])

    const approve = async () => {
      try {
          setStatus(Status.Approving);
          const service = new TokenService(library, account!, STAKING_ADDRESS);
          const txResponse = await service.approve(VAULT_ADDRESS);
          if (txResponse) {
              const receipt = await txResponse.wait()
              if (receipt?.status === 1) {
                  setTransactionHash(receipt.transactionHash);
              }
              else {
                  setError("Transaction Failed")
              }
          }
          setStatus(Status.Approved);
          setIsApproved(true);
      }
      catch (e) {
          console.log(e);
          const errorMessage = extractErrorMessage(e);
          if(errorMessage) {
              setError(errorMessage);
          }
          setStatus(Status.None);
      }
    }

    const deposit = async () => {
      const amount = parseFloat(value);
      if (Number.isNaN(amount) || amount <= 0) {
          setError("Enter amount");
          return;
      }
      setError("");

      try {
          setCompletedAction(`${value} ${STAKING_TICKER} ${action === Action.Deposit ? "deposited" : "withdrawn"}`);
          setPendingAction(`${action === Action.Deposit ? "Depositing" : "Withdrawing"}...`);
          setStatus(Status.Progress);

          const service = new VaultService(library, account!);
          const txResponse = action === Action.Deposit 
              ? await service.deposit(value) 
              : await service.withdraw(value)

          if (txResponse) {
              const receipt = await txResponse.wait()
              if (receipt?.status === 1) {
                  setTransactionHash(receipt.transactionHash);
              }
              else {
                  setError("Transaction Failed")
              }
          }
          setStatus(Status.Done);
          setValue("");
          await getInfo();
      }
      catch (e) {
          console.log(e)
          const errorMessage = extractErrorMessage(e);
          if(errorMessage) {
              setError(errorMessage);
          }
          setStatus(Status.None)
      }
    } 

    const harvest = async () => {
        try {
            setPendingAction("Harvesting...")
            setHarvestStatus(Status.Progress);
            const txResponse = await new VaultService(library, account!).harvest(); 

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setHarvestTransactionHash(receipt.transactionHash);
                }
                else {
                    setError("Transaction Failed")
                }
            }
            setHarvestStatus(Status.Done);
            setValue("");
            await getInfo();
        }
        catch (e) {
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setHarvestStatus(Status.None)
        }
    }

    const compound = async () => {
        try {
            setPendingAction("Compounding...")
            setCompoundStatus(Status.Progress);
            const txResponse = await new VaultService(library, account!).compound(); 

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setCompoundTransactionHash(receipt.transactionHash);
                }
                else {
                    setError("Transaction Failed")
                }
            }
            setCompoundStatus(Status.Done);
            setValue("");
            await getInfo();
        }
        catch (e) {
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setCompoundStatus(Status.None)
        }
    }

    const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
    const isValid = (value: string) => value === '' || inputRegex.test(escapeRegExp(value))

  return (
    <>
        <TransactionCompletedModal title={completedAction} hash={transactionHash} isOpen={status === Status.Staked} onDismiss={() => setStatus(Status.None)} />
        <TransactionCompletedModal title={`${info?.rewards} ${STAKING_TICKER} harvested`} hash={harvestTransactionHash} isOpen={harvestStatus === Status.Done} onDismiss={() => setHarvestStatus(Status.None)} />
        <TransactionCompletedModal title={"Rewards compounded"} hash={compoundTransactionHash} isOpen={compoundStatus === Status.Done} onDismiss={() => setCompoundStatus(Status.None)} />

        <Box className='stakone_main'>
            <Heading as="h4" >Vault Staking</Heading>
            {/* <Box className='stake_unstake_cro_btn_prnt'>
                <Button>Staking</Button>
                <Button>Vault Staking</Button>
            </Box> */}
            <Tabs variant='unstyled'>
            <TabList className='tab_btn_prnt'>
                <Box className='tab_border'>
                    <Tab bg={'#0D6EFD'} _selected={{ color: '#FFFFFF', bg: 'transparent' }} className="staktab01" onClick={() => setAction(Action.Deposit)} >Deposit xUpCRO</Tab>
                    <Tab bg={'#0D6EFD'} _selected={{ color: '#FFFFFF', bg: 'transparent' }} className="staktab02" onClick={() => setAction(Action.Withdraw)} >Withdraw xUpCRO</Tab>
                </Box>
            </TabList>
            <TabPanels>
                <TabPanel className='stake_tab_panel01_prnt'>
                    <Box className='stake_tab_panel01'>
                        <span className="apyText">{`${info?.apy}% APY`}</span>
                        <Box className='stake_inpt_box'>
                            <Box className='text_row'>
                                <Text>Amount to deposit</Text>
                                <Text>Balance: {getDisplayBalance(balance, 2)}</Text>
                            </Box>
                            <Box className='inpt_btn_row'>
                                <input type="number" value={value} 
                                onChange={event => {
                                if (!isValid(event.target.value)) return  
                                const newValue = event.target.value.replace(/,/g, '.')
                                setValue(newValue)
                                }}></input>
                                <Box className='btn_text_prnt'>
                                    <Button onClick={() => setValue(getFullDisplayBalance(balance))}>MAX</Button>
                                    <Text>upCRO</Text>
                                </Box>
                            </Box>
                        </Box>

                        {
                            isApproved ?
                            
                            <Button className='stake_full_btn' disabled={status === Status.Progress || !supportedChain(chainId)} onClick={deposit}>
                                {status === Status.Progress 
                                ? <PendingContent text={pendingAction}/> 
                                : `Deposit`}
                            </Button> : 
                            <Button className='stake_full_btn' onClick={approve} disabled={status === Status.Approving || !supportedChain(chainId)}>
                                {status === Status.Approving 
                                    ? <PendingContent text={"Approving..."}/>
                                    : status === Status.Approved ? "Approved" : "Approve"
                                }
                            </Button>
                        }

                        {error ? <ErrorMessage error={error} /> : null}

                        {
                            isApproved ? 
                            
                            <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                              <Button className='stake_full_btn' disabled={status === Status.Progress || !supportedChain(chainId)} onClick={compound}>
                                  {compoundStatus === Status.Progress 
                                  ? <PendingContent text={pendingAction}/> 
                                  : `Compound`}
                              </Button>
                              <Button className='stake_full_btn' disabled={status === Status.Progress || !supportedChain(chainId)} onClick={harvest}>
                                  {harvestStatus === Status.Progress 
                                  ? <PendingContent text={pendingAction}/> 
                                  : `Harvest`}
                              </Button>
                            </Box>
                            : 
                            <Button className='stake_full_btn' onClick={approve} disabled={status === Status.Approving || !supportedChain(chainId)}>
                                {compoundStatus || harvestStatus === Status.Approving 
                                    ? <PendingContent text={"Approving..."}/>
                                    : compoundStatus || harvestStatus === Status.Approved ? "Approved" : "Approve"
                                }
                            </Button>
                        }
                    </Box>
                    <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                        <Button  onClick={() => window.open(`https://cro.empiredex.org/#/swap?inputCurrency=0xb062084aFfDf75b9b494D56B8417F1B981Df790f`, "_blank")?.focus()}>EmpireDEX</Button>
                        <Button  onClick={() => window.open(`https://dexscreener.com/cronos/0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3`, "_blank")?.focus()}>DEXScreener</Button> 
                    </Box>
                </TabPanel>
                <TabPanel className='stake_tab_panel01_prnt stake_tab_panel02_prnt'>
                    <Box className='stake_tab_panel01'>
                        <span className="apyText">{`${info?.apy}% APY`}</span>
                        <Box className='stake_inpt_box'>
                            <Box className='text_row'>
                                <Text>Amount to withdraw</Text>
                                <Text>Balance: {getDisplayBalance(balance, 2)}</Text>
                            </Box>
                            <Box className='inpt_btn_row'>
                                <input type="number" value={value}
                                onChange={event => {
                                    if (!isValid(event.target.value)) return  
                                    const newValue = event.target.value.replace(/,/g, '.')
                                    setValue(newValue)
                                    }}></input>
                                <Box className='btn_text_prnt'>
                                    <Button onClick={() => {setValue(getFullDisplayBalance(balance))}}>MAX</Button>
                                    <Text>xUpCRO</Text>
                                </Box>
                            </Box>
                        </Box>

                        {
                            isApproved ? 
                            
                            <Button className='stake_full_btn' disabled={status === Status.Progress || !supportedChain(chainId)} onClick={deposit}>
                                {status === Status.Progress 
                                ? <PendingContent text={pendingAction}/> 
                                : `Withdraw`}
                            </Button>

                            : 
                            <Button className='stake_full_btn' onClick={approve} disabled={status === Status.Approving || !supportedChain(chainId)}>
                                {status === Status.Approving 
                                    ? <PendingContent text={"Approving..."}/>
                                    : status === Status.Approved ? "Approved" : "Approve"
                                }
                            </Button>
                        }
                        
                        {error ? <ErrorMessage error={error} /> : null}
                        
                        {
                            isApproved ? 
                            
                            <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                              <Button className='stake_full_btn' disabled={status === Status.Progress || !supportedChain(chainId)} onClick={compound}>
                                  {compoundStatus === Status.Progress 
                                  ? <PendingContent text={pendingAction}/> 
                                  : `Compound`}
                              </Button>
                              <Button className='stake_full_btn' disabled={status === Status.Progress || !supportedChain(chainId)} onClick={harvest}>
                                  {harvestStatus === Status.Progress 
                                  ? <PendingContent text={pendingAction}/> 
                                  : `Harvest`}
                              </Button>
                            </Box>
                            : 
                            <Button className='stake_full_btn' onClick={approve} disabled={status === Status.Approving || !supportedChain(chainId)}>
                                {compoundStatus || harvestStatus === Status.Approving 
                                    ? <PendingContent text={"Approving..."}/>
                                    : compoundStatus || harvestStatus === Status.Approved ? "Approved" : "Approve"
                                }
                            </Button>
                        }
                    </Box>
                    <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                        <Button  onClick={() => window.open(`https://cro.empiredex.org/#/swap?inputCurrency=0xb062084aFfDf75b9b494D56B8417F1B981Df790f`, "_blank")?.focus()}>EmpireDEX</Button>
                        <Button  onClick={() => window.open(`https://dexscreener.com/cronos/0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3`, "_blank")?.focus()}>DEXScreener</Button> 
                    </Box>
                </TabPanel>
            </TabPanels>
            </Tabs>
            <br/><br/>
            <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                <span>Staked : </span>&nbsp;<span>{loadingInfo ? <InfoLoader/> : info ? `${getDisplayBalance(info!.staked)} ${STAKING_TICKER}` : ""}</span>&nbsp;&nbsp;
                <span>Rewards : </span>&nbsp;<span>{loadingInfo ? <InfoLoader/> : `${info?.rewards.toFixed(4)} ${STAKING_TICKER}`}</span>
            </Box>

        </Box>
        <Box className='contracts_box'>
            <Heading as="h4">Contracts</Heading>
            <Box className='upcro_copyflex'>
                <Heading as="h6">upCRO<Text>{shortenAddress(ROOTED_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                <Heading as="h6" className='right_h6'>xUpCRO<Text>{shortenAddress(STAKING_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
            </Box>
            <Box className='upcro_copyflex'></Box>
        </Box>
    </>
  )
}
