import { ChainId, Currency } from '../../sdk'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Modal from '../Modal'
import { ExternalLink } from '../../theme'
import { Text } from 'rebass'
import { CloseIcon, CustomLightSpinner } from '../../theme/components'
import { RowBetween, RowFixed } from '../Row'
import { AlertTriangle, ArrowUpCircle, CheckCircle } from 'react-feather'
import { ButtonPrimary, ButtonLight } from '../Button'
import { AutoColumn, ColumnCenter } from '../Column'
import Circle from '../../assets/images/blue-loader.svg'
import MetaMaskLogo from '../../assets/images/metamask.png'
import { getExplorerLink } from '../../utils'
import { useActiveWeb3React } from '../../hooks'
import useAddTokenToMetamask from '../../hooks/useAddTokenToMetamask'
import { Box, Button } from '@chakra-ui/react'

const Wrapper = styled.div`
  width: 100%;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

const BottomSection = styled(Section)`
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`

const StyledLogo = styled.img`
  height: 16px;
  width: 16px;
  margin-left: 6px;
`

function ConfirmationPendingContent({ onDismiss, pendingText }: { onDismiss: () => void; pendingText: string }) {
  return (
    <Wrapper className='select_tocn_modal'>
      <Section className='sec_err_nil'>
        <RowBetween className='select_tocn_modal_inn'>
          <div />
          <Text className='wt_fr_cnfrmtion_txt'>
            Wait For Confirmation
          </Text>
          <CloseIcon onClick={onDismiss} className="close_btn"/>
        </RowBetween>
       
         <div className='clr_blk_mdl_nll'>
          <ConfirmedIcon>
            <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
          </ConfirmedIcon>
          <AutoColumn gap="12px" justify={'center'}>
           <Text fontWeight={500} fontSize={20} color={"#FFFFFF"}>
            Waiting For Confirmation
            </Text>
            <AutoColumn gap="12px" justify={'center'}>
              <Text fontWeight={600} fontSize={14} color="#FFFFFF" textAlign="center">
                {pendingText}
              </Text>
            </AutoColumn>
            <Text fontSize={12} color="#FFFFFF" textAlign="center">
              Confirm this transaction in your wallet
            </Text>
          </AutoColumn>
         </div>
        
      </Section>
    </Wrapper>
  )
}

function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const theme = useContext(ThemeContext)

  const { library } = useActiveWeb3React()

  const { addToken, success } = useAddTokenToMetamask(currencyToAdd)

  return (
    <Wrapper >
      <Section className='pdng_nill'>
        <RowBetween>
          <div />
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
        
        <AutoColumn gap="12px" justify={'center'}>
          <div className='clr_blc_nl'>
            <ConfirmedIcon>
              <ArrowUpCircle stroke='#06D8B2' strokeWidth={0.5} size={90} color={theme.primary1} />
            </ConfirmedIcon>
            <Text fontWeight={500} fontSize={20} color={"#FFFFFF"}>
              Transaction Submitted
            </Text>
            {chainId && hash && (
              <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')}>
                <Text fontWeight={500} fontSize={14} color={"#FFFFFF"}>
                  View on Explorer
                </Text>
              </ExternalLink>
            )}
            {currencyToAdd && library?.provider?.isMetaMask && (
              <ButtonLight mt="12px" padding="6px 12px" width="fit-content" onClick={addToken}>
                {!success ? (
                  <RowFixed>
                    Add {currencyToAdd.symbol} to Metamask <StyledLogo src={MetaMaskLogo} />
                  </RowFixed>
                ) : (
                  <RowFixed>
                    Added {currencyToAdd.symbol}{' '}
                    <CheckCircle size={'16px'} stroke={theme.green1} style={{ marginLeft: '6px' }} />
                  </RowFixed>
                )}
              </ButtonLight>
            )}
          </div>
          
          <ButtonPrimary onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
            <Button className='manage_btn_nls'>              
              Close
            </Button>
          </ButtonPrimary>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  title,
  bottomContent,
  onDismiss,
  topContent
}: {
  title: string
  onDismiss: () => void
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Section className='select_tocn_modal_inn'>
        <RowBetween className='select_text_prnt'>
          <Text className='select_text'>
            {title}
          </Text>
          <CloseIcon onClick={onDismiss} className="close_btn" />
        </RowBetween>
      </Section>
      <Box className="mddlgrdnt_sc">
        {topContent()}
        <BottomSection className='btm_ftr_nls' gap="12px">{bottomContent()}</BottomSection>
      </Box>      
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const theme = useContext(ThemeContext)
  return (
    // <Wrapper className='select_tocn_modal main_err_prnt'>
    //   <Section className='sec_err_nil'>
    //     <div className='err_nill_prnt'>
    //       <RowBetween className='err_nill_prnt'>
    //         <Text fontWeight={500} fontSize={20} color={"#FFFFFF"}>
    //           Error
    //         </Text>
    //         <CloseIcon onClick={onDismiss} />
    //       </RowBetween>
    //       <AutoColumn style={{ marginTop: 20, padding: '2rem 0' }} gap="24px" justify="center">
    //         <AlertTriangle color={theme.red1} style={{ strokeWidth: 1.5 }} size={64} />
    //         <Text fontWeight={500} fontSize={16} color={theme.red1} style={{ textAlign: 'center', width: '85%' }}>
    //           {message}
    //         </Text>
    //       </AutoColumn>
    //     </div>       
    //   </Section>
    //   <BottomSection gap="12px" className='dsms_btn_prnt'>
    //     <ButtonPrimary className='manage_btn_nls' onClick={onDismiss}>Dismiss</ButtonPrimary>
    //   </BottomSection>
    // </Wrapper>
    <Wrapper className='select_tocn_modal main_err_prnt'>
      <Section className='sec_err_nil'>
        <div className='err_nill_prnt'>
          <RowBetween className='err_nill_prnt'>
            <div className='select_text_prnt w-100'>
              <Text className="select_text">
                Error
              </Text>
              <CloseIcon onClick={onDismiss} className="close_btn" />
            </div>
            
          </RowBetween>
          <div className='mddlgrdnt_sc'>
            <AutoColumn style={{ marginTop: 20, padding: '2rem 0' }} gap="24px" justify="center">
              <AlertTriangle color={theme.red1} style={{ strokeWidth: 1.5 }} size={64} />
              <Text fontWeight={500} fontSize={16} color={theme.red1} style={{ textAlign: 'center', width: '85%' }}>
                {message}
              </Text>
            </AutoColumn>
          </div>
          
        </div>
      </Section>
      <BottomSection gap="12px" className='dsms_btn_prnt' >
        <ButtonPrimary className='manage_btn_nls' onClick={onDismiss}>Dismiss</ButtonPrimary>
      </BottomSection>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

export default function TransactionConfirmationModal({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd
}: ConfirmationModalProps) {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}
