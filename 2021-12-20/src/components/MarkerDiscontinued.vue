<script lang="ts" setup>
    interface Props {
        text?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        text: 'Eingestellt',
    });
</script>

<template>
    <Marker class="text-red-500">{{ text }}</Marker>
</template>
