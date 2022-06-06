let venda = {
    id: null,
    cliente: null,
    valorTotal: 0,
    dataVenda: null,
    produtos: []
};

const limparTabela = (tabela) => {
    tabela.innerHTML = ""
}

const limparTabelaProdutoVenda = () => {
    const tbProdutos = document.querySelector("#tbprodutos");
    tbProdutos.innerHTML = ""
}
const renderLista = () => {
    // pega o elemento tbody id="tprodutos"
    const tbVendas = document.querySelector("#tbvendas");

    limparTabela(tbVendas);

    // Pega todas os produtos cadastradas no LS
    const vendas = obterDadosVendasLS();

    vendas.forEach((venda) => {
        // cria o elemento <tr>
        const tr = document.createElement("tr");

        // cria o elemento <td> e o texto do elemento
        const tdId = document.createElement("td");
        const tdCliente = document.createElement("td");
        const tdValorTotal = document.createElement("td");
        const tdDataVenda = document.createElement("td");
        const tdAcoes = document.createElement("td");
        const aEdit = document.createElement("a");
        const aDelete = document.createElement("a");

        // crio o conteúdo de cada <td>
        const tdIdTxt = document.createTextNode(venda.id);
        const tdClienteTxt = document.createTextNode(venda.cliente);
        const tdValorTotalTxt = document.createTextNode(venda.valorTotal);
        const tdDataVendaTxt = document.createTextNode(venda.dataVenda);
        const aEditTxt = document.createTextNode("Editar");
        const aDeleteTxt = document.createTextNode("Excluir");

        // crio o atributo href="#"
        aEdit.setAttribute("href", "./edit.html?id=" + venda.id);
        aEdit.setAttribute("class", "btn btn-warning");
        aDelete.setAttribute("onclick", "excluirVendaPorId(" + venda.id +")");
        aDelete.setAttribute("class", "btn btn-danger ms-3");

        // Adiciona os textos aos elementos
        tdId.append(tdIdTxt);
        tdCliente.append(tdClienteTxt);
        tdValorTotal.append(tdValorTotalTxt);
        tdDataVenda.append(tdDataVendaTxt);
        aEdit.append(aEditTxt);
        aDelete.append(aDeleteTxt);
        tdAcoes.append(aEdit);
        tdAcoes.append(aDelete);

        // adiciona os elementos td ao tr
        tr.append(tdId);
        tr.append(tdCliente);
        tr.append(tdValorTotal);
        tr.append(tdDataVenda);
        tr.append(tdAcoes);

        // adiciona o tr ao tbody id="vendas"
        tbVendas.append(tr);
    });
};

// Pega os dados no LocalStorage
const obterDadosVendasLS = () => {
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
    return vendas;
};

// Pega os dados no LocalStorage
const obterDadosProdutosLS = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    return produtos;
};

// Pega os dados no LocalStorage
const obterDadosPessoasLS = () => {
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
    return pessoas;
  };

const obterIdAtualLS = () => {
    const id = parseInt(localStorage.getItem("idVenda")) || 0;
    return id;
};

// Obtem os dados digitados no FORM
const obterDadosForm = () => {
    const selectCliente = document.querySelector("#sCliente");
    const inputId = document.querySelector("#iId");

    venda.cliente = selectCliente.value;
    venda.id = inputId.value;
    venda.dataVenda = new Date().toLocaleString();
    return venda;
};

const validarDadosForm = (novaVenda) => {
    if(!novaVenda.cliente){
      window.alert("O nome do cliente não foi informado");
      return false;
    }


    if(novaVenda.produtos.length == 0){
      window.alert("Não foi informado os produtos da venda");
      return false;
    }
  
  
    return true;
};


// Salva os dados no LocalStorage
const salvarDados = () => {
    const novaVenda = obterDadosForm();
    let vendas = obterDadosVendasLS();

    if(!validarDadosForm(novaVenda))
        return;

    if (novaVenda.id) {
        vendas = vendas.map((v) => {
            if ((v.id == novaVenda.id)) {
                v = novaVenda
            };
            return v;
        });

    } else {
        novaVenda.id = obterIdAtualLS();
        vendas.push(novaVenda);
        localStorage.setItem("idVenda", obterIdAtualLS() + 1);
    }

    localStorage.setItem("vendas", JSON.stringify(vendas));

    limparVenda();
    window.location = "./index.html";
};

// Pega o id do usuario na url
const obterIdUrl = () => {
    const id = new URLSearchParams(window.location.search).get("id");
    return id;
};

// pega os dados dos produtos pelo id
const pegarDadosVendaPorId = () => {
    const vendas = obterDadosVendasLS();
    const id = obterIdUrl();
    const venda = vendas.find((p) => p.id == id);

    return venda;
};

const pegarDadosProdutoPorId = (id) => {
    const produtos = obterDadosProdutosLS();
    const produto = produtos.find((p) => p.id == id);

    return produto;
};

