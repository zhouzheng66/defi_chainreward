import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from "ethers";
import { EthersContractContextV5 } from "ethereum-abi-types-generator";

export type ContractContext = EthersContractContextV5<
  ChainReward,
  ChainRewardMethodNames,
  ChainRewardEventsContext,
  ChainRewardEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type ChainRewardEvents =
  | "BlacklistUpdated"
  | "BountyAccepted"
  | "BountyAdjusted"
  | "BountyCancelled"
  | "BountyCreated"
  | "FeeSet"
  | "TaskReviewed"
  | "TaskSubmitted";
export interface ChainRewardEventsContext {
  BlacklistUpdated(...parameters: any): EventFilter;
  BountyAccepted(...parameters: any): EventFilter;
  BountyAdjusted(...parameters: any): EventFilter;
  BountyCancelled(...parameters: any): EventFilter;
  BountyCreated(...parameters: any): EventFilter;
  FeeSet(...parameters: any): EventFilter;
  TaskReviewed(...parameters: any): EventFilter;
  TaskSubmitted(...parameters: any): EventFilter;
}
export type ChainRewardMethodNames =
  | "new"
  | "acceptBounty"
  | "addToBlacklist"
  | "adjustReward"
  | "admin"
  | "blacklist"
  | "bounties"
  | "cancelBounty"
  | "createBounty"
  | "fee"
  | "getBounty"
  | "getBountyCount"
  | "getTask"
  | "removeFromBlacklist"
  | "reviewTask"
  | "setFee"
  | "submitTaskResult"
  | "tasks"
  | "token"
  | "withdrawCollateral";
export interface BlacklistUpdatedEventEmittedResponse {
  user: string;
  isBlacklisted: boolean;
}
export interface BountyAcceptedEventEmittedResponse {
  bountyId: BigNumberish;
  acceptor: string;
  collateral: BigNumberish;
}
export interface BountyAdjustedEventEmittedResponse {
  bountyId: BigNumberish;
  newReward: BigNumberish;
}
export interface BountyCancelledEventEmittedResponse {
  bountyId: BigNumberish;
}
export interface BountyCreatedEventEmittedResponse {
  bountyId: BigNumberish;
  issuer: string;
  reward: BigNumberish;
}
export interface FeeSetEventEmittedResponse {
  newFee: BigNumberish;
}
export interface TaskReviewedEventEmittedResponse {
  bountyId: BigNumberish;
  approved: boolean;
}
export interface TaskSubmittedEventEmittedResponse {
  bountyId: BigNumberish;
  acceptor: string;
}
export interface BountiesResponse {
  issuer: string;
  0: string;
  reward: BigNumber;
  1: BigNumber;
  description: string;
  2: string;
  isActive: boolean;
  3: boolean;
  isCompleted: boolean;
  4: boolean;
  expiry: BigNumber;
  5: BigNumber;
  length: 6;
}
export interface BountyResponse {
  issuer: string;
  0: string;
  reward: BigNumber;
  1: BigNumber;
  description: string;
  2: string;
  isActive: boolean;
  3: boolean;
  isCompleted: boolean;
  4: boolean;
  expiry: BigNumber;
  5: BigNumber;
}
export interface TaskResponse {
  acceptor: string;
  0: string;
  collateral: BigNumber;
  1: BigNumber;
  result: string;
  2: string;
  isSubmitted: boolean;
  3: boolean;
}
export interface TasksResponse {
  acceptor: string;
  0: string;
  collateral: BigNumber;
  1: BigNumber;
  result: string;
  2: string;
  isSubmitted: boolean;
  3: boolean;
  length: 4;
}
export interface ChainReward {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param tokenAddress Type: address, Indexed: false
   * @param _fee Type: uint256, Indexed: false
   */
  "new"(
    tokenAddress: string,
    _fee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   */
  acceptBounty(
    bountyId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param user Type: address, Indexed: false
   */
  addToBlacklist(
    user: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   * @param newReward Type: uint256, Indexed: false
   */
  adjustReward(
    bountyId: BigNumberish,
    newReward: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  admin(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  blacklist(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  bounties(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BountiesResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   */
  cancelBounty(
    bountyId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param reward Type: uint256, Indexed: false
   * @param description Type: string, Indexed: false
   * @param expiry Type: uint256, Indexed: false
   */
  createBounty(
    reward: BigNumberish,
    description: string,
    expiry: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  fee(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   */
  getBounty(
    bountyId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BountyResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getBountyCount(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   */
  getTask(
    bountyId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<TaskResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param user Type: address, Indexed: false
   */
  removeFromBlacklist(
    user: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   * @param approve Type: bool, Indexed: false
   */
  reviewTask(
    bountyId: BigNumberish,
    approve: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _fee Type: uint256, Indexed: false
   */
  setFee(
    _fee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   * @param result Type: string, Indexed: false
   */
  submitTaskResult(
    bountyId: BigNumberish,
    result: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  tasks(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<TasksResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  token(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param bountyId Type: uint256, Indexed: false
   */
  withdrawCollateral(
    bountyId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
