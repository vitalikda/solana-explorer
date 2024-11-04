type Block = {
  blockHash: string;
  prevBlockHash: string;
  slot: number;
  timestamp: string;
  txCount: number;
  leader: string;
  rewardSol: number;
  rewardUsd: number;
  solanaPriceUsd: number;
};

export const getBlocks = async (): Promise<Block[]> => {
  const url = process.env.NEXT_PUBLIC_API_URL || "";
  const res = await fetch(`${url.toString()}/blocks.json`);
  return res.json();
};
