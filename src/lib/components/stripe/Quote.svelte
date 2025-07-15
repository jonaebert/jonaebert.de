<script lang="ts">
	export let body: string;
	export let name: string;
	export let position: string;

	console.log(body);
</script>

<figure class="max-w-screen-md text-start">
	<svg
		class="size-7.5 mb-3 text-gray-400"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 18 14"
	>
		<path
			d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
		/>
	</svg>
	<blockquote>
		<p class="text-2xl italic font-medium font-poppins text-secondary-900">
			{body}
		</p>
	</blockquote>
	{#if name}
		<figcaption class="flex items-center justofy-center mt-6 space-x-3 rtl:space-x-reverse">
			<div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
				<cite class="pe-3 font-medium text-gray-900">{name}</cite>
				{#if position}
					<cite class="ps-3 text-sm text-gray-500">{position}</cite>
				{/if}
			</div>
		</figcaption>
	{/if}
</figure>
