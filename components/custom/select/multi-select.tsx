"use client";

import * as React from "react";
import {useEffect} from "react";
import {X} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import {Command, CommandGroup, CommandItem, CommandList,} from "@/components/ui/command";
import {Command as CommandPrimitive} from "cmdk";

type Options = Record<"value" | "label", string>;

export function MultiSelect({
                                placeholder = "Select an item",
                                data,
                                selectedProp,
                                acceptNewValues = false,
                                onSelected
                            }: {
    placeholder?: string;
    data: Options[];
    selectedProp?: Options[];
    acceptNewValues?: boolean;
    onSelected?: (data: Options[]) => void
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<Options[]>(selectedProp ?? []);
    const [inputValue, setInputValue] = React.useState("");

    useEffect(() => {
        if (onSelected) onSelected(selected)
    }, [onSelected, selected])

    const handleUnselect = React.useCallback((option: Options) => {
        setSelected((prev) => prev.filter((s) => s.value !== option.value));
    }, []);

    const handleSelect = React.useCallback((value: string, selectable: Options) => {
        setInputValue("");
        setSelected((prev) => [...prev, selectable]);
    }, [])

    const selectables = data.filter(
        (d) => !selected.includes(d)
    );


    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelected((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
                if (acceptNewValues) {
                    if (e.key == "Enter") {
                        if (!selectables.map(x => x.value).includes(input.value)) {
                            const newValue = {
                                label: input.value,
                                value: input.value.split(" ").join("_"),
                            }
                            setInputValue("")
                            setSelected((prev) => [...prev, newValue])
                        }
                    }
                }
            }
        },
        [acceptNewValues]
    );


    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible"
        >
            <div
                className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-1">
                    {selected.map((select) => {
                        return (
                            <Badge key={select.value} variant="secondary">
                                {select.label}
                                <button
                                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(select);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(select)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground"/>
                                </button>
                            </Badge>
                        );
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectables.length > 0 ? (
                        <div
                            className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((selectable) => {
                                    return (
                                        <CommandItem
                                            key={selectable.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={(value) => {
                                                handleSelect(value, selectable)
                                            }}
                                            className={"cursor-pointer"}
                                        >
                                            {selectable.label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    );
}
