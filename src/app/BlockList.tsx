"use client";

import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IconSolana } from "src/components/icons/networks/solana";
import { Button } from "src/components/ui/button";
import { Skeleton } from "src/components/ui/skeleton";
import { getBlocks } from "src/lib/api/getBlocks";
import { timeSince } from "src/lib/date/timeSince";
import { formatMoney } from "src/lib/number/formatMoney";
import { formatNumber } from "src/lib/number/formatNumber";
import { shorten } from "src/lib/string/shorten";

const labels = [
  "Block hash",
  "Slot",
  "Timestamp",
  "Tx count",
  "Leader",
  "Reward",
] as const;

export const BlockList = () => {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("query");

  const { data, isPending } = useQuery({
    queryKey: ["blocks"],
    queryFn: () => getBlocks(),
  });

  const blocks = useMemo(() => {
    if (!data) return [];
    if (query) {
      return data.filter((b) => b.blockHash.includes(query));
    }
    return data;
  }, [data, query]);

  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="hidden w-full items-center gap-4 px-6 md:grid md:grid-cols-[1fr_1fr_1fr_75px_1fr_1fr]">
        {labels.map((item) => (
          <div key={item} className="text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </div>

      {isPending ? (
        <div className="grid w-full grid-cols-[1fr_2fr] items-center gap-4 rounded-md bg-muted px-6 py-5 md:grid-cols-[1fr_1fr_1fr_75px_1fr_1fr]">
          {labels.map((item) => (
            <Skeleton key={item} className="w-[calc(100% - 1rem)] h-4" />
          ))}
        </div>
      ) : (
        blocks.map((b) => (
          <div
            key={b.slot}
            onClick={() => router.push(`/block/${b.slot}`)}
            className="grid w-full cursor-pointer grid-cols-[1fr_2fr] items-center gap-4 rounded-md bg-muted px-6 py-5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground md:grid-cols-[1fr_1fr_1fr_75px_1fr_1fr]"
          >
            <div className="text-sm md:sr-only">{labels[0]}</div>
            <div>
              <Button variant="link" asChild className="p-0 text-left">
                <NextLink href={`/block/${b.slot}`}>
                  {shorten(b.blockHash)}
                </NextLink>
              </Button>
            </div>

            <div className="text-sm md:sr-only">{labels[1]}</div>
            <div>
              <Button variant="link" asChild className="p-0 text-left">
                <NextLink href={`/block/${b.slot}`}>{`#${b.slot}`}</NextLink>
              </Button>
            </div>

            <div className="text-sm md:sr-only">{labels[2]}</div>
            <div>{timeSince(b.timestamp)}</div>

            <div className="text-sm md:sr-only">{labels[3]}</div>
            <div>{b.txCount}</div>

            <div className="text-sm md:sr-only">{labels[4]}</div>
            <div>
              <Button variant="link" asChild className="p-0 text-left">
                <NextLink href={`/block/${b.slot}`}>
                  {shorten(b.leader)}
                </NextLink>
              </Button>
            </div>

            <div className="text-sm md:sr-only">{labels[5]}</div>
            <div className="flex items-center gap-1 overflow-x-hidden">
              <div>
                <IconSolana className="h-4 w-4" />
              </div>
              <div className="whitespace-nowrap">
                {`${formatNumber(b.rewardSol)} SOL (${formatMoney(b.rewardUsd)})`}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
