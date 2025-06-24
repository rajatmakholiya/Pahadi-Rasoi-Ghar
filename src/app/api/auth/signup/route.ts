import { NextRequest, NextResponse } from 'next/server';
import connectLoginDb from '@/lib/mongodb'; // Renamed import
import getUserModel from '@/models/User'; // Changed to import the function
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const loginDbConnection = await connectLoginDb(); // Get the specific connection
  const User = getUserModel(loginDbConnection); // Get the User model associated with this connection

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
      { message: 'User created successfully.', email: newUser.email }, // Return email on success
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