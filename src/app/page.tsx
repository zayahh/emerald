import { Run, columns } from './columns'
import { DataTable } from '@/components/data-table'

async function getRuns(): Promise<Run[]> {
    const res = await fetch(
        'https://polskagura-api.vercel.app/api/data/misc',
        { cache: 'no-store' }
    )

    const data = await res.json()
    return data
}

export default async function Leaderboard() {

    const data = await getRuns()

    return (
        <div className='p-2 mx-auto max-w-[1280px]'>
            <DataTable columns={columns} data={data} />
        </div>
    )
}