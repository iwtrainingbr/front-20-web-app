const TABELA_CATEGORIAS = document.getElementById('tabela-categorias');
const MODAL_CONTEUDO = document.getElementById('modal-conteudo');

function abrirImagem(nome) {
    MODAL_CONTEUDO.innerHTML = `<img src="${nome}" width="100%">`;
}

function filtrar() {
    let expressao = document.getElementById('busca').value.toLowerCase();

    let linhas = TABELA_CATEGORIAS.getElementsByTagName('tr');

    for (let tr in linhas) {
        let conteudo = linhas[tr].innerHTML.toLowerCase();

        if (true === conteudo.includes(expressao)) {
            linhas[tr].style.display = '';
        } else {
            linhas[tr].style.display = 'none';
        }
    }
}

function inserirCategoria() {
    event.preventDefault();

    fetch ('http://localhost:9000/categorias', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            foto: document.getElementById('foto').value,
        })
    });

    alert('Pronto, nova categoria adicionada');
}

function excluirCategoria(id) {
    if (false === confirm('Tem certeza?')) {
        return;
    }
    
    fetch('http://localhost:9000/categorias/'+id, {
        method: 'DELETE'
    });

    //recarregar a página
    alert('Pronto, categoria excluida');
}

fetch('http://localhost:9000/categorias')
    .then(resposta => resposta.json())
    .then(categorias => {
        categorias.map(cadaCategoria => {
            TABELA_CATEGORIAS.innerHTML += `
                <tr>
                    <td>${cadaCategoria.id}</td>
                    <td>${cadaCategoria.nome}</td>
                    <td>${cadaCategoria.descricao}</td>
                    <td>
                        <a onclick="abrirImagem('${cadaCategoria.foto}')" href="#" data-bs-toggle="modal" data-bs-target="#modal-foto">
                            <img src="${cadaCategoria.foto}" width="100px">
                        </a>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm">Editar</button>
                        <button onclick="excluirCategoria(${cadaCategoria.id})" class="btn btn-danger btn-sm">Excluir</button>
                    </td>
                </tr>
            `;
        });
    });

