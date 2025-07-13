<script lang="ts">
	import { marked } from 'marked';

	export let body: string;

	const renderer = {
		heading(text: string, level: number) {
			const classes = {
				2: 'text-3xl md:text-4xl font-bold text-secondary-900 font-poppins italic',
				3: 'text-2xl md:text-3xl font-semibold text-black font-poppins italic',
				4: 'text-xl md:text-2xl font-semibold text-black font-poppins italic',
				5: 'text-md md:text-xl font-semibold text-black font-poppins italic',
				6: 'text-md md:text-xl font-medium text-black font-poppins italic'
			};
			text.depth = 1;
			text.depth = text.depth === 1 ? 2 : text.depth;
			const tag = `h${text.depth}`;
			return `<${tag} class="${classes[text.depth]}">${text.text}</${tag}>`;
		}
	};

	marked.use({ renderer });
	$: html = marked.parse(body || '');
</script>

<div class="max-w-none mb-6">{@html html}</div>
