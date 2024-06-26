import { programId, TokenTransferHookIDL } from '@token-transfer-hook/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useTokenTransferHookProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = new Program(TokenTransferHookIDL, programId, provider);

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const greet = useMutation({
    mutationKey: ['tokenTransferHook', 'greet', { cluster }],
    mutationFn: async (_keypair: Keypair) => {
      // Generate keypair to use as address for the transfer-hook enabled mint
      const mintPublicKey = new Keypair().publicKey;

      const [extraAccountMetaListPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from('extra-account-metas'), mintPublicKey.toBuffer()],
        program.programId
      );

      const transaction = new Transaction().add(
        // ComputeBudgetProgram.setComputeUnitLimit({
        //   units: 45000, // Adjust this value based on your needs
        // }),
        await program.methods
          .initializeExtraAccountMetaList()
          .accounts({
            mint: mintPublicKey,
            extraAccountMetaList: extraAccountMetaListPDA,
          })
          .signers([])
          .instruction()
      );

      return provider.sendAndConfirm(transaction, []);
    },
    onSuccess: (signature) => {
      transactionToast(signature);
    },
    onError: () => toast.error('Failed to run program'),
  });

  return {
    program,
    programId,
    getProgramAccount,
    greet,
  };
}
