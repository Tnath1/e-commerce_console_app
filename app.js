// Sample product data
const products = [
  { id: 1, name: "Wrist Watch", price: 80 },
  { id: 2, name: "Nike Shoe", price: 110 },
  { id: 3, name: "Jean Trouser", price: 105 },
  { id: 4, name: "Mac book pro", price: 1005 },
  { id: 5, name: "iphone 12", price: 705 },
  { id: 6, name: "S22 ultra", price: 905 },
];

// Shopping cart
const cart = [];

// Function to display products
function availableProducts() {
  console.log("Products available:");
  products.forEach((product) => {
    console.log(`${product.id}. ${product.name} - $${product.price}`);
  });
}

// Function to add a product to the cart
function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);
  if (selectedProduct) {
    cart.push(selectedProduct);
    console.log(`${selectedProduct.name} added to cart.`);
  } else {
    console.log("Product not found.");
  }
}

// Function to display the cart
function displayCart() {
  console.log("Shopping Cart:");
  cart.forEach((item) => {
    console.log(`${item.name} - $${item.price}`);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  console.log(`Total: $${total}`);
}

// Example: Display products and add to cart
availableProducts();
addToCart(1);
addToCart(2);

displayCart();
