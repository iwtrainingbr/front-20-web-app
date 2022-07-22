const TABELA_CATEGORIAS = document.getElementById('tabela-categorias');
const MODAL_CONTEUDO = document.getElementById('modal-conteudo');

const INPUT_EDITAR_ID = document.getElementById('editar-id');
const INPUT_EDITAR_NOME = document.getElementById('editar-nome');
const INPUT_EDITAR_DESCRICAO = document.getElementById('editar-descricao');
const INPUT_EDITAR_FOTO = document.getElementById('editar-foto');

const FORM_ADD_CATEGORIA = document.getElementById('form_add_categoria');

const NOTIFICACOES = document.getElementById('notificacoes');

function mostrarNotificacao(mensagem) {
    NOTIFICACOES.innerHTML += `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Pronto!</strong> ${mensagem}
            <button id="teste" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    //configura uma função pra ser executada depois de 5 segundos
    setTimeout(() => {
        document.getElementById('teste').dispatchEvent(
            new Event('click')
        );
    }, 5000);


}

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

    // alert('Pronto, nova categoria adicionada');

    mostrarNotificacao('Nova categoria adicionada');

    buscarCategorias();

    FORM_ADD_CATEGORIA.reset();
   
    document.querySelector('[data-bs-target="#add-categoria"]').dispatchEvent(
        new Event('click')
    );

}

function excluirCategoria(id) {
    if (false === confirm('Tem certeza?')) {
        return;
    }
    
    fetch('http://localhost:9000/categorias/'+id, {
        method: 'DELETE'
    });

    // alert('Pronto, categoria excluida');
    mostrarNotificacao('Categoria excluida');
    
    setTimeout(() => {
        buscarCategorias();
    }, 1000)
}

function editarCategoria(id, nome, descricao, foto) {
    INPUT_EDITAR_ID.value = id;
    INPUT_EDITAR_NOME.value = nome;
    INPUT_EDITAR_DESCRICAO.value = descricao;
    INPUT_EDITAR_FOTO.value = foto;
}

function atualizarCategoria() {
    event.preventDefault();

    fetch('http://localhost:9000/categorias/'+INPUT_EDITAR_ID.value, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: INPUT_EDITAR_NOME.value,
            descricao: INPUT_EDITAR_DESCRICAO.value,
            foto: INPUT_EDITAR_FOTO.value,
        })
    });

    mostrarNotificacao('Categoria atualizada');
    
    setTimeout(() => {
        buscarCategorias();
    }, 2000);
}

function buscarCategorias() {
    TABELA_CATEGORIAS.innerHTML = '';

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
                            <button onclick="editarCategoria('${cadaCategoria.id}', '${cadaCategoria.nome}', '${cadaCategoria.descricao}', '${cadaCategoria.foto}')" data-bs-toggle="modal" data-bs-target="#modal-editar-categoria" class="btn btn-warning btn-sm">Editar</button>
                            <button onclick="excluirCategoria(${cadaCategoria.id})" class="btn btn-danger btn-sm">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        });
}

buscarCategorias();
