"use client";

import React, { useState } from 'react';
import { useAddress } from '@/context/AddressContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash, Edit, PlusCircle } from 'lucide-react';
import { IAddress } from '@/models/User';

const AddressForm = ({ address, onSave, onCancel }: { address?: IAddress, onSave: (address: Omit<IAddress, '_id'> | IAddress) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState({
        fullName: address?.fullName || '',
        streetAddress: address?.streetAddress || '',
        city: address?.city || '',
        state: address?.state || '',
        postalCode: address?.postalCode || '',
        country: address?.country || '',
        phoneNumber: address?.phoneNumber || '',
        isDefault: address?.isDefault || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(address ? { ...address, ...formData } : formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>
                 <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="shrink-0 size-4" />
                    <Label htmlFor="isDefault" className="whitespace-nowrap">Set as default address</Label>
                </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Address</Button>
            </div>
        </form>
    );
};


const AddressesModal = ({ onClose }: { onClose: () => void }) => {
    const { addresses, addAddress, updateAddress, deleteAddress, error } = useAddress();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<IAddress | undefined>(undefined);

    const handleSave = async (address: Omit<IAddress, '_id'> | IAddress) => {
        if ('_id' in address && address._id) {
            await updateAddress(address._id.toString(), address);
        } else {
            await addAddress(address);
        }
        setIsFormOpen(false);
        setEditingAddress(undefined);
    };

    const handleEdit = (address: IAddress) => {
        setEditingAddress(address);
        setIsFormOpen(true);
    };
    
    const handleAddNew = () => {
        setEditingAddress(undefined);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-4">
            {isFormOpen ? (
                <AddressForm 
                    address={editingAddress}
                    onSave={handleSave} 
                    onCancel={() => setIsFormOpen(false)} 
                />
            ) : (
                <div className="space-y-4">
                    {addresses.map((address) => (
                        // FIX: Added the unique key prop to the Card component
                        <Card  key={address._id?.toString()}>
                            <CardContent className="flex items-start justify-between p-4">
                                <div>
                                    <p className="font-semibold">{address.fullName} {address.isDefault && <span className="text-xs bg-green-200 text-green-800 p-1 rounded-md ml-2">Default</span>}</p>
                                    <p>{address.streetAddress}</p>
                                    <p>{address.city}, {address.state} {address.postalCode}</p>
                                    <p>{address.country}</p>
                                    {address.phoneNumber && <p>Phone: {address.phoneNumber}</p>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(address)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => address._id && deleteAddress(address._id.toString())}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                     <Button onClick={handleAddNew} className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                    </Button>
                </div>
            )}
             {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default AddressesModal;