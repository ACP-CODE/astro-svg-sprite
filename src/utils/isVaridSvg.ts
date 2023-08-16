export default function isValidSvg(content: string) {
	return content.includes('<svg') && content.includes('</svg>'); 
}