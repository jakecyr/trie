import { TrieNode } from './TrieNode.js';
import { Edge } from './Edge.js';

export class Trie {
  constructor() {
    this.rootNode = new TrieNode();
    this.rootNode.isRoot = true;
  }

  add(word) {
    const chars = word.toLowerCase().split('');
    let currentNode = this.rootNode;
    let text = '';

    for (const char of chars) {
      // track the current prefix
      text += char;

      let edge = currentNode.getEdge(char);

      if (!edge) {
        const node = new TrieNode(text);
        edge = new Edge(char, currentNode, node);
        node.setParentEdge(edge);
        currentNode.addEdge(edge);
      }

      currentNode = edge.end;
      edge.end.incrementVisitCount();
    }

    currentNode.isFullWord = true;
  }

  find(word) {
    let letters = word.split('');
    let currentNode = this.rootNode;

    while (letters.length > 0) {
      const letter = letters.shift();
      const edge = currentNode.getEdge(letter);

      if (!edge || !edge.end) {
        return currentNode;
      }

      currentNode = edge.end;
    }

    return currentNode;
  }

  predictFullWord(word) {
    const currentNode = this.find(word);

    if (!currentNode) {
      throw new Error('Prefix not found in trie');
    }

    return this.findMaxFullWordUnderRoot(currentNode, 0, currentNode).maxNode.text;
  }

  findMaxFullWordUnderRoot(node, maxValue, maxNode) {
    for (const edge of node.edges) {
      if (edge.end.isFullWord && edge.end.value >= maxValue) {
        maxValue = edge.end.value;
        maxNode = edge.end;
      }

      const edgeMax = this.findMaxFullWordUnderRoot(edge.end, maxValue, maxNode);

      if (edgeMax.maxValue >= maxValue) {
        maxValue = edgeMax.maxValue;
        maxNode = edgeMax.maxNode;
      }
    }

    return { maxValue, maxNode };
  }

  inOrder(node = this.rootNode, level = 0) {
    for (const edge of node.edges) {
      console.log((level > 0 ? '|_' : '') + edge.letter.padStart(level, '_'));
      this.inOrder(edge.end, level + 1);
    }
  }
}
