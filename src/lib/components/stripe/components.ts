import TextBlock from "./TextBlock.svelte";
import Quote from "./Quote.svelte";
import Image from "./Image.svelte";

export const components: Record<string, any> = {
    'shared.rich-text': TextBlock,
    'shared.quote': Quote,
    'shared.media': Image
};
