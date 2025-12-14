const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Inspiration",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuoteText = quotes[randomIndex].text;
  const randomQuoteCategory = quotes[randomIndex].category;
  const p = document.createElement("p");
  const displayer = document.getElementById("quoteDisplay");
  p.innerHTML = `${randomQuoteText} from category ${randomQuoteCategory}`;
  displayer.appendChild(p);
}
document.getElementById("newQuote").addEventListener("click", () => {
  showRandomQuote();
});
function addQuote() {
  const text = document.getElementById("newQuoteText");
  const category = document.getElementById("newQuoteCategory");
  quotes.push({
    text: text.value,
    category: category.value,
  });
  text.value = "";
  category.value = "";
  alert("quotes added");
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
