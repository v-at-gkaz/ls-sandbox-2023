const API_HOST = "http://localhost:3000/api/v1";

function getJWT(login, password) {
    return new Promise((resolve, reject) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // !!!  myHeaders.append("Authorization", "Bearer login (get jwt)");

        const raw = JSON.stringify({
            login,
            password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch(`${API_HOST}/auth/login`, requestOptions)
        .then(async response => {
            if(!response.ok) {
                reject({
                    status: response.status,
                    statusText: response.statusText,
                    data: await response.json()
                });
                return;
            }
            return response.json();
        })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });

    });
}

function getList(jwt) {
    return new Promise((resolve, reject) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${jwt}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch(`${API_HOST}/todo`, requestOptions)
        .then(async response => {
            if(!response.ok) {
                reject({
                    status: response.status,
                    statusText: response.statusText,
                    data: await response.json()
                });
                return;
            }
            return response.text();
        })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });

    });
}

function login() {

    const login = document.querySelector("#login").value;
    const pass = document.querySelector("#pass").value;
    
    // console.log('login?', login, pass);

    getJWT(login, pass)
    .then(result=>{
        document.querySelector("#textarea-result").innerHTML = result.token;
    })
    .catch(err=>{
        document.querySelector("#textarea-result").innerHTML = JSON.stringify(err);
    });

}

function loadJWT(){
    const jwt = localStorage.getItem('jwt');
    document.querySelector("#textarea-result").innerHTML = jwt;
}

function req1() {

    const jwt = document.querySelector("#textarea-result").value;

    getList(jwt)
    .then(result=>{
        document.querySelector("#req1-result").innerHTML = result;
    })
    .catch(err=>{
        document.querySelector("#req1-result").innerHTML = JSON.stringify(err);
    });

    
}


loadJWT();

document.querySelector("#btn-login").addEventListener('click', () => {
    login();
});

document.querySelector("#btn-req1").addEventListener('click', () => {
    req1();
});

document.querySelector("#btn-load-jwt").addEventListener('click', () => {
    loadJWT();
});

document.querySelector("#btn-save-jwt").addEventListener('click', () => {
    
    const jwt = document.querySelector("#textarea-result").value;
    localStorage.setItem('jwt', jwt);
});

document.querySelector("#btn-remove-jwt").addEventListener('click', () => {
    document.querySelector("#textarea-result").innerHTML = '';
    localStorage.removeItem('jwt');
});


