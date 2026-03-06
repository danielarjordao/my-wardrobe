# My Wardrobe - Gerenciador de Roupeiro e Looks

**Autora:** Daniela Jordão
**Curso:** UpSkill - Programação JavaScript (Angular)

## Sobre o Projeto

O **My Wardrobe** é uma Single Page Application (SPA) desenvolvida em Angular que ajuda a resolver o problema diário de organizar o roupeiro. A aplicação permite gerir peças de roupa, acompanhar o seu estado (ex: disponível, na lavandaria) e planear combinações de looks (Outfits) para ocasiões ou viagens específicas.

## Funcionalidades Principais

* **Dashboard Interativo:** Apresenta KPIs em tempo real (Total de peças, Valor estimado do roupeiro, Peças na lavandaria) e destaca os itens mais valiosos e recentes.
* **Gestão de Roupeiro (CRUD):** Adição, edição, visualização e remoção de peças de roupa com validação de dados através de *Reactive Forms*.
* **Filtros Dinâmicos:** Pesquisa em tempo real e filtros por categoria, estado e cor, sem necessidade de recarregar a página.
* **Criador de Looks (Outfits):** Interface intuitiva para agrupar peças de roupa num look específico, associando-o a uma viagem ou evento.
* **Persistência de Dados:** Os dados são guardados localmente no browser utilizando `LocalStorage` através de um serviço genérico de armazenamento.

## Tecnologias Utilizadas

* **Framework:** Angular (v20+)
* **Linguagem:** TypeScript (Strict Mode)
* **Estilização:** CSS3 (CSS Variables, Flexbox, CSS Grid)
* **Arquitetura:** Componentes (Smart/Dumb), Services (Injeção de Dependências), Reactive Forms, Routing e Pipes.

## Como Executar o Projeto

1. Certifique-se de que tem o [Node.js](https://nodejs.org/) e o [Angular CLI](https://angular.io/cli) instalados na sua máquina.

2. Clone este repositório:

```bash
   git clone git@github.com:danielarjordao/my-wardrobe.git
```

Navegue até à pasta do projeto:

```Bash
cd my-wardrobe
```

Instale as dependências:

```Bash
npm install
```

Inicie o servidor de desenvolvimento:

```Bash
ng serve --open
```

A aplicação será aberta automaticamente no seu browser no endereço <http://localhost:4200/>.
