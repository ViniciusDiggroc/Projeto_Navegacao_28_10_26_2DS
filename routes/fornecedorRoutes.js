const express = require("express");
const router = express.Router();

let fornecedores = [
  { id: 1, nome: "Fornecedor exemplo", descricao: "Cadastro de exemplo" }
];

router.get("/", (req, res) => {
  res.render("fornecedor/index", { fornecedores });
});

router.get("/cadastro", (req, res) => {
  res.render("fornecedor/form-fornecedor");
});

router.post("/", (req, res) => {
  const { nome, descricao } = req.body;
  fornecedores.push({
    id: fornecedores.length ? Math.max(...fornecedores.map(fornecedor => fornecedor.id)) + 1 : 1,
    nome,
    descricao
  });
  res.redirect("/fornecedor");
});

router.get("/editar/:id", (req, res) => {
  const fornecedor = fornecedores.find(item => item.id === Number(req.params.id));
  if (!fornecedor) return res.redirect("/fornecedor");
  res.render("fornecedor/editar", { fornecedor });
});

router.post("/editar/:id", (req, res) => {
  const fornecedor = fornecedores.find(item => item.id === Number(req.params.id));
  if (fornecedor) {
    fornecedor.nome = req.body.nome;
    fornecedor.descricao = req.body.descricao;
  }
  res.redirect("/fornecedor");
});

router.get("/excluir/:id", (req, res) => {
  fornecedores = fornecedores.filter(fornecedor => fornecedor.id !== Number(req.params.id));
  res.redirect("/fornecedor");
});

module.exports = router;