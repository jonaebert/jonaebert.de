<script lang="ts">
	export let className: string = '';
</script>

<div class={`relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 ${className}`}>
	<div
		class="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
	></div>
</div>

<style>
	@keyframes -global-shimmer {
		100% {
			transform: translateX(100%);
		}
	}
</style>
