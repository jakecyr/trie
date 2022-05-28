import { Trie } from './Trie.js';

const trie = new Trie();

// text from Wikipedia https://en.wikipedia.org/wiki/Shiba_Inu
const text =
  'The Shiba Inu is double coated, with the outer coat being stiff and straight and the undercoat soft and thick. Fur is short and even on the fox-like face, ears, and legs. Guard hairs stand off the body and are about 4 to 5 cm (1+1⁄2 to 2 in) long at the withers. The purpose of the guard hairs is to protect their underlying skin and to repel rain or snow. Tail hair is slightly longer and stands open in a brush. Their tails are a defining characteristic and makes them stand apart from other dog breeds. Their tails help to protect them from the harsh winter weather.';

text
  .replace(/[^a-z0-9+]+/gi, ' ')
  .split(/\s/)
  .forEach((w) => {
    trie.add(w.trim());
  });

// print tree structure
trie.inOrder();

// predict the most used word with the prefix 'und'
console.log(trie.predictFullWord('und'));

// get number of instances of a word or prefix
console.log(trie.find('double').value);
