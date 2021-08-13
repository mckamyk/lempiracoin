// @ts-ignore
import lempira from '#artifacts/src/contracts/lempiracoin.sol/LempiraCoin.json';
import {BigNumber} from 'ethers';
// @ts-ignore
import addr from '../../address';

export const {abi} = lempira;
export const {address} = addr;

import {contract} from './eth';

export const getTotalSupply = async (): Promise<BigNumber> => contract.totalSupply();
