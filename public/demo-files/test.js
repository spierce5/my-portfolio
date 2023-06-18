const excludedWords = [
  "a",
  "and",
  "as",
  "at",
  "but",
  "by",
  "down",
  "for",
  "from",
  "if",
  "in",
  "into",
  "like",
  "near",
  "nor",
  "of",
  "off ",
  "on",
  "once",
  "onto",
  "or",
  "over",
  "past",
  "so",
  "than",
  "that",
  "to",
  "upon",
  "when",
  "with",
  "yet",
];
const name = "the-name-of-a-project";
let words = name.split("-");
words = words.map((word, i) => {
  console.log(i);
  if (i != 0 && excludedWords.includes(word.toLowerCase())) {
    return word;
  } else {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  }
});
const formattedName = words.join(" ");
console.log(formattedName);
