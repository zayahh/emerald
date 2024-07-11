"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Video } from "lucide-react"
import { categories } from "@/lib/data"
import "/node_modules/flag-icons/css/flag-icons.min.css"
import Link from "next/link"

export type Run = {
  id: string
  flag: string
  name: string
  igt: string
  rta: string
  video: string
  date: Date
  category: string
}

interface props {
  row: { original: { name: string; flag: string } };
}

export const columns: ColumnDef<Run>[] = [
  {
    header: "#",
    id: "id",
    cell: ({ row, table }) => (
        <div className="w-[0px]">{((table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1) as React.ReactNode}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }: props) => {
      const name: string = row.original.name
      const flagId: string = row.original.flag
      const flagSpan = flagId
        ? <span className={`fi fi-${flagId}`}></span>
        : <span className="fi fi-xx"></span>

      return (<div className='w-24 flex items-center gap-2'>
        <div className="w-6 h-5">{flagSpan}</div>
        <p className="text-ellipsis whitespace-nowrap">{name}</p>
      </div>)
    },
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
  {
    accessorKey: "video",
    header: "",
    cell: ({ row }) => {
      const video: string = row.getValue('video')

      if (!video) {
        return null
      }

      const videoLink = (video.length === 11)
        ? `https://www.youtube.com/watch?v=${video}`
        : `https://www.twitch.tv/videos/${video}`;

      return (
        <Link href={videoLink} target="_blank" className='relative w-8 h-8 shrink-0'>
          <Video className="h-6 w-6" />
        </Link>
      )
    },
  },
]
