use anchor_lang::prelude::*;

declare_id!("7R1TCtyhpENWUmYBWdttEi4uuV7GbJeF63JrtVTo7TYN");

#[program]
pub mod token_transfer_hook {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
