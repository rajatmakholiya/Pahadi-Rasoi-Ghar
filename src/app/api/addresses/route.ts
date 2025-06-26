import { NextRequest, NextResponse } from 'next/server';
import connectLoginDb from '@/lib/mongodb';
import getUserModel, { IAddress } from '@/models/User';

export async function GET(req: NextRequest) {
  const loginDbConnection = await connectLoginDb();
  const User = getUserModel(loginDbConnection);

  try {
    const userEmail = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!userEmail) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user.address || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    const loginDbConnection = await connectLoginDb();
    const User = getUserModel(loginDbConnection);

    try {
        const userEmail = req.headers.get('Authorization')?.replace('Bearer ', '');
        if (!userEmail) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const newAddress: IAddress = await req.json();
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        if (!user.address) {
            user.address = [];
        }

        if (newAddress.isDefault) {
            user.address.forEach(addr => addr.isDefault = false);
        }

        user.address.push(newAddress);
        user.markModified('address'); 
        await user.save();

        return NextResponse.json({ success: true, data: user.address });
    } catch (error) {
        console.error('Add Address Error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}