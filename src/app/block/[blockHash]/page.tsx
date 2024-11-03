import NextLink from "next/link";
import { notFound } from "next/navigation";
import { IconButtonCopy } from "src/components/IconButtonCopy";
import { IconChevron } from "src/components/icons/chevron";
import { IconSolana } from "src/components/icons/networks/solana";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "src/components/ui/card";
import { getBlocks } from "src/lib/api/getBlocks";
import { formatDateTime } from "src/lib/date/formatDateTime";
import { timeSince } from "src/lib/date/timeSince";
import { formatMoney } from "src/lib/number/formatMoney";
import { shorten } from "src/lib/string/shorten";

export default async function Page({
  params,
}: {
  params: Promise<{ blockHash: string }>;
}) {
  const { blockHash } = await params;
  const blocks = await getBlocks();
  const block = blocks.find((b) => b.slot === Number(blockHash));

  if (!block) {
    notFound();
  }

  const nextBlock = blocks.find((b) => b.prevBlockHash === block.blockHash);

  return (
    <div className="container mx-auto flex max-w-5xl flex-col gap-6 px-10 py-10 md:gap-10 md:px-12 md:py-20">
      <div className="flex gap-6">
        <Button variant="secondary" size="lg" className="h-auto" asChild>
          <NextLink href="/">
            <IconChevron className="h-6 w-6 rotate-180" />
          </NextLink>
        </Button>
        <Card className="w-full">
          <CardContent className="flex flex-row items-center space-x-6">
            <IconSolana />
            <div className="flex-1 space-y-2">
              <CardTitle>Block #{blockHash}</CardTitle>
              <CardDescription>Check the block details.</CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <Card className="col-span-1">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">Block</p>
            <div className="flex items-center gap-2">
              {!nextBlock ? (
                <div className="h-4 w-4" />
              ) : (
                <NextLink
                  href={`/block/${nextBlock.slot}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <IconChevron className="h-4 w-4 rotate-180" />
                </NextLink>
              )}
              <p>#{block.slot}</p>
              <NextLink
                href={`/block/${block.prevBlockHash}`}
                className="text-muted-foreground hover:text-foreground"
              >
                <IconChevron className="h-4 w-4" />
              </NextLink>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">
              Timestamp
            </p>
            <p>{timeSince(block.timestamp)}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">
              Date (UTC)
            </p>
            <p>{formatDateTime(block.timestamp)}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">
              Transactions
            </p>
            <p>{block.txCount}</p>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">
              Block hash
            </p>
            <p>{block.blockHash}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">Leader</p>
            <div className="flex items-center gap-2">
              <p className="text-primary">{shorten(block.leader)}</p>
              <IconButtonCopy text={block.leader} />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">Reward</p>
            <div className="flex items-center gap-1">
              <div>
                <IconSolana className="h-4 w-4" />
              </div>
              <div>{`${block.rewardSol} SOL`}</div>
              <div className="text-muted-foreground">
                {`(${formatMoney(block.rewardUsd)} @ ${formatMoney(block.solanaPriceUsd)})`}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <p className="font-heading text-sm text-muted-foreground">
              Previous Block Hash
            </p>
            <p>{block.prevBlockHash}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
