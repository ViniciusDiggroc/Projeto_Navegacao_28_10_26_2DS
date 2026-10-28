const express = require("express");
const router = express.Router();

let categorias = [
  {
    id: 1,
    nome: "Informática",
    descricao: "Produtos e serviços de informática"
  },
  {
    id: 2,
    nome: "Eletrônicos",
    descricao: "Produtos eletrônicos"
  },
  {
    id: 3,
    nome: "Roupas",
    descricao: "Roupas e acessórios"
  }
];

const sanitizeText = (value) => (typeof value === "string" ? value.trim() : "");

router.get("/", (req, res) => {
  res.render("categorias/index", {
    categorias,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.get("/cadastro", (req, res) => {
  res.render("categorias/form-cadastro", {
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/", (req, res) => {
  const nome = sanitizeText(req.body.nome);
  const descricao = sanitizeText(req.body.descricao);

  if (!nome || nome.length < 2) {
    return res.redirect("/categorias/cadastro?error=Informe%20um%20nome%20válido.");
  }

  if (!descricao || descricao.length < 3) {
    return res.redirect("/categorias/cadastro?error=Informe%20uma%20descri%C3%A7%C3%A3o%20válida.");
  }

  categorias.push({
    id: categorias.length ? Math.max(...categorias.map((categoria) => categoria.id)) + 1 : 1,
    nome,
    descricao
  });

  res.redirect("/categorias?success=Categoria%20cadastrada%20com%20sucesso!");
});

router.get("/excluir/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const categoriaExiste = categorias.some((categoria) => categoria.id === id);

  if (!categoriaExiste) {
    return res.redirect("/categorias?error=Categoria%20n%C3%A3o%20encontrada.");
  }

  categorias = categorias.filter((categoria) => categoria.id !== id);
  return res.redirect("/categorias?success=Categoria%20removida%20com%20sucesso!");
});

router.get("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const categoria = categorias.find((item) => item.id === id);

  if (!categoria) {
    return res.redirect("/categorias?error=Categoria%20n%C3%A3o%20encontrada.");
  }

  res.render("categorias/editar", {
    categoria,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nome = sanitizeText(req.body.nome);
  const descricao = sanitizeText(req.body.descricao);
  const categoria = categorias.find((item) => item.id === id);

  if (!categoria) {
    return res.redirect("/categorias?error=Categoria%20n%C3%A3o%20encontrada.");
  }

  if (!nome || nome.length < 2) {
    return res.redirect(`/categorias/editar/${id}?error=Informe%20um%20nome%20válido.`);
  }

  if (!descricao || descricao.length < 3) {
    return res.redirect(`/categorias/editar/${id}?error=Informe%20uma%20descri%C3%A7%C3%A3o%20válida.`);
  }

  categoria.nome = nome;
  categoria.descricao = descricao;

  res.redirect("/categorias?success=Categoria%20atualizada%20com%20sucesso!");
});

module.exports = router;

