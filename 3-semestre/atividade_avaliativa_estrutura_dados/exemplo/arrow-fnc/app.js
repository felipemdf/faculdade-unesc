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

const formatarDados = () => {
    const pessoa = obterDadosForm()
    
    pessoa.nome = pessoa.nome.toUpperCase()
    pessoa.endereco = pessoa.endereco.toUpperCase()
    pessoa.email = pessoa.email.toLocaleLowerCase()

    return pessoa
}

const salvarDados = () => {
    const pessoa = formatarDados()
    const pessoas = obterDadosLS()
    pessoas.push(pessoa)
    
    localStorage.setItem('pessoas', JSON.stringify(pessoas))

}

const obterDadosLS = () => {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || []
    return pessoas
}