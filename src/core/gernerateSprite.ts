import { extractAttributes, extractSvgContent } from "../utils";

export default function generateSprite(icons: any[]) {
	let sprite = '<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite">';

	icons.forEach(icon => {
		sprite += `
      <symbol class="svg-sprite" id="${icon.name}" ${extractAttributes(icon.content)}>
        ${extractSvgContent(icon.content)}  
      </symbol>
    `;
	});

	sprite += '</svg>';

	return sprite;
}