import { Document, Schema, Model, Connection } from 'mongoose'; // Import Connection

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema: Schema<IMenuItem> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for the menu item.'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the menu item.'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for the menu item.'],
      min: [0, 'Price cannot be negative'],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    collection: 'ItemList', // Explicitly set the collection name
  }
);

// Export a function that takes a connection and returns the MenuItem model
export default function getMenuItemModel(connection: Connection): Model<IMenuItem> {
  // To prevent model recompilation in Next.js hot-reloading environments
  return connection.models.MenuItem || connection.model<IMenuItem>('MenuItem', MenuItemSchema);
}