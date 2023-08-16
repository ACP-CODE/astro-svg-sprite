export default function mergePaths(content: string) {

  return content
    .replace(/(<line [^>]*>)<\/line>/g, (match) => {
      const line = parseLine(match);
      return `<path d="M${line.x1} ${line.y1} L${line.x2} ${line.y2}"/>`;
    })
    .replace(/(<polyline [^>]*>)<\/polyline>/g, (match) => {
      const points = parsePolyline(match);
      const d = points.join(' ');
      return `<path d="M${d}Z"/>`;
    })
    .replace(/(<g [^>]*>)(\s*)(<g [^>]*>)/g, '$1$3');

}

// 解析line属性
function parseLine(line: string) {

  // 使用正则匹配line的属性
  const match = line.match(/x1="([^"]+)"[^]+y1="([^"]+)"[^]+x2="([^"]+)"[^]+y2="([^"]+)"/);

  if (!match) {
    throw new Error('Invalid line format');
  }

  return {
    x1: Number(match[1]),
    y1: Number(match[2]),
    x2: Number(match[3]),
    y2: Number(match[4])
  };

}

function parsePolyline(polyline: string) {

  // 使用正则匹配points属性
  const match = polyline.match(/points="([^"]+)"/);

  if (!match) {
    throw new Error('Invalid polyline format');
  }

  // 解析点坐标
  const points = match[1].split(' ').map(p => {
    const [x, y] = p.split(',');
    return {
      x: Number(x),
      y: Number(y)
    };
  });

  return points;

}