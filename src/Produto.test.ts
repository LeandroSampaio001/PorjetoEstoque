import { Produto } from './projetoEstoque'; // Importamos a classe que queremos testar

// Bloco de testes para a classe Produto
describe('Testes da Classe Produto', () => {

    // Teste 1: Deve criar um produto corretamente
    it('deve criar uma instância de Produto com os valores corretos', () => {
        // Arrange (Arrumar)
        const produto = new Produto('1', 'Caneta', 2.50, 100);

        // Act (Agir) - Neste caso, a ação foi o próprio 'new'

        // Assert (Afirmar)
        expect(produto.getId()).toBe('1');
        expect(produto.getNome()).toBe('Caneta');
        expect(produto.getPreco()).toBe(2.50);
        expect(produto.getQuantidade()).toBe(100);
    });

    // Teste 2: Deve adicionar estoque
    it('deve adicionar estoque corretamente', () => {
        // Arrange
        const produto = new Produto('2', 'Caderno', 15.00, 10);

        // Act
        produto.adicionarEstoque(5);

        // Assert
        expect(produto.getQuantidade()).toBe(15);
    });

    // Teste 3: Deve remover estoque com sucesso
    it('deve remover estoque quando a quantidade é suficiente', () => {
        // Arrange
        const produto = new Produto('3', 'Borracha', 1.00, 20);

        // Act
        const sucesso = produto.removerEstoque(15);

        // Assert
        expect(sucesso).toBe(true);
        expect(produto.getQuantidade()).toBe(5);
    });

    // Teste 4: NÃO deve remover estoque se for insuficiente (caminho triste)
    it('não deve remover estoque se a quantidade for insuficiente', () => {
        // Arrange
        const produto = new Produto('4', 'Lápis', 0.80, 5);

        // Act
        const sucesso = produto.removerEstoque(10);

        // Assert
        expect(sucesso).toBe(false); // Esperamos que a operação falhe
        expect(produto.getQuantidade()).toBe(5); // A quantidade não deve ter mudado
    });
});