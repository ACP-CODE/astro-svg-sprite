export function parsePoints(points: string): number[] {
  return points.split(/\s+/).map((point) => Number(point));
}