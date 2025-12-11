export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker зарегистрирован:', registration);
          })
          .catch((error) => {
            console.log('Ошибка при регистрации Service Worker:', error);
          });
      });
    }
  }
  