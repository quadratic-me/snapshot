<script setup>
import { usePlugins } from '@/composables/usePlugins';

const props = defineProps(['plugin']);

const { usePlugin, getLogoUrl, getUsingSpaces } = usePlugins();

const { name, version, author } = await usePlugin(props.plugin);
</script>

<template>
  <Block>
    <div class="flex items-center mb-1">
      <a
        :href="`https://github.com/snapshot-labs/snapshot/tree/master/src/plugins/${plugin}`"
        target="_blank"
        class="flex items-center"
      >
        <UiAvatar
          class="mr-2 mb-2"
          :imgsrc="getLogoUrl(name)"
          :seed="name.charCodeAt()"
          size="28"
        />
        <h3 v-text="name" />
      </a>
      <div class="ml-1">v{{ version }}</div>
    </div>
    <div class="text-color">
      <div>
        <a
          :href="`https://github.com/${author}`"
          target="_blank"
          class="text-color"
        >
          <Icon name="github" class="mr-1" />
          {{ author }}
        </a>
      </div>
      {{ $tc('inSpaces', [_n(getUsingSpaces(plugin))]) }}
    </div>
  </Block>
</template>
