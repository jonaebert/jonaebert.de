import TextBlock from "./TextBlock.svelte";
import Quote from "./Quote.svelte";
import Image from "./tset.svelte";

export const components: Record<string, any> = {
    'shared.rich-text': TextBlock,
    'shared.media': Image
};
