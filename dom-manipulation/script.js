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
