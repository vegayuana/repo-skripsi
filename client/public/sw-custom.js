importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')
importScripts('precache-manifest.ada2ad1098b752ca46e58307c8ec0a37.js')

if (workbox)
  console.log(`Workbox berhasil dimuat`)
else
  console.log(`Workbox gagal dimuat`)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute('/', workbox.strategies.staleWhileRevalidate())

workbox.routing.registerRoute(
  /\.(?:js|css|html|png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static'
  }),
)
workbox.routing.registerRoute(
  new RegExp('/static/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'static'
    }),
)
workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://repositori-skripsi.herokuapp.com/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api'
  })
)
workbox.routing.registerRoute(
  ({url}) => url.origin,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'assets'
  })
)