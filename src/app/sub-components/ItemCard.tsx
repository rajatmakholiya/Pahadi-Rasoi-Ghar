import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ItemCardProps {
  _id: string; 
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description: string;
  price: string | number;
  className?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  _id, 
  imageUrl,
  imageAlt = "Item image",
  title,
  description,
  price,
  className
}) => {
  const { addToCart, increaseQuantity, decreaseQuantity, getQuantity } = useCart();
  const quantity = getQuantity(_id);

  const handleAddToCartClick = () => {
    addToCart({ _id, name: title, description, price: typeof price === 'string' ? parseFloat(price.replace('₹', '')) : price, imageUrl });
  };

  const handleIncrease = () => {
    increaseQuantity(_id);
  };

  const handleDecrease = () => {
    decreaseQuantity(_id);
  };

  return (
    <Card className={`w-[300px] flex flex-col justify-between border-none shadow-none gap-[2] ${className}`}>
      <CardContent className="p-0 overflow-hidden ">
        <div className="relative w-full h-[12.5rem] mb-3">
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 pb-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="align-bottom justify-between items-center">
        <p className="text-md font-medium text-gray-800">
          {typeof price === "number" ? `₹${price.toFixed(2)}` : price}
        </p>
        {quantity === 0 ? (
          <Button onClick={handleAddToCartClick}>Add to Cart</Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={handleDecrease} disabled={quantity === 0}>
              -
            </Button>
            <span className="font-semibold">{quantity}</span>
            <Button size="sm" onClick={handleIncrease}>
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;