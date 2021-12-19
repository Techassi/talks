<script lang="ts" setup>
    interface Props {
        text: string;
        url?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        text: '',
        url: '',
    });
</script>

<template>
    <InlineMarker class="text-green-500">
        <a :href="url ? url : 'https://datatracker.ietf.org/doc/html/rfc' + text">RFC {{ text }}</a>
    </InlineMarker>
</template>
