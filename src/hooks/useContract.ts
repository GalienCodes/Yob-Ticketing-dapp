import { useEffect, useCallback, useState } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import contractAbi from '../contracts/abis/yobooking.json';
const contractAddress = '0xBD5d41bC7cBA7495B7456c6498AC30B0f4F50e90';

export const useContract = () => {
  const { address, getConnectedKit } = useContractKit();
  const [contract, setContract] = useState<number>();
  // let contract;/

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();
    // get a contract interface to interact with
    setContract(new kit.web3.eth.Contract(
      contractAbi.abi as any[],
      contractAddress
    ));
  }, [getConnectedKit, contractAbi.abi, contractAddress]);
  
  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);


  return contract;
};
