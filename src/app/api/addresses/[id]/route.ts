/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import connectLoginDb from '@/lib/mongodb';
import getUserModel, { IAddress } from '@/models/User';


export async function PUT(
request: NextRequest,
body: any
) {
  const id = await body;
  const loginDbConnection = await connectLoginDb();
  const User = getUserModel(loginDbConnection);

  try {
    const userEmail = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!userEmail) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const updatedAddress: IAddress = await request.json();
    const user = await User.findOne({ email: userEmail });

    if (!user || !user.address) {
      return NextResponse.json({ success: false, error: 'User or address not found' }, { status: 404 });
    }
    
    const addressToUpdate = user.address.find(addr => addr._id?.toString() === id.params.id);

    if (!addressToUpdate) {
      return NextResponse.json({ success: false, error: 'Address not found' }, { status: 404 });
    }
    
    if (updatedAddress.isDefault) {
      user.address.forEach(addr => {
        if (addr._id?.toString() !== id.params.id) {
          addr.isDefault = false;
        }
      });
    }

    Object.assign(addressToUpdate, updatedAddress);
    user.markModified('address'); 
    await user.save();

    return NextResponse.json({ success: true, data: user.address });
  } catch (error) {
    console.error('Update Address Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(
 request: NextRequest,
  context: Promise<{params: { id: string } }>
) {
  const id = await context;
  const loginDbConnection = await connectLoginDb();
  const User = getUserModel(loginDbConnection);

  try {
    const userEmail = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!userEmail) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user || !user.address) {
      return NextResponse.json({ success: false, error: 'User or address not found' }, { status: 404 });
    }

    user.address = user.address.filter(addr => addr._id?.toString() !== id.params.id);
    await user.save();

    return NextResponse.json({ success: true, data: user.address });
  } catch (error) {
    console.error('Delete Address Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}