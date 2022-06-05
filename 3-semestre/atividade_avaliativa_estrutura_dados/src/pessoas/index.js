pessoa = {
  id: null,
  nome: null,
  endereco: null,
  telefone: null,
  email: null,
  dataNascimento: null
}
const limparTabela = (tabela) => {
  tabela.innerHTML = ""
}

const renderLista = () => {
  // pega o elemento tbody id="tpessoas"
  const tbpessoas = document.querySelector("#tpessoas");

  limparTabela(tbpessoas);

  // Pega todas as pessoas cadastradas no LS
  const pessoas = obterDadosPessoasLS();

  pessoas.forEach((pessoa) => {
    // cria o elemento <tr>
    const tr = document.createElement("tr");

    // cria o elemento <td> e o texto do elemento
    const tdId = document.createElement("td");
    const tdNome = document.createElement("td");
    const tdTelefone = document.createElement("td");
    const tdAcoes = document.createElement("td");
    const aEdit = document.createElement("a");
    const aDelete = document.createElement("a");

    // crio o conteúdo de cada <td>
    const tdIdTxt = document.createTextNode(pessoa.id);
    const tdNomeTxt = document.createTextNode(pessoa.nome);
    const tdTelefoneTxt = document.createTextNode(pessoa.telefone);
    const aEditTxt = document.createTextNode("Editar");
    const aDeleteTxt = document.createTextNode("Excluir");

    // crio o atributo atributos
    aEdit.setAttribute("href", "./edit.html?id=" + pessoa.id);
    aEdit.setAttribute("class", "btn btn-warning");
    aDelete.setAttribute("onclick", "excluirPessoaPorId(" + pessoa.id +")");
    aDelete.setAttribute("class", "btn btn-danger ms-3");

    // Adiciona os textos aos elementos
    tdId.append(tdIdTxt);
    tdNome.append(tdNomeTxt);
    tdTelefone.append(tdTelefoneTxt);
    aEdit.append(aEditTxt);
    aDelete.append(aDeleteTxt);
    tdAcoes.append(aEdit);
    tdAcoes.append(aDelete);

    // adiciona os elementos td ao tr
    tr.append(tdId);
    tr.append(tdNome);
    tr.append(tdTelefone);
    tr.append(tdAcoes);

    // adiciona o tr ao tbody id="tpessoas"
    tbpessoas.append(tr);
  });
};

// Pega os dados no LocalStorage
const obterDadosPessoasLS = () => {
  const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
  return pessoas;
};

const obterIdAtualLS = () => {
  const id = parseInt(localStorage.getItem("idPessoa")) || 0;
  return id;
};

// Obtem os dados digitados no FORM
const obterDadosForm = () => {
  const dados = document.getElementsByTagName("input");

  pessoa = {
    nome: dados[0].value,
    endereco: dados[1].value,
    telefone: dados[2].value,
    email: dados[3].value,
    dataNascimento: dados[4].value,
    id: dados[5].value,
  };

};

// Formata os dados obtidos do FORM
const formatarDados = () => {
  obterDadosForm();

  pessoa.nome = pessoa.nome.toUpperCase();
  pessoa.endereco = pessoa.endereco.toUpperCase();
  pessoa.email = pessoa.email.toLocaleLowerCase();

  return pessoa;
};

// Salva os dados no LocalStorage
const salvarDados = () => {
  const novaPessoa = formatarDados();
  let pessoas = obterDadosPessoasLS();

  if (novaPessoa.id) {
    pessoas = pessoas.map((p) => {  
      if ((p.id == novaPessoa.id)) {
        p = novaPessoa
      };
      return p;
    });

  } 
  else {
    novaPessoa.id = obterIdAtualLS();
  
    pessoas.push(novaPessoa);

    localStorage.setItem("idPessoa", obterIdAtualLS() + 1);
  }

  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  limparPessoa()
  window.location = "./index.html";
};

// salva os dados e renderiza lista ao excluir
const atualizarDados = (novaListaPessoas) => {
  localStorage.setItem("pessoas", JSON.stringify(novaListaPessoas));
  renderLista();
};

// Pega o id do usuario na url
const obterIdUrl = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  return id;
};

// pega os dados da pessoa pelo id
const pegarDadosPessoaPorId = () => {
  const pessoas = obterDadosPessoasLS();
  
  const id = obterIdUrl();
  const pessoa = pessoas.find((p) => p.id == id);

  return pessoa;
};

const excluirPessoaPorId = (id) => {
  const novaListaPessoas = obterDadosPessoasLS();
  const indexPessoa = novaListaPessoas.findIndex((p) =>  p.id == id);
  novaListaPessoas.splice(indexPessoa,1);

  atualizarDados(novaListaPessoas);
};

const renderForm = () => {
  const inputs = document.getElementsByTagName("input");
  const pessoa = pegarDadosPessoaPorId();

  inputs[0].value = pessoa.nome;
  inputs[1].value = pessoa.endereco;
  inputs[2].value = pessoa.telefone;
  inputs[3].value = pessoa.email;
  inputs[4].value = pessoa.dataNascimento;
  inputs[5].value = pessoa.id;
};

const limparPessoa = () => {
  pessoa = {
    id: null,
    nome: null,
    endereco: null,
    telefone: null,
    email: null,
    dataNascimento: null
  }
} 

