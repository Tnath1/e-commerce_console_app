const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define a list of items and their prices
const items = [
  { name: "T.shirt", price: 10.99 },
  { name: "Jean Trouser", price: 20.49 },
  { name: "Dell laptop", price: 399.99 },
  { name: "Mac book pro", price: 599.99 },
  { name: "Mac book air", price: 449.99 },
  { name: "Samsung TV", price: 549.99 },
  { name: "ipad", price: 549.99 },
  { name: "iphone Xs", price: 549.99 },
  { name: "hp elitebook", price: 549.99 },
  { name: "hp envy", price: 549.99 },
];

// Function to display the list of items
function displayItems() {
  console.log("Products in stock:");
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
  });
}

// Function to prompt the user for input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to get the greeting based on the current time
function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

async function main() {
  // Prompt the user for their name
  const userName = await askQuestion("What is your name? ");

  // Display greeting based on the current time
  const greeting = getGreeting();
  console.log(`\x1b[31m${greeting}, ${userName}!`);
  console.log(`\x1b[36mWelcome to AromeUkpoju's shopping app.`);

  let selectedItems = [];
  let total = 0;

  while (true) {
    // Display the list of items
    displayItems();

    // Ask the user to select items
    const choices = await askQuestion(
      "Select from our available products (If selecting more than 1 product, enter product numbers separated by comma.): "
    );

    // Convert the comma-separated string to an array of item numbers
    const itemNumbers = choices
      .split(",")
      .map((choice) => parseInt(choice.trim()));

    // Validate the choices
    const invalidChoice = itemNumbers.some(
      (itemNumber) =>
        isNaN(itemNumber) || itemNumber < 1 || itemNumber > items.length
    );

    if (invalidChoice) {
      console.log(
        "Invalid selection, please choose from our list of available products"
      );
      continue; // Restart the loop
    }

    // Add the selected items to the list
    selectedItems = selectedItems.concat(
      itemNumbers.map((itemNumber) => items[itemNumber - 1])
    );

    // Ask if the user wants to continue shopping
    const continueShopping = await askQuestion(
      "Are you done shopping? (yes/no): "
    );

    if (continueShopping.toLowerCase() !== "no") {
      break; // Exit the loop if the user is done shopping
    }
  }

  // Display the selected items
  console.log("\nProducts added to cart:");
  selectedItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
    total += item.price; // Add the item's price to the total
  });

  // Display the total
  console.log(`\nYour total cost is: $${total.toFixed(2)}`);

  // Ask for payment
  const paymentConfirmation = await askQuestion(
    "Would you like to make the payment now? (yes/no): "
  );

  if (paymentConfirmation.toLowerCase() === "yes") {
    // For demonstration purposes, assume payment is successful
    console.log(
      "\nPayment successful! Thank you for shopping with AromeUkpoju's app."
    );
  } else {
    console.log(
      "\nThank you for considering AromeUkpoju's app. Feel free to return anytime!"
    );
  }

  // Close the readline interface
  rl.close();
}

// Run the main function
main();
