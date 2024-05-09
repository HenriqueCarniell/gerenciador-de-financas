// Variáveis
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
let divFormAlter = document.getElementsByClassName('container-form-alter')[0];
let radioAlterEntrada = document.getElementById('button-alter-form-entrada');
let radioAlterSaida = document.getElementById('button-alter-form-saida');
let valorEntrada = document.getElementById('valor-de-entrada');
let btnAlterForm = document.getElementById('form-btn-add-2');
let valorSaida = document.getElementById('valor-de-saida');
let valorTotal = document.getElementById('valor-total');
let res = document.getElementById('res');

let openAndClose = false;

// Funções
let getTipoSelecionado = () => {
    if (radioEntrada.checked) {
        return radioEntrada.value;
    } else {
        return radioSaida.value;
    }
}

let userDataList = JSON.parse(localStorage.getItem('@userData')) || [];

let InsertUserData = () => {
    res.innerHTML = "";

    userDataList.forEach(element => {
        let color = element.tipo === 'entrada' ? 'green' : 'red';

        res.innerHTML += `
        <div class="itens-data-container">
        <div class="titulo-item-container">
            <h1>Finanças</h1>
        </div>
        <p style="color: ${color};">Titulo: ${element.titulo}</p>
        <p style="color: ${color};">Valor: ${element.valor}</p>
        <p style="color: ${color};">Categoria: ${element.categoria}</p>
        <p style="color: ${color};"> Data: ${element.Data.dia + "/" + element.Data.mes + "/" + element.Data.ano}</p>
        <p style="color: ${color};"> Hora: ${element.Data.hora + ":" + element.Data.minutos + ":" + element.Data.segundos}</p>
        <div class="button-alter-exclude-container">
        <button onclick="excludeData(${element.id})" class="btn-all btn-excluir-alter">Excluir</button>
        <button onclick="openAndCloseAlterForm(${element.id})" class="btn-all btn-excluir-alter">Alterar</button>
        </div>
        </div>
        `;
    });
};



InsertUserData()

let getAlterRadioForm = () => {
    if (radioAlterSaida.checked) {
        return radioAlterSaida.value;
    } else {
        return valorEntrada.value;
    }
}

let openAndCloseAlterForm = (id) => {
    if (divFormAlter.style.display === 'grid') {
        divFormAlter.style.display = 'none';
        body.style.backgroundColor = 'white';
        div_valor_total.style.opacity = '1';
        document.querySelectorAll('.btn-all').forEach(btn => {
            btn.style.opacity = '1';
        });
    } else {
        divFormAlter.style.display = 'grid';
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        div_valor_total.style.opacity = '0.6';
        document.querySelectorAll('.btn-all').forEach(btn => {
            btn.style.opacity = '0.5';
        });
    }

    btnAlterForm.addEventListener('click', (e) => alterFormData(e, id));
}

let alterFormData = (e, id) => {
    e.preventDefault();

    if (divFormAlter.style.display === 'grid') {
        divFormAlter.style.display = 'none';
        body.style.backgroundColor = 'white';
        div_valor_total.style.opacity = '1';
        document.querySelectorAll('.btn-all').forEach(btn => {
            btn.style.opacity = '1';
        });
    } else {
        divFormAlter.style.display = 'grid';
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        div_valor_total.style.opacity = '0.6';
        document.querySelectorAll('.btn-all').forEach(btn => {
            btn.style.opacity = '0.5';
        });
    }

    let alterTitulo = document.getElementById('alter-titulo').value;
    let alterValor = document.getElementById('alter-valor').value;
    let alterCategoria = document.getElementById('alter-categoria').value;

    let tipo = '';
    if (radioAlterEntrada.checked) {
        tipo = 'entrada';
    } else if (radioAlterSaida.checked) {
        tipo = 'saida';
    }

    userDataList = userDataList.map(element => {
        return element.id === id ? { ...element, titulo: alterTitulo, valor: alterValor, categoria: alterCategoria, tipo: tipo } : element;
    })

    localStorage.setItem('@userData', JSON.stringify(userDataList));
    InsertUserData();
    window.location.reload();
}

let excludeData = (id) => {
    userDataList = userDataList.filter(element => {
        return element.id != id;
    });

    localStorage.setItem('@userData', JSON.stringify(userDataList));
    InsertUserData();

    window.location.reload();
};

let includeValueInInput = () => {
    let sumInput = 0
    userDataList.forEach(element => {
        if (element.tipo === 'entrada') {
            sumInput += Number(element.valor);
        }
    })
    return sumInput;
}

let includeValueInSaida = () => {
    let sumInput = 0
    userDataList.forEach(element => {
        if (element.tipo === 'saida') {
            sumInput += Number(element.valor);
        }
    })

    return sumInput;
}

let includeValueinTotal = () => {
    return includeValueInInput() - includeValueInSaida();
}

valorEntrada.textContent = "R$" + includeValueInInput();
valorSaida.textContent = "R$" + includeValueInSaida();
valorTotal.textContent = "R$" + includeValueinTotal();

// Eventos
openForm.addEventListener('click', () => {
    openAndClose = !openAndClose;

    if (openAndClose === false) {
        div_form.style.display = 'none';
        body.style.backgroundColor = 'white';
        div_valor_total.style.opacity = '1';
        document.querySelectorAll('.btn-all').forEach(btn => {
            btn.style.opacity = '1';
        });

    } else {
        div_form.style.display = 'flex';
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        div_valor_total.style.opacity = '0.6';
        document.querySelectorAll('.btn-all').forEach(btn => {
            btn.style.opacity = '0.3';
        });
    }
});

formButtonAdd.addEventListener('click', (e) => {
    e.preventDefault();

    const now = new Date();

    if (div_form.style.display === 'flex') {
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
        tipo: getTipoSelecionado(),
        Data: {
            'dia': now.getDate(),
            'mes': now.getMonth() + 1,
            'ano': now.getFullYear(),
            'hora': now.getHours(),
            'minutos': now.getMinutes(),
            'segundos': now.getSeconds()
        }
    };

    userDataList.push(userData);
    localStorage.setItem('@userData', JSON.stringify(userDataList));
    InsertUserData();
    window.location.reload();
});
