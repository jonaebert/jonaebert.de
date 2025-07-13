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
		},

		link(href: string, title: string, text: string) {
			return `<a href="${href.href}" target="_blank" class="underline text-secondary-600">${href.text}</a>`;
		},

		list(body: string, ordered: boolean) {
			function listitem(items: string) {
				let htmlitems: string = items
					.map((item: string) => {
						return `<li class="mb-1">${item.text}</li>`;
					})
					.join('');
				return htmlitems;
			}

			const tag = body.ordered ? 'ol' : 'ul';
			const listClass = body.ordered
				? 'list-decimal list-inside pl-4'
				: 'list-disc list-inside pl-4';

			return `<${tag} class="${listClass} mb-4">${listitem(body.items)}</${tag}>`;
		},
		}
	};

	marked.use({ renderer });
	$: html = marked.parse(body || '');
</script>

<div class="max-w-none mb-6">{@html html}</div>
