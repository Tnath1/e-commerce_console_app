const readline = require("readline");

// Create a readline interface for reading input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// List of items available for purchase
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

// Function to animate text with a specified delay
function animateText(text, delay = 100) {
  return new Promise((resolve) => {
    let index = 0;

    function printChar() {
      process.stdout.write(text[index]);
      index++;

      if (index < text.length) {
        setTimeout(printChar, delay);
      } else {
        process.stdout.write("\n"); // Move to the next line after animation
        resolve();
      }
    }

    printChar();
  });
}

// Function to display available items with their prices
function displayItems(items) {
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
  });
}

// Function to ask a question and return the user's input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to get a greeting based on the current time of day
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

// Main shopping application logic
async function main() {
  // Welcome animation
  await animateText("***Welcome to AU's shopping App***");

  // Get the user's name
  const userName = await askQuestion("Please enter your name here ==> ");

  // Get the appropriate greeting based on the time of day
  const greeting = getGreeting();
  console.log(`\x1b[31m${greeting}, ${userName}!`);

  // Initialize variables for selected items and total cost
  let selectedItems = [];
  let total = 0;

  // Main shopping loop
  while (true) {
    // Display available items
    displayItems(items);

    // Get user's product choices
    const choices = await askQuestion(
      "Select from our available products (If buying more than 1 product, enter product numbers separated by comma.): "
    );

    // Process user's choices
    const itemNumbers = choices
      .split(",")
      .map((choice) => parseInt(choice.trim()));

    const invalidChoice = itemNumbers.some(
      (itemNumber) =>
        isNaN(itemNumber) || itemNumber < 1 || itemNumber > items.length
    );

    if (invalidChoice) {
      console.log(
        "Invalid selection, please choose from our list of available products"
      );
      continue;
    }

    // Add selected items to the cart
    selectedItems = selectedItems.concat(
      itemNumbers.map((itemNumber) => items[itemNumber - 1])
    );

    // Display products in the cart
    console.log("Products available in cart:");

    selectedItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
      total += item.price;
    });

    // Ask if the user wants to remove items from the cart
    const removeItems = await askQuestion(
      "Do you want to remove items from your cart? (yes/no): "
    );

    // If user wants to remove items, handle removal
    if (removeItems.toLowerCase() === "yes") {
      console.log("\nProducts available in cart:");

      selectedItems.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
      });

      // Get user's choice of items to remove
      const itemsToRemove = await askQuestion(
        "Enter the numbers of the items to remove (comma-separated): "
      );

      const itemsToRemoveNumbers = itemsToRemove
        .split(",")
        .map((itemNumber) => parseInt(itemNumber.trim()));

      // Remove selected items from the cart
      selectedItems = selectedItems.filter(
        (item, index) => !itemsToRemoveNumbers.includes(index + 1)
      );

      console.log("Items removed from the cart.");

      // Display updated cart
      console.log("\nUpdated products available in cart:");
      selectedItems.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
      });
    }

    // Ask if the user wants to continue shopping
    const continueShopping = await askQuestion(
      "Are you done shopping? (yes/no): "
    );

    // If user is done shopping, exit the loop
    if (continueShopping.toLowerCase() !== "no") {
      break;
    }
  }

  // Display final cart and total cost
  console.log("\nProducts available in cart:");
  selectedItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
    total += item.price;
  });

  console.log(`\nYour total cost is: $${total.toFixed(2)}`);

  // Ask the user if they want to make the payment
  const paymentConfirmation = await askQuestion(
    "Would you like to make the payment now? (yes/no): "
  );

  // Display payment status based on user's choice
  if (paymentConfirmation.toLowerCase() === "yes") {
    console.log(
      `\nPayment of $${total.toFixed(
        2
      )} is successful! Thank you for shopping with AU's app.`
    );
  } else {
    console.log(
      "\nThank you for considering AU's app. Feel free to return anytime!"
    );
  }

  // Close the readline interface
  rl.close();
}

// Run the main shopping application
main();
