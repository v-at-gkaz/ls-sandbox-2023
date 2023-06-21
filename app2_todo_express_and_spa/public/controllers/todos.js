function pageTodosInit() {
    console.log('todos controller detected');

    const tableWrapper = document.querySelector('#page-todos-table-wrapper');
    const loader = document.querySelector('#page-todos-loader');
    const errors = document.querySelector('#page-todos-errors');

    tableWrapper.style.display='none';
    loader.style.display='block';
    errors.style.display='none';

    getTodosFromBackend().then(data=>{
        tableWrapper.style.display='table';
        updateTable(data);
        errors.style.display='none';
        loader.style.display='none';
    }).catch(err=>{
        if(err.status && err.status === 401) {
            document.location.hash = '#login';
        } else {
            errors.style.display='block';
            errors.innerHTML=JSON.stringify(err);
        }
    });
}


function updateTable(data) {

    const table = document.querySelector('#page-todos-table');
    const lines = [];

    data.forEach((line, index)=> {
            lines.push(
            `<tr>
                <td>${index+1}</td>
                <td>${line.name}</td>
                <td>${line.createdAt}</td>
            </tr>`);
    });

    table.innerHTML = lines.join('');

}

function getTodosFromBackend() {
    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch(`/api/v1/todo`, requestOptions)
        .then(async response => {
            if(!response.ok) {
                reject({
                    status: response.status,
                    statusText: response.statusText,
                    data: await response.text()
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