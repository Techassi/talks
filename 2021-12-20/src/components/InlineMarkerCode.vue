<script lang="ts" setup>
    interface Props {
        text: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        text: '',
    });
</script>

<template>
    <InlineMarker class="text-orange-500 text-0.5em">{{ text }}</InlineMarker>
</template>
