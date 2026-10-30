import { NextResponse } from 'next/server';
import { mockBeds } from '@/data/mockData';
import { bedUpdateSchema } from '@/lib/validations';

let bedsStore = [...mockBeds];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const departmentId = searchParams.get('departmentId');
  const type = searchParams.get('type');

  let results = [...bedsStore];

  if (status) {
    results = results.filter((b) => b.status.toLowerCase() === status.toLowerCase());
  }
  if (departmentId) {
    results = results.filter((b) => b.departmentId === departmentId);
  }
  if (type) {
    results = results.filter((b) => b.type.toLowerCase() === type.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    availableCount: results.filter((b) => b.status === 'Available').length,
    occupiedCount: results.filter((b) => b.status === 'Occupied').length,
    data: results,
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const validated = bedUpdateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 });
    }

    const { bedId, status, patientId, patientName } = validated.data;
    const bedIndex = bedsStore.findIndex((b) => b.id === bedId);

    if (bedIndex === -1) {
      return NextResponse.json({ success: false, error: 'Bed not found' }, { status: 404 });
    }

    bedsStore[bedIndex] = {
      ...bedsStore[bedIndex],
      status,
      patientId: status === 'Occupied' ? patientId : undefined,
      patientName: status === 'Occupied' ? patientName : undefined,
      admittedDate: status === 'Occupied' ? new Date().toISOString() : undefined,
    };

    return NextResponse.json({
      success: true,
      message: 'Bed status updated',
      data: bedsStore[bedIndex],
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
