import { stations, Station, MetroLine, getStationById } from '@/data/metroData';

interface RouteNode {
  stationId: string;
  line: MetroLine;
  isInterchange: boolean;
}

interface RouteResult {
  route: RouteNode[];
  totalTime: number;
  interchanges: number;
  fare: number;
}

interface DijkstraNode {
  stationId: string;
  time: number;
  line: MetroLine;
  previous: string | null;
  previousLine: MetroLine | null;
}

// Build adjacency graph from stations data
const buildGraph = (): Map<string, { neighbor: string; time: number; line: MetroLine }[]> => {
  const graph = new Map<string, { neighbor: string; time: number; line: MetroLine }[]>();
  
  stations.forEach(station => {
    const connections = station.connections.map(conn => ({
      neighbor: conn.stationId,
      time: conn.time,
      line: conn.line
    }));
    graph.set(station.id, connections);
  });
  
  return graph;
};

// Calculate fare based on distance (Delhi Metro fare structure approximation)
const calculateFare = (totalTime: number): number => {
  if (totalTime <= 5) return 10;
  if (totalTime <= 12) return 20;
  if (totalTime <= 21) return 30;
  if (totalTime <= 32) return 40;
  if (totalTime <= 45) return 50;
  return 60;
};

// Dijkstra's Algorithm implementation
export const findShortestRoute = (fromId: string, toId: string): RouteResult | null => {
  if (fromId === toId) {
    return {
      route: [{
        stationId: fromId,
        line: getStationById(fromId)?.lines[0] || 'blue',
        isInterchange: false
      }],
      totalTime: 0,
      interchanges: 0,
      fare: 10
    };
  }

  const graph = buildGraph();
  const distances = new Map<string, number>();
  const previous = new Map<string, { stationId: string; line: MetroLine } | null>();
  const visited = new Set<string>();
  
  // Priority queue using simple array (could use a proper heap for better performance)
  const queue: { stationId: string; distance: number; line: MetroLine }[] = [];
  
  // Initialize distances
  stations.forEach(station => {
    distances.set(station.id, Infinity);
    previous.set(station.id, null);
  });
  
  distances.set(fromId, 0);
  const startStation = getStationById(fromId);
  if (!startStation) return null;
  
  queue.push({ stationId: fromId, distance: 0, line: startStation.lines[0] });
  
  while (queue.length > 0) {
    // Sort and get minimum distance node
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift()!;
    
    if (visited.has(current.stationId)) continue;
    visited.add(current.stationId);
    
    if (current.stationId === toId) break;
    
    const neighbors = graph.get(current.stationId) || [];
    
    for (const neighbor of neighbors) {
      if (visited.has(neighbor.neighbor)) continue;
      
      // Add small penalty for line changes to prefer fewer interchanges
      const prevInfo = previous.get(current.stationId);
      const lineChangePenalty = prevInfo && prevInfo.line !== neighbor.line ? 2 : 0;
      
      const newDistance = current.distance + neighbor.time + lineChangePenalty;
      
      if (newDistance < (distances.get(neighbor.neighbor) || Infinity)) {
        distances.set(neighbor.neighbor, newDistance);
        previous.set(neighbor.neighbor, { stationId: current.stationId, line: neighbor.line });
        queue.push({ stationId: neighbor.neighbor, distance: newDistance, line: neighbor.line });
      }
    }
  }
  
  // Reconstruct path
  if (!previous.get(toId)) return null;
  
  const route: RouteNode[] = [];
  let currentId: string | null = toId;
  
  while (currentId) {
    const prevInfo = previous.get(currentId);
    const station = getStationById(currentId);
    
    if (station) {
      route.unshift({
        stationId: currentId,
        line: prevInfo?.line || station.lines[0],
        isInterchange: false
      });
    }
    
    currentId = prevInfo?.stationId || null;
  }
  
  // Mark interchanges
  let interchanges = 0;
  for (let i = 1; i < route.length; i++) {
    if (route[i].line !== route[i - 1].line) {
      route[i].isInterchange = true;
      interchanges++;
    }
  }
  
  // Fix the first station's line
  if (route.length > 1) {
    route[0].line = route[1].line;
  }
  
  // Calculate actual time without penalty
  let totalTime = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const station = getStationById(route[i].stationId);
    const connection = station?.connections.find(c => c.stationId === route[i + 1].stationId);
    if (connection) {
      totalTime += connection.time;
    }
  }
  
  // Add interchange time (3 min per interchange)
  totalTime += interchanges * 3;
  
  return {
    route,
    totalTime,
    interchanges,
    fare: calculateFare(totalTime)
  };
};
