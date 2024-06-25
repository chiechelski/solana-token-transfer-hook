import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useTokenTransferHookProgram } from './token-transfer-hook-data-access';
import {
  TokenTransferHookCreate,
  TokenTransferHookProgram,
} from './token-transfer-hook-ui';

export default function TokenTransferHookFeature() {
  const { publicKey } = useWallet();
  const { programId } = useTokenTransferHookProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="TokenTransferHook"
        subtitle={'Run the program by clicking the "Run program" button.'}
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <TokenTransferHookCreate />
      </AppHero>
      <TokenTransferHookProgram />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
