const express = require("express");
const router = express.Router();

// ========================================
// DADOS
// ========================================

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

router.get("/", (req, res) => {
    res.render("categorias/index", {
        categorias: categorias
    });
});

router.get("/cadastro", (req, res) => {
    res.render("categorias/form-cadastro");
});
 router.post("/", (req, res) => {
    const { nome, descricao } = req.body;
    const novaCategoria = {
        id: categorias.length + 1,
        nome: nome,
        descricao: descricao
    };
    categorias.push(novaCategoria);
    res.redirect("/categorias");
 });

 //excluir
router.get("/excluir/:id", (req, res) => {
  let id = parseInt(req.params.id);
  categorias = categorias .filter(c => c.id !== id);
  res.redirect("/categorias");
});

  //editar form - Get
  router.get("/editar/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let categoria = categorias.find(c => c.id ===id );

    if(!categoria){
      return res.redirect("/categorias");
    }

    res.render("categorias/editar", {categoria});
  });

  //editar efetiva - Post
  

module.exports = router;

