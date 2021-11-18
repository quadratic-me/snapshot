import { defineAsyncComponent } from 'vue';
import plugins from '@/plugins/_plugins.json';
import { useApp } from '@/composables/useApp';

export function usePlugins() {
  const { explore } = useApp();

  Object.keys(plugins).forEach(key => {
    plugins[key].spaces = explore.value.plugins[key] ?? 0
  })

  const usePlugin = async (plugin: string) =>
    (await import(`../plugins/${plugin}/index.ts`)).default();


  const getComponent = (plugin: string, component: string) => {
    return defineAsyncComponent(() =>
      import(`../plugins/${plugin}/components/${component}.vue`)
    );
  }

  const getInfo = (plugin) => {
    return plugins[plugin];
  }

  return {
    plugins,
    usePlugin,
    getComponent,
    getInfo
  }
}