"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchField, { type SearchFieldProps } from "src/components/SearchField";

type SearchProps = Omit<SearchFieldProps, "value" | "onChange"> & {
  queryKey?: string;
};

const Search = ({ queryKey = "query", ...props }: SearchProps) => {
  const pathname = usePathname() as Route;
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

export const SearchServer = (props: SearchProps) => (
  <Suspense>
    <Search {...props} />
  </Suspense>
);
