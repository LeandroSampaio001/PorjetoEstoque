import readlineSync = require('readline-sync');

// --- CLASSE PRODUTO ---
export class Produto {
    private id: string;
    private nome: string;
    private preco: number;
    private quantidade: number;

    constructor(id: string, nome: string, preco: number, quantidade: number) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }
    //Encapsulamento get
    public getId(): string { return this.id; }
    public getNome(): string { return this.nome; }
    public getPreco(): number { return this.preco; }
    public getQuantidade(): number { return this.quantidade; }
    //Encapsulamento set
    public setPreco(novoPreco: number): void {
        if (novoPreco > 0) {
            this.preco = novoPreco;
        }
    }

    public adicionarEstoque(qtde: number): void {
        if (qtde > 0) {
            this.quantidade += qtde;
            console.log(`Adição de ${qtde} unidade(s) do produto '${this.nome}' registrada com sucesso. Nova quantidade: ${this.quantidade}`);
        } else {
            console.log("Erro: O valor para adicionar deve ser um número positivo.");
        }
    }

    // Aqui remove do estoque emitindo alertas de baixo estoque 
public removerEstoque(qtde: number): boolean { 
    if (qtde > 0 && qtde <= this.quantidade) {
        
        //Ação de remoção
        this.quantidade -= qtde;
        console.log(`Saída de ${qtde} unidade(s) do produto '${this.nome}' registrada com sucesso. Nova quantidade: ${this.quantidade}`);
        //Após a remoção, verifico o novo nível do estoque
        if (this.quantidade <= 5 && this.quantidade > 0) { 
            //Se o estoque estiver baixo, emitimos o alerta
            console.log(`>> ALERTA: Estoque baixo para o produto '${this.nome}'. Quantidade restante: ${this.quantidade}. Considere fazer reposição.`);
        } else if (this.quantidade === 0) {
            console.log(`>> ALERTA: Estoque do produto '${this.nome}' ZERADO.`);
        }

        return true; // Avisa que a operação deu certo
    } else {
        console.log(`Erro: Não foi possível realizar a remoção para o produto '${this.nome}'. Valor inválido ou estoque insuficiente.`);
        return false; // Avisa que a operação falhou
    }
}
    }


// --- HIERARQUIA DE MOVIMENTAÇÃO ---
// Representa os registros do nosso "Status de Transações".
//Interface
interface IMovimentacao {
    data: Date;
    quantidade: number;
    produto: Produto;
}

export class Movimentacao implements IMovimentacao {
    data: Date;
    quantidade: number;
    produto: Produto;

    constructor(produto: Produto, quantidade: number) {
        this.produto = produto;
        this.quantidade = quantidade;
        this.data = new Date();
    }
}

export class Entrada extends Movimentacao {
    constructor(produto: Produto, quantidade: number) {
        super(produto, quantidade);
    }
}

export class Saida extends Movimentacao {
    constructor(produto: Produto, quantidade: number) {
        super(produto, quantidade);
    }
}

// --- CLASSE ESTOQUE ---
// Essa classe trabalha como se fosse o gerente do estoque.
export class Estoque {
    private produtos: Produto[] = [];
    private movimentacoes: Movimentacao[] = [];

    public cadastrarProduto(id: string, nome: string, preco: number, quantidade: number): void {
        const produtoExistente = this.produtos.find(p => p.getId() === id);
        if (produtoExistente) {
            console.log(`Erro: Produto com o ID '${id}' já está cadastrado.`);
            return;
        }
        const novoProduto = new Produto(id, nome, preco, quantidade);
        this.produtos.push(novoProduto);
        console.log(`Produto '${nome}' (ID: ${id}) cadastrado com sucesso!`);
    }

    public registrarEntrada(idProduto: string, qtde: number): void {
        const produto = this.produtos.find(p => p.getId() === idProduto);
        if (!produto) {
            console.log(`Erro: Produto com o ID '${idProduto}' não encontrado.`);
            return;
        }
        produto.adicionarEstoque(qtde);
        const novaEntrada = new Entrada(produto, qtde);
        this.movimentacoes.push(novaEntrada);
        console.log(`Status do Estoque: Entrada do produto '${produto.getNome()}' registrada.`);
    }

    public registrarSaida(idProduto: string, qtde: number): void {
        const produto = this.produtos.find(p => p.getId() === idProduto);
        if (!produto) {
            console.log(`Erro de Saída: Produto com o ID '${idProduto}' não encontrado.`);
            return;
        }
        const sucessoNaRemocao = produto.removerEstoque(qtde);
        if (sucessoNaRemocao) {
            const novaSaida = new Saida(produto, qtde);
            this.movimentacoes.push(novaSaida);
            console.log(`Status do Estoque: Saída do produto '${produto.getNome()}' registrada.`);
        } else {
            console.log(`Status do Estoque: A movimentação de saída não foi registrada.`);
        }
    }
    //Aqui é onde os relatórios são gerados
    public gerarRelatorioEstoqueAtual(): void {
        console.log("\n--- Relatório de Estoque Atual ---");
        if (this.produtos.length === 0) {
            console.log(">> Nenhum produto cadastrado no estoque.");
            console.log("------------------------------------");
            return;
        }
        for (const produto of this.produtos) {
            console.log(
                `ID: ${produto.getId()} | ` +
                `Nome: ${produto.getNome()} | ` +
                `Preço: R$ ${produto.getPreco().toFixed(2)} | ` +
                `Qtde: ${produto.getQuantidade()}`
            );
        }
        console.log("------------------------------------");
    }
    //Relatorio de Histórico
    public gerarRelatorioHistorico(): void {
        console.log("\n--- Relatório de Histórico de Movimentações ---");
        if (this.movimentacoes.length === 0) {
            console.log(">> Nenhuma movimentação registrada.");
            console.log("---------------------------------------------");
            return;
        }
        for (const mov of this.movimentacoes) {
            //Aqui Polimorfismo (instanceof)
            let tipoMovimentacao = mov instanceof Entrada ? "ENTRADA" : "SAÍDA";
            console.log(
                `[${tipoMovimentacao}] - ` +
                `Data: ${mov.data.toLocaleString('pt-BR')} | ` +
                `Produto: ${mov.produto.getNome()} | ` +
                `Qtde: ${mov.quantidade}`
            );
        }
        console.log("---------------------------------------------");
    }
}

// ========================================================================
//A EXECUÇÃO (CÓDIGO PRINCIPAL / MENU)
// ========================================================================
console.log(">> Iniciando Sistema de Monitoramento de Estoque <<");
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
}