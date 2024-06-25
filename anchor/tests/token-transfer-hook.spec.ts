import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { TokenTransferHook } from '../target/types/token_transfer_hook';

describe('token-transfer-hook', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .TokenTransferHook as Program<TokenTransferHook>;

  it('should run the program', async () => {
    // Add your test here.
    const tx = await program.methods.greet().rpc();
    console.log('Your transaction signature', tx);
  });
});
