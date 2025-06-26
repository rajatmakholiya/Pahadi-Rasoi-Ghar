import { NextRequest, NextResponse } from 'next/server';
import connectLoginDb from '@/lib/mongodb'; 
import getUserModel from '@/models/User'; 
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const loginDbConnection = await connectLoginDb(); 
  const User = getUserModel(loginDbConnection); 

  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Login successful.', email: user.email }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}