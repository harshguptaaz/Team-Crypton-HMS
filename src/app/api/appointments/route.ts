import { NextResponse } from 'next/server';
import { mockAppointments, mockDoctors, mockDepartments } from '@/data/mockData';
import { appointmentBookingSchema } from '@/lib/validations';
import { Appointment } from '@/types';

let appointmentsStore = [...mockAppointments];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');
  const doctorId = searchParams.get('doctorId');

  let results = [...appointmentsStore];

  if (patientId) {
    results = results.filter((a) => a.patientId === patientId);
  }

  if (doctorId) {
    results = results.filter((a) => a.doctorId === doctorId);
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
    const validated = appointmentBookingSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: validated.error.format(),
        },
        { status: 400 }
      );
    }

    const { departmentId, doctorId, appointmentType, date, time, reason, patientName } = validated.data;
    const doc = mockDoctors.find((d) => d.id === doctorId);
    const dept = mockDepartments.find((d) => d.id === departmentId);

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: 'pat-1',
      patientName: patientName || 'Rahul Verma',
      doctorId,
      doctorName: doc ? doc.name : 'Attending Specialist',
      doctorSpecialty: doc ? doc.specialty : 'Clinical Specialist',
      departmentId,
      departmentName: dept ? dept.name : 'General OPD',
      date,
      time,
      type: appointmentType,
      status: 'Confirmed',
      reason,
      tokenNumber: `${dept ? dept.code : 'MED'}-${Math.floor(10 + Math.random() * 90)}`,
    };

    appointmentsStore.unshift(newAppointment);

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment scheduled successfully',
        data: newAppointment,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
