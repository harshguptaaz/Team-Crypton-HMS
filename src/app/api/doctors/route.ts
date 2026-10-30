import { NextResponse } from 'next/server';
import { mockDoctors } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get('departmentId');
  const query = searchParams.get('q');

  let doctors = [...mockDoctors];

  if (departmentId) {
    doctors = doctors.filter((doc) => doc.departmentId === departmentId);
  }

  if (query) {
    const q = query.toLowerCase();
    doctors = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(q) ||
        (doc.specialty || doc.specialization || '').toLowerCase().includes(q) ||
        (doc.departmentName || doc.department || '').toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: doctors.length,
    data: doctors,
  });
}
