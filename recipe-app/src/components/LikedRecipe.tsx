import Image from "next/image";
import { useState } from "react";

type LikedRecipeProps = {
  id: number;
  title: string;
  image: string;
  sourceUrl: string;
};

export default function LikedRecipe({
  id,
  title,
  image,
  sourceUrl,
}: LikedRecipeProps) {
  return (
    <a
      className="flex space-x-8 bg-gray-100 border border-gray-900 p-4 rounded-xl hover:ring-1 ring-offset-4 ring-0 ring-green-500"
      href={sourceUrl}
    >
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={title}
          height={100}
          width={100}
          className="h-full aspect-square rounded-xl"
        />
      </div>

      <div className="flex flex-col justify-center space-y-4 w-full overflow-hidden">
        <div className="space-y-2">
          <p className="text-xl font-bold truncate">{title}</p>
          <p className="text-lg truncate">{sourceUrl}</p>
        </div>
      </div>
    </a>
  );
}
