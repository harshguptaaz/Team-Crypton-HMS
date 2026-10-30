import { NextResponse } from 'next/server';
import { mockPrescriptions } from '@/data/mockData';
import { prescriptionSchema } from '@/lib/validations';
import { Prescription } from '@/types';

let prescriptionsStore = [...mockPrescriptions];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');
  const doctorId = searchParams.get('doctorId');

  let results = [...prescriptionsStore];

  if (patientId) {
    results = results.filter((p) => p.patientId === patientId);
  }
  if (doctorId) {
    results = results.filter((p) => p.doctorId === doctorId);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = prescriptionSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 });
    }

    const { patientId, diagnosis, medicines, notes } = validated.data;

    const newPrescription: Prescription = {
      id: `rx-${Date.now()}`,
      patientId,
      patientName: 'Rahul Verma',
      doctorId: 'doc-1',
      doctorName: 'Dr. Ananya Sharma',
      doctorSpecialty: 'Cardiologist',
      department: 'Cardiology',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      medicines: medicines.map((m) => ({
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        duration: m.duration,
        instructions: m.instructions || '',
      })),
      notes: notes || '',
      status: 'Active',
    };

    prescriptionsStore.unshift(newPrescription);

    return NextResponse.json({ success: true, data: newPrescription }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
