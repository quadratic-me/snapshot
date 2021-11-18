<script setup>
import useGithubDiscussions from '..';

const { sayHello } = useGithubDiscussions();

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
