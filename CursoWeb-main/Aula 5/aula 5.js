//Declarando as variáveis
let produtos = []; //produtos é um array(lista) onde serão armazenados os produtos que o usuário digitar.
let adicionando = -1;

//Cfunção chamada quando clicamos no botão adicionar produto
function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value)
    const quantidade = parseInt(document.getElementById("quantidade").value)

    //Garante que o nome não esteja vazio e que preço/quantidade sejam números.
    if (!nome || isNaN(preco) || isNaN(quantidade)) {
        alert("Preencha todos os campos vazios");
        return;
    }

    const produto = { nome, preco, quantidade };

    //Decide entre adicionar ou editar
    if (adicionando === -1) {
        produtos.push(produto); // adiciona novo
    } else {
        produtos[adicionando] = produto; //edita existente
        adicionando = -1;
    }

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quantidade").value = "";

    atualizarTabela();
}
function atualizarTabela() {
    const tbody = document.querySelector("#tabela-produtos tbody");
    tbody.innerHTML = ""; // Limpa a tabela antes de atualizar

    produtos.forEach((produto, index) => {
        const linha = `
                <td>${produto.nome}</td>
                <td>${produto.preco.toFixed(2)}</td> 
                <td>${produto.quantidade}</td>
                <td>${(produto.preco * produto.quantidade).toFixed(2)}</td>
                <td>
                    <button class="edit" onclick="editarProduto(${index})">Editar</button>
                    <button class="delete" onclick="excluirProduto(${index})">Excluir</button>
                </td>
            `;
        tbody.innerHTML += linha; // toFixed(muitas casas decimais) 
    });
}
function editarProduto(index) {
    const produto = produtos[index];
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;
    adicionando = index; // Define o índice do produto a ser editado
}
function excluirProduto(index) {
    if (confirm("Deseja realmente excluir este produto?")) {
        produtos.splice(index, 1); // Remove o produto do array
        atualizarTabela(); // Atualiza a tabela após a exclusão
    }
}
