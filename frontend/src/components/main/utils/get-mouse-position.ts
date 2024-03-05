export const getMousPosition = (
	event: React.MouseEvent<HTMLDivElement>,
	setPosition: React.Dispatch<
		React.SetStateAction<{
			x: number;
			y: number;
		}>
	>,
) => {
	setPosition({
		x: (event.clientY - window.innerHeight / 2) * -0.0005,
		y: (event.clientX - window.innerWidth / 2) * -0.0005,
	});
};
