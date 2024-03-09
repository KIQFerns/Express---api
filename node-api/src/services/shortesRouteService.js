function calculateDistance(p1, p2) {
  if (!p1 || !p2 || typeof p1.x !== 'number' || typeof p1.y !== 'number' || typeof p2.x !== 'number' || typeof p2.y !== 'number') {
      throw new Error('Points must be objects with numeric properties x and y');
  }
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function calculateTotalDistance(route) {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
      totalDistance += calculateDistance(route[i], route[i+1]);
  }
  totalDistance += calculateDistance(route[route.length - 1], { x: 0, y: 0 }); // Back to the company at the end
  return totalDistance;
}

function permutations(arr) {
  const result = [];

  function permute(arr, m = []) {
      if (arr.length === 0) {
          result.push(m);
      } else {
          for (let i = 0; i < arr.length; i++) {
              const current = arr.slice();
              const next = current.splice(i, 1);
              permute(current.slice(), m.concat(next));
          }
      }
  }

  permute(arr);
  return result;
}

function findShortestRoute(clients) {
  const clientsWithNumbers = clients.map(client => ({
      ...client,
      x: parseFloat(client.x),
      y: parseFloat(client.y)
  }));

  let shortestDistance = Infinity;
  let bestRoute = null;
  let bestOrder = null;
  const permutationsClients = permutations(clientsWithNumbers);
  for (let i = 0; i < permutationsClients.length; i++) {
      const route = permutationsClients[i];
      const routeDistance = calculateTotalDistance(route);
      if (routeDistance < shortestDistance) {
          shortestDistance = routeDistance;
          bestRoute = route;
          bestOrder = route.map(({ id_cliente, nome, x, y }) => ({ id_cliente, nome, x, y }));
      }
  }
  return { route: bestRoute, distance: shortestDistance, order: bestOrder };
}

module.exports = findShortestRoute;