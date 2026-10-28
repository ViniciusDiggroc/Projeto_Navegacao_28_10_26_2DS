const express = require("express");
const router = express.Router();

let produtos = [
  {
    id: 1,
    nome: "Notebook Gamer",
    descricao: "Notebook para trabalho e estudo",
    preco: 4999.9,
    estoque: 12
  },
  {
    id: 2,
    nome: "Teclado Mecânico",
    descricao: "Teclado com switches azuis",
    preco: 399.9,
    estoque: 25
  },
  {
    id: 3,
    nome: "Mouse Sem Fio",
    descricao: "Mouse ergonômico e leve",
    preco: 149.9,
    estoque: 30
  }
];

const sanitizeText = (value) => (typeof value === "string" ? value.trim() : "");

router.get("/", (req, res) => {
  res.render("produto/index", {
    produtos,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.get("/cadastro", (req, res) => {
  res.render("produto/form-produto", {
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/", (req, res) => {
  const nome = sanitizeText(req.body.nome);
  const descricao = sanitizeText(req.body.descricao);
  const preco = Number(req.body.preco);
  const estoque = Number(req.body.estoque);

  if (!nome || nome.length < 2) {
    return res.redirect("/produto/cadastro?error=Informe%20um%20nome%20válido.");
  }

  if (!descricao || descricao.length < 3) {
    return res.redirect("/produto/cadastro?error=Informe%20uma%20descri%C3%A7%C3%A3o%20válida.");
  }

  if (!Number.isFinite(preco) || preco <= 0) {
    return res.redirect("/produto/cadastro?error=Informe%20um%20pre%C3%A7o%20válido.");
  }

  if (!Number.isInteger(estoque) || estoque < 0) {
    return res.redirect("/produto/cadastro?error=Informe%20uma%20quantidade%20válida.");
  }

  produtos.push({
    id: produtos.length ? Math.max(...produtos.map((produto) => produto.id)) + 1 : 1,
    nome,
    descricao,
    preco,
    estoque
  });

  res.redirect("/produto?success=Produto%20cadastrado%20com%20sucesso!");
});

router.get("/excluir/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const produtoExiste = produtos.some((produto) => produto.id === id);

  if (!produtoExiste) {
    return res.redirect("/produto?error=Produto%20n%C3%A3o%20encontrado.");
  }

  produtos = produtos.filter((produto) => produto.id !== id);
  return res.redirect("/produto?success=Produto%20removido%20com%20sucesso!");
});

router.get("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return res.redirect("/produto?error=Produto%20n%C3%A3o%20encontrado.");
  }

  res.render("produto/editar", {
    produto,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nome = sanitizeText(req.body.nome);
  const descricao = sanitizeText(req.body.descricao);
  const preco = Number(req.body.preco);
  const estoque = Number(req.body.estoque);
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return res.redirect("/produto?error=Produto%20n%C3%A3o%20encontrado.");
  }

  if (!nome || nome.length < 2) {
    return res.redirect(`/produto/editar/${id}?error=Informe%20um%20nome%20válido.`);
  }

  if (!descricao || descricao.length < 3) {
    return res.redirect(`/produto/editar/${id}?error=Informe%20uma%20descri%C3%A7%C3%A3o%20válida.`);
  }

  if (!Number.isFinite(preco) || preco <= 0) {
    return res.redirect(`/produto/editar/${id}?error=Informe%20um%20pre%C3%A7o%20válido.`);
  }

  if (!Number.isInteger(estoque) || estoque < 0) {
    return res.redirect(`/produto/editar/${id}?error=Informe%20uma%20quantidade%20válida.`);
  }

  produto.nome = nome;
  produto.descricao = descricao;
  produto.preco = preco;
  produto.estoque = estoque;

  res.redirect("/produto?success=Produto%20atualizado%20com%20sucesso!");
});

module.exports = router;

