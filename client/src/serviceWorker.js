//Lifecycle = register -> install -> activate https://bit.ly/CRA-PWA

//ip localhost ([::1] - 127.0.0.0/8 )
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export function register(config) {
  //Cek apakah service worker support pada browser
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
    //Service worker tidak jalan jika public file diluar url
    if (publicUrl.origin !== window.location.origin) {
      return
    }

    //Ketika halaman telah di load 
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config)
        navigator.serviceWorker.ready.then(() => {
          console.log('Web app served cache-first')
        })
      } else {
        //Register SW
        registerValidSW(swUrl, config)
      }
    })
  }
}

function registerValidSW(swUrl, config) {
  //------Register SW
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        installingWorker.onstatechange = () => {
          //------------install SW
          if (installingWorker.state === 'installed') {
            //Cek apakah sw aktif
            if (navigator.serviceWorker.controller) {
              // Update precached content di fetch tapi SW lama masih di jalankan sampai tab di tutup
              console.log('Content baru telah di fetch dan siap digunakan saat tab telah ditutup')
              if (config && config.onUpdate) {
                config.onUpdate(registration)
              }
            } else {
              console.log('Content telah di cached untuk mode offline.')
              if (config && config.onSuccess) {
                config.onSuccess(registration)
              }
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error saat register service worker:', error)
    })
}

function checkValidServiceWorker(swUrl, config) {
  // Cek apakah SW sudah ada
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      const contentType = response.headers.get('content-type')
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // SW tidak di temukan 
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // SW ditemukan. Proses dilanjutkan
        registerValidSW(swUrl, config)
      }
    })
    .catch(() => {
      console.log(
        'Tidak ada koneksi Internet. Web App dalam offline mode.'
      )
    })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}