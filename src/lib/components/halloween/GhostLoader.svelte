<div class="loader">
	<div class="circle">
		<div class="ghost__loader">
			<div class="ghost__loader__top">
				<div class="ghost__loader__top__face"></div>
				<div class="ghost__loader__top__arms"></div>
			</div>
			<div class="ghost__loader__tail">
				<div class="ghost__loader__tail__drip"></div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.loader {
		--size: 15px;
		--thickness: 6px;
		--color: #f4f4f4;
		--shadow: transparent;
		--bg: #141414;

		width: calc(var(--size) - var(--thickness));
		height: calc(var(--size) - var(--thickness));
		margin-top: calc(calc(var(--size) - var(--thickness)) * -2);
		border-radius: 100%;
		position: relative;
		transform: rotate(45deg);
		
		.circle {
			width: 100%;
			height: 100%;
			border-radius: 100%;
			border: var(--thickness) solid var(--color);
			border-top-color: transparent;
			border-left-color: transparent;
			animation: rotate infinite ease-in-out 1.3s;
			transform-origin: center;
			box-shadow: calc(var(--thickness) / 2) calc(var(--thickness) / 2) var(--thickness)
				calc(var(--thickness) / -2) var(--shadow);
			
			.ghost__loader {
				width: calc(100% + calc(var(--thickness) * 2));
				display: flex;
				justify-content: space-between;
				position: absolute;
				z-index: 1;
				transform: translate(calc(var(--thickness) * -1.245), calc(var(--thickness) * -0))
					rotate(-45deg);
				&__top {
					width: var(--thickness);
					background: var(--color);
					height: var(--thickness);
					border-radius: 50% 50% 5% 5%;
				}
				&__top {
					&__face {
						padding: calc(var(--thickness) / 3) calc(var(--thickness) / 5);
						display: flex;
						justify-content: space-between;
						&:after,
						&:before {
							content: '';
							display: block;
							height: calc(var(--thickness) / 5);
							width: calc(var(--thickness) / 5);
							border-radius: 100%;
							background: var(--bg);
						}
					}
					&__arms {
						display: flex;
						justify-content: space-between;
						&:after,
						&:before {
							content: '';
							display: block;
							height: calc(var(--thickness) / 5);
							width: calc(var(--thickness) / 2);
							margin: 0 calc(calc(var(--thickness) / 2) * -1);
							border-radius: 0 50% 50% 0;
							background: var(--color);
							transform: rotate(-45deg);
							transform-origin: bottom left;
						}
						&:before {
							border-radius: 50% 0 0 50%;
							transform: rotate(45deg);
							transform-origin: bottom right;
						}
					}
				}
				&__tail {
					position: absolute;
					z-index: -1;
					top: calc(var(--thickness) / 3);
					right: -2%;
					width: calc(var(--thickness) + 4%);
					filter: url(#goo);
					height: calc(var(--thickness) / 3);
					padding-top: calc(var(--thickness) / 3);
					overflow-x: hidden;
					&__drip {
						width: calc(var(--thickness) / 4);
						height: calc(var(--thickness) / 3);
						background: var(--color);
						position: absolute;
						top: calc(calc(var(--thickness) / 2) * -0.001);
						right: 0;
						box-shadow:
							calc(var(--thickness) / -2.5) 0 0 var(--color),
							calc(var(--thickness) / 2.5) 0 0 var(--color),
							calc(var(--thickness) / 1.25) 0 0 var(--color),
							calc(var(--thickness) / -1.25) 0 0 var(--color);
						border-radius: 50%;
						animation: ghost__loader-rips 1.2s linear infinite;
					}
					&:before {
						content: '';
						background: var(--color);
						position: absolute;
						top: calc(var(--thickness) / 3);
						right: 0;
						height: calc(var(--thickness) / 3);
						width: 100%;
						border-radius: 50%;
					}
				}
			}
		}
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes ghost__loader-rips {
		0% {
			right: -10%;
		}
		100% {
			right: 100%;
		}
	}

</style>
