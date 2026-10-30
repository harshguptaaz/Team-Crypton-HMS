import { NextResponse } from 'next/server';
import { mockDepartments } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const dept = mockDepartments.find((d) => d.code.toLowerCase() === code.toLowerCase());
    if (!dept) {
      return NextResponse.json({ success: false, error: 'Department not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: dept });
  }

  return NextResponse.json({
    success: true,
    total: mockDepartments.length,
    data: mockDepartments,
  });
}
