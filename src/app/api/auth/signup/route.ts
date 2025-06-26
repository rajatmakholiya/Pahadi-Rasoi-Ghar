import { NextRequest, NextResponse } from 'next/server';
import connectLoginDb from '@/lib/mongodb'; 
import getUserModel from '@/models/User'; 
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const loginDbConnection = await connectLoginDb(); 
  const User = getUserModel(loginDbConnection); 

  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully.', email: newUser.email }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}