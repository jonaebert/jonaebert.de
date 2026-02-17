<script>
	export let words = ['Queer', 'Solidarisch', 'Gerecht', 'Sozial', 'Fair', 'Stark', 'Klar'];

	let currentWord = words[3];
	let nextWord = '';
	let isTransitioning = false;
	const timeout = 1750;
	let i = 0;

	function updateWords() {
		isTransitioning = true;
		nextWord = words[i];
		setTimeout(() => {
			currentWord = nextWord;
			i++;
			if (i === words.length) {
				i = 0;
			}
			isTransitioning = false;
			setTimeout(updateWords, timeout);
		}, 750);
	}

	setTimeout(updateWords, timeout);
</script>

<h2 class="text-nowrap text-zinc-600 dark:text-zinc-400">
	Grün<span class="text-accent font-bold">.</span> Gemeinsam<span class="text-accent font-bold"
		>.</span
	>
	<span
		class="fade text-accent font-medium"
		class:fade-in={!isTransitioning}
		class:fade-out={isTransitioning}>{currentWord}</span
	><span class="font-bold">.</span>
</h2>

<style lang="postcss">
	.fade {
		transition: opacity 1s ease-in-out;
	}
	.fade-in {
		opacity: 1;
	}
	.fade-out {
		opacity: 0;
	}
</style>
