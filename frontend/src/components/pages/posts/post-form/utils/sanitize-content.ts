export const sanitizeContent = (content: (string | null)) =>{
	if (content) {
	  return	content
		.replaceAll('&nbsp;', ' ')
		.replace(/ +/g, ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
	}
}

