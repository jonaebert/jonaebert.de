<script lang="ts">
	export let body: string;
	export let name: string;
	export let position: string;
</script>

<div class="prose max-w-none mb-6">
	<figure class="max-w-3xl text-start bg-grey-200 dark:bg-grey-900 p-6 rounded-lg md:rounded-xl">
		<svg
			class="size-7.5 mb-3 text-secondary-700 dark:text-secondary-400"
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
			<p class="text-2xl italic font-medium font-poppins text-secondary-900 dark:text-grey-400">
				{body}
			</p>
		</blockquote>
		{#if name}
			<figcaption class="flex items-center justofy-center mt-6 space-x-3 rtl:space-x-reverse font-montserrat">
				<div class="flex items-center divide-x rtl:divide-x-reverse divide-grey-600">
					<cite class="pe-3 font-medium text-grey-800 dark:text-grey-300">{name}</cite>
					{#if position}
						<cite class="ps-3 text-sm text-grey-700 dark:text-grey-200">{position}</cite>
					{/if}
				</div>
			</figcaption>
		{/if}
	</figure>
</div>
