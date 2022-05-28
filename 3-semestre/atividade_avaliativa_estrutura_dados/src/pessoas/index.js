let pessoas = [];

const renderLista = () => {
  // pega o elemento tbody id="tpessoas"
  const tbpessoas = document.querySelector("#tpessoas");

  // Pega todas as pessoas cadastradas no LS
  pessoas = obterDadosPessoasLS();

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

    // crio o atributo href="#"
    aEdit.setAttribute("href", "./edit.html?id=" + pessoa.id);
    aDelete.setAttribute("href", "#");

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

const obterProximoIdLS = () => {
  const id = parseInt(localStorage.getItem("id")) || 0;
  return id;
};

// Obtem os dados digitados no FORM
const obterDadosForm = () => {
  const dados = document.getElementsByTagName("input");
  const pessoa = {
    nome: dados[0].value,
    endereco: dados[1].value,
    telefone: dados[2].value,
    email: dados[3].value,
    dataNascimento: dados[4].value,
    id: dados[5].value,
  };
 
  return pessoa;
};

// Formata os dados obtidos do FORM
const formatarDados = () => {
  const pessoa = obterDadosForm();

  pessoa.nome = pessoa.nome.toUpperCase();
  pessoa.endereco = pessoa.endereco.toUpperCase();
  pessoa.email = pessoa.email.toLocaleLowerCase();

  return pessoa;
};


// Salva os dados no LocalStorage
const salvarDados = () => {
  const novaPessoa = formatarDados();

  if (novaPessoa.id) {
    pessoas = pessoas.map((p) => {  
      if ((p.id == novaPessoa.id)) {
        p = novaPessoa
      };
      return p;
    });

  } 
  else {
    novaPessoa.id = obterProximoIdLS();
    pessoas.push(novaPessoa);
    localStorage.setItem("id", obterProximoIdLS() + 1);
  }

  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  window.location = "./index.html";
};

// Pega o id do usuario na url
const obterIdUrl = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  return id;
};

// pega os dados da pessoa pelo id
const pegarDadosPessoaPorId = () => {
  const id = obterIdUrl();
  const pessoa = pessoas.find((p) => p.id == id);

  return pessoa;
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
