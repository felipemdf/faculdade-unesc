// Obtem os dados digitados no FORM
const obterDadosForm = () => {
    const dados = document.getElementsByTagName('input')
    const pessoa = {
        nome: dados[0].value,
        endereco: dados[1].value,
        telefone: dados[2].value,
        email: dados[3].value,
        dataNascimento: dados[4].value
    }

    return pessoa;
}

// Formata os dados obtidos do FORM
const formatarDados = () => {
    const pessoa = obterDadosForm()
    
    pessoa.nome = pessoa.nome.toUpperCase()
    pessoa.endereco = pessoa.endereco.toUpperCase()
    pessoa.email = pessoa.email.toLocaleLowerCase()

    return pessoa
}

// Salva os dados no LocalStorage
const salvarDados = () => {
    const pessoa = formatarDados()
    const pessoas = obterDadosLS()
    pessoas.push(pessoa)
    
    localStorage.setItem('pessoas', JSON.stringify(pessoas))

    window.location = './index.html'

}

// Pega os dados no LocalStorage
const obterDadosLS = () => {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || []
    return pessoas
}

// Renderiza a lista de pessoas no arquivo pessoas/index.html
const render = () => {
    // pega o elemento tbody id="tpessoas"
    const tpessoas = document.querySelector('#tpessoas')

    // Pega todas as pessoas cadastradas no LS
    const pessoas = obterDadosLS()

    pessoas.forEach((p, key) => {
        // cria o elemento <tr>
        const tr = document.createElement('tr')
        
        // cria o elemento <td> e o texto do elemento
        const tdId = document.createElement('td')
        const tdIdTxt = document.createTextNode(++key)

        const tdNome = document.createElement('td')
        const tdNomeTxt = document.createTextNode(p.nome)

        const tdTel = document.createElement('td')
        const tdTelTxt = document.createTextNode(p.endereco)
        
        const tdAc = document.createElement('td')
        const aEdit = document.createElement('a')
        aEdit.setAttribute('href', '#') // cria o atributo href="#"
        const aEditTxt = document.createTextNode('Editar')
        const aDelete = document.createElement('a')
        aDelete.setAttribute('href', '#') // cria o atributo href="#"
        const aDeleteTxt = document.createTextNode('Excluir')

        // Adiciona os textos aos elementos
        tdId.append(tdIdTxt)
        tdNome.append(tdNomeTxt)
        tdTel.append(tdTelTxt)
        aEdit.append(aEditTxt)
        aDelete.append(aDeleteTxt)
        tdAc.append(aEdit)
        tdAc.append(aDelete)

        // adiciona os elementos td ao tr
        tr.append(tdId)
        tr.append(tdNome)
        tr.append(tdTel)
        tr.append(tdAc)

        // adiciona o tr ao tbody id="tpessoas"
        tpessoas.append(tr)
    });
}