const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define a list of items and their prices
const items = [
  { name: 'T.shirt', price: 10.99 },
  { name: 'Jean Trouser', price: 20.49 },
  { name: 'Dell laptop', price: 399.99 },
  { name: 'Mac book pro', price: 599.99 },
  { name: 'Mac book air', price: 449.99 },
  { name: 'Samsung s22 ultra', price: 549.99 }
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

// Function to get the greeting based on the current time
function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

async function main() {
  // Prompt the user for their name
  const userName = await askQuestion('What is your name? ');

  // Display greeting based on the current time
  const greeting = getGreeting();
  console.log(`${greeting}, ${userName}! Welcome to the shopping experience.`);

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
  console.log('\nSelected items:');
  selectedItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
    total += item.price; // Add the item's price to the total
  });

  // Display the total
  console.log(`\nYour total is: $${total.toFixed(2)}`);

  // Close the readline interface
  rl.close();
}

// Run the main function
main();
