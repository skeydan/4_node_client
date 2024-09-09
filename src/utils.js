 // Import GOT to make HTTP requests
 import { got } from "got";
 import * as displays from "./displays.js";
Object.assign(global, displays);

 // Set the API URL
 const API = "http://localhost:3000";
 // Set the categories
 const categories = ["confectionery", "electronics"];
 
 
 // Update the order with the given ID
export async function update(id, amount) {
  log(`${displayTimestamp()}`);
  log(
    `${displayInfo(`Updating Order`)} ${displayID(id)} ${displayText(
      "with amount"
    )} ${displayAmount(amount)}`
  );
  try {
    if (isNaN(+amount)) {
      error("<AMOUNT> must be a number");
      process.exit(1);
    }
    // Use GOT to make a POST request to the API
    await got.post(`${API}/orders/${id}`, {
      json: { amount: +amount },
    });
    // Log the result to the console
    log(
      `${displaySuccess()} ${displayText("Order")} ${displayID(
       id
      )} ${displayText("updated with amount")} ${displayAmount(amount)}`
    );
  } catch (err) {
    // If there is an error, log it to the console and exit
    console.log(err.message);
    process.exit(1);
  }
}
 
 // Add a new order
 export async function add(...args) {
   // Destructure the arguments
   let [category, id, name, amount, info] = args;
   log(`Adding item ${id} with amount ${amount}`);
   try {
     if (isNaN(+amount)) {
       error(`Error: <AMOUNT> must be a number`);
       process.exit(1);
     }
     // Use GOT to make a POST request to the API
     await got.post(`${API}/${category}`, {
       json: {
         id,
         name,
         rrp: +amount,
         info: info.join(" "),
       },
     });
     // Log the result to the console
     log(`Item "${id}:${name}" has been added to the ${category} category`);
   } catch (err) {
     // If there is an error, log it to the console and exit
     error(err.message);
     process.exit(1);
   }
 }
 
 // List the categories
 export function listCategories() {
   log("Listing categories");
   try {
     // Loop through the categories and log them to the console
     for (const cat of categories) log(cat);
   } catch (err) {
     // If there is an error, log it to the console and exit
     error(err.message);
     process.exit(1);
   }
 }
 
 // List the IDs for the given category
 export async function listCategoryItems(category) {
   log(`Listing IDs for category ${category}`);
   try {
     // Use GOT to make a GET request to the API
     const result = await got(`${API}/${category}/`).json();
     // Log the result to the console
     for (const item of result) {
       log(
         `${item.id}: ${item.name} - $${item.rrp}\nProduct Info:\t${item.info}`
       );
     }
   } catch (err) {
     // If there is an error, log it to the console and exit
     error(err.message);
     process.exit(1);
   }
 } 