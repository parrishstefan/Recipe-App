// import Data from "../../data/spoonacular_response.json";

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

  console.log("lol")
  console.log(`https://api.spoonacular.com/recipes/complexSearch?number=15&intolerances=${req.body.allergies}&diet=${req.body.diet}&apiKey=f608c0ffdab04920b1cd30e96c569b2c`)

  if (req.body.isEmpty !== "none") {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?number=15&intolerances=${req.body.allergies}&diet=${req.body.diet}&apiKey=f608c0ffdab04920b1cd30e96c569b2c`
    );
    const data = await response.json();
    return res.status(200).json(data);
  } else {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=15&apiKey=f608c0ffdab04920b1cd30e96c569b2c`
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
