#!/usr/bin/env node
import { Command } from "commander";
import {
  add,
  listCategories,
  listCategoryItems,
  update,
} from "../src/utils.js";


// Create a new Command Program
const program = new Command();

// Create a new Program
program
  // Set the name of the program
  .name("my-cli")
  // Set the description
  .description("Back office for My App")
  // Set the version
  .version("1.0.0")

// Create a command for adding a updating order
program
  // Set the command name
  .command("update")
  // Set the command description
  .description("Update an order")
  // Set the argument ID to be required
  .argument("<ID>", "Order ID")
  // Set the argument AMOUNT to be required
  .argument("<AMOUNT>", "Order Amount")
  // Set the action to be executed when the command is run
  .action(async (id, amount) => await update(id, amount));

// Create a command for listing categories by IDs
program
  // Set the command name
  .command("add")
  // Set the command description
  .description("Add Product by ID to a Category")
  // Set the category to be required
  .argument("<CATEGORY>", "Product Category")
  // Set the argument ID to be required
  .argument("<ID>", "Product ID")
  // Set the argument NAME to be required
  .argument("<NAME>", "Product Name")
  // Set the argument AMOUNT to be required
  .argument("<AMOUNT>", "Product RRP")
  // Set the argument INFO to be optional
  .argument("[INFO...]", "Product Info")
  // Set the action to be executed when the command is run
  .action(
    async (category, id, name, amount, info) =>
      await add(category, id, name, amount, info)
);

// Create a command for listing categories
program
  // Set the command name
  .command("list")
  // Set the command description
  .description("List categories")
  // Set the category to be optional
  .argument("[CATEGORY]", "Category to list IDs for")
  // Set the option to list all categories
  .option("-a, --all", "List all categories")
  // Set the action to be executed when the command is run
  .action(async (args, opts) => {
    if (args && opts.all)
      throw new Error("Cannot specify both category and 'all'");
    if (opts.all || args === "all") {
      listCategories();
    } else if (args === "confectionery" || args === "electronics") {
      await listCategoryItems(args);
    } else {
      throw new Error("Invalid category specified");
    }
  });

// Parse the arguments from process.argv
program.parse();