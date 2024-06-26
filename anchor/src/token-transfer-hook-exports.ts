// Here we export some useful types and functions for interacting with the Anchor program.
import { PublicKey } from '@solana/web3.js';
import type { TokenTransferHook } from '../target/types/token_transfer_hook';
import { IDL as TokenTransferHookIDL } from '../target/types/token_transfer_hook';

// Re-export the generated IDL and type
export { TokenTransferHook, TokenTransferHookIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const programId = new PublicKey(
  'FCpYRhgTTicTM3zZVYLpswXCko6mKVyzdf5fBe7yoZps'
);
