/**
 * Dijkstra's Algorithm for finding shortest metro routes
 * 
 * This file contains the main routing logic for the Delhi Metro Route Finder.
 * It uses Dijkstra's algorithm to find the path with minimum travel time.
 */

import { stations, MetroLine, getStationById } from '@/data/metroData';

// ==================== TYPES ====================

// A single station in the route
interface RouteNode {
  stationId: string;
  line: MetroLine;
  isInterchange: boolean;
}

// The complete result returned after finding a route
interface RouteResult {
  route: RouteNode[];
  totalTime: number;
  interchanges: number;
  fare: number;
}

// Used internally during pathfinding
interface QueueItem {
  stationId: string;
  distance: number;
  line: MetroLine;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Build a graph from the stations data
 * Each station maps to its neighbors with travel time and line color
 */
function buildGraph() {
  const graph = new Map<string, { neighbor: string; time: number; line: MetroLine }[]>();
  
  for (const station of stations) {
    const connections = station.connections.map(conn => ({
      neighbor: conn.stationId,
      time: conn.time,
      line: conn.line
    }));
    graph.set(station.id, connections);
  }
  
  return graph;
}

/**
 * Calculate fare based on travel time
 * Uses approximate Delhi Metro fare structure
 */
function calculateFare(totalTime: number): number {
  if (totalTime <= 5) return 10;
  if (totalTime <= 12) return 20;
  if (totalTime <= 21) return 30;
  if (totalTime <= 32) return 40;
  if (totalTime <= 45) return 50;
  return 60;
}

// ==================== MAIN ALGORITHM ====================

/**
 * Find the shortest route between two stations
 * Uses Dijkstra's algorithm with a small penalty for line changes
 */
export function findShortestRoute(fromId: string, toId: string): RouteResult | null {
  
  // Special case: same station
  if (fromId === toId) {
    const station = getStationById(fromId);
    return {
      route: [{
        stationId: fromId,
        line: station?.lines[0] || 'blue',
        isInterchange: false
      }],
      totalTime: 0,
      interchanges: 0,
      fare: 10
    };
  }

  // Build the graph
  const graph = buildGraph();
  
  // Track shortest distance to each station
  const distances = new Map<string, number>();
  
  // Track how we got to each station (for reconstructing the path)
  const previous = new Map<string, { stationId: string; line: MetroLine } | null>();
  
  // Track which stations we've already processed
  const visited = new Set<string>();
  
  // Priority queue (simple array, sorted by distance)
  const queue: QueueItem[] = [];

  // Initialize all distances to infinity
  for (const station of stations) {
    distances.set(station.id, Infinity);
    previous.set(station.id, null);
  }

  // Start from the source station
  const startStation = getStationById(fromId);
  if (!startStation) return null;
  
  distances.set(fromId, 0);
  queue.push({ stationId: fromId, distance: 0, line: startStation.lines[0] });

  // Main loop - process stations until we reach destination
  while (queue.length > 0) {
    // Get station with minimum distance
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift()!;

    // Skip if already visited
    if (visited.has(current.stationId)) continue;
    visited.add(current.stationId);

    // Stop if we reached the destination
    if (current.stationId === toId) break;

    // Check all neighbors
    const neighbors = graph.get(current.stationId) || [];
    
    for (const neighbor of neighbors) {
      if (visited.has(neighbor.neighbor)) continue;

      // Add small penalty for changing lines (to prefer fewer interchanges)
      const prevInfo = previous.get(current.stationId);
      const lineChangePenalty = prevInfo && prevInfo.line !== neighbor.line ? 2 : 0;
      
      const newDistance = current.distance + neighbor.time + lineChangePenalty;

      // Update if this is a shorter path
      if (newDistance < (distances.get(neighbor.neighbor) || Infinity)) {
        distances.set(neighbor.neighbor, newDistance);
        previous.set(neighbor.neighbor, { 
          stationId: current.stationId, 
          line: neighbor.line 
        });
        queue.push({ 
          stationId: neighbor.neighbor, 
          distance: newDistance, 
          line: neighbor.line 
        });
      }
    }
  }

  // Check if we found a path
  if (!previous.get(toId)) return null;

  // Reconstruct the path by going backwards from destination
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

  // Mark interchange stations (where line changes)
  let interchanges = 0;
  for (let i = 1; i < route.length; i++) {
    if (route[i].line !== route[i - 1].line) {
      route[i].isInterchange = true;
      interchanges++;
    }
  }

  // Fix first station's line to match the route
  if (route.length > 1) {
    route[0].line = route[1].line;
  }

  // Calculate actual travel time (without penalty)
  let totalTime = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const station = getStationById(route[i].stationId);
    const connection = station?.connections.find(c => c.stationId === route[i + 1].stationId);
    if (connection) {
      totalTime += connection.time;
    }
  }

  // Add 3 minutes for each interchange
  totalTime += interchanges * 3;

  return {
    route,
    totalTime,
    interchanges,
    fare: calculateFare(totalTime)
  };
}