const renderForm = () => {
    const clientes = obterDadosPessoasLS();
    const produtos = obterDadosProdutosLS();

    // Pega os dados da venda se vier um ID na url
    const vendaEdicao = pegarDadosVendaPorId();

    // pega os selects e inputs
    const selectProduto = document.querySelector("#sProduto");
    const selectCliente = document.querySelector("#sCliente");
    const inputId = document.querySelector("#iId");
    
    // Cria as opções de clientes
    clientes.forEach(cliente => {

        // cria o elemento <option>
        const option = document.createElement("option");

        // crio o conteúdo de cada <option>
        const optionTxt = document.createTextNode(cliente.nome);

        // Adiciona os textos aos elementos
        option.append(optionTxt);

        // Atribui o id de cada cliente a option
        option.setAttribute("id", cliente.id);

        // adiciona o <option> ao <selection>
        selectCliente.append(option);
    });

    // Cria as opções de produtos
    produtos.forEach(produto => {

        // cria o elemento <option>
        const option = document.createElement("option");

        // crio o conteúdo de cada <option>
        const optionTxt = document.createTextNode(produto.nome);

        // Adiciona os textos aos elementos
        option.append(optionTxt);

        // Atribui o id de cada cliente a option
        option.setAttribute("id", produto.id);

        // adiciona o <option> ao <selection>
        selectProduto.append(option);
    });

    //Se for um formulario para edição, deixa o valor dos selects conforme os dados
    selectCliente.value = (vendaEdicao) ? vendaEdicao.cliente : "";
    selectProduto.value = "";

    if (vendaEdicao){
        venda = vendaEdicao;
        inputId.value = vendaEdicao.id;
        
        renderizarTabelaProduto();
    }
};

const adicionarProduto = () => {
    const selectProduto = document.querySelector("#sProduto");
    const quantidade = document.querySelector("#iQuantidade");
    const selectProdutoSelecionado = selectProduto.options[selectProduto.selectedIndex];
    let novoProduto;

    if(!selectProdutoSelecionado){
        window.alert("Deve ser selecionado um produto antes de adiciona-lo")
        return;
    }

    if(!quantidade.value){
        window.alert("Deve ser selecionado uma quantidade antes de adicionar o produto")
        return;
    }

    novoProduto = pegarDadosProdutoPorId(selectProdutoSelecionado.id);
    novoProduto.quantidade = parseFloat(quantidade.value);

    const indexProdutoVenda = venda.produtos.findIndex((p) => p.id == novoProduto.id);

    if(indexProdutoVenda != -1)
        venda.produtos[indexProdutoVenda].quantidade += parseFloat(novoProduto.quantidade);
    else
        venda.produtos.push(novoProduto);

    //Calculo o valor total ao adicionar um produto
    venda.valorTotal =calculaValorTotal();
    limparFormProduto();
    renderizarTabelaProduto();

};

const calculaValorTotal = () => {
    const valorTotal = venda.produtos.reduce((valorTotal, valorAtual) => {
        return (valorTotal + (parseFloat(valorAtual.valor) * parseFloat(valorAtual.quantidade)));
    }, 0)

    return valorTotal;
};

const renderizarTabelaProduto = () => {
    
    // pega o elemento tbody id="tprodutos"
    const tbProdutos = document.querySelector("#tbprodutos");

    limparTabelaProdutoVenda();

    venda.produtos.forEach(produto => {
        // cria o elemento <tr>
        const tr = document.createElement("tr");

        // cria o elemento <td> e o texto do elemento
        // const tdId = document.createElement("td");
        const tdProduto = document.createElement("td");
        const tdValor = document.createElement("td");
        const tdQuantidade = document.createElement("td");
        const tdAcoes = document.createElement("td");
        const aDelete = document.createElement("a");

        // crio o conteúdo de cada <td>
        // const tdIdTxt = document.createTextNode(produto.id);
        const tdProdutoTxt = document.createTextNode(produto.nome);
        const tdValorTxt = document.createTextNode(produto.valor);
        const tdQuantidadeTxt = document.createTextNode(produto.quantidade);
        const aDeleteTxt = document.createTextNode("Excluir");

        // crio os atributos
        aDelete.setAttribute("onclick", "excluirProdutoVendaPorId(" + produto.id +")");
        aDelete.setAttribute("class", "btn btn-danger ms-3");

        // Adiciona os textos aos elementos
        // tdId.append(tdIdTxt);
        tdProduto.append(tdProdutoTxt);
        tdValor.append(tdValorTxt);
        tdQuantidade.append(tdQuantidadeTxt);
        aDelete.append(aDeleteTxt);
        tdAcoes.append(aDelete);

        // adiciona os elementos td ao tr
        // tr.append(tdId);
        tr.append(tdProduto);
        tr.append(tdValor);
        tr.append(tdQuantidade);
        tr.append(tdAcoes);

        // adiciona o tr ao tbody id="vendas"
        tbProdutos.append(tr);
    });
    
};

const atualizarDados = (novaListaVendas) => {
    localStorage.setItem("vendas", JSON.stringify(novaListaVendas));
    renderLista();
  };

const excluirVendaPorId = (id) => {
    const novaListaVendas = obterDadosVendasLS();
    const indexVenda = novaListaVendas.findIndex((v) =>  v.id == id);
    novaListaVendas.splice(indexVenda,1);
  
    atualizarDados(novaListaVendas);
  };

const limparVenda = () => {
    venda = {
        id: null,
        cliente: null,
        valorTotal: null,
        dataVenda: null,
        produtos: []
    };
} 

const excluirVenda = () => {
    venda = {
        id: null,
        cliente: null,
        valorTotal: 0,
        dataVenda: null,
        produtos: []
    };
} 

const excluirProdutoVendaPorId = (id) => {
    const indexProduto = venda.produtos.findIndex((p) =>  p.id == id);
    venda.produtos.splice(indexProduto, 1);

    renderizarTabelaProduto();
    
}

const limparFormProduto = () => {
    const selectProduto = document.querySelector("#sProduto");
    const inputQuantidade = document.querySelector("#iQuantidade");

    selectProduto.value = "";
    inputQuantidade.value = "";
};
