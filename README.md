# Projeto: Sistema de Monitoramento de Estoque

Este projeto é um sistema de backend para monitoramento de estoque, desenvolvido como avaliação para o Módulo 2 do programa Bolsa Futuro Digital, uma iniciativa da Softex Pernambuco em parceria com o Governo Federal.

O objetivo principal foi aplicar na prática os conceitos fundamentais de **Programação Orientada a Objetos (POO)** utilizando TypeScript.

---

## 🚀 Funcionalidades

O sistema é operado através de um menu interativo no terminal e possui as seguintes funcionalidades:

* **Cadastro de Produtos:** Permite adicionar novos produtos ao catálogo do estoque.
* **Registro de Entradas:** Adiciona unidades ao estoque de um produto já existente.
* **Registro de Saídas:** Remove unidades do estoque, com validação para evitar estoque negativo.
* **Geração de Relatórios:**
    * Relatório de Estoque Atual: Exibe uma lista de todos os produtos com suas quantidades.
    * Histórico de Movimentações: Exibe um log cronológico de todas as entradas e saídas.
* **Alertas de Estoque Baixo:** O sistema emite um alerta proativo quando o estoque de um produto atinge 5 unidades ou menos após uma saída.

---

## 💡 Conceitos de POO Aplicados

Para a construção deste sistema, foram aplicados os seguintes pilares da POO:

* **Encapsulamento:** Proteção dos atributos das classes (utilizando `private`) e acesso controlado através de métodos públicos (`getters` e `setters`).
* **Herança:** Criação de uma hierarquia de classes, com uma superclasse `Movimentacao` e subclasses `Entrada` e `Saida`.
* **Polimorfismo:** Utilização do operador `instanceof` para tratar objetos de tipos diferentes (`Entrada`, `Saida`) de maneira específica, mesmo estando na mesma lista.
* **Interfaces:** Definição de um "contrato" (`IMovimentacao`) para garantir a estrutura das classes de movimentação.

---

## 🛠️ Tecnologias Utilizadas

* **TypeScript**
* **Node.js**
* **Jest** (para a suíte de testes unitários)
* **readline-sync** (para a interatividade do menu no terminal)

---

## ⚙️ Como Executar o Projeto

**Pré-requisitos:** Node.js e npm instalados.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/LeandroSampaio001/PorjetoEstoque.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd 
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Compile o código TypeScript:**
    ```bash
    tsc
    ```

5.  **Execute o programa:**
    ```bash
    node dist/projetoEstoque.js
    ```

---

## 🧪 Como Rodar os Testes

Para executar a suíte de testes unitários desenvolvida com Jest, utilize o comando:

```bash
npm test
