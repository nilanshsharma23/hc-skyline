<script lang="ts">
    let { link, title } = $props();
</script>

<li>
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-base inline-block opacity-80 hover:opacity-100 transition-opacity duration-150"
        >{title}</a
    >
</li>
