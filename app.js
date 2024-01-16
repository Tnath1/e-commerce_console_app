const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define a list of items and their prices
const items = [
  { name: 'Item 1', price: 10.99 },
  { name: 'Item 2', price: 20.49 },
  { name: 'Item 3', price: 5.99 }
];

// Function to display the list of items
function displayItems() {
  console.log('Available items:');
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

async function main() {
  let selectedItems = [];
  let total = 0;

  while (true) {
    // Display the list of items
    displayItems();

    // Ask the user to select items
    const choices = await askQuestion('Select items (enter item numbers separated by commas): ');

    // Convert the comma-separated string to an array of item numbers
    const itemNumbers = choices.split(',').map((choice) => parseInt(choice.trim()));

    // Validate the choices
    const invalidChoice = itemNumbers.some(
      (itemNumber) => isNaN(itemNumber) || itemNumber < 1 || itemNumber > items.length
    );

    if (invalidChoice) {
      console.log('Invalid choice. Please enter valid item numbers.');
      continue; // Restart the loop
    }

    // Add the selected items to the list
    selectedItems = selectedItems.concat(itemNumbers.map((itemNumber) => items[itemNumber - 1]));

    // Ask if the user wants to continue shopping
    const continueShopping = await askQuestion('Do you want to continue shopping? (yes/no): ');

    if (continueShopping.toLowerCase() !== 'yes') {
      break; // Exit the loop if the user doesn't want to continue shopping
    }
  }

  // Display the selected items
  console.log('Selected items:');
  selectedItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
    total += item.price; // Add the item's price to the total
  });

  // Display the total
  console.log(`Your total is: $${total.toFixed(2)}`);

  // Close the readline interface
  rl.close();
}

// Run the main function
main();
