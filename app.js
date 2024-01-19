const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

function displayItems(items) {
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
  });
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

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
  console.log("***Welcome to AU's shopping App***");
  const userName = await askQuestion("Please enter your name here ==> ");

  const greeting = getGreeting();
  console.log(`\x1b[31m${greeting}, ${userName}!`);

  let selectedItems = [];
  let total = 0;

  while (true) {
    displayItems(items);

    const choices = await askQuestion(
      "Select from our available products (If buying more than 1 product, enter product numbers separated by comma.): "
    );

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

    selectedItems = selectedItems.concat(
      itemNumbers.map((itemNumber) => items[itemNumber - 1])
    );

    console.log("Products available in cart:");

    selectedItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
      total += item.price;
    });

    const removeItems = await askQuestion(
      "Do you want to remove items from your cart? (yes/no): "
    );

    if (removeItems.toLowerCase() === "yes") {
      console.log("\nProducts available in cart:");
      selectedItems.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
      });

      const itemsToRemove = await askQuestion(
        "Enter the numbers of the items to remove (comma-separated): "
      );

      const itemsToRemoveNumbers = itemsToRemove
        .split(",")
        .map((itemNumber) => parseInt(itemNumber.trim()));

      selectedItems = selectedItems.filter(
        (item, index) => !itemsToRemoveNumbers.includes(index + 1)
      );

      console.log("Items removed from the cart.");

      console.log("\nUpdated products available in cart:");
      selectedItems.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
      });
    }

    const continueShopping = await askQuestion(
      "Are you done shopping? (yes/no): "
    );

    if (continueShopping.toLowerCase() !== "no") {
      break;
    }
  }

  console.log("\nProducts available in cart:");
  selectedItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
    total += item.price;
  });

  console.log(`\nYour total cost is: $${total.toFixed(2)}`);

  const paymentConfirmation = await askQuestion(
    "Would you like to make the payment now? (yes/no): "
  );

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

  rl.close();
}

main();
