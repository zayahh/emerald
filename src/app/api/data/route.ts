import { NextResponse, NextRequest } from 'next/server'
import { data } from '@/data/data'

export async function GET(req: NextRequest) {

  const response = NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=10'
    }
  })

  return response
}
