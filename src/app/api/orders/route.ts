import { NextRequest, NextResponse } from 'next/server';
import getUserModel from '@/models/User';
import getOrderModel from '@/models/Orders';
import connectOrdersDb from '@/lib/orders';
import connectLoginDb from '@/lib/mongodb'; 

export async function POST(req: NextRequest) {
    const OrderDbConnection = await connectOrdersDb();
    const loginDbConnection = await connectLoginDb(); 

    const Order = getOrderModel(OrderDbConnection);
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

        const { items, totalAmount, deliveryAddress, deliveryType, scheduledAt, paymentMethod } = await req.json();

        if (!items || !totalAmount || !deliveryAddress || !deliveryType || !paymentMethod) {
            return NextResponse.json({ success: false, error: 'Missing required order information' }, { status: 400 });
        }

        const newOrder = new Order({
            user: user._id,
            items,
            totalAmount,
            deliveryAddress,
            deliveryType,
            scheduledAt: deliveryType === 'Scheduled' ? scheduledAt : undefined,
            status: 'Confirmed',
            paymentMethod
        });

        await newOrder.save();

        return NextResponse.json({ success: true, data: newOrder });

    } catch (error) {
        console.error('Create Order Error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}