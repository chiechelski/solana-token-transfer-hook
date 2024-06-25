#![allow(clippy::result_large_err)]

use anchor_lang::{prelude::*, solana_program};
use solana_program::pubkey::Pubkey;

// global config
#[account]
pub struct Config {
    pub authority: Pubkey,
    pub tax_recipient: Pubkey,
    pub tax_minimum_cost: u64, // minimum tax cost in lamports
    pub tax_percentage: f32,   // percentage, from 0.01 to 10
}
