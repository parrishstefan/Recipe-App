import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useState } from "react";

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

type RecipeInfoProps = {
  id: number;
  title: string;
  image: string;
  nutrition: {
    nutrients: Nutrient[];
  };
};

export default function RecipeInfo({
  id,
  title,
  image,
  nutrition,
}: RecipeInfoProps) {
  const [liked, setLiked] = useState(
    window.localStorage.getItem("likes")?.includes(id.toString())
  );

  function handleLike() {
    // if already liked, remove from likes
    if (liked) {
      setLiked(false);
      // remove from local storage
      let currentLikes = localStorage.getItem("likes");
      if (currentLikes) {
        let likes = JSON.parse(currentLikes);
        let newLikes = likes.filter((like: number) => like !== id);
        localStorage.setItem("likes", JSON.stringify(newLikes));
      }
      toast.success("Recipe removed from favorites!");
      return;
    }

    setLiked(true);
    let currentLikes = localStorage.getItem("likes");

    // add the id to the likes array in local storage
    if (currentLikes) {
      let likes = JSON.parse(currentLikes);
      likes.push(id);
      localStorage.setItem("likes", JSON.stringify(likes));
    } else {
      localStorage.setItem("likes", JSON.stringify([id]));
    }
    toast.success("Recipe added to favorites!");

    // TODO: can add more information using the endpoint: https://spoonacular.com/food-api/docs#Get-Recipe-Information
    // TODO: possibly just need a the sourceUrl to let the user view the recipe on the website
    // TODO: make a fetch request to the endpoint above with the ID and save an object of the recipe in local storage array
  }

  return (
    <div className="flex space-x-8 bg-gray-100 border border-gray-900 p-4 rounded-xl">
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
          <p className="text-lg truncate">
            {nutrition.nutrients[0].amount}kcal, {nutrition.nutrients[1].amount}
            g
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <HeartIcon
          className={
            "h-6 w-6 text-green-600 hover:fill-gray-300 hover:cursor-pointer" +
            (liked ? " fill-green-600" : "")
          }
          onClick={() => {
            handleLike();
          }}
        />
      </div>
    </div>
  );
}
