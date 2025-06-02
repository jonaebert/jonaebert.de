<script lang="ts">
	import { contextMenuAction, name } from '$lib/store';
	export let src: string;
	export let alt: string = '';
	export let classNames: string = '';
	export let copyright: { name: string; url: string }[] = [{ name: '', url: '' }];
</script>

<div class="relative inline-block">
	<img {src} {alt} class={classNames} use:contextMenuAction />
	{#if copyright.length > 0 && copyright[0].name !== ''}
		<div class="absolute right-2 bottom-2 bg-grey-50 rounded p-1 text-xs text-black opacity-75">
			{#if copyright[0].url !== '' && copyright[0].url !== undefined && copyright[0].url.startsWith('https://')}
				<a href={copyright[0].url} target="_blank">
					<p class="text-balance text-end">
						&copy;
						{copyright[0].name}
					</p>
				</a>
			{:else}
				<p class="text-balance text-end">
					&copy;
					{copyright[0].name}
				</p>
			{/if}
		</div>
	{/if}
</div>
