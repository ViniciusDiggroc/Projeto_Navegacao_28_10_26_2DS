const express = require("express");
const router = express.Router();

let clientes = [
  { id: 1, nome: "Cliente exemplo", email: "cliente@exemplo.com", telefone: "(11) 99999-9999" }
];

const sanitizeText = (value) => (typeof value === "string" ? value.trim() : "");

router.get("/", (req, res) => {
  res.render("cliente/index", {
    clientes,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.get("/cadastro", (req, res) => {
  res.render("cliente/form-cliente", {
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/", (req, res) => {
  const nome = sanitizeText(req.body.nome);
  const email = sanitizeText(req.body.email);
  const telefone = sanitizeText(req.body.telefone);

  if (!nome || nome.length < 2) {
    return res.redirect("/cliente/cadastro?error=Informe%20um%20nome%20válido.");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.redirect("/cliente/cadastro?error=Informe%20um%20e-mail%20válido.");
  }

  if (!telefone || telefone.length < 10) {
    return res.redirect("/cliente/cadastro?error=Informe%20um%20telefone%20válido.");
  }

  clientes.push({
    id: clientes.length ? Math.max(...clientes.map((cliente) => cliente.id)) + 1 : 1,
    nome,
    email,
    telefone
  });

  res.redirect("/cliente?success=Cliente%20cadastrado%20com%20sucesso!");
});

router.get("/editar/:id", (req, res) => {
  const id = Number(req.params.id);
  const cliente = clientes.find((item) => item.id === id);

  if (!cliente) {
    return res.redirect("/cliente?error=Cliente%20n%C3%A3o%20encontrado.");
  }

  res.render("cliente/editar", {
    cliente,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/editar/:id", (req, res) => {
  const id = Number(req.params.id);
  const nome = sanitizeText(req.body.nome);
  const email = sanitizeText(req.body.email);
  const telefone = sanitizeText(req.body.telefone);
  const cliente = clientes.find((item) => item.id === id);

  if (!cliente) {
    return res.redirect("/cliente?error=Cliente%20n%C3%A3o%20encontrado.");
  }

  if (!nome || nome.length < 2) {
    return res.redirect(`/cliente/editar/${id}?error=Informe%20um%20nome%20válido.`);
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.redirect(`/cliente/editar/${id}?error=Informe%20um%20e-mail%20válido.`);
  }

  if (!telefone || telefone.length < 10) {
    return res.redirect(`/cliente/editar/${id}?error=Informe%20um%20telefone%20válido.`);
  }

  cliente.nome = nome;
  cliente.email = email;
  cliente.telefone = telefone;

  res.redirect("/cliente?success=Cliente%20atualizado%20com%20sucesso!");
});

router.get("/excluir/:id", (req, res) => {
  const id = Number(req.params.id);
  const clienteExiste = clientes.some((cliente) => cliente.id === id);

  if (!clienteExiste) {
    return res.redirect("/cliente?error=Cliente%20n%C3%A3o%20encontrado.");
  }

  clientes = clientes.filter((cliente) => cliente.id !== id);
  return res.redirect("/cliente?success=Cliente%20removido%20com%20sucesso!");
});

module.exports = router;