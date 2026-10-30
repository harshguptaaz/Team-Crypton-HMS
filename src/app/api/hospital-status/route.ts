import { NextResponse } from 'next/server';
import { mockHospitalLiveStatus } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockHospitalLiveStatus,
  });
}
