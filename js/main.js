let openForm = document.getElementById('btn-add');
let div_form = document.getElementsByClassName('div-form')[0];
let body = document.getElementsByTagName('body')[0];
let div_valor_total = document.getElementsByClassName('div-valor-total')[0];
let formButtonAdd = document.getElementsByClassName('form-btn-add')[0];
let tituloInput = document.getElementById('titulo');
let valorInput = document.getElementById('valor');
let categoriaInput = document.getElementById('categoria');
let buttonFormEntrada = document.getElementById('button-form-entrada');
let buttonFormSaida = document.getElementById('button-form-saida');
let radioEntrada = document.getElementById('button-form-entrada');
let radioSaida = document.getElementById('button-form-saida');
let valorEntrada = document.getElementById('valor-de-entrada')
let valorSaida = document.getElementById('valor-de-saida')
let valorTotal = document.getElementById('valor-total')
let res = document.getElementById('res');

let openAndClose = false;

let getTipoSelecionado = () => {
    if (radioEntrada.checked) {
        return radioEntrada.value;
    } else {
        return radioSaida.value; 
    }
}

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
        <button onclick="alterarData(${element.id})">Alterar</button>
        `;
    });
};
InsertUserData();

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
        categoria: categoriaValue,
        tipo: getTipoSelecionado()
    };

    userDataList.push(userData);
    localStorage.setItem('@userData', JSON.stringify(userDataList));
    InsertUserData();
    window.location.reload()
});

let alterarData = (id) => {
    // Logica para abrir o formulario

    //pegar todos os dados

    //Substituir os novos dados no localstorage
}

let excludeData = (id) => {
    userDataList = userDataList.filter(element => {
        return element.id != id;
    });

    localStorage.setItem('@userData', JSON.stringify(userDataList));
    InsertUserData();

    window.location.reload()
};

let includeValueInInput = () => {
    let sumInput = 0
    userDataList.forEach(element => {
        if(element.tipo === 'entrada') {
           sumInput += Number(element.valor)
        }
    })
    return sumInput
}

let includeValueInSaida = () => {
    let sumInput = 0
    userDataList.forEach(element => {
        if(element.tipo === 'saida') {
           sumInput += Number(element.valor);
        }
    })
    return sumInput;
}

let includeValueinTotal = () => {
    return includeValueInInput() - includeValueInSaida()
}

valorEntrada.textContent = "R$" + includeValueInInput();
valorSaida.textContent = "R$" + includeValueInSaida();
valorTotal.textContent = "R$" + includeValueinTotal();