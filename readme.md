
# Next POC

> Test out a couple of data fetching strategies with a next-powered app

## Getting stared

```
yarn
yarn dev
```

To build a prod-ready version

```
yarn build
yarn start
```

## Goals

[x] Investigate next to build applications
[x] Styled using styled-components
[x] Server render the stylesheet and inject it to speed things up
[x] Style using `@raid/basic-kit`
[x] Dynamic routing to add client and server renders
[x] Only fetch when the data is not already available

## styled-components

Pain in the nuts is what this is.

Needs a custom `.babelrc` with the plugin and ssr enabled. This will stop annoying checksum errors (which are errors when the server and client do not match, which looks like it is because the cjs export is used on server but esm on the client, this only seems to occur using the `css` function though, which, in our case, we do via `@styled-system/css`. phew, what a mess) but the babel plugin alone will not solve the flash when navigating to pages.

The flash happens because the ssr doesn't export the generated css file. To solve this you need to add and muck with the `_document` file. The document needs to do the server render of the style sheet and inject it into the head. It’s a pain, but not overly involved, mostly a one-time copy-paste jobby when starting a project (which can probably be solved by importing a function somehow).

[styled-components example](https://github.com/zeit/next.js/tree/canary/examples/with-styled-components)

Links are the next pain in the arse, but they are, thankfully, easier to deal with. There _is_ a footgun, but its not too bad. `next/link` can do quite a few bits and pieces, make sure to pass all the props on to the next link when creating a styled link, this is very evident when considering dynamic routes which require `href` and `as`.

## Client and server loading

`getInitialProps` will always attempt to load the data and so can be used for client or server routing, which means you can use it to fetch data when navigating directly to a page, or via an in-app navigation.

@TODO how to only fetch data if we don't already have it?
