let quotes = [];

// fetch("http://localhost:3000/quotes", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     quotes = data;
//     populateCategories();
//   });
async function fetchQuotesFromServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    });
    const data = await res.json();
    quotes = data;
    populateCategories();
  } catch (error) {
    alert("error1");
  }
}
fetchQuotesFromServer();
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuoteText = quotes[randomIndex].text;
  const randomQuoteCategory = quotes[randomIndex].category;
  const p = document.createElement("p");
  const displayer = document.getElementById("quoteDisplay");
  p.innerHTML = `${randomQuoteText} from category ${randomQuoteCategory}`;
  sessionStorage.setItem("lastDisplayedQuote", randomIndex);
  displayer.appendChild(p);
}
document.getElementById("newQuote").addEventListener("click", () => {
  showRandomQuote();
});
async function addQuote() {
  const text = document.getElementById("newQuoteText");
  const category = document.getElementById("newQuoteCategory");
  quotes.push({
    text: text.value,
    category: category.value,
  });
  try {
    const res = await fetch("http://localhost:3000/quotes", {
      method: "POST",
      body: {
        text: text.value,
        category: category.value,
        id: quotes[quotes.length - 1].id + 1,
      },
    });
    text.value = "";
    category.value = "";
    alert("quotes added");
  } catch (error) {
    alert("erro2r");
  }
}
function createAddQuoteForm() {
  const form = document.createElement("form");
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.required = true;
  textInput.id = "newtext";
  textInput.placeholder = "enter quotes";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.required = true;
  categoryInput.id = "newcategory";
  categoryInput.placeholder = "enter category";

  const button = document.createElement("button");
  button.textContent = "submit";
  button.type = "submit";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    quotes.push({
      text: textInput.value,
      category: categoryInput.value,
    });

    // Clear inputs
    textInput.value = "";
  });

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(button);
}
function exportQuotes() {
  const data = JSON.stringify(quotes);
  const name = "quotes";
  const type = "application/json";
  const blob = new Blob([data], { type: type });

  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = name;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 2000);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map((q) => q.category))];
  const filter = document.getElementById("categoryFilter");
  uniqueCategories.forEach((item) => {
    const o = document.createElement("option");
    o.value = item;
    o.textContent = item;
    filter.appendChild(o);
  });
  filterQuotes();
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastfilter", selectedCategory);
  const displayer = document.getElementById("quoteDisplay");
  const filterdArray = quotes.filter(
    (item) => item.category === selectedCategory
  );

  displayer.innerHTML = "";
  filterdArray.forEach((item) => {
    const p = document.createElement("p");
    p.innerHTML = `${item.text} from category ${item.category}`;
    displayer.appendChild(p);
  });
}
function syncQuotes() {
  setInterval(() => {
    fetchQuotesFromServer();
    alert("Quotes synced with server!");
  }, 1000 * 120);
}
syncQuotes();
