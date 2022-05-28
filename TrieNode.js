export class TrieNode {
  constructor(text, value = 0) {
    this.value = value;
    this.edges = [];
    this.isRoot = false;
    this.parentEdge = null;
    this.isFullWord = false;
    this.text = text;
  }

  getEdge(letter) {
    for (const edge of this.edges) {
      if (edge.letter === letter) {
        return edge;
      }
    }

    return null;
  }

  setParentEdge(edge) {
    this.parentEdge = edge;
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  incrementVisitCount() {
    this.value++;
  }
}
