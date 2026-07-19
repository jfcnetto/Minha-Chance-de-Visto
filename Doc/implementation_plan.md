# Plano de Implementação - Minha Chance de Visto

Este plano descreve a criação do portal **Minha Chance de Visto** seguindo as regras de negócio fornecidas, com foco em SEO, layout limpo estilo "velho Bootstrap" (fundo branco, botões coloridos clássicos) e cabeçalho/rodapé em arquivos separados para fácil manutenção.

Para atender aos requisitos de modularidade e usabilidade:
1. O **Cabeçalho** (`header.html`) e o **Rodapé** (`footer.html`) serão arquivos separados e incluídos em todas as páginas.
2. A **Calculadora** (`calculadora.html`) terá seu HTML isolado em um arquivo separado para facilitar a manutenção, mas será **incluída dinamicamente e exibida na página inicial (`index.html`)**, que é a Home do portal.

## Estrutura do Projeto

Usaremos um script utilitário (`js/includes.js`) para injetar os componentes de forma dinâmica via JavaScript nos placeholders de cada página.

Arquivos do projeto:
1. `header.html` - Estrutura do cabeçalho de navegação.
2. `footer.html` - Estrutura do rodapé com Disclaimer Legal (RN03).
3. `calculadora.html` - O formulário e estrutura da calculadora de chances (4 perguntas + exibição de resultados).
4. `css/style.css` - Estilo baseado no Bootstrap antigo (fundo branco, tabelas simples, botões coloridos clássicos).
5. `js/includes.js` - Script responsável por fazer os `fetch` de `header.html`, `footer.html` e `calculadora.html` (apenas na Home) e injetar nos placeholders do DOM.
6. `js/app.js` - Algoritmo de cálculo de chances (RN04) e manipulação do DOM da calculadora.
7. `index.html` - Página Inicial (Home) contendo os placeholders e os textos estruturados de SEO e FAQ.
8. `politica-privacidade.html` - Página de privacidade (exigência AdSense).
9. `termos-uso.html` - Página de termos de uso (exigência AdSense).

## Otimização de SEO e Palavras-Chave

As seguintes palavras-chaves exatas serão distribuídas nos títulos (`<h1>`, `<h2>`) e parágrafos da página inicial (`index.html`):
- *"Minha Chance de Visto"*
- *"qual a chance de ter o visto americano negado"*
- *"visto americano negado quanto tempo para solicitar outro"*
- *"como saber o motivo do visto negado"*
- *"chance de visto americano"*
- *"calcule a chance do seu visto ser aprovado"*
- E as demais dúvidas de cauda longa do FAQ (seção 6.2).

## Proposta Técnica de Estilo (Velho Bootstrap)

- **Fundo**: Branco (`#ffffff`) com cinza muito claro para seções alternativas (`#f8f9fa`).
- **Fontes**: Família sans-serif clássica (Arial, Helvetica, sans-serif ou System UI).
- **Botões**:
  - Azul Primário (`#0d6efd` / `.btn-primary`)
  - Verde Sucesso (`#198754` / `.btn-success`)
  - Vermelho Perigo (`#dc3545` / `.btn-danger`)
- **Containers**: Largura máxima de `1140px` centralizados na tela, com grids responsivos de 12 colunas simples.

---

## Proposta de Arquivos

### [NEW] [header.html](file:///c:/MinhaChancedeVisto/header.html)
Cabeçalho contendo o logotipo "Minha Chance de Visto" e o menu de navegação.

### [NEW] [footer.html](file:///c:/MinhaChancedeVisto/footer.html)
Rodapé contendo o Disclaimer de Isenção de Responsabilidade (RN03) e links institucionais.

### [NEW] [calculadora.html](file:///c:/MinhaChancedeVisto/calculadora.html)
Fragmento HTML contendo o formulário da calculadora (4 perguntas) e a div de resultados.

### [NEW] [style.css](file:///c:/MinhaChancedeVisto/css/style.css)
Folha de estilo estilo clássico Bootstrap (fundo branco, bordas arredondadas simples, botões coloridos e sombras leves).

### [NEW] [includes.js](file:///c:/MinhaChancedeVisto/js/includes.js)
Carrega o header, footer e a calculadora (na Home) dinamicamente.

### [NEW] [app.js](file:///c:/MinhaChancedeVisto/js/app.js)
Contém a lógica de cálculo de score e atualização dos estilos de resultado (Verde para Alto, Amarelo para Médio, Vermelho para Baixo).

### [NEW] [index.html](file:///c:/MinhaChancedeVisto/index.html)
Página inicial contendo os placeholders de inclusão e os blocos de conteúdo para SEO e FAQ.

### [NEW] [politica-privacidade.html](file:///c:/MinhaChancedeVisto/politica-privacidade.html)
Página avulsa de privacidade.

### [NEW] [termos-uso.html](file:///c:/MinhaChancedeVisto/termos-uso.html)
Página avulsa de termos de uso.

---

## Plano de Verificação

### Testes Manuais
- Verificar o carregamento dinâmico de `header.html`, `footer.html` e `calculadora.html` na Home (`index.html`).
- Validar se o algoritmo da calculadora calcula corretamente o score e reduz 15% em caso de Green Card.
- Validar a responsividade e o estilo clássico "Bootstrap".
- Verificar a presença de todas as palavras-chave na página de FAQ.
