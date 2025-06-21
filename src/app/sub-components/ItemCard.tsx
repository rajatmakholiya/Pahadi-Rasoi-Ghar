import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming your Shadcn components are in @/components/ui
import { Button } from "@/components/ui/button"; // Import the Button component

interface ItemCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description: string;
  price: string | number;
  className?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  imageUrl,
  imageAlt = "Item image",
  title,
  description,
  price,
  className
}) => {
  return (
    <Card className={`w-[300px] flex flex-col justify-between border-none shadow-none gap-[2] dark:bg-[#1f1e1e] ${className}`}>
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
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 pb-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="align-bottom justify-between items-center">
        <p className="text-md font-medium text-gray-800 dark:text-gray-200">
          {typeof price === "number" ? `$${price.toFixed(2)}` : price}
        </p>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
