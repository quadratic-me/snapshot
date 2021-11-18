<script setup>
import usePlugin from './';

const { sayHello } = usePlugin();

defineProps({
    proposal: Object
});
</script>

<template>
    <div class="text-right">
        {{ sayHello(proposal.title) }}
        <UiButton>Open "{{ proposal.title }}" Github</UiButton>
    </div>
</template>
