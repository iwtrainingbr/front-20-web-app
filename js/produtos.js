const TABELA_PRODUTOS = document.getElementById('tabela-produtos');

function buscarProdutos() {
    fetch('http://localhost:9000/produtos')
        .then(response => response.json())
        .then(produtos => {
            produtos.map(cadaProd => {
                TABELA_PRODUTOS.innerHTML += `
                    <tr>
                        <td>${cadaProd.id}</td>
                        <td>${cadaProd.nome}</td>
                        <td>${cadaProd.categoria}</td>
                        <td>${cadaProd.descricao}</td>
                        <td>
                            <button class="btn btn-sm btn-warning">Editar</button>
                            <button class="btn btn-sm btn-danger">Excluir</button>
                        </td>
                    </tr>
                `;
            })
        })
}

buscarProdutos();