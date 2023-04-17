import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import Selection from "@/components/Selection";

const all_intolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Wheat",
];

const all_diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Vegan",
  "Ovo-Vegetarian",
  "Lacto-Vegetarian",
  "Pescetarian",
  "Paleo",
];

export default function Preferences() {
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [diet, setDiet] = useState<string[]>([]);
  const [minProtein, setMinProtein] = useState("0");
  const [maxProtein, setMaxProtein] = useState("100");
  const [minCalories, setMinCalories] = useState("0");
  const [maxCalories, setMaxCalories] = useState("2500");

  return (
    <div className="mb-16">
      <Head>
        <title>CookMate: Set Preferences</title>
      </Head>
      <main className="max-w-7xl mx-auto mt-16 sm:mt-24 space-y-3 px-4">
        <h1 className="text-6xl font-extrabold">
          Set Your <span className="text-green-600">Preferences</span>
        </h1>
        <p className="max-w-2xl text-gray-500 sm:text-lg">
          Have allergies? Use the options below to set your dietery restraints.
          These will affect the types of recipes shown to you based on your
          preferences.
        </p>
        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* min Protein Slider */}
          <div>
            <p className="font-bold text-2xl">Minimum Protein: {minProtein}</p>
            <input
              type="range"
              min="0"
              defaultValue={"0"}
              max="100"
              step={"5"}
              className="w-full"
              onChange={(e) => {
                setMinProtein(e.target.value);
              }}
            />
          </div>
          {/* max Protein Slider */}
          <div>
            <p className="font-bold text-2xl">Maximum Protein: {maxProtein}</p>
            <input
              type="range"
              min="0"
              defaultValue={"100"}
              max="100"
              step={"5"}
              className="w-full"
              onChange={(e) => {
                setMaxProtein(e.target.value);
              }}
            />
          </div>
          {/* min Calories Slider */}
          <div>
            <p className="font-bold text-2xl">
              Minimum Calories: {minCalories}
            </p>
            <input
              type="range"
              min="0"
              defaultValue={"0"}
              max="2500"
              step={"100"}
              className="w-full"
              onChange={(e) => {
                setMinCalories(e.target.value);
              }}
            />
          </div>
          {/* max Calories Slider */}
          <div>
            <p className="font-bold text-2xl">
              Maximum Calories: {maxCalories}
            </p>
            <input
              type="range"
              min="0"
              defaultValue={"2500"}
              max="2500"
              step={"100"}
              className="w-full"
              onChange={(e) => {
                setMaxCalories(e.target.value);
              }}
            />
          </div>
        </div>
        {/* end sliders section */}
        {/* Intolerances */}
        <h2 className="text-3xl font-bold pt-6">Intolerances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {all_intolerances.map((intolerance) => (
            <Selection
              label={intolerance}
              list={intolerances}
              setList={setIntolerances}
              key={intolerance}
            />
          ))}
        </div>
        {/* end intolerances */}
        {/* Diet */}
        <h2 className="text-3xl font-bold pt-6">Diet Choices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {all_diets.map((item) => (
            <Selection label={item} list={diet} setList={setDiet} key={item} />
          ))}
        </div>
        {/* end intolerances */}
        {/* Submit Button */}
        <div className="pt-8">
          <Link href="/recipes/view">
            <button
              className="w-full flex items-center justify-center px-8 py-3 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              onClick={() => {
                window.localStorage.setItem(
                  "intolerances",
                  JSON.stringify(intolerances)
                );
                window.localStorage.setItem("diet", JSON.stringify(diet));
                window.localStorage.setItem("minProtein", minProtein);
                window.localStorage.setItem("maxProtein", maxProtein);
                window.localStorage.setItem("minCalories", minCalories);
                window.localStorage.setItem("maxCalories", maxCalories);
              }}
            >
              View Recipes
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
