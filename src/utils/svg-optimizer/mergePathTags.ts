// export function mergePathTags(content: string): string {
//   const symbolRegex = /<symbol([^>]*)>(.*?)<\/symbol>/gs;
//   const pathRegex = /<path([^>]*)d="([^"]+)"([^>]*)\/?>/gs;

//   let mergedContent = content;

//   let symbolMatch = symbolRegex.exec(content);
//   while (symbolMatch !== null) {
//     const symbolTag = symbolMatch[0];
//     const symbolAttributes = symbolMatch[1];
//     const symbolPaths = symbolMatch[2];

//     let mergedPaths: { [key: string]: string[] } = {};

//     let pathMatch = pathRegex.exec(symbolPaths);
//     while (pathMatch !== null) {
//       const pathTag = pathMatch[0];
//       const pathAttributes = pathMatch[1];
//       const pathD = pathMatch[2];
//       const pathOtherAttributes = pathMatch[3];

//       const attributeRegex = /(\S+)=("[^"]*")/g;
//       let otherAttributes: string[] = [];
//       let attributeMatch = attributeRegex.exec(pathAttributes);
//       while (attributeMatch !== null) {
//         const attributeName = attributeMatch[1];
//         const attributeValue = attributeMatch[2];
//         if (attributeName !== "d") {
//           otherAttributes.push(`${attributeName}=${attributeValue}`);
//         }
//         attributeMatch = attributeRegex.exec(pathAttributes);
//       }

//       const pathKey = `${otherAttributes.join(" ")} ${pathOtherAttributes}`;
//       mergedPaths[pathKey] = mergedPaths[pathKey] || [];
//       mergedPaths[pathKey].push(pathD);

//       pathMatch = pathRegex.exec(symbolPaths);
//     }

//     const mergedPathTags = Object.keys(mergedPaths).map(pathKey => {
//       const mergedD = mergedPaths[pathKey].join(" ");
//       const pathTag = `<path d="${mergedD}" ${pathKey}>`;
//       return pathTag;
//     });

//     const mergedSymbolTag = `<symbol${symbolAttributes}>${mergedPathTags.join("")}</symbol>`;

//     mergedContent = mergedContent.replace(symbolTag, mergedSymbolTag);

//     symbolMatch = symbolRegex.exec(content);
//   }

//   return mergedContent;
// }

export function mergePathTags(content: string): string {
  const symbolRegex = /<symbol([^>]*)>(.*?)<\/symbol>/gs;
  const pathRegex = /<path([^>]*)d="([^"]+)"([^>]*)\/?>/gs;

  let mergedContent = content;

  let symbolMatch = symbolRegex.exec(content);
  while (symbolMatch !== null) {
    const symbolTag = symbolMatch[0];
    const symbolAttributes = symbolMatch[1];
    const symbolPaths = symbolMatch[2];

    let mergedPaths: string[] = [];

    let pathMatch = pathRegex.exec(symbolPaths);
    while (pathMatch !== null) {
      const pathTag = pathMatch[0];
      const pathAttributes = pathMatch[1];
      const pathD = pathMatch[2];
      const pathOtherAttributes = pathMatch[3];

      mergedPaths.push(pathD);

      pathMatch = pathRegex.exec(symbolPaths);
    }

    const mergedSymbolTag = `<symbol${symbolAttributes}>${mergedPaths.join("")}</symbol>`;

    mergedContent = mergedContent.replace(symbolTag, mergedSymbolTag);

    symbolMatch = symbolRegex.exec(content);
  }

  return mergedContent;
}

// Example usage
// const sprite = `
// <svg>
//   <symbol id="symbol1">
//     <path d="M10 10h10v10H10z" fill="red" stroke="blue" />
//   </symbol>
//   <symbol id="symbol2">
//     <path d="M20 20h20v20H20z" fill="green" stroke="blue" />
//     <path d="M30 30h30v30H30z" fill="green" stroke="blue" />
//   </symbol>
// </svg>
// `;
// const mergedSprite = mergePathTags(sprite);
// console.log(mergedSprite);