# koa-pg-react-boilerplate

Abandoned. When I got into the Koa ecosystem, we only had a few options for
relatively lightweight web frameworks in Node, and only one of them supported
async. That's not the case anymore, and Koa is mostly in permanent maintenance
mode. Nowadays, I would recommend just using whatever starter kit seems to be
most popular; every few weeks, there's a new "best stack ever" (what even is
TAN? Should you use Remix or just plain React Router and its libraries? How are
Neon or Supabase different from Postgres? I don't know! I don't care! Just pick
one!), so any time I start a new project, this will already be outdated. I also
don't think Node is necessarily the best choice for web servers (not the worst
either, at least it's not terribly slow like Ruby or stuck in 1995 like Python).
Make your own choices.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

Node client/server service template with:
* Typescript
* Koa
* React
* Styled Components
* Storybook
* Vite
* Postgres
* Kysely
* PGWeb
* Docker

```bash
npm ci
npm start # start in docker
npm run dev # start without docker
npm run storybook # run storybook
npm t # lint and test
npm run build # test and build
```

[LICENSE](./LICENSE.md)

# TODO:

* Get HMR working again. See:
    * https://github.com/axe-me/vite-plugin-node/blob/main/packages/vite-plugin-node/src/server/index.ts
    * https://vitejs.dev/guide/api-hmr.html
    * https://vike.dev/docker#dev
    * https://vite-plugin-ssr.com/renderPage
    * https://github.com/vikejs/vike/issues/1127
    * https://github.com/vitejs/vite/issues/15297
