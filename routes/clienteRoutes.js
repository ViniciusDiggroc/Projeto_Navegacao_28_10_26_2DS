const express = require("express");
const router = express.Router();

let clientes = [
  { id: 1, nome: "Cliente exemplo", descricao: "Cadastro de exemplo" }
];

router.get("/", (req, res) => {
  res.render("cliente/index", { clientes });
});

router.get("/cadastro", (req, res) => {
  res.render("cliente/form-cliente");
});

router.post("/", (req, res) => {
  const { nome, descricao } = req.body;
  clientes.push({
    id: clientes.length ? Math.max(...clientes.map(cliente => cliente.id)) + 1 : 1,
    nome,
    descricao
  });
  res.redirect("/cliente");
});

router.get("/editar/:id", (req, res) => {
  const cliente = clientes.find(item => item.id === Number(req.params.id));
  if (!cliente) return res.redirect("/cliente");
  res.render("cliente/editar", { cliente });
});

router.post("/editar/:id", (req, res) => {
  const cliente = clientes.find(item => item.id === Number(req.params.id));
  if (cliente) {
    cliente.nome = req.body.nome;
    cliente.descricao = req.body.descricao;
  }
  res.redirect("/cliente");
});

router.get("/excluir/:id", (req, res) => {
  clientes = clientes.filter(cliente => cliente.id !== Number(req.params.id));
  res.redirect("/cliente");
});

module.exports = router;