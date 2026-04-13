<script lang="ts">
	export type BubblePreset = 'hero' | 'section' | 'cta' | 'subtle';

	export let preset: BubblePreset = 'section';
	export let className = '';
	export let ariaHidden = true;

	const presets: Record<
		BubblePreset,
		{
			topRight: string;
			bottomRight: string;
			bottomLeft: string;
			opacity: string;
		}
	> = {
		hero: {
			topRight:
				'h-[var(--bubble-size-sm)] w-[var(--bubble-size-sm)] -top-[var(--bubble-size-sm)/2] -right-[var(--bubble-size-sm)/2]',
			bottomRight:
				'h-[var(--bubble-size-lg)] w-[var(--bubble-size-lg)] md:h-[var(--bubble-size-xl)] md:w-[var(--bubble-size-xl)] -bottom-[var(--bubble-size-lg)/2] -right-[var(--bubble-size-lg)/2] md:-bottom-[var(--bubble-size-xl)/2] md:-right-[var(--bubble-size-xl)/2]',
			bottomLeft:
				'h-[var(--bubble-size-md)] w-[var(--bubble-size-md)] md:h-[var(--bubble-size-lg)] md:w-[var(--bubble-size-lg)] -bottom-[var(--bubble-size-md)/2] -left-[var(--bubble-size-md)/2] md:-bottom-[var(--bubble-size-lg)/2] md:-left-[var(--bubble-size-lg)/2]',
			opacity: 'opacity-80'
		},
		section: {
			topRight:
				'h-[var(--bubble-size-sm)] w-[var(--bubble-size-sm)] -top-[var(--bubble-size-sm)/2] -right-[var(--bubble-size-sm)/2]',
			bottomRight:
				'h-[var(--bubble-size-lg)] w-[var(--bubble-size-lg)] -bottom-[var(--bubble-size-lg)/2] -right-[var(--bubble-size-lg)/2]',
			bottomLeft:
				'h-[var(--bubble-size-md)] w-[var(--bubble-size-md)] -bottom-[var(--bubble-size-md)/2] -left-[var(--bubble-size-md)/2]',
			opacity: 'opacity-90'
		},
		cta: {
			topRight:
				'h-[var(--bubble-size-sm)] w-[var(--bubble-size-sm)] -top-[var(--bubble-size-sm)/2] -right-[var(--bubble-size-sm)/2]',
			bottomRight:
				'h-[var(--bubble-size-lg)] w-[var(--bubble-size-lg)] -bottom-[var(--bubble-size-lg)/2] -right-[var(--bubble-size-lg)/2]',
			bottomLeft:
				'h-[var(--bubble-size-md)] w-[var(--bubble-size-md)] -bottom-[var(--bubble-size-md)/2] -left-[var(--bubble-size-md)/2]',
			opacity: 'opacity-100'
		},
		subtle: {
			topRight:
				'h-[var(--bubble-size-sm)] w-[var(--bubble-size-sm)] -top-[var(--bubble-size-sm)/2] -right-[var(--bubble-size-sm)/2]',
			bottomRight:
				'h-[var(--bubble-size-lg)] w-[var(--bubble-size-lg)] -bottom-[var(--bubble-size-lg)/2] -right-[var(--bubble-size-lg)/2]',
			bottomLeft:
				'h-[var(--bubble-size-md)] w-[var(--bubble-size-md)] -bottom-[var(--bubble-size-md)/2] -left-[var(--bubble-size-md)/2]',
			opacity: 'opacity-60'
		}
	};

	$: current = presets[preset];
</script>

<div
	class={`pointer-events-none absolute inset-0 overflow-hidden ${current.opacity} ${className}`}
	aria-hidden={ariaHidden}
>
	<div class={`absolute rounded-full bg-(--bubble-highlight) ${current.topRight}`}></div>

	<div class={`absolute rounded-full bg-(--bubble-accent) ${current.bottomRight}`}></div>

	<div class={`absolute rounded-full bg-(--bubble-dark) ${current.bottomLeft}`}></div>
</div>
