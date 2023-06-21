window.addEventListener('popstate', () => {
    loadPageByName(window.location.hash);
});

window.location.hash = '#todos';

function loadPageByName(name) {
    const app = document.querySelector('#app');
    const page = ['#login', '#todos', '#new'].includes(name) ? name.replace('#', '') : 'unknown';
    fetch(`/pages/${page}.html`)
        .then(async response => {
            if(!response.ok) {
                app.innerHTML = '<b>SPA Error 1</b>';
                return;
            }
            return response.text();
        })
        .then(result => {
            app.innerHTML = result;
        })
        .catch(error => {
            app.innerHTML = '<b>SPA Error 2</b>';
        });
}


/*const pushUrl = (href) => {
  history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
};*/