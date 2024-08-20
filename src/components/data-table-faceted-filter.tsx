import * as React from "react"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
  }[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-card text-card-foreground" align="start">
  <Command>
    <CommandInput className="text-primary-foreground" placeholder={title} />
    <CommandList>
      <CommandEmpty className="text-muted-foreground">No results found.</CommandEmpty>
      <CommandGroup>
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value)
          return (
            <CommandItem
              key={option.value}
              onSelect={() => {
                if (isSelected) {
                  selectedValues.delete(option.value)
                } else {
                  selectedValues.add(option.value)
                }
                const filterValues = Array.from(selectedValues)
                column?.setFilterValue(
                  filterValues.length ? filterValues : undefined
                )
              }}
              className={`flex items-center justify-between p-2 rounded-md text-primary-foreground'
              }`}
            >
              <div
                className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                  isSelected
                    ? "bg-primary"
                    : "opacity-50 [&_svg]:invisible"
                )}
              >
                <CheckIcon className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className={`text-accent-foreground ${isSelected ? 'font-semibold' : 'font-normal'}`}>{option.label}</span>
              {facets?.get(option.value) && (
                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs text-muted-foreground">
                  {facets.get(option.value)}
                </span>
              )}
            </CommandItem>
          )
        })}
      </CommandGroup>
      {selectedValues.size > 0 && (
        <>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => column?.setFilterValue(undefined)}
              className="justify-center text-center font-semibold text-primary-foreground hover:text-accent-foreground"
            >
              Clear filters
            </CommandItem>
          </CommandGroup>
        </>
      )}
    </CommandList>
  </Command>
</PopoverContent>

    </Popover>
  )
}