
const moduleAlias = require('module-alias')

const renderToString = require('preact-render-to-string')
if (!renderToString.renderToStaticMarkup) {
  renderToString.renderToStaticMarkup = renderToString
}

moduleAlias.addAlias('react', 'preact/compat')
moduleAlias.addAlias('react-dom', 'preact/compat')
moduleAlias.addAlias('react-ssr-prepass', 'preact-ssr-prepass')

require('next/dist/bin/next')
