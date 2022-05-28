const render = () => {
  // pega o elemento tbody id="tpessoas"
  const tbpessoas = document.querySelector("#tpessoas");

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
    const tdTelefoneTxt = document.createTextNode(pessoa.endereco);
    const aEditTxt = document.createTextNode("Editar");
    const aDeleteTxt = document.createTextNode("Excluir");

    // crio o atributo href="#"
    aEdit.setAttribute("href", "#");
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
  };
  console.log(pessoa);
  return pessoa;
};

// Formata os dados obtidos do FORM
const formatarDados = () => {
  const pessoa = obterDadosForm();

  pessoa.nome = pessoa.nome.toUpperCase();
  pessoa.endereco = pessoa.endereco.toUpperCase();
  pessoa.email = pessoa.email.toLocaleLowerCase();
  pessoa.id = obterProximoIdLS();

  return pessoa;
};

// Salva os dados no LocalStorage
const salvarDados = () => {
  const pessoa = formatarDados();
  const pessoas = obterDadosPessoasLS();

  pessoas.push(pessoa);

  localStorage.setItem("pessoas", JSON.stringify(pessoas));
  localStorage.setItem("id", ++pessoa.id);

  window.location = "./index.html";
};
