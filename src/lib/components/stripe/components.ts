import TextBlock from "./TextBlock.svelte";
import Text from "./Text.svelte";
import Quote from "./Quote.svelte";
import Image from "./Image.svelte";
import Slider from "./Slider.svelte";

export const components: Record<string, any> = {
    'shared.rich-text': TextBlock,
    'shared.text': Text,
    'shared.quote': Quote,
    'shared.media': Image,
    'shared.slider': Slider,
};
