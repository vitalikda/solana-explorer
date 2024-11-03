"use client";

import { useState } from "react";
import { IconClose } from "src/components/icons/close";
import { IconSearch } from "src/components/icons/search";
import { Button } from "src/components/ui/button";
import { Input, type InputProps } from "src/components/ui/input";
import { useDebounceCallback } from "src/hooks/useDebounceCallback";

const INPUT_DEBOUNCE_TIME = 350;

export type SearchFieldProps = Omit<InputProps, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
};

const SearchField = ({
  value: initialValue,
  onChange,
  debounceTime = INPUT_DEBOUNCE_TIME,
  ...props
}: SearchFieldProps) => {
  const [search, setSearch] = useState(initialValue);

  const onSearchDebounce = useDebounceCallback((value: string) => {
    onChange(value);
  }, debounceTime);

  const onClear = () => {
    setSearch("");
    onChange("");
  };

  const onSearch = (value: string) => {
    setSearch(value);
    onSearchDebounce(value);
  };

  return (
    <div className="relative">
      <IconSearch className="absolute bottom-0 left-4 top-0 my-auto h-5 w-5 text-muted-foreground" />

      <Input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        type="search"
        placeholder="Search..."
        className="px-12"
        {...props}
      />

      {!!search && (
        <Button
          onClick={onClear}
          size="icon"
          variant="ghost"
          className="absolute bottom-0 right-4 top-0 my-auto h-6 w-6 text-muted-foreground"
        >
          <IconClose className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SearchField;
