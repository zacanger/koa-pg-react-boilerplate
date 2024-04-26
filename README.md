# koa-pg-react-boilerplate

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
