"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchField, { type SearchFieldProps } from "src/components/SearchField";

export const SearchServer = ({
  queryKey = "query",
  ...props
}: Omit<SearchFieldProps, "value" | "onChange"> & {
  queryKey?: string;
}) => {
  const pathname = usePathname();
  const query = useSearchParams();
  const { replace } = useRouter();

  const onSearch = (value: string) => {
    const params = new URLSearchParams(query ?? "");
    if (value) {
      params.set(queryKey, value);
    } else {
      params.delete(queryKey);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <SearchField
      {...props}
      value={query.get(queryKey) || ""}
      onChange={onSearch}
      debounceTime={350}
    />
  );
};
