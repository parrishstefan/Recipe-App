// import Data from "../../data/spoonacular_response.json";

//require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY

//! Uncomment this section when you want to make real API calls
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed." });
  }

  if (!req.body.isEmpty) {
    return res
      .status(422)
      .json({ message: "Unprocessable Entity: missing tags" });
  }

  console.log(`hey ${API_KEY}`)

  console.log(`https://api.spoonacular.com/recipes/complexSearch?number=15&intolerances=${req.body.intolerances}
                                                                          &diet=${req.body.diet}
                                                                          &minCalories=${req.body.minCalories}
                                                                          &maxCalories=${req.body.maxCalories}
                                                                          &minProtein=${req.body.minProtein}
                                                                          &maxProtein=${req.body.maxProtein}
                                                                          &apiKey=${API_KEY}`);

  if (req.body.isEmpty !== "none") {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?number=15&intolerances=${req.body.intolerances}
                                                                          &diet=${req.body.diet}
                                                                          &minCalories=${req.body.minCalories}
                                                                          &maxCalories=${req.body.maxCalories}
                                                                          &minProtein=${req.body.minProtein}
                                                                          &maxProtein=${req.body.maxProtein}
                                                                          &apiKey=${API_KEY}`
    );
    const data = await response.json();
    data.recipes = data.results;
    delete data.results;
    //console.log(data)
    return res.status(200).json(data);
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=15&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return res.status(200).json(data);
  }
}

//! --------------------------------------

// // Return an example response to save api calls
// export default async function handler(req, res) {
//   return res.status(200).json(Data);
// }
