// // Sample product data
// const products = [
//   { id: 1, name: "Wrist Watch", price: 80 },
//   { id: 2, name: "Nike Shoe", price: 110 },
//   { id: 3, name: "Jean Trouser", price: 105 },
//   { id: 4, name: "Mac book pro", price: 1005 },
//   { id: 5, name: "iphone 12", price: 705 },
//   { id: 6, name: "S22 ultra", price: 905 },
// ];

// // Shopping cart
// const cart = [];

// // Function to display products
// function availableProducts() {
//   console.log("Products available:");
//   products.forEach((product) => {
//     console.log(`${product.id}. ${product.name} - $${product.price}`);
//   });
// }

// // Function to add a product to the cart
// function addToCart(productId) {
//   const selectedProduct = products.find((product) => product.id === productId);
//   if (selectedProduct) {
//     cart.push(selectedProduct);
//     console.log(`${selectedProduct.name} added to cart.`);
//   } else {
//     console.log("Product not found.");
//   }
// }

// // Function to display the cart
// function displayCart() {
//   console.log("Shopping Cart:");
//   cart.forEach((item) => {
//     console.log(`${item.name} - $${item.price}`);
//   });

//   const total = cart.reduce((sum, item) => sum + item.price, 0);
//   console.log(`Total: $${total}`);
// }

// // Example: Display products and add to cart
// availableProducts();
// addToCart(1);
// addToCart(2);

// displayCart();
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Define a list of options
// const products = [
//   { id: 1, name: "Wrist Watch", price: 80 },
//   { id: 2, name: "Nike Shoe", price: 110 },
//   { id: 3, name: "Jean Trouser", price: 105 },
//   { id: 4, name: "Mac book pro", price: 1005 },
//   { id: 5, name: "iphone 12", price: 705 },
//   { id: 6, name: "S22 ultra", price: 905 },
// ];

// // Display the list of options
// console.log("Choose from the list of our available items:");
// products.forEach((, index) => {
//   console.log(`${index + 1}. ${option}`);
// });

// // Ask the user for their choice
// rl.question("Enter the number of your choice: ", (choice) => {
//   const selectedOption = options[choice - 1];

//   if (selectedOption) {
//     console.log(`You chose: ${selectedOption}`);
//   } else {
//     console.log(
//       "Invalid choice. Please run the script again and choose a valid option."
//     );
//   }

//   rl.close();
// });


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
  let total = 0;

  while (true) {
    // Display the list of items
    displayItems();

    // Ask the user to select an item
    const choice = await askQuestion('Select an item (enter the item number): ');

    const itemIndex = parseInt(choice) - 1;

    // Check if the choice is valid
    if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= items.length) {
      console.log('Invalid choice. Please enter a valid item number.');
      continue; // Restart the loop
    }

    // Add the selected item's price to the total
    total += items[itemIndex].price;

    // Ask if the user wants to continue shopping
    const continueShopping = await askQuestion('Do you want to continue shopping? (yes/no): ');

    if (continueShopping.toLowerCase() !== 'yes') {
      break; // Exit the loop if the user doesn't want to continue shopping
    }
  }

  // Display the total
  console.log(`Your total is: $${total.toFixed(2)}`);

  // Close the readline interface
  rl.close();
}

// Run the main function
main();
