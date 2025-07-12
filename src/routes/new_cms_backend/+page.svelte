<script lang="ts">
    export let data;
	const posts = data.data;

    console.log('Posts:', posts);
</script>

<main class="p-8">
	<h1 class="text-3xl font-bold">Artikel</h1>
	<ul class="mt-4 space-y-4">
		{#each posts as post}
			<li class="p-4 bg-gray-100 rounded-xl">
				<h2 class="text-xl font-semibold">{post.title}</h2>
				<p>{post.description}</p>
			</li>
		{/each}
	</ul>
</main>
