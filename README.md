# Portfólio — Arthur Souza · Product Designer

Portfólio pessoal em HTML5 semântico, CSS3 e JavaScript Vanilla. Sem framework,
sem bibliotecas, sem etapa de build: o que está no repositório é exatamente o
que vai para o ar.

**Claro e escuro, com alternância · Bilíngue (pt-BR ⇄ en) · Mobile First · WCAG AA**

---

## Sumário

1. [Rodando localmente](#1-rodando-localmente)
2. [Publicação — o que já está e o que falta](#2-publicação--o-que-já-está-e-o-que-falta)
3. [Estrutura de arquivos](#3-estrutura-de-arquivos)
4. [Tecnologias e decisões](#4-tecnologias-e-decisões)
5. [Como editar textos](#5-como-editar-textos)
6. [Como trocar imagens](#6-como-trocar-imagens)
7. [Como adicionar um novo projeto](#7-como-adicionar-um-novo-projeto)
8. [Como adicionar uma experiência](#8-como-adicionar-uma-experiência)
9. [Como mudar a identidade visual](#9-como-mudar-a-identidade-visual)
10. [Como o CSS e o JavaScript conversam](#10-como-o-css-e-o-javascript-conversam)
11. [Acessibilidade](#11-acessibilidade)
12. [Performance](#12-performance)
13. [Publicando no GitHub Pages](#13-publicando-no-github-pages)
14. [Publicando na Vercel](#14-publicando-na-vercel)
15. [Publicando na Netlify](#15-publicando-na-netlify)
16. [Manutenção — o que não quebrar](#16-manutenção--o-que-não-quebrar)

---

## 1. Rodando localmente

Não há dependências para instalar nem comando para rodar.

**Opção A — abrir o arquivo direto.** Dê dois cliques em `index.html`. Funciona
de verdade: todos os caminhos são relativos e o sprite de ícones é SVG inline,
justamente para não depender de servidor.

**Opção B — servidor local (recomendado).** Alguns comportamentos só se
comportam como em produção sob `http://` — entre eles o `localStorage` em
navegadores mais restritivos e o cache de fontes. Escolha um:

```bash
# Python 3 (já vem instalado em macOS e na maioria das distros Linux)
python -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Depois abra `http://localhost:8000`.

> **VS Code:** a extensão *Live Server* faz o mesmo com um clique e recarrega
> a página ao salvar.

---

## 2. Publicação — o que já está e o que falta

O site está publicado em **https://rthursouza.github.io** (GitHub Pages, na
raiz do domínio). Os dados pessoais e o endereço já estão no código; o que
falta são arquivos que dependem de você.

### Já feito

| Item | Valor |
|---|---|
| Nome e cargo | Arthur Souza — Product Designer |
| E-mail | `arthursouza_7@outlook.com` (em todas as páginas: link `mailto`, rótulo do botão, `data-copy-email` do botão "Copiar e-mail" e rodapé — troque com busca e substituição) |
| LinkedIn | `linkedin.com/in/arthursouza7/` (contato e rodapé de todas as páginas) |
| Currículo | `assets/curriculo-arthursouza-ux.pdf` (header e rodapé de todas as páginas, abre em nova aba) |
| Domínio | `https://rthursouza.github.io` em `canonical` e `og:url`, **ativas** em todas as páginas |

### Ainda pendente

| Arquivo | Onde aparece | O que fazer |
|---|---|---|
| `assets/images/og-cover.jpg` | `og:image` e `twitter:image` da home, de /projetos e de sobre | Gerar a imagem (1200×630) e tirar o comentário das duas tags |
| `assets/images/og-projeto-0*.jpg` | `og:image` e `twitter:image` de cada case | Uma por case (1200×630), mesmo procedimento |

**Por que `og:image` e `twitter:image` continuam comentadas.** As tags já
apontam para o domínio certo, mas os arquivos ainda não existem. Uma
`og:image` que dá 404 faz WhatsApp e LinkedIn montarem o card sem imagem, e
esse card fica em cache por dias. Por isso cada uma está assim:

```html
<!-- PUBLICAR: <meta property="og:image" content="https://rthursouza.github.io/assets/images/og-cover.jpg"> -->
```

Depois de salvar as imagens em `assets/images/`, tire o comentário de todas
de uma vez:

**PowerShell (Windows):**

```powershell
Get-ChildItem -Recurse -Include *.html | ForEach-Object {
  $t = Get-Content $_.FullName -Raw -Encoding UTF8
  $t = $t -replace '<!-- PUBLICAR: (<[^>]+>) -->', '$1'
  Set-Content $_.FullName -Value $t -Encoding UTF8 -NoNewline
}
```

**bash (macOS / Linux):**

```bash
find . -name "*.html" -exec sed -i '' \
  -e 's|<!-- PUBLICAR: \(<[^>]*>\) -->|\1|g' {} +
```

> No Linux use `sed -i` sem o `''` logo depois.

Se um dia o site for para um domínio próprio, troque
`https://rthursouza.github.io` pelo novo endereço em todos os `.html` (busca
e substituição): são as tags `canonical`, `og:url`, `og:image` e
`twitter:image`.

### Conferindo se sobrou algo

```powershell
Select-String -Path *.html, projects/*.html -Pattern 'PUBLICAR:'
```

Nenhum resultado = imagens de compartilhamento publicadas.

### Ainda antes de divulgar o link

- [x] Criar as pastas de `assets/`
- [x] Dados pessoais, bio, habilidades e cards
- [x] Os três estudos de caso reescritos com projetos reais
- [x] `curriculo-arthursouza-ux.pdf` salvo em `assets/`
- [x] Domínio nas tags `canonical` e `og:url`
- [ ] Gerar as 4 imagens de Open Graph (1200×630) e reativar as tags `PUBLICAR:`
- [ ] Trocar as capas tipográficas e as figuras `IMAGEM PENDENTE` pelas imagens reais (veja a [seção 6](#6-como-trocar-imagens) e `IMAGENS.md`)
- [ ] Gerar o favicon definitivo, se quiser substituir o SVG embutido
- [ ] Rodar o Lighthouse ([seção 12](#12-performance))

### Os três cases

| Arquivo | Projeto | Ângulo |
|---|---|---|
| `projeto-01.html` | Nasajon · PDV mobile-first (2026) | Pesquisa derruba premissa herdada; 45% descartado |
| `projeto-02.html` | Nasajon · App do entregador (2025) | Escopo definido sem abrir mão de pesquisa |
| `projeto-03.html` | Nasajon · Roteirização (2025) | Automatizar sem tirar controle de quem responde |

Os cases 02 e 03 são as duas pontas da mesma operação e se referenciam.

### Único marcador aberto no código

```powershell
Select-String -Path projects/*.html -Pattern '>> QUANDO'
```

Em `projeto-02.html` há um bloco comentado esperando os números de combustível
e produtividade do app de logística. **Não é uma pendência que quebra nada** — a
seção Resultados daquele case já está publicável, declarando honestamente que
esses números não foram apurados. Se um dia aparecerem, o bloco está pronto no
formato certo, com as três partes obrigatórias documentadas (valor, base
anterior, método).

### Arquivos de trabalho

Não fazem parte do site e podem ser apagados quando não fizerem mais falta:

| Arquivo | Para que serve |
|---|---|
| `BRIEFING.md` | Questionário que originou o conteúdo dos cases |
| `IMAGENS.md` | Lista das imagens a exportar, com nome e dimensão exatos |
| `og-generator.html` | Gera as 4 imagens de Open Graph — veja abaixo |

### Gerando as imagens de Open Graph

Open Graph é a imagem que aparece quando alguém cola o link do portfólio no
WhatsApp, LinkedIn ou Slack. Sem ela o link vira um retângulo cinza — e é
justamente o momento em que um recrutador decide se clica.

Abra `og-generator.html` no navegador. Ele renderiza os quatro cards em
1200×630, na paleta do site. Para exportar, no Chrome ou Edge:

1. Zoom em 100% (`Ctrl+0`) — zoom altera o tamanho da captura
2. Botão direito no card → **Inspecionar**
3. No DevTools, botão direito na linha `<div class="og" id="…">` →
   **Capture node screenshot**
4. Salve em `assets/images/` com o nome indicado acima do card

Em tela HiDPI a captura pode sair em 2400×1260. Está ótimo: mesma proporção,
mais nítida, e as plataformas reduzem sozinhas.

Depois de publicar, valide o preview em
[opengraph.xyz](https://www.opengraph.xyz) ou no
[Post Inspector do LinkedIn](https://www.linkedin.com/post-inspector/) — o
LinkedIn faz cache agressivo, e o Post Inspector força a releitura.

---

## 3. Estrutura de arquivos

```
portfolio/
├── index.html                      Home: hero, projetos em destaque, sobre, contato
├── projetos.html                   Listagem de todos os projetos (grade + filtro)
├── sobre.html                      Trajetória: experiência, como eu trabalho, formação
├── style.css                       Toda a folha de estilo (seções numeradas)
├── script.js                       Todo o comportamento (10 módulos)
├── README.md                       Este arquivo
│
├── assets/
│   ├── curriculo-arthur-souza.pdf  Seu currículo (você adiciona)
│   ├── fonts/                      As 7 fontes .woff2 locais (não apague)
│   ├── images/                     Fotos, capas, telas, mockups
│   ├── icons/                      Ícones avulsos, se precisar de algum
│   ├── illustrations/              Ilustrações e diagramas
│   └── favicon/                    Favicon definitivo (opcional)
│
└── projects/
    ├── projeto-template.html       Template canônico — a fonte dos cases
    ├── projeto-01.html
    ├── projeto-02.html
    └── projeto-03.html
```

**Três arquivos na raiz, e só.** Não existe CSS parcial, não existe JS por
página, não existe pasta `src/`. O custo disso é que `style.css` e `script.js`
são grandes; o benefício é que qualquer alteração tem um lugar só onde
acontecer, e o navegador baixa cada um uma única vez para o site inteiro.

Os caminhos dentro de `projects/` usam `../` para chegar à raiz. Isso não é
preciosismo: caminhos absolutos (`/style.css`) quebram tanto no GitHub Pages de
projeto quanto ao abrir o arquivo localmente.

---

## 4. Tecnologias e decisões

| Camada | O quê | Por quê |
|---|---|---|
| Marcação | HTML5 semântico | `<article>`, `<section>`, `<dl>`, `<figure>` carregam significado que nenhum `<div>` entrega |
| Estilo | CSS3 puro, Custom Properties, Grid e Flexbox | Grid para layout, Flexbox para alinhamento interno |
| Comportamento | JavaScript Vanilla (ES6+) | Nenhuma dependência para atualizar, auditar ou quebrar |
| Tipografia | Bricolage Grotesque, Source Serif 4 e Inter — arquivos locais | `@font-face` + `preload` + `display=swap`, sem CDN de terceiros |
| Ícones | Sprite SVG inline | Zero requisições e funciona ao abrir o arquivo direto |
| Lightbox | `<dialog>` nativo | Foco preso, Escape e fundo inerte de graça |

### As duas dependências de plataforma (e o que acontece sem elas)

Não há **nenhuma** requisição externa: as fontes são arquivos locais em
`assets/fonts/` e os ícones são um sprite SVG inline. O site abre offline e
não entrega o IP de quem visita para um terceiro.

1. **`:has()` no CSS.** Usado em um lugar só — figuras com legenda (seção 08 do
   `style.css`). Disponível em todos os navegadores desde o fim de 2023.
2. **`<dialog>` no JavaScript.** Se o navegador não suportar `showModal`, o
   lightbox simplesmente não inicializa e cada item da galeria continua sendo
   um link para a imagem em tamanho real. Degradação silenciosa e funcional.

### Sem JavaScript

O site continua completo: todo o texto aparece (em português), a navegação vira
uma barra estática, as animações de entrada não acontecem — mas nada fica
invisível — e a galeria abre as imagens direto.

---

## 5. Como editar textos

### A regra única

Cada texto existe **duas vezes** no HTML, uma em cada idioma. O CSS esconde o
inativo. Não há dicionário externo, arquivo de tradução nem chave de i18n: para
mudar uma frase, você a edita onde ela está.

**1) Texto corrido — elementos gêmeos:**

```html
<p lang="pt-BR">Transformo problemas complexos em experiências simples.</p>
<p lang="en">I turn complex problems into simple experiences.</p>
```

**2) Títulos (`h1`–`h6`) — spans gêmeos DENTRO do mesmo elemento:**

```html
<h2 id="sobre-titulo">
  <span lang="pt-BR">Sobre</span><span lang="en">About</span>
</h2>
```

Duplicar o `<h2>` inteiro duplicaria a estrutura de headings do documento —
um leitor de tela anunciaria dois títulos de nível 2 onde existe um.

**3) Texto dentro de atributos — prefixo `data-en-`:**

```html
<img alt="Retrato de Arthur Souza" data-en-alt="Portrait of Arthur Souza">
<nav aria-label="Navegação principal" data-en-aria-label="Main navigation">
<meta name="description" content="…" data-en-content="…">
<title data-en="Arthur Souza — Product Designer">Arthur Souza — Product Designer</title>
```

O JavaScript varre o documento uma vez procurando esse prefixo e monta a lista
sozinho. Adicionar um novo atributo traduzível não exige tocar no `script.js`.

> ⚠️ Se você escrever `data-en-aria-label` em um elemento que **não** tem
> `aria-label`, voltar para o português vai gravar uma string vazia ali.
> O par tem que estar completo.

### Publicando só em português

Apague os elementos `lang="en"` e o bloco `.nav__prefs > .lang-switch` do
header. Nada quebra — o CSS já mostra o pt-BR por padrão.

### Onde a escolha de idioma é guardada

`localStorage`, chave `portfolio-lang` (o tema usa `portfolio-theme`). Se o
storage estiver bloqueado (modo privado), a troca funciona na sessão e não
sobrevive ao recarregamento.

---

## 6. Como trocar imagens

Todo espaço de imagem é um `<figure class="media">` com a proporção já
reservada. Enquanto a imagem não existe, o espaço mostra uma **capa
tipográfica** (`<div class="cover">`), e o `<img>` real fica **pronto e
comentado logo abaixo**:

```html
<figure class="media media--16x9 project-card__media">
  <div class="cover cover--tone-1" aria-hidden="true">
    <span class="cover__eyebrow"><span lang="pt-BR">ERP &amp; Varejo</span><span lang="en">ERP &amp; Retail</span></span>
    <span class="cover__title"><span lang="pt-BR">PDV mobile-first</span><span lang="en">Mobile-first POS</span></span>
    <span class="cover__value">−30%</span>
  </div>
  <!--
  <img src="assets/images/projeto-01-capa.jpg"
       alt=""
       width="1600" height="900" loading="lazy" decoding="async">
  -->
</figure>
```

**São dois passos:**

1. Apague a `<div class="cover">` inteira.
2. Descomente o `<img>` e ajuste `src`, `alt` e `data-en-alt`.

Como a proporção está reservada por `aspect-ratio` e a capa ocupa exatamente
a mesma caixa, a troca não desloca um pixel do layout — o Cumulative Layout
Shift continua zero.

### A capa tipográfica

| Classe | Uso |
|---|---|
| `cover` | A capa em si: área do projeto no topo, título e resultado no pé |
| `cover__eyebrow` | Área do projeto (o mesmo texto da meta do card) |
| `cover__title` | Nome curto do projeto |
| `cover__value` | O número ou resultado em destaque (−30%, Sem papel, −40%) |
| `cover--tone-1/2/3` | Fundo do projeto: um tom por projeto, dos tokens `--color-cover-*` |
| `cover--monogram` | Foto de perfil: só o monograma "AS" |
| `cover--sample` | Amostra do freelancer: só o nome da categoria |

- **Projeto novo:** use o próximo tom (ou repita um) e os mesmos três textos
  do card. As cores vêm de `--color-cover-*` no bloco 02 · TOKENS, derivadas
  da superfície; por isso acompanham o tema claro sozinhas.
- **Acessibilidade:** a capa de card leva `aria-hidden="true"`, porque o card
  já diz tudo aquilo em texto (o `<img>` dela também seria `alt=""`). A capa
  que faz papel de imagem (hero do case, amostras) leva `role="img"`,
  `aria-label` e `data-en-aria-label`.

### Figuras do corpo dos cases

As figuras de dentro dos cases (benchmark, wireframes, solução, gráfico de
resultado) não têm capa: enquanto a imagem não existe, a figura inteira fica
**dentro de um comentário** marcado assim:

```html
<!-- IMAGEM PENDENTE: Benchmark dos concorrentes (1200×675).
     Para publicar: salve o arquivo e tire este comentário.
<figure class="media media--16x9 media--sm">
  <img src="../assets/images/projeto-01-benchmark.png" alt="…" data-en-alt="…" …>
</figure>
-->
```

Para publicar, salve o arquivo com o nome do `src` e tire o comentário em
volta do `<figure>`. A galeria "Telas e artefatos" segue a mesma regra: a
seção inteira está comentada. Ao devolvê-la, devolva também o item "Galeria"
ao índice do case (`.case-toc`).

Para achar tudo o que falta: `grep -rn "IMAGEM PENDENTE" projects/`.

### As duas imagens que são exceção

A foto do hero (home) e a imagem hero de cada case são o **LCP** da sua página.
Elas já vêm com `loading="eager"` e `fetchpriority="high"` no comentário.
Nunca coloque `lazy` nelas: você estaria adiando exatamente a imagem que o
Lighthouse cronometra.

Todas as outras usam `loading="lazy"` e `decoding="async"`.

### Proporções disponíveis

| Classe | Proporção | Uso previsto |
|---|---|---|
| `media--21x9` | 21:9 | Hero dos estudos de caso (vira 16:10 no celular) |
| `media--16x9` | 16:9 | Capas, telas, diagramas |
| `media--4x3` | 4:3 | Cards de /projetos, galeria e amostras |
| `media--4x5` | 4:5 | Foto de perfil (retrato) |
| `media--sm` | — | Modificador: limita a largura dentro da timeline |
| `media--framed` | — | Modificador: sombra e filete de destaque |

### Tamanhos recomendados

| Imagem | Dimensão | Formato |
|---|---|---|
| Foto de perfil | 800 × 1000 | JPG ou WebP |
| Capa de projeto | 1600 × 900 | JPG ou WebP |
| Hero de case | 2100 × 900 | JPG ou WebP |
| Artefatos da timeline | 1200 × 675 | PNG (diagramas) ou JPG |
| Miniatura da galeria | 1200 × 900 | JPG ou WebP |
| Galeria em tamanho real | até 2400px de largura | JPG ou WebP |
| `og:image` | 1200 × 630 | JPG |

**Sempre** mantenha `width` e `height` no HTML batendo com o arquivo real —
é isso que reserva o espaço antes do download.

### Criando as pastas

Elas não vêm no repositório porque estariam vazias:

```powershell
New-Item -ItemType Directory -Force assets\images, assets\icons, assets\illustrations, assets\favicon
```

```bash
mkdir -p assets/{images,icons,illustrations,favicon}
```

---

## 7. Como adicionar um novo projeto

São até três etapas: criar a página do case, criar o card em `projetos.html`
e — só se o projeto for um dos destaques — criar o card na home.

### 7.1 · A página do case

```powershell
Copy-Item projects\projeto-template.html projects\projeto-04.html
```

Abra o arquivo novo e percorra os blocos marcados com **`>> PREENCHER`**.
Eles estão na ordem da narrativa, que é fixa e não deve ser reordenada:

```
Hero (título · subtítulo · imagem 21:9 · ficha) → Em 30 segundos + índice →
Contexto → Problema → Objetivos → Meu Papel → Processo → Solução →
Resultados → Aprendizados → Galeria (comentada até ter imagens) →
Outros projetos → Contato
```

Três regras de leitura valem para todo case:

- **Em 30 segundos** (Problema · O que eu fiz · Resultado) usa só texto que
  já está no case — nada escrito do zero para o resumo.
- **No máximo 2 parágrafos seguidos sem imagem.**
- **Outros projetos** aponta para o anterior e o próximo na ordem de
  `projetos.html`, em ciclo. Ao adicionar um case, atualize também os
  vizinhos dele.

Não esqueça do `<head>`: `title`, `description`, `canonical`, Open Graph e
Twitter Card são por página.

O texto que vem no template é **exemplo real, não lorem ipsum** — ele existe
para mostrar o nível de profundidade que um Design Manager espera ler. Use como
referência de tom e troque pelo seu conteúdo.

> **Sobre métricas:** se você não tem número real, não invente. Use métricas de
> teste (taxa de sucesso, tempo de tarefa, SUS) ou declare abertamente
> "projeto conceitual — métricas de usabilidade em protótipo". Honestidade
> convence mais do que número redondo sem fonte.

### 7.2 · O card em `projetos.html`

Todo projeto entra aqui. Dentro de `<ul class="project-grid">`, duplique um
`<li class="project-grid__item">` inteiro e troque:

- o `href` do link do título (é o **único** link do card — o `::after` dele
  cobre o card inteiro, então não há link na imagem);
- o `id` do título e o `aria-labelledby` do `<article>` — precisam ser únicos
  na página (`lista-04-titulo`);
- ano, área, título, a linha de resumo e a métrica;
- `data-project-area`: as áreas do filtro, separadas por espaço
  (`erp-varejo`, `logistica`, `mobile`, `gestao-dados`);
- o placeholder da capa (4:3);
- o selo `project-card__badge` ("Destaque"): mantenha só se o projeto também
  estiver na home; senão, apague o `<p>` inteiro.

```html
<li class="project-grid__item" data-reveal data-project-area="logistica mobile">
  <article class="project-card" aria-labelledby="lista-04-titulo">
    <figure class="media media--4x3 project-card__media">...</figure>
    <div class="project-card__body">
      <ul class="meta-list">...</ul>
      <h2 class="project-card__title" id="lista-04-titulo">
        <a class="project-card__link" href="projects/projeto-04.html">
          <span lang="pt-BR">Título em português</span><span lang="en">Title in English</span>
        </a>
      </h2>
      ...
      <p class="project-card__metric">...</p>
    </div>
  </article>
</li>
```

O contador ("3 projetos") se atualiza sozinho com JavaScript — o número no
HTML é só o fallback. O filtro por área já está no markup, escondido; o
`script.js` o mostra automaticamente quando a grade chega a **6 projetos**
(o limite é o `data-filter-min` do filtro).

### 7.3 · O card na home (só destaques)

A home mostra três projetos: um card grande (`project-card project-card--featured`,
imagem 16:9) e dois menores (`project-card`, imagem 21:9). Para trocar um
destaque, edite o `<article>` correspondente em `<div class="featured-projects">`,
com as mesmas regras do card acima (um link só, `id` único). Os títulos
aqui são `h3`, porque ficam abaixo do `h2` "Projetos em destaque".

Sem número real, não invente: use um resultado qualitativo que já esteja
escrito no case (o app de logística usa "Sem papel", tirado da seção
"O que mudou, medido" do case 2) e repita o mesmo texto em todos os lugares
onde o projeto aparece.

---

## 8. Como adicionar uma experiência

A trajetória completa vive em `sobre.html`, na seção **Experiência**: uma
`<ol class="experience">` com um card por experiência, da mais recente para a
mais antiga. Para adicionar uma, duplique um `<li class="experience__item">`
inteiro e troque o conteúdo:

```html
<li class="experience__item" data-reveal>

  <!-- Coluna da esquerda: período, local e (só na atual) o selo. -->
  <div class="experience__meta">
    <p class="experience__period">
      <span lang="pt-BR">2021 — 2023</span><span lang="en">2021 — 2023</span>
    </p>
    <p class="experience__place">
      <span lang="pt-BR">Cidade · Remoto</span><span lang="en">City · Remote</span>
    </p>
    <!-- Selo: "Atual" no trabalho principal em andamento; "Em paralelo"
         (EN "Alongside") no que corre ao mesmo tempo. Mesma classe. -->
    <!-- <p class="experience__badge"><span lang="pt-BR">Atual</span><span lang="en">Current</span></p> -->
  </div>

  <div class="experience__body">
    <h3 class="experience__role">
      <span lang="pt-BR">Cargo</span><span lang="en">Role</span>
    </h3>
    <p class="experience__org">
      <span lang="pt-BR">Empresa · área</span><span lang="en">Company · area</span>
    </p>
    <p class="experience__summary" lang="pt-BR">Uma linha sobre o que você fazia.</p>
    <p class="experience__summary" lang="en">One line about what you did.</p>

    <!-- Destaques (opcional): um resultado por linha, com link para o case.
         Sem número real, use o resultado qualitativo do case. -->
    <ul class="experience__highlights">
      <li class="experience__highlight">
        <p class="experience__highlight-text">
          <span class="experience__metric">−00%</span>
          <span lang="pt-BR">no que mudou</span><span lang="en">in what changed</span>
        </p>
        <a class="text-link" href="projects/projeto-04.html">
          <span lang="pt-BR">Ver case</span><span lang="en">View case</span>
          <span class="visually-hidden"><span lang="pt-BR">(nome do case)</span><span lang="en">(case name)</span></span>
          <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"></use></svg>
        </a>
      </li>
    </ul>

    <!-- Amostras (opcional): para trabalho que não tem case. 3 peças 4:3. -->
    <!-- <ul class="experience__samples" aria-label="Amostras de peças" data-en-aria-label="Work samples">…</ul> -->

    <ul class="chips chips--sm" aria-label="Competências usadas" data-en-aria-label="Skills used">
      <li class="chip chip--sm"><span lang="pt-BR">Competência</span><span lang="en">Skill</span></li>
    </ul>
  </div>
</li>
```

- **Destaques ou amostras.** Destaques apontam para cases; amostras mostram
  peças de trabalho que não viraram case.
- **O texto oculto do "Ver case"** diz qual é o case. Sem ele, o leitor de
  tela anuncia vários links iguais ("Ver case", "Ver case"…) sem contexto.
- **Atualize também o resumo da home.** A seção Sobre do `index.html` tem uma
  `<ul class="career-list">` com uma linha por experiência principal (cargo ·
  empresa e período). A lista completa fica em `sobre.html`.

---

## 9. Como mudar a identidade visual

Toda a linguagem visual está no bloco **02 · TOKENS** do `style.css`. Fora dele
não existe cor, raio, sombra ou duração escrita à mão.

A paleta é quente: terracota como cor de ação sobre azul-escuro (modo escuro)
ou creme (modo claro). Texto nunca é preto nem branco puro.

```css
:root {
  --color-bg:            #20293A;   /* fundo da página                    */
  --color-bg-alt:        #242E41;   /* seções alternadas                  */
  --color-surface:       #2A3549;   /* cards                              */
  --color-surface-2:     #33405A;   /* card em hover                      */
  --color-text:          #F2EDE3;
  --color-text-muted:    #B7BDCB;   /* texto secundário                   */
  --color-text-subtle:   #7B8499;   /* meta e decoração                   */
  --color-accent:        #E08A63;   /* terracota: a cor de ação           */
  --color-on-accent:    #20293A;   /* texto SOBRE a cor de destaque      */
  --color-accent-text:   #E08A63;   /* a cor de ação em texto miúdo       */
  --color-border:        rgba(242, 237, 227, .10);
}
```

O mesmo bloco traz os tokens de estado (`--color-positive`, `--color-danger`,
`--color-warning`), as lavagens de fundo (`--color-glow`, `--color-sheen`, `--color-hatch`) e
a **cor fixa do lightbox** (`--color-lightbox-*`), que é o entorno escuro do lightbox nos dois
temas — uma captura clara sobre papel claro perderia os próprios limites.

### Trocando a cor de destaque

Ao mudar `--color-accent`, **verifique três contrastes**, em cada tema:

1. `--color-accent` sobre `--color-bg` precisa de **≥ 3:1** — é cor de interface,
   filete e texto grande (escuro: 5,55:1 · claro: 4,34:1).
2. `--color-on-accent` sobre `--color-accent` precisa de **≥ 4.5:1** — é o texto
   dentro do botão primário (escuro: 5,5:1 · claro: 4,71:1).
3. `--color-accent-text` sobre `--color-bg` precisa de **≥ 4.5:1** — é a cor de ação
   em texto miúdo: eyebrow, CTA de card, link de rodapé
   (escuro: 5,55:1 · claro: 5,54:1).

O segundo é o que costuma ser esquecido, e o terceiro é o motivo de existirem
dois tokens de accent. No modo escuro, branco sobre o terracota daria 2,2:1 e
reprovaria em AA — por isso o botão primário leva o azul do fundo, e não
branco. No modo claro o accent é escuro o bastante para carregar branco, mas
claro demais para ser texto corrido: daí `--color-accent-text`, um tom abaixo.

Ferramenta: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

### Tipografia

A escala é fluida com `clamp()` — `--fs-xs` até `--fs-4xl`. O termo do meio
cresce com a viewport; o primeiro e o terceiro travam os extremos.

São **três papéis**, e misturá-los dentro de um mesmo bloco de texto é o único
erro possível aqui:

| Token | Família | Onde entra |
|---|---|---|
| `--font-display` | Bricolage Grotesque 600/800 | Hero, títulos de seção, números grandes e o monograma. Com contenção: 1 a 2 por tela |
| `--font-serif` | Source Serif 4 400/400i/600 | `.prose` e `.quote` (citação sempre em itálico) |
| `--font-sans` | Inter 400/600 | Todo o resto: navegação, rótulos, chips, botões, metadados |

Os arquivos ficam em `assets/fonts/` e são declarados na seção **00 · FONTES**
do `style.css`. Para trocar uma família, troque o `.woff2`, o `@font-face` e o
`preload` no `<head>` de **cada** arquivo HTML.

> ⚠️ As fontes são instâncias **estáticas**, não variáveis, e o `body` declara
> `font-synthesis-weight: none`. A display só existe em 600 e 800 — quem usa
> `--font-display` precisa declarar um desses dois pesos, ou o navegador cai
> no arquivo errado.

### Modo claro

O site abre no tema que o sistema pedir e guarda a escolha de quem clicar no
botão do header (`localStorage`, chave `portfolio-theme`). Sem JavaScript,
aparece o modo escuro — o padrão do projeto.

Os valores vivem em `:root[data-theme="claro"]`, logo abaixo do bloco escuro.
Só cor muda entre os dois: tipografia, espaço, medida e movimento são os
mesmos. Como nenhum componente tem cor própria, é o único lugar a mexer.

Quem escreve o atributo é o **bootstrap inline no `<head>`**, antes da
primeira pintura — é isso que evita o flash de tema errado. O `script.js` só
cuida do clique, do `aria-pressed` e da `<meta name="theme-color">`.

---

## 10. Como o CSS e o JavaScript conversam

Uma convenção de três linhas que vale para o projeto inteiro:

| Prefixo | Dono | Regra |
|---|---|---|
| `class="…"` | CSS | Nunca lido pelo JavaScript |
| `data-*` | JavaScript | Nunca usado como seletor de estilo |
| `.is-*` | Ambos | Escrito pelo JS, lido pelo CSS |

Renomear uma classe por motivo de design não pode quebrar comportamento — e
mudar um comportamento não pode exigir mexer no CSS.

### Os cinco estados que o JavaScript escreve

| Estado | Onde | Quando |
|---|---|---|
| `.is-scrolled` | `[data-header]` | A página saiu do topo |
| `.is-open` | `[data-nav-panel]` | Menu mobile aberto |
| `.is-nav-open` | `<html>` | Trava a rolagem junto com o menu |
| `.is-visible` | `[data-reveal]` | Elemento entrou no viewport |
| `.is-current` | link do `[data-scrollspy]` | Seção sendo lida |

Além disso o JS mantém corretos `aria-expanded` no botão de menu e
`aria-pressed` nos botões de idioma — que o CSS lê **diretamente**. Estado de
acessibilidade e estado visual têm uma fonte de verdade só, nunca duas.

### Animações de entrada

Basta adicionar `data-reveal` a qualquer elemento. O `IntersectionObserver`
adiciona `.is-visible` quando ele aparece e para de observá-lo em seguida.

Não existe um único listener de `scroll` no projeto.

---

## 11. Acessibilidade

O que já está implementado:

- HTML semântico com hierarquia de headings correta
- Skip link como primeiro elemento focável
- Estados de foco visíveis em tudo (`:focus-visible`, offset de 3px)
- Menu mobile com foco preso, Escape e rolagem travada
- Lightbox em `<dialog>` nativo (foco preso e fundo inerte pelo navegador)
- `alt` em todas as imagens; decorativas com `alt=""`
- Contraste AA verificado, inclusive nos estados de hover
- `@media (prefers-reduced-motion: reduce)` — nada se move, nada desaparece
- `@media (forced-colors: active)` para o modo de alto contraste do Windows
- Alvos de toque com no mínimo 44px

**Ao adicionar conteúdo, mantenha:**

- `alt` descritivo em imagens que informam; `alt=""` nas puramente decorativas
- `id` único por página (títulos de card, `aria-labelledby`)
- Um `<h1>` por página, sem pular níveis de heading
- Separadores visuais (`·`, `/`) gerados por CSS, não digitados no HTML —
  senão o leitor de tela os anuncia

**Como testar:** navegue a página inteira só com Tab, Shift+Tab, Enter e
Escape. Se você conseguir chegar em tudo e sempre enxergar onde está, está bom.

---

## 12. Performance

Metas do projeto no Lighthouse: **≥ 95** em Performance, Acessibilidade,
Boas Práticas e SEO.

O que já está feito:

- `width` e `height` em todas as imagens (CLS zero)
- `loading="lazy"` + `decoding="async"` em tudo, exceto o LCP
- Fontes locais com `preload` + `font-display: swap` — zero requisições a CDN
- Animações só com `transform` e `opacity` (nunca disparam layout)
- Ícones em sprite SVG inline — zero requisições
- Nenhum listener de `scroll`; três `IntersectionObserver` no lugar
- `will-change` em lugar nenhum: não é necessário e custa memória

**O que mais influencia a sua nota agora é o peso das imagens.** Antes de
subir:

1. Exporte em WebP quando possível (30–50% menor que JPG na mesma qualidade)
2. Comprima ([Squoosh](https://squoosh.app), [TinyPNG](https://tinypng.com))
3. Nenhuma imagem acima de ~300 KB; o hero, idealmente abaixo de 150 KB

**Minificação (opcional).** `style.css` e `script.js` são grandes porque são
densamente comentados — e o comentário é o que os deixa editáveis por você
daqui a seis meses. Em gzip, os dois somam pouco mais de 10 KB, o que já é
irrelevante. Se quiser a última migalha, minifique **só na publicação** e
mantenha estes arquivos como fonte.

**Como medir:** Chrome DevTools → aba Lighthouse → Analyze page load.
Rode em janela anônima (extensões distorcem o resultado) e sempre contra o
site publicado, nunca contra `file://`.

---

## 13. Publicando no GitHub Pages

Gratuito, e não exige nenhum build.

### Primeira vez

```bash
git init
git add .
git commit -m "Portfólio inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portfolio.git
git push -u origin main
```

No GitHub: **Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **main** · pasta **/ (root)**
- **Save**

Em um ou dois minutos o site estará em
`https://SEU-USUARIO.github.io/portfolio/`.

### Duas coisas específicas do GitHub Pages

**A URL tem o nome do repositório no caminho.** O `canonical` e as tags Open
Graph precisam refletir isso:

```html
<link rel="canonical" href="https://SEU-USUARIO.github.io/portfolio/">
```

Se você nomear o repositório como `SEU-USUARIO.github.io`, o site vai para a
raiz do domínio e o caminho extra desaparece.

**Caminhos relativos são obrigatórios.** O projeto já usa só caminhos
relativos. Se você trocar algum por absoluto (`/style.css`), ele vai procurar
na raiz do domínio e dar 404 — este é o erro mais comum no Pages.

### Atualizações seguintes

```bash
git add .
git commit -m "Novo estudo de caso"
git push
```

### Domínio próprio

**Settings → Pages → Custom domain**, e no seu provedor de DNS crie um `CNAME`
apontando para `SEU-USUARIO.github.io`. Marque **Enforce HTTPS** depois que o
certificado for emitido (leva alguns minutos).

---

## 14. Publicando na Vercel

Deploy mais rápido e *preview* automático a cada branch.

### Pelo painel (recomendado)

1. Suba o repositório para o GitHub
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório
3. Configure:
   - **Framework Preset:** `Other`
   - **Build Command:** *deixe vazio*
   - **Output Directory:** `.`
   - **Install Command:** *deixe vazio*
4. **Deploy**

Não existe build. Se a Vercel tentar rodar um, é porque o preset ficou errado.

### Pelo terminal

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # produção
```

### Domínio próprio

**Project → Settings → Domains → Add**. A Vercel mostra o registro DNS a criar
e emite o certificado sozinha.

Depois, atualize o `canonical` e as tags Open Graph para o domínio final.

---

## 15. Publicando na Netlify

A opção mais simples se você não quiser usar Git.

### Arrastando a pasta

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta do projeto para a área indicada
3. Pronto — o site sobe em segundos

Simples, mas cada atualização exige arrastar de novo.

### Conectado ao Git (recomendado)

**Add new site → Import an existing project**, escolha o repositório e
configure:

- **Build command:** *deixe vazio*
- **Publish directory:** `.`

**Deploy site.** A partir daí, todo `git push` publica sozinho.

### Domínio próprio

**Site configuration → Domain management → Add a domain**. A Netlify emite o
certificado Let's Encrypt automaticamente.

---

## 16. Manutenção — o que não quebrar

**Um valor está duplicado de propósito.** O breakpoint de **56rem** (896px),
onde o menu mobile vira navegação desktop, existe no `style.css` e no
`script.js`. O JavaScript precisa dele para fechar o menu quando a janela
cresce, e media queries não são legíveis a partir da folha de estilo sem varrer
o CSSOM. **Se mudar em um, mude no outro.** Está comentado nos dois arquivos.

**A ordem dos gêmeos de idioma importa no hero.** As animações de entrada usam
`nth-child` para escalonar os elementos, e os gêmeos escondidos continuam
ocupando posição na contagem. Ao adicionar ou remover um parágrafo dentro de
`.hero__content`, confira o bloco **07** do `style.css`.

**O sprite de ícones é duplicado em cada página.** É inline de propósito: um
`<use href="sprite.svg#id">` externo falha ao abrir o arquivo localmente e
adiciona uma requisição. Ao criar um ícone novo, adicione o `<symbol>` em
**todas** as páginas.

**Não use `class` como seletor no JavaScript.** Toda âncora de comportamento é
`data-*`. É o que permite refatorar o CSS sem medo.

**Não coloque `style="..."` no HTML.** Se um valor precisa variar, ele vira uma
Custom Property no bloco de tokens.

**Ao renomear um `id` de seção**, atualize os links da navegação nos **quatro**
arquivos HTML — o scrollspy resolve o resto sozinho.

---

## Licença

Código livre para usar como base do seu próprio portfólio.
O conteúdo — textos, estudos de caso e imagens — é de Arthur Souza.
#   p o r t f o l i o - a r t h u r  
 