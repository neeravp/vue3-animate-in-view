// iife/cjs usage extends esm default export - so import it all
import plugin from '@/entry.esm';
import * as components from '@/components/index'
import * as directives from '@/directives/index'

// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)
type ComponentNamedExports = Exclude<typeof components, 'default'>;
type DirectiveNamedExports = Exclude<typeof directives, 'default'>;
type ExtendedPlugin = typeof plugin & ComponentNamedExports & DirectiveNamedExports;

Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== 'default') {
    const key = componentName as Exclude<keyof ComponentNamedExports, 'default'>;
    const val = component as Exclude<ExtendedPlugin, typeof plugin>;
    (plugin as ExtendedPlugin)[key] = val;
  }
});

Object.entries(directives).forEach(([directiveName, directive]) => {
    if (directiveName !== 'default') {
      const key = directiveName as Exclude<keyof DirectiveNamedExports, 'default'>;
      const val = directive as Exclude<ExtendedPlugin, typeof plugin>;
      (plugin as ExtendedPlugin)[key] = val;
    }
  });

export default plugin;
