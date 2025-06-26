import mongoose, { Schema, Model, Connection } from 'mongoose';

export interface IAddress {
  _id?: mongoose.Types.ObjectId;
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault?: boolean;
}
export interface IUser extends Document {
  email: string;
  password: string;
  address?: IAddress[];
  createdAt: Date;
}

const AddressSchema: Schema = new Schema<IAddress>({
  fullName: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String },
  isDefault: { type: Boolean, default: false },
});

export default function getUserModel(connection: Connection): Model<IUser> {
  const UserSchema = new Schema<IUser>({
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      unique: true,
      match: [/.+@.+\..+/, 'Please provide a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      select: false,
    },
    address: {
      type: [AddressSchema],
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  return connection.models.User || connection.model<IUser>('User', UserSchema);
}