<script lang="ts">
	let { title = 'Title', content = 'Content' } = $props();
</script>

<div
	class="flex h-24 w-full flex-col justify-center rounded-lg border border-[#ec3750] bg-[#1f1f27] px-4 py-2"
>
	<div class="text-xl font-bold text-[#ec3750] capitalize">{title}</div>
	<div class="text-2xl font-bold capitalize">{content}</div>
</div>
