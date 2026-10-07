const express = require("express");
const path = require("path");

const app = express();

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);

const produtoRoutes = require("./routes/produtoRoutes");
app.use("/produto", produtoRoutes);

const clienteRoutes = require("./routes/clienteRoutes");
app.use("/cliente", clienteRoutes);

const fornecedorRoutes = require("./routes/fornecedorRoutes");
app.use("/fornecedor", fornecedorRoutes);

// Rota principal
app.get("/", (req, res) => {
    res.render("index");
});

// Servidor compatível com o Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});