import { NextResponse } from 'next/server';
import { mockLabTests } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const patientId = searchParams.get('patientId');

  let results = [...mockLabTests];
  if (status) {
    results = results.filter((t) => t.status.toLowerCase() === status.toLowerCase());
  }
  if (patientId) {
    results = results.filter((t) => t.patientId === patientId);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    criticalCount: results.filter((t) => t.status === 'Critical' || t.urgency === 'Critical').length,
    data: results,
  });
}
