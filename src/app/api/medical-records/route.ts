import { NextResponse } from 'next/server';
import { mockMedicalRecords } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');

  let results = [...mockMedicalRecords];
  if (patientId) {
    results = results.filter((r) => r.patientId === patientId);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}
