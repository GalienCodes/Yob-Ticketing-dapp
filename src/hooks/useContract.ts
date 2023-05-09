import { useEffect, useCallback, useState } from 'react';
import { Contract } from 'web3-eth-contract';
import { useContractKit } from '@celo-tools/use-contractkit';
import contractAbi from '../contracts/abis/yobooking.json';
import { AbiItem } from 'web3-utils';
const contractAddress = '0xBD5d41bC7cBA7495B7456c6498AC30B0f4F50e90';

export const useContract = () => {
  const { address, getConnectedKit } = useContractKit();
  const [contract, setContract] = useState<number>();
  // let contract;/

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();
    // get a contract interface to interact with
    //@ts-ignore
    setContract(new kit.web3.eth.Contract(
      contractAbi.abi as AbiItem[],
      contractAddress
    ));
  }, [getConnectedKit, contractAbi.abi, contractAddress]);
  
  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);

  return contract;
};



interface MyContract extends Contract {
  myFunction(arg1: string, arg2: number): Promise<string>;
  myOtherFunction(): Promise<void>;
  // add more function signatures here
  
}