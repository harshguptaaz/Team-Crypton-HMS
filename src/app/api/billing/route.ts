import { NextResponse } from 'next/server';
import { mockBills } from '@/data/mockData';

let billsStore = [...mockBills];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');
  const status = searchParams.get('status');

  let results = [...billsStore];
  if (patientId) {
    results = results.filter((b) => b.patientId === patientId);
  }
  if (status) {
    results = results.filter((b) => b.status.toLowerCase() === status.toLowerCase());
  }

  const totalRevenue = results.filter((b) => b.status === 'Paid').reduce((acc, curr) => acc + curr.total, 0);

  return NextResponse.json({
    success: true,
    total: results.length,
    revenue: totalRevenue,
    data: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { billId, paymentMethod } = body;

    const index = billsStore.findIndex((b) => b.id === billId);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Bill not found' }, { status: 404 });
    }

    billsStore[index] = {
      ...billsStore[index],
      status: 'Paid',
      paymentMethod: paymentMethod || 'Online Banking',
    };

    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully (Simulated)',
      data: billsStore[index],
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
