import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected, walletconnect } from '../connectors'
import { ChainId, JSBI, Percent, Token, WETH } from '../sdk'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  HALF_YEAR: '6 months',
  ALL_TIME: 'All time',
}

export const SUPPORTED_LIST_URLS__NO_ENS = ['https://www.coingecko.com/tokens_list/uniswap/defi_100/v_0_0_0.json']

export const FACTORY_ADDRESS = '0x06530550A48F990360DFD642d2132354A144F31d'

export const BUNDLE_ID = '1'

export const NETWORK_LABELS: { [chainId in number]?: string } = {
  25: 'Cronos'
}

export const CronosChainId = 25

export enum Chain {
  Cronos = 25
}

export const chainTickers = new Map([
  [25, "CRO"]
])

export const chains = new Map([
  [25, Chain.Cronos]
])

export const INFO_CLIENT = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'
export const NEXT_PUBLIC_BIT_QUERY_ENDPOINT = "https://graphql.bitquery.io"

export const BASE_ADDRESS = '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'
export const ROOTED_ADDRESS = '0xb062084aFfDf75b9b494D56B8417F1B981Df790f'
export const STAKING_ADDRESS = '0x78Bf858Ef5f5C286cb8CAaa145D7376d7a96d90e'
export const POOL_ADDRESS = '0xb0a7d88202eB8bf3c43D506b712b4E474eB9cdA3'
export const VAULT_ADDRESS = '0x4856E74681D6E6bB266de2582c549c2cbf12547C'

export const MARKET_GENERATION_ADDRESS = '0x734BD90Cdadc06a2820c4b1D7FD7419530A9e108'
export const CROSS_CHAIN_MARKET_GENERATION_ADDRESS = '0xCcB45704fAE0450237f48C7e93951621a5b8D319'
export const GROUP_MARKET_GENERATION_ADDRESS = '0xDC8c20Aad9D27898f39F07C9C6CE1B50dB4F32D5'
export const MARKET_DISTRIBUTION_ADDRESS = '0xbD59858ebe4bdeCDe65d7aCb1Ca8b305D463A8C8'
export const CLAIM_CALCULATOR_ADDRESS = '0x0e90178Ad52aEfceF298A7F319a31505d1FCca52'

export const EMPIRE_ROUTER_ADDRESS = '0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348'
export const EMPIRE_FACTORY_ADDRESS = '0x06530550A48F990360DFD642d2132354A144F31d'
export const EMPIRE_PAIR_ADDRESS = '0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3'

export const BASE_DECIMALS = 18
export const BASE_TICKER = "CRO"
export const ROOTED_TICKER = "upCRO"
export const STAKING_TICKER = "xUpCRO"

export const VAULT_START_TIME = 1643164589;

export const generationStartDate = new Date(Date.UTC(2021, 11, 15, 0, 20, 0));
export const generationEndDate = new Date(Date.UTC(2022, 0, 26, 0, 20, 0));

export interface WalletInfo {
    connector?: AbstractConnector
    name: string
    iconName: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
  }

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  // DEFI_CONNECT: {
  //   connector: defiWalletConnect,
  //   name: 'Crypto.com DeFi Wallet',
  //   iconName: 'cryptoCom.png',
  //   description: 'Connect to Crypto.com DeFi Wallet',
  //   href: null,
  //   color: '#103f68',
  //   mobile: true
  // },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  }
}

export const SUPPORTED_NETWORKS: {
    [chain in Chain]?: {
      chainId: string
      chainName: string,
      label: string
      nativeCurrency: {
        name: string
        symbol: string
        decimals: number
      }
      rpcUrls: string[]
      blockExplorerUrls: string[]
    }
  } = {   
    [Chain.Cronos]: {
      chainId: '0x19',
      chainName: 'Cronos',
      label: 'Cronos',
      nativeCurrency: {
        name: 'Cronos',
        symbol: 'CRO',
        decimals: 18,
      },
      rpcUrls: ['https://evm-cronos.crypto.org'],
      blockExplorerUrls: ['https://cronoscan.com/']
    }
  }
  
export const NetworkContextName = 'NETWORK'  

export const URL = 'cro.empiredex.org';

export const ROUTER_ADDRESS = '0xdADaae6cDFE4FA3c35d54811087b3bC3Cd60F348'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export { PRELOADED_PROPOSALS } from './proposals'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const USDC = new Token(ChainId.CRONOS, '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.CRONOS, '0x66e428c3f67a68878562e79A0234c1F83c208770', 6, 'USDT', 'Tether USD')

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOS]: new Token(ChainId.CRONOS, UNI_ADDRESS, 18, 'UNI', 'Uniswap')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'UNI',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  // [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.CRONOS]: [WETH[ChainId.CRONOS]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC]
}

export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  // [ChainId.MAINNET]: {
  //   '0xA948E86885e12Fb09AfEF8C52142EBDbDf73cD18': [new Token(ChainId.MAINNET, UNI_ADDRESS, 18, 'UNI', 'Uniswap')],
  //   '0x561a4717537ff4AF5c687328c0f7E90a319705C0': [new Token(ChainId.MAINNET, UNI_ADDRESS, 18, 'UNI', 'Uniswap')],
  //   [FEI.address]: [TRIBE],
  //   [TRIBE.address]: [FEI],
  //   [FRAX.address]: [FXS],
  //   [FXS.address]: [FRAX],
  //   [WBTC.address]: [renBTC],
  //   [renBTC.address]: [WBTC]
  // }
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  // [ChainId.MAINNET]: {
  //   [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  // }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  // [ChainId.MAINNET]: [
  //   [
  //     new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
  //     new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
  //   ],
  //   [USDC, USDT],
  //   [DAI, USDT]
  // ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}
  
// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C'
]
