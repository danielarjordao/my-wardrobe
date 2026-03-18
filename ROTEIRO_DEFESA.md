# Guião de Demonstração ao Vivo: My Wardrobe

## 0. Preparação (Antes de partilhar o ecrã)

- [ ] Abrir o VS Code na branch `develop-idp`.
- [ ] Garantir que o terminal está limpo.
- [ ] Abrir os seguintes separadores no browser:
    1. Repositório no GitHub (Separador *Code*).
    2. Repositório no GitHub (Separador *Settings > Secrets and variables > Actions*).
    3. Repositório no GitHub (Separador *Actions*).
    4. Dashboard do Supabase (A mostrar a tabela de dados).
    5. URL da aplicação em Produção (Página da demonstração final).

## Parte 1: Apresentação e Arquitetura do Projeto

### 1. A Aplicação em Produção & Base de Dados (Pontos 5 e 7)

- Mostrar o site online a funcionar.
- Fazer uma ação rápida, como criar um novo login, para mostrar que a aplicação está a interagir com a base de dados do Supabase em tempo real.

### 2. Repositório e Documentação (Pontos 1 e 9)

- Mudar para o separador do GitHub.
- Mostrar o ficheiro **README.md**, destacando que contém a explicação do projeto, as tecnologias e os passos para o executar localmente.

### 3. Segurança e Docker (Pontos 6 e 8)

- Ir a *Settings > Secrets and variables > Actions*.
- Mostrar que as chaves sensíveis (ex: `SUPABASE_URL`, `SUPABASE_KEY`) não estão no código, mas sim protegidas no GitHub Secrets.
- Abrir rapidamente o `Dockerfile` no repositório para provar que a aplicação está preparada para ser executada em contentores Docker.

## Parte 2: O Fluxo CI/CD ao Vivo

### 1. Criar a Feature Branch (Ponto 10)

- No terminal do VS Code, garantir que estás na `develop-idp` e criar uma nova branch:

  ```bash
  git checkout -b feature/demo-ao-vivo
  ```

### 2. Fazer uma Alteração Visível

- Editar um elemento simples e visual (ex: alterar um título no `app.component.html` ou uma palavra no Dashboard).
- *Nota de estudo: Escolhe algo muito simples para não arriscar quebrar o código (compilação) durante a apresentação.*

### 3. Commit e Push**

- No terminal do VS Code:

  ```bash
  git add .
  git commit -m "feat: atualiza titulo para demonstracao ao vivo"
  git push origin feature/demo-ao-vivo
  ```

### 4. Pull Request e Proteção de Branch (Pontos 1 e 2)

- Ir ao GitHub e abrir o Pull Request da branch `feature/demo-ao-vivo` para a branch `develop-idp`.
- **Ponto crucial:** Mostrar ao professor que o botão de Merge está **bloqueado** temporariamente. Isto prova que a branch principal está protegida.

### 5. Execução do CI - Lint e Build (Ponto 3)

- Mostrar o GitHub Actions a correr os testes de status no fundo do Pull Request.
- Explicar que a pipeline está a verificar a qualidade do código (`lint`) e a garantir que compila (`build`).
- Aguardar até que o *check* fique verde (✅).

### 6. Merge e Deploy Automático (Pontos 2 e 4)

- Assim que o CI passar e o botão de Merge ficar verde, clicar em **Merge pull request**.
- Ir imediatamente para o separador **Actions**.
- Mostrar o workflow de **Deploy** a iniciar automaticamente. Explicar que este é o CD a enviar a nova versão para o GitHub Pages.

### 7. Validação Final em Produção (Ponto 10)

- Quando o Deploy terminar, voltar ao separador da Aplicação em Produção.
- Fazer um "Hard Refresh" ( `Ctrl + F5` ou `Cmd + Shift + R`).
- Mostrar a alteração visível no ecrã, provando que o ciclo completo de CI/CD funciona.
