import { NextResponse } from 'next/server';
import { mockDemoUsers } from '@/data/mockData';
import { loginSchema, signupSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action;

    if (action === 'signup') {
      const validated = signupSchema.safeParse(body);
      if (!validated.success) {
        return NextResponse.json({ success: false, error: 'Validation failed', issues: validated.error.format() }, { status: 400 });
      }

      const { name, email, role, phone } = validated.data;
      const newUser = {
        id: `usr-${Date.now()}`,
        name,
        email,
        role,
        phone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        createdAt: new Date().toISOString(),
      };

      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: newUser,
        token: `mock-jwt-token-${newUser.id}`,
      });
    }

    const validated = loginSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', issues: validated.error.format() }, { status: 400 });
    }

    const { role, email } = validated.data;
    const demoKey = role.toLowerCase() as keyof typeof mockDemoUsers;
    const user = mockDemoUsers[demoKey] || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user,
      token: `mock-jwt-token-${user.id}`,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
