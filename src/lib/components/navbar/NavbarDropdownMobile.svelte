<script lang="ts">
    let { children, options } = $props();
</script>

<div>
    <div class="text-xl">{@render children?.()}</div>
    <div class="pl-4 mt-1.5 flex flex-col gap-2">
        {#each options as option}
            <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#fff6ebb3]">{option.title}</a
            >
        {/each}
    </div>
</div>
