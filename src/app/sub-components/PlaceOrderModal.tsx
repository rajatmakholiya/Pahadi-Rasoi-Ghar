"use client";

import React, { useState, useEffect } from 'react';
import { useAddress } from '@/context/AddressContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { IAddress } from '@/models/User';
import { Input } from '@/components/ui/input';

interface PlaceOrderModalProps {
  onClose: () => void;
  onOrderPlaced: () => void;
}

const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({ onClose, onOrderPlaced }) => {
    const [step, setStep] = useState(1); 
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
    const [deliveryType, setDeliveryType] = useState<'Immediate' | 'Scheduled'>('Immediate');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [minDate, setMinDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { addresses, loading: addressesLoading } = useAddress();
    const { cartItems, calculateCartTotal } = useCart();

    useEffect(() => {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        setScheduledDate(formattedDate);
        setScheduledTime(formattedTime);
        setMinDate(formattedDate);
    }, []);

    const handleNextStep = () => {
        if (step === 1 && selectedAddress) {
            setStep(2);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError("Please select a delivery address.");
            return;
        }
        if (!paymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            const userEmail = localStorage.getItem('userEmail');
            const orderDetails = {
                items: cartItems.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: parseFloat(calculateCartTotal()),
                deliveryAddress: selectedAddress,
                deliveryType,
                scheduledAt: deliveryType === 'Scheduled' ? new Date(`${scheduledDate}T${scheduledTime}`) : undefined,
                paymentMethod: paymentMethod 
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userEmail}`
                },
                body: JSON.stringify(orderDetails)
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to place order.");
            }
            
            onOrderPlaced();
            
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="p-1">
            {step === 1 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Select a Delivery Address</h3>
                    {addressesLoading ? <p>Loading addresses...</p> : (
                        <RadioGroup onValueChange={(value) => setSelectedAddress(JSON.parse(value))}>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {addresses.map(addr => (
                                    <Label htmlFor={addr._id?.toString()} key={addr._id?.toString()} className="block cursor-pointer">
                                        <Card className={`p-4 ${selectedAddress?._id === addr._id ? 'border-primary' : ''}`}>
                                            <div className="flex items-center space-x-4">
                                                <RadioGroupItem value={JSON.stringify(addr)} id={addr._id?.toString()} />
                                                <div>
                                                    <p className="font-semibold">{addr.fullName} {addr.isDefault && <span className="text-xs bg-green-200 text-green-800 p-1 rounded-md ml-2">Default</span>}</p>
                                                    <p className="text-sm text-gray-600">{addr.streetAddress}, {addr.city}, {addr.state} {addr.postalCode}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Label>
                                ))}
                            </div>
                        </RadioGroup>
                    )}
                     <div className="flex justify-end space-x-2 pt-6">
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleNextStep} disabled={!selectedAddress}>Next</Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Select Delivery Time</h3>
                    <RadioGroup defaultValue="Immediate" onValueChange={(value) => setDeliveryType(value as 'Immediate' | 'Scheduled')}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Immediate" id="immediate" />
                            <Label htmlFor="immediate">Immediate Delivery</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Scheduled" id="scheduled" />
                            <Label htmlFor="scheduled">Schedule for Later</Label>
                        </div>
                    </RadioGroup>
                    
                    {deliveryType === 'Scheduled' && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="delivery-date" className="text-sm font-medium">Delivery Date</Label>
                                    <Input 
                                        id="delivery-date" 
                                        type="date" 
                                        value={scheduledDate} 
                                        min={minDate}
                                        onChange={(e) => setScheduledDate(e.target.value)} 
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="delivery-time" className="text-sm font-medium">Delivery Time</Label>
                                    <Input 
                                        id="delivery-time" 
                                        type="time" 
                                        value={scheduledTime} 
                                        onChange={(e) => setScheduledTime(e.target.value)} 
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <h3 className="text-lg font-semibold my-4 pt-4 border-t">Select Payment Method</h3>
                    <RadioGroup onValueChange={setPaymentMethod}>
                        <div className="space-y-2">
                            <Label htmlFor="cc" className="flex items-center space-x-2 font-normal p-3 border rounded-md has-[:checked]:border-primary cursor-pointer">
                                <RadioGroupItem value="Credit Card" id="cc" />
                                <span>Credit Card</span>
                            </Label>
                            <Label htmlFor="dc" className="flex items-center space-x-2 font-normal p-3 border rounded-md has-[:checked]:border-primary cursor-pointer">
                                <RadioGroupItem value="Debit Card" id="dc" />
                                <span>Debit Card</span>
                            </Label>
                             <Label htmlFor="upi" className="flex items-center space-x-2 font-normal p-3 border rounded-md has-[:checked]:border-primary cursor-pointer">
                                <RadioGroupItem value="UPI" id="upi" />
                                <span>UPI</span>
                            </Label>
                             <Label htmlFor="cod" className="flex items-center space-x-2 font-normal p-3 border rounded-md has-[:checked]:border-primary cursor-pointer">
                                <RadioGroupItem value="Cash on Delivery" id="cod" />
                                <span>Cash on Delivery</span>
                            </Label>
                        </div>
                    </RadioGroup>

                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                     <div className="flex justify-between items-center pt-6">
                        <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                        <Button onClick={handlePlaceOrder} disabled={isLoading || (deliveryType === 'Scheduled' && (!scheduledDate || !scheduledTime)) || !paymentMethod}>
                            {isLoading ? 'Placing Order...' : 'Confirm Order'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaceOrderModal;