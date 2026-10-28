// --- LÓGICA DE TEMAS (CLARO / ESCURO) ---
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function initTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    updateThemeUI(true);
  } else {
    updateThemeUI(false);
  }
}

function updateThemeUI(isDark) {
  if (themeIcon) {
    if (isDark) {
      themeIcon.className = 'fa-solid fa-sun text-amber-300';
    } else {
      themeIcon.className = 'fa-solid fa-moon text-slate-600';
    }
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    updateThemeUI(isDark);
  });
}

// --- MÁSCARA E RESTRIÇÃO DO TELEFONE ---
function handlePhoneInput(e) {
  let input = e.target.value.replace(/\D/g, '');
  if (input.length > 11) {
    input = input.substring(0, 11);
  }

  if (input.length > 10) {
    e.target.value = input.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (input.length > 6) {
    e.target.value = input.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
  } else if (input.length > 2) {
    e.target.value = input.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  } else if (input.length > 0) {
    e.target.value = input.replace(/^(\d*)$/, '($1');
  } else {
    e.target.value = '';
  }
}

// --- MÓDULO CLIENTES ---
function carregarClientes() {
  const tbody = document.getElementById('listaClientes');
  if (!tbody) return;

  const dados = JSON.parse(localStorage.getItem('clientes')) || [];
  tbody.innerHTML = '';

  if (dados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400 text-xs">Nenhum cliente cadastrado.</td></tr>`;
    return;
  }

  dados.forEach((item, index) => {
    let tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/50 dark:hover:bg-pastel-dark-input/30 transition-colors';
    tr.innerHTML = `
      <td class="p-3 font-medium text-slate-800 dark:text-white">#${index + 1}</td>
      <td class="p-3 font-medium text-slate-800 dark:text-white">${item.nome}</td>
      <td class="p-3 text-slate-600 dark:text-slate-300">${item.email}</td>
      <td class="p-3 text-slate-600 dark:text-slate-300">${item.telefone}</td>
      <td class="p-3 text-center space-x-2">
        <a href="editar.html?id=${index}" class="text-pastel-blue-600 dark:text-pastel-blue-300 hover:underline p-1"><i class="fa-solid fa-pen-to-square"></i></a>
        <button onclick="deletarCliente(${index})" class="text-red-400 hover:text-red-600 p-1"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function salvarCliente(e) {
  e.preventDefault();
  const nome = document.getElementById('cliNome').value.trim();
  const email = document.getElementById('cliEmail').value.trim();
  const telefone = document.getElementById('cliTelefone').value.trim();

  let dados = JSON.parse(localStorage.getItem('clientes')) || [];
  dados.push({ nome, email, telefone });
  localStorage.setItem('clientes', JSON.stringify(dados));
  window.location.href = 'index.html';
}

function carregarEdicaoCliente() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id === null) return;

  const dados = JSON.parse(localStorage.getItem('clientes')) || [];
  const item = dados[id];
  if (item) {
    document.getElementById('cliIndex').value = id;
    document.getElementById('cliNome').value = item.nome;
    document.getElementById('cliEmail').value = item.email;
    document.getElementById('cliTelefone').value = item.telefone;
  }
}

function atualizarCliente(e) {
  e.preventDefault();
  const index = document.getElementById('cliIndex').value;
  const nome = document.getElementById('cliNome').value.trim();
  const email = document.getElementById('cliEmail').value.trim();
  const telefone = document.getElementById('cliTelefone').value.trim();

  let dados = JSON.parse(localStorage.getItem('clientes')) || [];
  if (dados[index]) {
    dados[index] = { nome, email, telefone };
    localStorage.setItem('clientes', JSON.stringify(dados));
  }
  window.location.href = 'index.html';
}

function deletarCliente(index) {
  let dados = JSON.parse(localStorage.getItem('clientes')) || [];
  dados.splice(index, 1);
  localStorage.setItem('clientes', JSON.stringify(dados));
  carregarClientes();
}

// --- MÓDULO FORNECEDORES ---
function carregarFornecedores() {
  const tbody = document.getElementById('listaFornecedores');
  if (!tbody) return;

  const dados = JSON.parse(localStorage.getItem('fornecedores')) || [];
  tbody.innerHTML = '';

  if (dados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400 text-xs">Nenhum fornecedor cadastrado.</td></tr>`;
    return;
  }

  dados.forEach((item, index) => {
    let tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/50 dark:hover:bg-pastel-dark-input/30 transition-colors';
    tr.innerHTML = `
      <td class="p-3 font-medium text-slate-800 dark:text-white">#${index + 1}</td>
      <td class="p-3 font-medium text-slate-800 dark:text-white">${item.nome}</td>
      <td class="p-3 text-slate-600 dark:text-slate-300">${item.cnpj}</td>
      <td class="p-3 text-slate-600 dark:text-slate-300">${item.telefone}</td>
      <td class="p-3 text-center space-x-2">
        <a href="editar.html?id=${index}" class="text-pastel-blue-600 dark:text-pastel-blue-300 hover:underline p-1"><i class="fa-solid fa-pen-to-square"></i></a>
        <button onclick="deletarFornecedor(${index})" class="text-red-400 hover:text-red-600 p-1"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function salvarFornecedor(e) {
  e.preventDefault();
  const nome = document.getElementById('forNome').value.trim();
  const cnpj = document.getElementById('forCnpj').value.trim();
  const telefone = document.getElementById('forTelefone').value.trim();

  let dados = JSON.parse(localStorage.getItem('fornecedores')) || [];
  dados.push({ nome, cnpj, telefone });
  localStorage.setItem('fornecedores', JSON.stringify(dados));
  window.location.href = 'index.html';
}

function carregarEdicaoFornecedor() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id === null) return;

  const dados = JSON.parse(localStorage.getItem('fornecedores')) || [];
  const item = dados[id];
  if (item) {
    document.getElementById('forIndex').value = id;
    document.getElementById('forNome').value = item.nome;
    document.getElementById('forCnpj').value = item.cnpj;
    document.getElementById('forTelefone').value = item.telefone;
  }
}

function atualizarFornecedor(e) {
  e.preventDefault();
  const index = document.getElementById('forIndex').value;
  const nome = document.getElementById('forNome').value.trim();
  const cnpj = document.getElementById('forCnpj').value.trim();
  const telefone = document.getElementById('forTelefone').value.trim();

  let dados = JSON.parse(localStorage.getItem('fornecedores')) || [];
  if (dados[index]) {
    dados[index] = { nome, cnpj, telefone };
    localStorage.setItem('fornecedores', JSON.stringify(dados));
  }
  window.location.href = 'index.html';
}

function deletarFornecedor(index) {
  let dados = JSON.parse(localStorage.getItem('fornecedores')) || [];
  dados.splice(index, 1);
  localStorage.setItem('fornecedores', JSON.stringify(dados));
  carregarFornecedores();
}

// --- MÓDULO PRODUTOS ---
function carregarProdutos() {
  const tbody = document.getElementById('listaProdutos');
  if (!tbody) return;

  const dados = JSON.parse(localStorage.getItem('produtos')) || [];
  tbody.innerHTML = '';

  if (dados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400 text-xs">Nenhum produto cadastrado.</td></tr>`;
    return;
  }

  dados.forEach((item, index) => {
    let tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/50 dark:hover:bg-pastel-dark-input/30 transition-colors';
    tr.innerHTML = `
      <td class="p-3 font-medium text-slate-800 dark:text-white">#${index + 1}</td>
      <td class="p-3 font-medium text-slate-800 dark:text-white">${item.nome}</td>
      <td class="p-3 text-slate-600 dark:text-slate-300">R$ ${parseFloat(item.preco).toFixed(2)}</td>
      <td class="p-3 text-slate-600 dark:text-slate-300">${item.estoque} un.</td>
      <td class="p-3 text-center space-x-2">
        <a href="editar.html?id=${index}" class="text-pastel-blue-600 dark:text-pastel-blue-300 hover:underline p-1"><i class="fa-solid fa-pen-to-square"></i></a>
        <button onclick="deletarProduto(${index})" class="text-red-400 hover:text-red-600 p-1"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function salvarProduto(e) {
  e.preventDefault();
  const nome = document.getElementById('prodNome').value.trim();
  const preco = document.getElementById('prodPreco').value;
  const estoque = document.getElementById('prodEstoque').value;

  let dados = JSON.parse(localStorage.getItem('produtos')) || [];
  dados.push({ nome, preco, estoque });
  localStorage.setItem('produtos', JSON.stringify(dados));
  window.location.href = 'index.html';
}

function carregarEdicaoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id === null) return;

  const dados = JSON.parse(localStorage.getItem('produtos')) || [];
  const item = dados[id];
  if (item) {
    document.getElementById('prodIndex').value = id;
    document.getElementById('prodNome').value = item.nome;
    document.getElementById('prodPreco').value = item.preco;
    document.getElementById('prodEstoque').value = item.estoque;
  }
}

function atualizarProduto(e) {
  e.preventDefault();
  const index = document.getElementById('prodIndex').value;
  const nome = document.getElementById('prodNome').value.trim();
  const preco = document.getElementById('prodPreco').value;
  const estoque = document.getElementById('prodEstoque').value;

  let dados = JSON.parse(localStorage.getItem('produtos')) || [];
  if (dados[index]) {
    dados[index] = { nome, preco, estoque };
    localStorage.setItem('produtos', JSON.stringify(dados));
  }
  window.location.href = 'index.html';
}

function deletarProduto(index) {
  let dados = JSON.parse(localStorage.getItem('produtos')) || [];
  dados.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(dados));
  carregarProdutos();
}

// Inicializações automáticas
initTheme();
carregarClientes();
carregarEdicaoCliente();
carregarFornecedores();
carregarEdicaoFornecedor();
carregarProdutos();
carregarEdicaoProduto();