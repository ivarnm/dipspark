<script lang="ts">
	import { onMount } from 'svelte';

	const particleCount = 50;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let snowflakes: Snowflake[] = [];

	class Snowflake {
		x: number = 0;
		y: number = 0;
		vy: number = 0;
		vx: number = 0;
		radius: number = 0;
		alpha: number = 0;
    frequency: number = 0;
    amplitude: number = 0;

		constructor(canvas: HTMLCanvasElement) {
			this.reset(canvas);
		}

		reset(canvas: HTMLCanvasElement): void {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * -canvas.height;
			this.vy = 1 + Math.random() * 1;
      this.vx = (0.5 - Math.random()) * 0.2;
			this.radius = 1 + Math.random() * 1.0;
			this.alpha = 0.5 + Math.random() * 0.5;
      this.frequency = Math.random() * 0.5 + 2;
      this.amplitude = Math.random() * 0.5 + 0.5;
		}
	}

	function generateSnowFlakes() {
		snowflakes = [];
		for (let i = 0; i < particleCount; i++) {
			snowflakes.push(new Snowflake(canvas));
		}
	}

	function update() {
		if (!canvas) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#fff';
    const timeElapsed = performance.now() / 1000;

		for (let i = 0; i < particleCount; i++) {
			const snowflake = snowflakes[i];
      const vx = snowflake.vx + Math.sin(timeElapsed * snowflake.frequency) * snowflake.amplitude;
			snowflake.y += snowflake.vy - Math.abs(vx)*0.0;
      snowflake.x += vx;

			ctx.globalAlpha = snowflake.alpha;
			ctx.beginPath();
			ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();

			if (snowflake.y > canvas.height) {
				snowflake.reset(canvas);
			}
			ctx.globalAlpha = 1;
		}

		requestAnimationFrame(update);
	}

	function onResize() {
		if (!canvas) return;
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}

	onMount(() => {
		if (typeof window == 'undefined') return;
		const context = canvas?.getContext('2d');
		if (!context) return;

		ctx = context;
		onResize();
		generateSnowFlakes();
		requestAnimationFrame(update);

		window.addEventListener('resize', onResize, false);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>
