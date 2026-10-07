const express = require("express");
const path = require("path");
const app = express();

// ========================================
// CONFIGURAÇÃO DO EJS
// ========================================
app.set("view engine", "ejs");
app.set(
    "views",
    path.join(__dirname, "views")
);

// ========================================
// MIDDLEWARES
// ========================================
// Permite receber dados enviados por formulário
app.use(express.urlencoded({ extended: true }));

// Permite receber requisições com JSON
app.use(express.json());

// ========================================
// ROTAS
// ========================================
const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);

const produtoRoutes = require("./routes/produtoRoutes");
app.use("/produto", produtoRoutes);

const clienteRoutes = require("./routes/clienteRoutes");
app.use("/cliente", clienteRoutes);

const fornecedorRoutes = require("./routes/fornecedorRoutes");
app.use("/fornecedor", fornecedorRoutes);


// ========================================
// ROTA PRINCIPAL
// ========================================
app.get("/", (req, res) => {
    res.render("index");
});

// ========================================
// SERVIDOR
// ========================================
app.listen(3000, () => {

    console.log(
        "Servidor rodando em http://localhost:3000"
    );

});