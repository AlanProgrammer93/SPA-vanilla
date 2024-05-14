function handlerLogin() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (user && pass) {
        localStorage.setItem('user', user);
        window.location.hash = `#/`;
    } else {
        alert("Complete todos los campos")
    }
}

function handlerLogout() {
    localStorage.removeItem('user');
    window.location.hash = `#/login`;
}

function getUsers() {
    fetch('https://www.mockachino.com/06c67c77-18c4-45/users')
        .then(res => res.json())
        .then(data => {
            const contenedor = document.getElementById('userItems');
            data.users.forEach(function (user) {
                const parrafo = document.createElement('p');
                parrafo.textContent = `${user.name} ${user.surnames}`;
                
                contenedor.appendChild(parrafo);
            });

        })
        .catch(err => console.log(err))
}

window.addEventListener('DOMContentLoaded', getUsers);
window.addEventListener('hashchange', getUsers);