
const routes = [
    { path: '/', view: 'home', protected: true },
    { path: '/users', view: 'users', protected: true },
    { path: '/login', view: 'login', protected: false },
];

function router() {
    const path = window.location.hash.substring(1);
    const route = routes.find(r => r.path === path);

    if (route) {
        if (route.protected && !isAuthenticated()) {
            window.location.hash = `#/login`;
            loadView('login');
        } else {
            loadView(route.view);
        }

    } else {
        loadView('not-found');
    }
}

function loadView(view) {
    switch (view) {
        case 'home':
            document.getElementById('content').innerHTML = getPage(view);
            break;
        case 'users':
            document.getElementById('content').innerHTML = getPage(view);
            break;
        case 'login':
            document.getElementById('content').innerHTML = getPage(view);
            break;
        default:
            document.getElementById('content').innerHTML = '<h2>Page Not Found</h2><p>La pagina solicitada no existe.</p>';
    }
}

function getPage(page) {
    fetch(`views/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = `${html}`;
        })
        .catch(error => {
            console.error('Error al cargar el contenido HTML:', error);
        });
}

function isAuthenticated() {
    const user = localStorage.getItem('user');
    return user ? true : false;
}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
