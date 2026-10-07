const express = require("express");
const router = express.Router();

// ========================================
// DADOS
// ========================================

let produtos = [
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
  res.render("produto/index", {
        produtos: produtos
    });
});

router.get("/cadastro", (req, res) => {
  res.render("produto/form-produto");
});
 router.post("/", (req, res) => {
    const { nome, descricao } = req.body;
    const novoProduto = {
      id: produtos.length ? Math.max(...produtos.map(produto => produto.id)) + 1 : 1,
        nome: nome,
        descricao: descricao
    };
    produtos.push(novoProduto);
    res.redirect("/produto");
 });

 //excluir
router.get("/excluir/:id", (req, res) => {
  let id = parseInt(req.params.id);
  produtos = produtos.filter(produto => produto.id !== id);
  res.redirect("/produto");
});

  //editar form - Get
  router.get("/editar/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let produto = produtos.find(item => item.id === id);

    if(!produto){
      return res.redirect("/produto");
    }

    res.render("produto/editar", {produto});
  });

  //editar efetiva - Post
router.post("/editar/:id", (req, res) => {
  const produto = produtos.find(item => item.id === Number(req.params.id));
  if (produto) {
    produto.nome = req.body.nome;
    produto.descricao = req.body.descricao;
  }
  res.redirect("/produto");
});

module.exports = router;

