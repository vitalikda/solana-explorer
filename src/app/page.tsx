import { Suspense } from "react";
import { IconSolana } from "src/components/icons/networks/solana";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "src/components/ui/card";
import { BlockList } from "./BlockList";
import { SearchServer } from "./SearchServer";

export default function Home() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-col gap-6 px-10 py-10 md:gap-10 md:px-12 md:py-20">
      <Card>
        <CardContent className="flex flex-row items-center space-x-6">
          <IconSolana />
          <div className="flex-1 space-y-2">
            <CardTitle>Block Explorer</CardTitle>
            <CardDescription>
              Check list of blocks and detailed view.
            </CardDescription>
          </div>
        </CardContent>
      </Card>

      <div>
        <SearchServer />
      </div>

      <div>
        <Suspense>
          <BlockList />
        </Suspense>
      </div>
    </div>
  );
}
