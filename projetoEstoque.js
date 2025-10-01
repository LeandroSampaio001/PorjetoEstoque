"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = exports.Saida = exports.Entrada = exports.Movimentacao = exports.Produto = void 0;
// --- CLASSE PRODUTO ---
var Produto = /** @class */ (function () {
    function Produto(id, nome, preco, quantidade) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }
    //Encapsulamento get
    Produto.prototype.getId = function () { return this.id; };
    Produto.prototype.getNome = function () { return this.nome; };
    Produto.prototype.getPreco = function () { return this.preco; };
    Produto.prototype.getQuantidade = function () { return this.quantidade; };
    //Encapsulamento set
    Produto.prototype.setPreco = function (novoPreco) {
        if (novoPreco > 0) {
            this.preco = novoPreco;
        }
    };
    Produto.prototype.adicionarEstoque = function (qtde) {
        if (qtde > 0) {
            this.quantidade += qtde;
            console.log("Adi\u00E7\u00E3o de ".concat(qtde, " unidade(s) do produto '").concat(this.nome, "' registrada com sucesso. Nova quantidade: ").concat(this.quantidade));
        }
        else {
            console.log("Erro: O valor para adicionar deve ser um número positivo.");
        }
    };
    // Aqui remove do estoque emitindo alertas de baixo estoque 
    Produto.prototype.removerEstoque = function (qtde) {
        if (qtde > 0 && qtde <= this.quantidade) {
            //Ação de remoção
            this.quantidade -= qtde;
            console.log("Sa\u00EDda de ".concat(qtde, " unidade(s) do produto '").concat(this.nome, "' registrada com sucesso. Nova quantidade: ").concat(this.quantidade));
            //Após a remoção, verifico o novo nível do estoque
            if (this.quantidade <= 5 && this.quantidade > 0) {
                //Se o estoque estiver baixo, emitimos o alerta
                console.log(">> ALERTA: Estoque baixo para o produto '".concat(this.nome, "'. Quantidade restante: ").concat(this.quantidade, ". Considere fazer reposi\u00E7\u00E3o."));
            }
            else if (this.quantidade === 0) {
                console.log(">> ALERTA: Estoque do produto '".concat(this.nome, "' ZERADO."));
            }
            return true; // Avisa que a operação deu certo
        }
        else {
            console.log("Erro: N\u00E3o foi poss\u00EDvel realizar a remo\u00E7\u00E3o para o produto '".concat(this.nome, "'. Valor inv\u00E1lido ou estoque insuficiente."));
            return false; // Avisa que a operação falhou
        }
    };
    return Produto;
}());
exports.Produto = Produto;
var Movimentacao = /** @class */ (function () {
    function Movimentacao(produto, quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
        this.data = new Date();
    }
    return Movimentacao;
}());
exports.Movimentacao = Movimentacao;
var Entrada = /** @class */ (function (_super) {
    __extends(Entrada, _super);
    function Entrada(produto, quantidade) {
        return _super.call(this, produto, quantidade) || this;
    }
    return Entrada;
}(Movimentacao));
exports.Entrada = Entrada;
var Saida = /** @class */ (function (_super) {
    __extends(Saida, _super);
    function Saida(produto, quantidade) {
        return _super.call(this, produto, quantidade) || this;
    }
    return Saida;
}(Movimentacao));
exports.Saida = Saida;
// --- CLASSE ESTOQUE ---
// Essa classe trabalha como se fosse o gerente do estoque.
var Estoque = /** @class */ (function () {
    function Estoque() {
        this.produtos = [];
        this.movimentacoes = [];
    }
    Estoque.prototype.cadastrarProduto = function (id, nome, preco, quantidade) {
        var produtoExistente = this.produtos.find(function (p) { return p.getId() === id; });
        if (produtoExistente) {
            console.log("Erro: Produto com o ID '".concat(id, "' j\u00E1 est\u00E1 cadastrado."));
            return;
        }
        var novoProduto = new Produto(id, nome, preco, quantidade);
        this.produtos.push(novoProduto);
        console.log("Produto '".concat(nome, "' (ID: ").concat(id, ") cadastrado com sucesso!"));
    };
    Estoque.prototype.registrarEntrada = function (idProduto, qtde) {
        var produto = this.produtos.find(function (p) { return p.getId() === idProduto; });
        if (!produto) {
            console.log("Erro: Produto com o ID '".concat(idProduto, "' n\u00E3o encontrado."));
            return;
        }
        produto.adicionarEstoque(qtde);
        var novaEntrada = new Entrada(produto, qtde);
        this.movimentacoes.push(novaEntrada);
        console.log("Status do Estoque: Entrada do produto '".concat(produto.getNome(), "' registrada."));
    };
    Estoque.prototype.registrarSaida = function (idProduto, qtde) {
        var produto = this.produtos.find(function (p) { return p.getId() === idProduto; });
        if (!produto) {
            console.log("Erro de Sa\u00EDda: Produto com o ID '".concat(idProduto, "' n\u00E3o encontrado."));
            return;
        }
        var sucessoNaRemocao = produto.removerEstoque(qtde);
        if (sucessoNaRemocao) {
            var novaSaida = new Saida(produto, qtde);
            this.movimentacoes.push(novaSaida);
            console.log("Status do Estoque: Sa\u00EDda do produto '".concat(produto.getNome(), "' registrada."));
        }
        else {
            console.log("Status do Estoque: A movimenta\u00E7\u00E3o de sa\u00EDda n\u00E3o foi registrada.");
        }
    };
    //Aqui é onde os relatórios são gerados
    Estoque.prototype.gerarRelatorioEstoqueAtual = function () {
        console.log("\n--- Relatório de Estoque Atual ---");
        if (this.produtos.length === 0) {
            console.log(">> Nenhum produto cadastrado no estoque.");
            console.log("------------------------------------");
            return;
        }
        for (var _i = 0, _a = this.produtos; _i < _a.length; _i++) {
            var produto = _a[_i];
            console.log("ID: ".concat(produto.getId(), " | ") +
                "Nome: ".concat(produto.getNome(), " | ") +
                "Pre\u00E7o: R$ ".concat(produto.getPreco().toFixed(2), " | ") +
                "Qtde: ".concat(produto.getQuantidade()));
        }
        console.log("------------------------------------");
    };
    //Relatorio de Histórico
    Estoque.prototype.gerarRelatorioHistorico = function () {
        console.log("\n--- Relatório de Histórico de Movimentações ---");
        if (this.movimentacoes.length === 0) {
            console.log(">> Nenhuma movimentação registrada.");
            console.log("---------------------------------------------");
            return;
        }
        for (var _i = 0, _a = this.movimentacoes; _i < _a.length; _i++) {
            var mov = _a[_i];
            //Aqui Polimorfismo (instanceof)
            var tipoMovimentacao = mov instanceof Entrada ? "ENTRADA" : "SAÍDA";
            console.log("[".concat(tipoMovimentacao, "] - ") +
                "Data: ".concat(mov.data.toLocaleString('pt-BR'), " | ") +
                "Produto: ".concat(mov.produto.getNome(), " | ") +
                "Qtde: ".concat(mov.quantidade));
        }
        console.log("---------------------------------------------");
    };
    return Estoque;
}());
exports.Estoque = Estoque;
// ========================================================================
//A EXECUÇÃO (CÓDIGO PRINCIPAL / MENU)
// ========================================================================
/*console.log(">> Iniciando Sistema de Monitoramento de Estoque <<");
const estoque = new Estoque();

while (true) {
    console.log("\n===== MENU PRINCIPAL =====");
    console.log("1. Cadastrar Produto");
    console.log("2. Registrar Entrada");
    console.log("3. Registrar Saída");
    console.log("4. Gerar Relatório");
    console.log("5. Sair");
    console.log("==========================");

    const opcao = readlineSync.question("Escolha uma opcao: ");

    switch (opcao) {
        case '1': {
            console.log("\n-- Cadastrar Novo Produto --");
            const id = readlineSync.question("ID do produto: ");
            const nome = readlineSync.question("Nome do produto: ");
            const preco = parseFloat(readlineSync.question("Preco do produto: "));
            const quantidade = parseInt(readlineSync.question("Quantidade inicial: "));
            estoque.cadastrarProduto(id, nome, preco, quantidade);
            break;
        }
        case '2': {
            console.log("\n-- Registrar Entrada --");
            const idEntrada = readlineSync.question("ID do produto: ");
            const qtdeEntrada = parseInt(readlineSync.question("Quantidade de entrada: "));
            estoque.registrarEntrada(idEntrada, qtdeEntrada);
            break;
        }
        case '3': {
            console.log("\n-- Registrar Saída --");
            const idSaida = readlineSync.question("ID do produto: ");
            const qtdeSaida = parseInt(readlineSync.question("Quantidade de saida: "));
            estoque.registrarSaida(idSaida, qtdeSaida);
            break;
        }
        case '4': {
            console.log("\n-- Sub-menu de Relatórios --");
            console.log("1. Relatório de Estoque Atual");
            console.log("2. Histórico de Movimentações");
            const opcaoRelatorio = readlineSync.question("Escolha uma opcao de relatorio: ");
            switch(opcaoRelatorio) {
                case '1':
                    estoque.gerarRelatorioEstoqueAtual();
                    break;
                case '2':
                    estoque.gerarRelatorioHistorico();
                    break;
                default:
                    console.log("Opção de relatório inválida.");
            }
            break;
        }
        case '5': {
            console.log("Saindo do sistema...");
            process.exit(0);
        }
        default:
            console.log("Opção inválida. Tente novamente.");
    }
}*/ 
