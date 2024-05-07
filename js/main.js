let openForm = document.getElementById('btn-add');
let div_form = document.getElementsByClassName('div-form')[0];
let body = document.getElementsByTagName('body')[0];
let div_valor_total = document.getElementsByClassName('div-valor-total')[0];
let formButtonAdd = document.getElementsByClassName('form-btn-add')[0];
let tituloInput = document.getElementById('titulo');
let valorInput = document.getElementById('valor');
let categoriaInput = document.getElementById('categoria');
let res = document.getElementById('res');

let openAndClose = false;

openForm.addEventListener('click', () => {
    openAndClose = !openAndClose;

    if(openAndClose === false) {
        div_form.style.display = 'none';
        body.style.backgroundColor = 'white';
        div_valor_total.style.opacity = '1';

    } else {
        div_form.style.display = 'flex';
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        div_valor_total.style.opacity = '0.6';
    }
});

let userDataList = JSON.parse(localStorage.getItem('@userData')) || [];

let InsertUserData = () => {
    res.innerHTML = "";

    userDataList.forEach(element => {
        res.innerHTML += `
        <p>${element.titulo}</p>
        <p>${element.valor}</p>
        <p>${element.categoria}</p>
        <button onclick="excludeData(${element.id})">Excluir</button>
        <button>Alterar</button>
        `;
    });
};

formButtonAdd.addEventListener('click', (e) => {
    e.preventDefault();

    if(div_form.style.display === 'flex') {
        div_form.style.display = 'none';
        body.style.backgroundColor = 'white';
        div_valor_total.style.opacity = '1';
    }

    let tituloValue = tituloInput.value;
    let valorValue = valorInput.value;
    let categoriaValue = categoriaInput.value;

    let userData = {
        id: Date.now(),
        titulo: tituloValue,
        valor: valorValue,
        categoria: categoriaValue
    };

    userDataList.push(userData);
    localStorage.setItem('@userData', JSON.stringify(userDataList));

    InsertUserData();
});

let excludeData = (id) => {
    userDataList = userDataList.filter(element => {
        return element.id != id;
    });

    localStorage.setItem('@userData', JSON.stringify(userDataList));
    InsertUserData();
};
