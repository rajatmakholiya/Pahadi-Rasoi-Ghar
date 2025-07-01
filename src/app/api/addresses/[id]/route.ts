import { NextRequest, NextResponse } from 'next/server';
import connectLoginDb from '@/lib/mongodb';
import getUserModel, { IAddress } from '@/models/User';

// Define a type for the context object that includes the params
interface IContext {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, context: IContext) {
  const loginDbConnection = await connectLoginDb();
  const User = getUserModel(loginDbConnection);

  try {
    const userEmail = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!userEmail) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const updatedAddress: IAddress = await request.json();
    const addressId = context.params.id; // Access id from the context object
    const user = await User.findOne({ email: userEmail });

    if (!user || !user.address) {
      return NextResponse.json({ success: false, error: 'User or address not found' }, { status: 404 });
    }
    
    const addressToUpdate = user.address.find(addr => addr._id?.toString() === addressId);

    if (!addressToUpdate) {
      return NextResponse.json({ success: false, error: 'Address not found' }, { status: 404 });
    }
    
    if (updatedAddress.isDefault) {
      user.address.forEach(addr => {
        if (addr._id?.toString() !== addressId) {
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

export async function DELETE(request: NextRequest, context: IContext) {
  const loginDbConnection = await connectLoginDb();
  const User = getUserModel(loginDbConnection);

  try {
    const userEmail = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!userEmail) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const addressId = context.params.id; // Access id from the context object
    const user = await User.findOne({ email: userEmail });

    if (!user || !user.address) {
      return NextResponse.json({ success: false, error: 'User or address not found' }, { status: 404 });
    }

    user.address = user.address.filter(addr => addr._id?.toString() !== addressId);
    await user.save();

    return NextResponse.json({ success: true, data: user.address });
  } catch (error) {
    console.error('Delete Address Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}