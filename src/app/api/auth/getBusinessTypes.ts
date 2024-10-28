// /app/api/auth/getBusinessTypes.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  const url = `https://booking-hub.onrender.com/business/type?search=${encodeURIComponent(
    search
  )}`;

  try {
    const externalResponse = await fetch(url, {
      method: 'GET',
      headers: { Accept: '*/*' },
    });

    if (!externalResponse.ok) {
      throw new Error('Error al obtener los datos del servidor externo');
    }

    const data = await externalResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al llamar al servidor externo:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos' },
      { status: 500 }
    );
  }
}
