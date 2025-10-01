// ARQUIVO: Estoque.test.ts

// Importamos TODAS as classes que vamos precisar para o teste
import { Estoque, Produto } from './projetoEstoque';

describe('Testes da Classe Estoque', () => {

    let estoque: Estoque;

    // A função 'beforeEach' do Jest é executada ANTES de cada 'it'.
    // Isso garante que cada teste comece com um estoque novo e limpo.
    beforeEach(() => {
        estoque = new Estoque();
    });

    // Teste 1: Cadastro de produto
    it('deve cadastrar um novo produto com sucesso', () => {
        // Arrange (Arrumar) - O estoque já está criado e vazio pelo beforeEach.

        // Act (Agir)
        estoque.cadastrarProduto('1', 'Caneta Azul', 2.00, 50);

        // Assert (Afirmar)
        // Para "espiar" um atributo privado em um teste, podemos usar essa sintaxe de colchetes.
        const produtosNaLista = estoque['produtos'];
        expect(produtosNaLista.length).toBe(1); // A lista de produtos agora deve ter 1 item.
        expect(produtosNaLista[0].getNome()).toBe('Caneta Azul'); // O nome do item na lista deve ser 'Caneta Azul'.
    });

    // Teste 2: Impedir cadastro de ID duplicado
    it('NÃO deve cadastrar um produto com um ID que já existe', () => {
        // Arrange
        estoque.cadastrarProduto('1', 'Caneta Azul', 2.00, 50); // Cadastra o primeiro produto

        // Act
        estoque.cadastrarProduto('1', 'Caneta Vermelha', 2.10, 30); // Tenta cadastrar outro com o mesmo ID

        // Assert
        const produtosNaLista = estoque['produtos'];
        expect(produtosNaLista.length).toBe(1); // A lista DEVE continuar com apenas 1 item.
    });

    // Teste 3: Registrar uma saída complexa
    it('deve registrar uma saída, diminuir o estoque do produto e criar um log de movimentação', () => {
        // Arrange
        estoque.cadastrarProduto('1', 'Caneta Azul', 2.00, 50); // Cadastra um produto com 50 unidades

        // Act
        estoque.registrarSaida('1', 10); // Registra uma saída de 10 unidades

        // Assert
        const produtosNaLista = estoque['produtos'];
        const movimentacoesNaLista = estoque['movimentacoes'];

        // 1. A quantidade do produto diminuiu?
        expect(produtosNaLista[0].getQuantidade()).toBe(40);
        
        // 2. Um registro foi criado no log de movimentações?
        expect(movimentacoesNaLista.length).toBe(1);

        // 3. O registro de movimentação é do tipo 'Saida' e tem a quantidade correta?
        expect(movimentacoesNaLista[0].constructor.name).toBe('Saida'); // Verifica o tipo da classe
        expect(movimentacoesNaLista[0].quantidade).toBe(10);
    });
});