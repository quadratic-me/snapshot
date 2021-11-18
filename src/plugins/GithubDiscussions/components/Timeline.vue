<script setup>
import useGithubDiscussions from '..';

const { sayHello } = useGithubDiscussions();

const props = defineProps({
    proposal: Object
});

const show = props.proposal.space.plugins?.GithubDiscussions?.showLinkInTimeline
    && props.proposal.plugins?.GithubDiscussions?.nodeId
</script>

<template>
    <div class="text-right" v-if="show">
        <UiButton>Open "{{ proposal.plugins?.GithubDiscussions?.nodeId }}" Github</UiButton>
    </div>
</template>
