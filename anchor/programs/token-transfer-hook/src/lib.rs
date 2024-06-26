use anchor_lang::prelude::*;
use instructions::*;

use spl_transfer_hook_interface::instruction::TransferHookInstruction;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("FCpYRhgTTicTM3zZVYLpswXCko6mKVyzdf5fBe7yoZps");

#[program]
pub mod token_transfer_hook {
    use super::*;

    pub fn fallback<'info>(
        program_id: &Pubkey,
        accounts: &'info [AccountInfo<'info>],
        data: &[u8],
    ) -> Result<()> {
        let instruction = TransferHookInstruction::unpack(data)?;

        // match instruction discriminator to transfer hook interface execute instruction
        // token2022 program CPIs this instruction on token transfer
        match instruction {
            TransferHookInstruction::Execute { amount } => {
                let amount_bytes = amount.to_le_bytes();

                // invoke custom transfer hook instruction on our program
                __private::__global::transfer_hook(program_id, accounts, &amount_bytes)
            }
            _ => return Err(ProgramError::InvalidInstructionData.into()),
        }
    }

    pub fn initialize_extra_account_meta_list(
        ctx: Context<InitializeExtraAccountMetaList>,
    ) -> Result<()> {
        _initialize_extra_account_meta_list(ctx)
    }

    pub fn transfer_hook(ctx: Context<TransferHook>, amount: u64) -> Result<()> {
        _transfer_hook(ctx, amount)
    }
}
