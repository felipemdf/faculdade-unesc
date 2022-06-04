const obtemUltimoId = () => {
    const vendas = obterDadosLS()
    let ultVenda = 0
    
    if (vendas.length == 0) {
        return ultVenda
    } else {
        ultVenda= vendas.reduce( (valor, p) => {
            return Math.max(p.id) //valor = p.id //encontrar a solução 
        })
    }
    
    return ultVenda
    
}

// Obtem os dados digitados no FORM
const obterDadosForm = () => {
    const dados = document.getElementsByTagName('input')
    const venda = {
        id: parseInt(obtemUltimoId()) + 1,
        cliente: dados[0].value,
        produto: dados[1].value,
        quantia: dados[2].value,
    }

    return venda;
}

// Formata os dados obtidos do FORM
const formatarDados = () => {
    const venda = obterDadosForm()
    
    venda.cliente = venda.cliente.toUpperCase()
    venda.produto = venda.produto.toUpperCase()
    venda.quantia = venda.quantia.toLowerCase()

    return venda
}

// Salva os dados no LocalStorage
const salvarDados = () => {
    const venda = formatarDados()
    const vendas = obterDadosLS()
    vendas.push(venda)
    
    localStorage.setItem('vendas', JSON.stringify(vendas))

    window.location = './index.html'

}

// Pega os dados no LocalStorage
const obterDadosLS = () => {
    const vendas = JSON.parse(localStorage.getItem('vendas')) || []
    return vendas
}


// Renderiza a lista de pessoas no arquivo pessoas/index.html
const render = () => {
    // pega o elemento tbody id="tpessoas"
    const tvendas = document.querySelector('#tvendas')

    // Pega todas as pessoas cadastradas no LS
    const vendas = obterDadosLS()

    vendas.forEach((p, key) => {
        // cria o elemento <tr>
        const tr = document.createElement('tr')
        
        // cria o elemento <td> e o texto do elemento
        const tdId = document.createElement('td')
        const tdIdTxt = document.createTextNode(p.id)

        const tdcliente = document.createElement('td')
        const tdclienteTxt = document.createTextNode(p.cliente)

        const tdproduto = document.createElement('td')
        const tdprodutoTxt = document.createTextNode(p.produto)
        
        const tdAc = document.createElement('td')
        const aEdit = document.createElement('a')
        aEdit.setAttribute('href', './edit.html') // cria o atributo href="#"
        aEdit.setAttribute('id', 'cli' + p.id)
        aEdit.setAttribute('onclick', 'teste(this)')
        const aEditTxt = document.createTextNode('Editar')
        const aDelete = document.createElement('a')
        aDelete.setAttribute('href', '#') // cria o atributo href="#"
        const aDeleteTxt = document.createTextNode('Excluir')

        // Adiciona os textos aos elementos
        tdId.append(tdIdTxt)
        tdcliente.append(tdclienteTxt)
        tdproduto.append(tdprodutoTxt)
        aEdit.append(aEditTxt)
        aDelete.append(aDeleteTxt)
        tdAc.append(aEdit)
        tdAc.append(aDelete)

        // adiciona os elementos td ao tr
        tr.append(tdId)
        tr.append(tdcliente)
        tr.append(tdproduto)
        tr.append(tdAc)

        // adiciona o tr ao tbody id="tpessoas"
        tvendas.append(tr)
    });
}


const teste = (elemento) => {
    console.log(elemento);
}

