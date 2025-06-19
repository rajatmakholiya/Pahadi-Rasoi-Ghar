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
  className,
}) => {
  return (
    <Card className={`w-[300px] ${className}`}>
      <CardContent className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardContent>
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 pt-1">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 pb-4">
        <p className="text-md font-medium text-gray-800 dark:text-gray-200">
          {typeof price === "number" ? `$${price.toFixed(2)}` : price}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
