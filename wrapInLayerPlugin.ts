// eslint-disable-next-line import/no-extraneous-dependencies
import postcss from 'postcss';

export const wrapInLayerPlugin = () => {
    return {
        postcssPlugin: 'postcss-wrap-in-layer',
        Root(root, {result}) {
            const file = result.opts.from || '';

            if (!/\.module\.css/.test(file)) return;

            // SAFETY CHECK: If it's already wrapped, don't wrap it again!
            const alreadyWrapped = root.nodes.some(
                node => node.type === 'atrule' && node.name === 'layer'
            );
            if (alreadyWrapped) return;

            const layer = postcss.atRule({
                name: 'layer',
                params: 'koval-components',
                source: root.source,
            });

            layer.append([...root.nodes]);
            root.removeAll();

            const declaration = postcss.atRule({
                name: 'layer',
                params: 'koval-reset, koval-components',
                source: root.source,
            });

            root.append(declaration);
            root.append(layer);
        },
    };
};
wrapInLayerPlugin.postcss = true;
