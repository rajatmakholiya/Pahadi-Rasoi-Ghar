import connectMenuDb from '@/lib/menu'; // Renamed import
import getMenuItemModel from '@/models/MenuItem'; // Changed to import the function
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const menuDbConnection = await connectMenuDb(); // Get the specific connection
  const MenuItem = getMenuItemModel(menuDbConnection); // Get the MenuItem model associated with this connection

  try {
    const items = await MenuItem.find({});
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}