import { NextResponse } from 'next/server';
import { mockPatients } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const status = searchParams.get('status');

  if (id) {
    const patient = mockPatients.find((p) => p.id === id);
    if (!patient) {
      return NextResponse.json({ success: false, error: 'Patient not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: patient });
  }

  let patients = [...mockPatients];
  if (status) {
    patients = patients.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    total: patients.length,
    data: patients,
  });
}
