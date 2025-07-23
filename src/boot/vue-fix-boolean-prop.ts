import { boot } from 'quasar/wrappers';
import { ComponentPublicInstance } from 'vue';

/**
 * @hack Prevent vue's behavior of casting boolean default value to false
 * @since vue 3.3+
 *
 * @see {@link vuejs/core/packages/runtime-core/src/componentProps.ts:484#resolvePropValue} - boolean casting
 */
export default boot(({ app, router }) => {
  app.mixin({
    beforeCreate(this: ComponentPublicInstance) {
      const { props, type, vnode } = this.$;
      const types = Object.entries(type.props || {}) as Array<[string, any]>;

      for (const [key, prop] of types) {
        const raw = vnode.props?.[key];
        const value = props[key];
        if (
          ([] as unknown[]).concat(prop.type).includes(Boolean) && // Has boolean type
          prop.required !== true &&
          !('default' in prop) && // Optional without default
          raw === undefined &&
          value === false // Casted to false by vue
        ) {
          /**
           * Reset boolean props value to undefined
           * @hack `props` is readonly, use `props.__v_raw` to get a mutable `Proxy`
           */
          (props as any).__v_raw[key] = undefined;
        }
      }
    },
  });
});
