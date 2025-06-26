import connectMenuDb from '@/lib/menu'; 
import getMenuItemModel from '@/models/MenuItem'; 
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const menuDbConnection = await connectMenuDb(); 
  const MenuItem = getMenuItemModel(menuDbConnection); 

  try {
    const items = await MenuItem.find({});
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}