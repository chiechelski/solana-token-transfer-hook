use anchor_lang::error_code;

#[error_code]
pub enum ErrorTransferHook {
    #[msg("The transferred amount is too big")]
    AmountTooBig,
}
