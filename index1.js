const graphtry = [
    [0, 2, 4, 0],
    [2, 0, 0, 3],
    [4, 0, 0, 1],
    [0, 3, 1, 0]
  ];
  //result should be: [[0,2,0,0],[2,0,0,3],[0,0,0,1],[0,3,1,0]]

  const graph=[
    [0, 1.3, 2.1, 0.9, 0.7, 1.8, 2, 1.5],
    [1.3, 0, 0.9, 1.8, 1.2, 2.6, 2.3, 1.1],
    [2.1, 0.9, 0, 2.6, 1.7, 2.5, 1.9, 1],
    [0.9, 1.8, 2.6, 0, 0.7, 1.6, 1.5, 0.9],
    [0.7, 1.2, 1.7, 0.7, 0, 0.9, 1.1, 0.8],
    [1.8, 2.6, 2.5, 1.6, 0.9, 0, 0.6, 1],
    [2, 2.3, 1.9, 1.5, 1.1, 0.6, 0, 0.5],
    [1.5, 1.1, 1, 0.9, 0.8, 1, 0.5, 0]
  ]
  const edges = [];
  
  // Step 1: Sort the edges based on their weights in ascending order
  for (let i = 0; i < graph.length; i++) {
    for (let j = i + 1; j < graph[i].length; j++) {
      if (graph[i][j] !== 0) {
        edges.push([i, j, graph[i][j]]); //i get [source, destination, weight] for all nodes
      }
    }
  }
  
  edges.sort((a, b) => a[2] - b[2]); // gi sortiram spored 3toto mesto odn weight
  
  const parent = Array(graph.length).fill(0).map((_, i) => i);
  /*.map((_, i) => i) iterates over each element of the array 
  and assigns the index i as the value for that element. This means that initially, 
  each vertex is its own parent, as parent[i] is set to i.*/
  // Find the parent of a node in the disjoint set
  function findParent(node) {
    if (parent[node] === node) {
      return node;
    }
    return findParent(parent[node]);
  }
  
  // Union operation to merge two sets
  function union(node1, node2) {
    parent[findParent(node2)] = findParent(node1);
  }
  
  const spanningTree = [];
  
  // Step 2: Add edges to the spanning tree if they don't create a cycle
  for (const edge of edges) {
    const [source, destination, weight] = edge;
  
    if (findParent(source) !== findParent(destination)) {
      union(source, destination);
      spanningTree.push(edge);
    }
  }
  
  // Create a new adjacency matrix for the spanning tree
  const spanningTreeGraph = Array(graph.length).fill(0).map(() => Array(graph.length).fill(0));
  
  // Update the adjacency matrix based on the spanning tree edges
  for (const edge of spanningTree) {
    const [source, destination, weight] = edge;
    spanningTreeGraph[source][destination] = weight;
    spanningTreeGraph[destination][source] = weight;
  }
  
  // Print the resulting graph (spanning tree) in the console as an array of arrays
  console.log("Resulting Graph (Spanning Tree):");
  console.log(JSON.stringify(spanningTreeGraph));
  