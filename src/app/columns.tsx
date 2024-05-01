"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
import { categories } from "@/lib/data"
import "/node_modules/flag-icons/css/flag-icons.min.css"

export type Run = {
  id: string
  flag: string
  name: string
  igt: string
  rta: string
  status: "Pending" | "Verified" | "Rejected"
  date: Date
  category: string
}

export const columns: ColumnDef<Run>[] = [
  {
    accessorKey: "flag",
    header: "",
    cell: ({ row }) => {
      const flagId = row.getValue('flag')
      const flagSpan = flagId
        ? <span className={`fi fi-${flagId}`}></span>
        : <span className="fi fi-xx"></span>

      return (<div className='relative w-6 h-6'>
          {flagSpan}
      </div>)
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name: string = row.getValue('name')

      return (<p className='w-24 text-ellipsis'>
        {name}
      </p>)
    },
    size: 50,
  },
  {
    accessorKey: "igt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start hover:animate-pulse cursor-pointer font-bold"
        >
          IGT
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      const seconds: number = row.getValue('igt')
      const days = Math.floor(seconds / 86400)
      const remainderSeconds = seconds % 86400
      
      const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19)
      
      return days * 24 === 0 ? hms.substring(3) : hms.replace(/^(\d+)/, h => `${Number(h) + days * 24}`.padStart(2, '0'))
    },
  },
  {
    accessorKey: "rta",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start hover:animate-pulse cursor-pointer font-bold"
        >
          RTA
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      const seconds: number = row.getValue('rta')
      const days = Math.floor(seconds / 86400)
      const remainderSeconds = seconds % 86400
      
      const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19)
      
      return days * 24 === 0 ? hms.substring(3) : hms.replace(/^(\d+)/, h => `${Number(h) + days * 24}`.padStart(2, '0'))
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start hover:animate-pulse cursor-pointer font-bold"
        >
          Date
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          className="font-bold"
        >
          Category
        </div>
      )
    },
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.getValue("category")
      )

      if (!category) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{category.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // dodać actions z wideo i src?
]
