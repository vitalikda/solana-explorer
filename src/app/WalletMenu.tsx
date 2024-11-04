"use client";

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  type Wallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { type Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Client } from "@solflare-wallet/utl-sdk";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { IconButtonCopy } from "src/components/IconButtonCopy";
import { IconChevron } from "src/components/icons/chevron";
import { IconLogout } from "src/components/icons/logout";
import { IconSpinner } from "src/components/icons/spinner";
import { IconWallet } from "src/components/icons/wallet";
import { Button } from "src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetContentClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "src/components/ui/sheet";
import { Skeleton } from "src/components/ui/skeleton";
import { formatMoney } from "src/lib/number/formatMoney";
import { shorten } from "src/lib/string/shorten";

const WalletConnect = () => {
  const { wallets, select, disconnect } = useWallet();
  const installedWallets = useMemo(
    () => wallets.filter((w) => w.readyState === "Installed"),
    [wallets],
  );

  const [currentWallet, setCurrentWallet] = useState("");

  const handleSelect = async (wallet: Wallet) => {
    try {
      setCurrentWallet(wallet.adapter.name);

      select(wallet.adapter.name);
      await wallet.adapter.connect();

      const account = wallet.adapter.publicKey?.toBase58();
      if (!account) throw new Error("Failed to connect");
    } catch (error) {
      disconnect();
      const err = error as { message: string };
      const msg = err?.message ?? "Something went wrong";
      toast.error(msg, { id: msg });
    } finally {
      setCurrentWallet("");
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {!installedWallets.length ? (
        <p className="text-center text-muted-foreground">No wallets found</p>
      ) : (
        installedWallets.map((wallet) => {
          return (
            <Button
              key={wallet.adapter.name}
              onClick={() => handleSelect(wallet)}
              disabled={!!currentWallet}
              variant="secondary"
              size="lg"
              className="flex h-16 w-full gap-4"
            >
              <div>
                {wallet.adapter.name === currentWallet ? (
                  <IconSpinner className="h-8 w-8 animate-spin" />
                ) : (
                  <NextImage
                    src={wallet.adapter.icon?.trim() ?? ""}
                    alt={wallet.adapter.name}
                    width={0}
                    height={0}
                    className="h-8 w-8"
                  />
                )}
              </div>
              <div>{wallet.adapter.name}</div>
              <div className="ml-auto">
                <IconChevron className="h-4 w-4" />
              </div>
            </Button>
          );
        })
      )}
    </div>
  );
};

const fromLamports = (n: string | number) => +n / LAMPORTS_PER_SOL;

const getWalletAssets = async (connection: Connection, account: string) => {
  const accountPK = new PublicKey(account);

  const solBalance = await connection.getBalance(accountPK);

  const assets = [
    {
      name: "Solana",
      icon: "/solana.png",
      amount: fromLamports(solBalance),
      amountUsd: 0,
      mint: "SOL",
    },
  ];

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    accountPK,
    { programId: TOKEN_PROGRAM_ID },
  );

  const utl = new Client();

  for (const accountInfo of tokenAccounts.value) {
    const { mint, tokenAmount } = accountInfo.account.data.parsed.info;
    const token = await utl.fetchMint(new PublicKey(mint));

    assets.push({
      name: token.name,
      icon: token.logoURI ?? "",
      amount: tokenAmount.uiAmount,
      amountUsd: 0,
      mint,
    });
  }

  return assets;
};

const WalletAssets = ({ account }: { account: string }) => {
  const { connection } = useConnection();

  const { data: assets, isPending } = useQuery({
    queryKey: ["wallet", "assets", account],
    queryFn: () => getWalletAssets(connection, account),
  });

  if (isPending) {
    return <Skeleton className="h-12 w-full" />;
  }

  if (!assets) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      {assets.map((asset) => (
        <div
          key={asset.mint}
          className="flex w-full items-center gap-4 rounded-md bg-muted px-6 py-5"
        >
          <div>
            <NextImage
              src={asset.icon}
              alt={asset.name}
              width={28}
              height={28}
              quality={100}
            />
          </div>
          <div className="flex-1">
            <div className="font-heading">{asset.name}</div>
          </div>
          <div className="text-right">
            <div className="font-heading">{formatMoney(asset.amountUsd)}</div>
            <div className="font-heading text-sm text-muted-foreground">
              {asset.amount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const WalletMenu = () => {
  const { publicKey, wallet, disconnect } = useWallet();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <IconWallet className="h-6 w-6" />
          {publicKey ? (
            <span className="sr-only">Wallet Connect</span>
          ) : (
            <span>Login</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        {!!publicKey && (
          <SheetContentClose asChild>
            <Button
              onClick={() => disconnect()}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-transparent hover:text-foreground"
            >
              <IconLogout className="h-4 w-4" />
            </Button>
          </SheetContentClose>
        )}
        <div className="flex min-h-screen flex-col items-center gap-8">
          <SheetHeader>
            <SheetDescription>Total balance</SheetDescription>
            <SheetTitle>$0.0</SheetTitle>
          </SheetHeader>
          {!publicKey || !wallet ? (
            <WalletConnect />
          ) : (
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full items-center gap-4 rounded-md bg-muted px-6 py-5">
                <div>
                  <NextImage
                    src={wallet.adapter.icon?.trim() ?? ""}
                    alt={wallet.adapter.name}
                    width={0}
                    height={0}
                    className="h-8 w-8"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-heading">{wallet.adapter.name}</div>
                  <div className="font-heading text-sm text-muted-foreground">
                    {shorten(publicKey.toBase58())}
                  </div>
                </div>
                <div>
                  <IconButtonCopy text={publicKey.toBase58()} />
                </div>
              </div>
              <WalletAssets account={publicKey.toBase58()} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
