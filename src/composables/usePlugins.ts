import plugins from '@/plugins/_plugins.json';
import { defineAsyncComponent } from 'vue';

export function usePlugins() {

  const usePlugin = async (plugin: string) =>
    (await import(`../plugins/${plugin}/index.ts`)).default();


  const getTimelineComponent = (plugin: string) => {
    return defineAsyncComponent(() =>
      import(`../plugins/${plugin}/Timeline.vue`)
    );
  }

  const getContentComponent = (plugin: string) => {
    return defineAsyncComponent(() =>
      import(`../plugins/${plugin}/Content.vue`)
    );
  }

  const getLogoUrl = (plugin) => {
    return `https://raw.githubusercontent.com/snapshot-labs/snapshot/master/src/plugins/${plugin}/logo.png`
  }

  const getUsingSpaces = (plugin) => {
    return 0;
  }

  return {
    plugins,
    usePlugin,
    getTimelineComponent,
    getContentComponent,
    getLogoUrl,
    getUsingSpaces
  }
}