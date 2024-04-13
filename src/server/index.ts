import http from 'node:http'
import dnsCache from 'dnscache'
import cluster from 'boring-cluster'

// @ts-expect-error yes it does
http.globalAgent.keepAlive = true
// @ts-expect-error yes it does
http.globalAgent.keepAliveMsecs = 60000

process.on('unhandledRejection', console.error)

dnsCache({
  enable: true,
  ttl: 300,
  cachesize: 1000
})

cluster('main')
