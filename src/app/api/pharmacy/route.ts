import { NextResponse } from 'next/server';
import { mockMedicines } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('q');

  let results = [...mockMedicines];
  if (status) {
    results = results.filter((m) => m.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.genericName.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    lowStockCount: results.filter((m) => m.status === 'Low Stock' || m.stock <= m.minThreshold).length,
    data: results,
  });
}
