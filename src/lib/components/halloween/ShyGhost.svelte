<script lang="ts">
  // Credit to https://codepen.io/anthonysimone/pen/JmRKzz
	import { onDestroy, onMount } from "svelte";
  import "../../../styles/shyGhost.scss";
  import Ghost from "$lib/components/halloween/ShyGhost";	

  let ghost: Ghost | null = null;
  
  onMount(() => {
    if (typeof document == 'undefined') return;

    const sceneEl = document.querySelector('.scene-container');
    if (sceneEl) {
      ghost = new Ghost(sceneEl as HTMLElement);

      ghost.hover();
      ghost.startActivity();
      ghost.prepareEscape();
    }
  });

  onDestroy(() => {
    if (typeof document == 'undefined') return;

    ghost?.scene.remove();
    ghost = null;        
  });
</script>

<div class="scene-container stars-out">
	<div class="ghost-container">
		<div class="ghost">
			<div class="ghost-head">
				<div class="ghost-face">
					<div class="eyes-row">
						<div class="eye left"></div>
						<div class="eye right"></div>
					</div>
					<div class="mouth-row">
						<div class="cheek left"></div>
						<div class="mouth">
							<div class="mouth-top"></div>
							<div class="mouth-bottom"></div>
						</div>
						<div class="cheek right"></div>
					</div>
				</div>
			</div>
			<div class="ghost-body">
				<div class="ghost-hand hand-left"></div>
				<div class="ghost-hand hand-right"></div>
				<div class="ghost-skirt">
					<div class="pleat down"></div>
					<div class="pleat up"></div>
					<div class="pleat down"></div>
					<div class="pleat up"></div>
					<div class="pleat down"></div>
				</div>
			</div>
		</div>
		<div class="stars">
			<div class="star orange pointy star-1"><div class="star-element"></div></div>
			<div class="star orange pointy star-2"><div class="star-element"></div></div>
			<div class="star yellow pointy star-3"><div class="star-element"></div></div>
			<div class="star yellow pointy star-4"><div class="star-element"></div></div>
			<div class="star blue round star-5"><div class="star-element"></div></div>
			<div class="star blue round star-6"><div class="star-element"></div></div>
		</div>
	</div>
	<div class="shadow-container">
		<div class="shadow"></div>
		<div class="shadow-bottom"></div>
	</div>
</div>
