import { useEffect } from "react";

class RainDrop {
	x: number;
	y: number;
	endy: number;
	velocity: number;
	opacity: number;

	constructor(x: number, y: number, endy: number, velocity: number, opacity: number) {
		this.x = x;
		this.y = y;
		this.endy = endy;
		this.velocity = velocity;
		this.opacity = opacity;
	}

	draw(c: CanvasRenderingContext2D): void {
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.lineTo(this.x, this.y - this.endy);
		c.lineWidth = 1;
		c.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
		c.stroke();
	}

	update(Height: number): void {
		let rainEnd = window.innerHeight + 100;
		if (this.y >= rainEnd) {
			this.y = this.endy - 100;
		} else {
			this.y = this.y + this.velocity;
		}
	}
}

export const useRainEffect = (containerName: string, Width:number, Height: number): void => {
	useEffect(() => {
		let canvas = document.getElementsByClassName(containerName)[0] as HTMLCanvasElement;
		canvas.width = Width;
		canvas.height = Height;

		let c = canvas.getContext('2d')!;

		let rainArray: RainDrop[] = [];

		for (let i = 0; i < 140; i++) {
			let rainXLocation = Math.floor(Math.random() * Width) + 1;
			let rainYLocation = Math.random() * -500;
			let randomRainHeight = Math.floor(Math.random() * 10) + 2;
			let randomSpeed = Math.floor(Math.random() * 12) + 0.2;
			let randomOpacity = Math.random() * 0.45;
			rainArray.push(new RainDrop(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
		}

		const animateRain = (): void => {
			requestAnimationFrame(animateRain);
			c.clearRect(0, 0, Width, Height);

			for (let i = 0; i < rainArray.length; i++) {
				rainArray[i].update(Height);
				rainArray[i].draw(c);
			}
		}

		animateRain();

	}, [containerName, Width, Height]);
};
