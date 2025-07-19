import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://product-list-3e13b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// initialize firebase
const app = initializeApp(appSettings);

// using firebasse service
const database = getDatabase(app);

// to easily refer to the exact database
const productDB = ref(database, "products");

const input_field = document.getElementById("input-field");

const buttons = document.getElementById("add-item");

const shopping_list = document.getElementById("shopping-list");

//adding event listener for button to push data into database
buttons.addEventListener("click", function () {
  let product = input_field.value;
  //console.log(product);
  if (product != "") {
    push(productDB, product); //pushing the values to the database.
  }
  clear_input_field();
});

function clear_input_field() {
  input_field.value = "";
}
function display_element(product) {
  let product_id = product[0];
  let product_name = product[1];
  let rowelement = document.createElement("li");
  rowelement.textContent = product_name;

  rowelement.addEventListener("click", function () {
    let location = ref(database, `products/${product_id}`);
    remove(location);
  });

  shopping_list.append(rowelement);
  //shopping_list.innerHTML += `<li>${product}</li>`;
}
function clearShoppingList() {
  shopping_list.innerHTML = "";
}

// getting an existing element from db.
onValue(productDB, function (snapshot) {
  if (snapshot.exists()) {
    let arr = Object.entries(snapshot.val()); // converting an object to array.
    clearShoppingList();

    for (let i = 0; i < arr.length; i++) {
      let products = arr[i]; // each product
      let products_id = products[0]; // each product id.
      let products_name = products[1]; // each product name.
      display_element(products);
    }
  } else {
    shopping_list.innerHTML = "No products ... yet";
  }
});

let download = document.getElementById("download");
download.addEventListener("click", addToTextFile);

function addToTextFile() {
  get(productDB).then((snapshot) => {
    if (snapshot.exists()) {
      let entries = Object.entries(snapshot.val());
      let content = entries
        .map(([id, name], index) => `${index + 1}. ${name}`)
        .join("\n");
      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Grocery-list-${new Date()
        .toISOString()
        .slice(0, 10)}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      alert("No products to download.");
    }
  });
}
