export type TokenTransferHook = {
  version: '0.1.0';
  name: 'token_transfer_hook';
  instructions: [
    {
      name: 'greet';
      accounts: [];
      args: [];
    }
  ];
};

export const IDL: TokenTransferHook = {
  version: '0.1.0',
  name: 'token_transfer_hook',
  instructions: [
    {
      name: 'greet',
      accounts: [],
      args: [],
    },
  ],
};
