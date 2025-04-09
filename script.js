const books = [
    {
        id: 1,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 12.99,
        image: "images/the-silent-gathering.jpg" 
    },
    {
        id: 2,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        price: 14.99,
        image: "images/where-the-craniouls-sing.jpg" 
    },
    {
        id: 3,
        title: "Educated",
        author: "Tara Westover",
        price: 13.50,
        image: "images/Educated.jpg"
    },
    {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.00,
        image: "images/the-great-gateby.jpg" 
    },
    {
        id: 5,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 11.25,
        image: "images/the-midnight-library.jpg"
    },
    {
        id: 6,
        title: "Atomic Habits",
        author: "James Clear",
        price: 16.99,
        image: "images/atomic-habits.jpg" // Corrected from "Atomic Halb"
    },
    {
        id: 7,
        title: "The Vanishing Half",
        author: "Brit Bennett",
        price: 15.75,
        image: "images/the-vending-hall.jpg" // Corrected from "The Vending Hall"
    },
    {
        id: 8,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 17.50,
        image: "images/project-mail-marg.jpg" // Corrected from "Project Mail Marg"
    },
    {
        id: 9,
        title: "1984",
        author: "George Orwell",
        price: 9.99,
        image: "images/1984.png"
    },
    {
        id: 10,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.00,
        image: "images/to-kill-a-mockingbird.jpg"
    }
];
let cart = [];

function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    books.forEach(book => {
        bookList.innerHTML += `
            <div class="book">
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
                <p>$${book.price}</p>
                <button onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const book = books.find(b => b.id === id);
    cart.push(book);
    updateCart();
}

function updateCart() {
    document.getElementById("cart-count").textContent = cart.length;
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((book, index) => {
        total += book.price;
        cartItems.innerHTML += `<li>${book.title} - $${book.price} <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });
    document.getElementById("total-price").textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.style.display = cartDiv.style.display === "block" ? "none" : "block";
}
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function clearCart() {
    cart = [];
    updateCart();
}

document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    document.getElementById("book-list").innerHTML = books
        .filter(book => book.title.toLowerCase().includes(searchValue))
        .map(book => `
            <div class="book">
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
                <p>$${book.price}</p>
                <button onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `)
        .join("");
});

window.onload = displayBooks;
// Make the DIV element draggable:
dragElement(document.getElementById("cart"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
