#!/usr/bin/env node

import { Command } from "commander";
import {
  add,
  listCategories,
  listCategoryItems,
  update,
} from "../src/utils.js";

import { interactiveApp } from "../src/prompts.js";
 
 // Create a new Command Program
 const program = new Command();

// Create a new Program
program
  // Set the name of the program
  .name("4_node_client")
  // Set the description
  .description("Back office for My App")
  // Set the version
  .version("1.0.0")
  // Set the option to run application in interactive mode
  .option("-i, --interactive", "Run App in interactive mode")
  // Set the primary program action to be executed when no commands are specified
  .action(() => {
    // No-operation (noop)
  });

 

// Create a command for updating an order
program
  .command("update")
  .description("Update an order")
  .option("-i, --interactive", "Run Update Command in interactive mode")
  .argument("[ID]", "Order ID")
  .argument("[AMOUNT]", "Order Amount");

// Create a command for listing categories by IDs
program
  .command("add")
  .description("Add Product by ID to a Category")
  // Set the option to run command in interactive mode
  .option("-i, --interactive", "Run Update Command in interactive mode")
  .argument("[CATEGORY]", "Product Category")
  .argument("[ID]", "Product ID")
  .argument("[NAME]", "Product Name")
  .argument("[AMOUNT]", "Product RRP")
  .argument("[INFO...]", "Product Info");

// Create a command for listing categories
program
  .command("list")
  .description("List categories")
  // Set the option to run command in interactive mode
  .option("-i, --interactive", "Run Update Command in interactive mode")
  .option("-a, --all", "List all categories")
  .argument("[CATEGORY]", "Category to list IDs for");

  program.parse();

 // Main function to run the program
 async function main(program) {
  // Get the command, process.args and options
  const command = program?.args.at(0) || "";
  const cliArgs = program?.args.slice(1) || [];
  const options = program?.opts() || {};

  // Guard clauses
  if (!command && !options.interactive) {
    // Display the help
    program.help();
  }
  if (!command && options.interactive) {
    // Run the interactive app
    return interactiveApp();
  }
  if (command && options.interactive) {
    // Run the interactive app with the command
    return interactiveApp(command);
  }
  if (options.interactive && cliArgs.length > 0) {
    throw new Error("Cannot specify both interactive and command");
    process.exit(1);
  }
  // Execute the command
  switch (command) {
    case "add": {
      const [category, id, name, amount, info] = cliArgs;
      if (
        !categories.includes(category) ||
        !category ||
        !id ||
        !name ||
        !amount
      ) {
        throw new Error("Invalid arguments specified");
      }
      await add(category, id, name, amount, info);
      break;
    }
    case "update": {
      const [id, amount] = cliArgs;
      if (!id && !amount) {
        throw new Error("Invalid arguments specified");
      }
      await update(id, amount);
      break;
    }
    case "list": {
      const { all } = options;
      const [category] = cliArgs;
      if (category && all)
        throw new Error("Cannot specify both category and 'all'");
      if (all || category === "all") {
        listCategories();
      } else if (categories.includes(category)) {
        await listCategoryItems(category);
      } else {
        throw new Error("Invalid category specified");
      }
      break;
    }
    default:
      await interactiveApp();
  }
}
// Run the main function
main(program); 