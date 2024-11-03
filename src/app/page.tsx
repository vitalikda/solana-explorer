import { IconSolana } from "src/components/icons/networks/solana";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <IconSolana />
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-medium leading-none">Block Explorer</h3>
            <p className="text-sm text-muted-foreground">
              Check list of blocks and detailed view.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
