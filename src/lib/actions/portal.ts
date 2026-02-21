import { browser } from '$app/environment';

type Target = HTMLElement | string;

export function portal(node: HTMLElement, target: Target = document.body) {
	if (!browser) return { destroy() {} };

	const targetEl =
		typeof target === 'string'
			? (document.querySelector(target) as HTMLElement | null)
			: target;

	if (!targetEl) return { destroy() {} };

	targetEl.appendChild(node);

	return {
		destroy() {
			if (node.parentNode) node.parentNode.removeChild(node);
		}
	};
}
