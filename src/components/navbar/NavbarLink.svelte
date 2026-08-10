<script lang="ts">
    let { children, link } = $props();
</script>

<a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    class="text-xl hover:opacity-60 transition-opacity duration-150"
    >{@render children?.()}</a
>
