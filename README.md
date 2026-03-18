# My Wardrobe - Gerenciador de Roupeiro e Looks

![CI](https://github.com/danielarjordao/my-wardrobe/actions/workflows/ci.yml/badge.svg)
![Deploy to GitHub Pages](https://github.com/danielarjordao/my-wardrobe/actions/workflows/deploy.yml/badge.svg)

**Autora:** Daniela Jordão  
**Curso:** UpSkill - Programação JavaScript (Angular)

## Sobre o Projeto

O **My Wardrobe** é uma Single Page Application (SPA) desenvolvida em Angular que ajuda a organizar o roupeiro de forma eficiente. A aplicação permite gerir peças de roupa, acompanhar o seu estado (ex: disponível, na lavandaria) e planear combinações de looks (Outfits) para ocasiões específicas.

## Link do Projeto

O projeto está publicado e pode ser acedido aqui: [My Wardrobe Live Demo](https://danielarjordao.github.io/my-wardrobe/)

## Funcionalidades Principais

  * **Dashboard Interativo:** KPIs em tempo real (Total de peças, valor estimado e estado das peças) com destaque para itens recentes.
  * **Gestão de Roupeiro (CRUD):** Controlo total sobre as peças de roupa utilizando *Reactive Forms* para validação.
  * **Filtros Dinâmicos:** Pesquisa e filtragem por categoria, estado e cor em tempo real.
  * **Criador de Looks (Outfits):** Agrupamento de peças para eventos ou viagens.
  * **Persistência Híbrida:**
      * **Supabase:** Gestão de utilizadores e autenticação segura.
      * **LocalStorage:** Armazenamento local das peças e looks para acesso rápido no browser.

## Tecnologias e DevOps

  * **Framework:** Angular (v20+)
  * **Autenticação:** Supabase (Auth Service)
  * **Linguagem:** TypeScript (Strict Mode)
  * **Estilização:** CSS3 (Variables, Flexbox, Grid)
  * **CI/CD (DevOps):**
      * **GitHub Actions:** Pipeline de Integração Contínua para Linting e Build.
      * **GitHub Pages:** Deploy automatizado após validação do código.

## Como Executar o Projeto

1.  Certifique-se de que tem o [Node.js](https://nodejs.org/) e o [Angular CLI](https://angular.io/cli) instalados.
2.  Clone este repositório:
    ```bash
    git clone https://github.com/danielarjordao/my-wardrobe.git
    ```
3.  Instale as dependências:
    ```bash
    cd my-wardrobe
    npm install
    ```
4.  Configure as chaves do Supabase no ficheiro `src/environments/environment.ts`.
5.  Inicie o servidor:
    ```bash
    ng serve --open
    ```
