let produtos = [];

const renderLista = () => {
    // pega o elemento tbody id="tprodutos"
    const tbprodutos = document.querySelector("#tprodutos");

    // Pega todas os produtos cadastradas no LS
    produtos = obterDadosProdutosLS();

    produtos.forEach((produto) => {
        // cria o elemento <tr>
        const tr = document.createElement("tr");

        // cria o elemento <td> e o texto do elemento
        const tdId = document.createElement("td");
        const tdNome = document.createElement("td");
        const tdMarca = document.createElement("td");
        const tdValor = document.createElement("td");
        const tdAcoes = document.createElement("td");
        const aEdit = document.createElement("a");
        const aDelete = document.createElement("a");

        // crio o conteúdo de cada <td>
        const tdIdTxt = document.createTextNode(produto.id);
        const tdNomeTxt = document.createTextNode(produto.nome);
        const tdMarcaTxt = document.createTextNode(produto.marca);
        const tdValorTxt = document.createTextNode(produto.valor);
        const aEditTxt = document.createTextNode("Editar");
        const aDeleteTxt = document.createTextNode("Excluir");

        // crio o atributo href="#"
        aEdit.setAttribute("href", "./edit.html?id=" + produto.id);
        aEdit.setAttribute("class", "btn btn-warning");
        aDelete.setAttribute("href", "#");
        aDelete.setAttribute("class", "btn btn-danger ms-3");

        // Adiciona os textos aos elementos
        tdId.append(tdIdTxt);
        tdNome.append(tdNomeTxt);
        tdMarca.append(tdMarcaTxt);
        tdValor.append(tdValorTxt);
        aEdit.append(aEditTxt);
        aDelete.append(aDeleteTxt);
        tdAcoes.append(aEdit);
        tdAcoes.append(aDelete);

        // adiciona os elementos td ao tr
        tr.append(tdId);
        tr.append(tdNome);
        tr.append(tdMarca);
        tr.append(tdValor);
        tr.append(tdAcoes);

        // adiciona o tr ao tbody id="tprodutos"
        tbprodutos.append(tr);
    });
};

// Pega os dados no LocalStorage
const obterDadosProdutosLS = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    return produtos;
};

const obterIdAtualLS = () => {
    const id = parseInt(localStorage.getItem("idProduto")) || 0;
    return id;
};

// Obtem os dados digitados no FORM
const obterDadosForm = () => {
    const dados = document.getElementsByTagName("input");
    const produtos = {
        nome: dados[0].value,
        marca: dados[1].value,
        valor: dados[2].value,
        id: dados[3].value,
    };

    return produtos;
};

// Formata os dados obtidos do FORM
const formatarDados = () => {
    const produtos = obterDadosForm();

    produtos.nome = produtos.nome.toUpperCase();
    produtos.marca = produtos.marca.toUpperCase();

    return produtos;
};


// Salva os dados no LocalStorage
const salvarDados = () => {
    const novoProduto = formatarDados();

    if (novoProduto.id) {
        produtos = produtos.map((p) => {
            if ((p.id == novoProduto.id)) {
                p = novoProduto
            };
            return p;
        });

    } else {
        novoProduto.id = obterIdAtualLS();
        produtos.push(novoProduto);
        localStorage.setItem("idProduto", obterIdAtualLS() + 1);
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));

    window.location = "./index.html";
};

// Pega o id do usuario na url
const obterIdUrl = () => {
    const id = new URLSearchParams(window.location.search).get("id");
    return id;
};

// pega os dados dos produtos pelo id
const pegarDadosProdutosPorId = () => {
    console.log("Log pegar dados dos produtos pelo id");
    console.log(produtos);
    const id = obterIdUrl();
    const produto = produtos.find((p) => p.id == id);

    return produto;
};

const renderForm = () => {
    produtos = obterDadosProdutosLS();
    const inputs = document.getElementsByTagName("input");
    const produto = pegarDadosProdutosPorId();

    inputs[0].value = produto.nome;
    inputs[1].value = produto.marca;
    inputs[2].value = produto.valor;
    inputs[3].value = produto.id;
};