// ARQUIVO: Movimentacao.test.ts

import { Produto } from './projetoEstoque';
import { Movimentacao, Entrada, Saida } from './projetoEstoque'; // Importamos toda a família

describe('Testes da Hierarquia de Movimentacao', () => {

    // Arrange (Arrumar) - Criamos um produto "dublê" que será usado em todos os testes.
    const produtoTeste = new Produto('1', 'Produto de Teste', 10.00, 100);

    // Teste 1: Testando a classe Pai
    it('deve criar uma instância de Movimentacao com os dados corretos', () => {
        // Act (Agir)
        const movimentacao = new Movimentacao(produtoTeste, 50);

        // Assert (Afirmar)
        expect(movimentacao.produto).toBe(produtoTeste); // Verifica se o produto foi armazenado
        expect(movimentacao.quantidade).toBe(50);
        expect(movimentacao.data).toBeInstanceOf(Date); // Verifica se a data foi criada e é do tipo Date
    });

    // Teste 2: Testando a classe Filha 'Entrada'
    it('deve criar uma instância de Entrada corretamente', () => {
        // Act
        const entrada = new Entrada(produtoTeste, 25);

        // Assert
        // Verificamos se os dados foram passados para o Pai corretamente via super()
        expect(entrada.produto.getNome()).toBe('Produto de Teste');
        expect(entrada.quantidade).toBe(25);
    });
    
    // Teste 3: Verificando a Herança (Polimorfismo)
    it('uma instância de Saida também deve ser uma instância de Movimentacao', () => {
        // Act
        const saida = new Saida(produtoTeste, 10);

        // Assert
        expect(saida).toBeInstanceOf(Saida); // O objeto é do tipo Saida
        expect(saida).toBeInstanceOf(Movimentacao); // E TAMBÉM é do tipo Movimentacao. Prova da herança!
    });
});