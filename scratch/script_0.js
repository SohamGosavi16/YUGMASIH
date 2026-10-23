
    (function () {
      try {
        var params = new URLSearchParams(window.location.search);
        var isGuestUrl = params.get('guest') === 'true';
        var loggedIn = localStorage.getItem('yugmaLoggedIn') === 'true';
        var isGuest = localStorage.getItem('yugmaIsGuest') === 'true';
        var visited = sessionStorage.getItem('yugmaVisited') === 'true';

        // Auto-authenticate as guest explorer if returning from 3D models or already visited
        if (isGuestUrl || loggedIn || isGuest || visited || (document.referrer && document.referrer.indexOf('.html') !== -1)) {
          document.documentElement.classList.add('yugma-session-restored');
          if (!loggedIn && !isGuest) {
            localStorage.setItem('yugmaLoggedIn', 'true');
            localStorage.setItem('yugmaIsGuest', 'true');
            if (!localStorage.getItem('yugmaCurrentUser')) {
              localStorage.setItem('yugmaCurrentUser', JSON.stringify({
                name: 'Guest Explorer',
                email: '',
                isGuest: true,
                language: localStorage.getItem('yugmaUserLanguage') || 'en'
              }));
            }
          }
        }
        sessionStorage.setItem('yugmaVisited', 'true');
      } catch (e) {}
    })();
  