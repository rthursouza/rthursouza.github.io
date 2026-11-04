# Reestruturação do portfólio — handoff

Decisões fechadas em 02/11/2026, a partir do wireframe aprovado
(canvas "Wireframe Portfólio Arthur" no claude.ai: Home desktop, /projetos,
topo do case e Home mobile).

**Objetivo:** os projetos aparecem cedo e com menos texto. Imagem e resultado
fazem o trabalho que o parágrafo faz hoje.

> Antes de começar: o repositório não tem nenhum commit. Faça um commit do
> estado atual para ter para onde voltar.

---

## Regras que continuam valendo

- Seguir as convenções do comentário no topo do `index.html`:
  - textos PT/EN como gêmeos dentro do mesmo elemento;
  - `data-en-*` para atributos;
  - `class` só para estilo, `data-*` só para JS, `.is-*` para estado.
- Usar os tokens e as fontes que já existem (bloco 02 · TOKENS do `style.css`, `assets/fonts/`). O wireframe é cinza de propósito: **não copie as cores dele**, só a estrutura.
- Slots de imagem continuam como placeholder com proporção reservada (sem layout shift), com o `<img>` real comentado logo abaixo.
- Não inventar conteúdo nem métrica. Onde faltar, deixe um placeholder visível `[ASSIM]`.

---

## 1. Home (`index.html`)

Ordem: **Header → Hero → Projetos em destaque → Sobre (curto) → Contato → Footer.**
Altura alvo no desktop: cerca de 2.700px (hoje são cerca de 4.700px).

### Header
- Nav: Projetos (leva a `projetos.html`) · Sobre (`#sobre`) · Contato (`#contato`) · PT/EN · tema · botão **Currículo** (PDF).
- Sai o item "Início", porque o logo já leva ao topo.

### Hero (mais curto)
- Eyebrow: "● Disponível para novas oportunidades · Rio de Janeiro / Remoto"
- H1: Arthur Souza
- Subtítulo: UX & Product Designer · ERP e B2B
- **Uma** frase: "Seis anos desenhando o tipo de tela que ninguém escolhe abrir, mas que alguém usa por oito horas."
- CTAs: **Ver projetos ↓** (primário) e **Vamos conversar** (secundário).
- Foto de perfil em 1:1, menor (máximo de ~280px), à direita.
- **Remover** a frase do DVD do hero. Ela vai para o Sobre.
- **Não** colocar faixa de stats (Experiência / Foco / Clientes / Base). Ela foi removida de propósito: essas informações já estão no texto.

### Projetos em destaque
- Cabeçalho numa linha só: "Projetos em destaque" à esquerda, "Ver todos os projetos →" à direita.
- **Remover** o título longo ("Três problemas e o que aprendi…") e o parágrafo introdutório.
- **Card grande (PDV)**, horizontal, ocupando a largura toda:
  - imagem à esquerda em **16:9**, com altura máxima de ~340px;
  - texto à direita:
    - meta: Nasajon · 2026 · ERP & Varejo;
    - título: "Um PDV que sai do balcão";
    - uma linha: "Redesenho mobile-first do ponto de venda para quem atende longe do caixa.";
    - **métrica em destaque**: −30% / "no tempo de fechamento de venda";
    - link "Ver estudo de caso →".
  - Sem tags de ferramenta no card.
- **Dois cards menores** lado a lado (grid de 2 colunas, empilhando no mobile):
  - imagem em cima, em **21:9**;
  - meta, título, uma linha e métrica.
  - Logística: "A próxima parada, e a prova" · "App de entrega com rota otimizada e prova digital no lugar do papel." · métrica **[PENDENTE]**.
  - Roteirização: "Rota calculada, decisão preservada" · "Roteirização automática por veículo, peso e distância, sem tirar a palavra final do gestor." · **−40%** / "no custo por rota".
- O card inteiro é clicável (um único `<a>`), com foco visível.

### Sobre (curto)
- Duas colunas: à esquerda, o eyebrow "Sobre" e o título "Design é decidir o que não construir"; à direita, **um** parágrafo:
  > Comecei fazendo capa de DVD. Hoje desenho os sistemas em que mais de 100 empresas trabalham todo dia. Antes da primeira tela, converso com o suporte para saber o que está quebrando e com a engenharia para saber o que dá para construir.
- Links: Baixar currículo (PDF) ↗ · LinkedIn ↗
- **Remover:** os 3 parágrafos atuais, o grid de stats e **toda a seção de Habilidades** (os 22 chips). As habilidades passam a aparecer só dentro dos cases.

### Contato
- Bloco único:
  - título: "Tem um problema difícil? Vamos conversar.";
  - texto: "Respondo todos os e-mails em até 48 horas.";
  - botões: e-mail e LinkedIn.
- Fica mais baixo que o atual.

### Footer
- Igual ao atual, com o link "Projetos" adicionado.

---

## 2. Nova página `projetos.html` (na raiz)

- Mesmo header e footer da home. "Projetos" aparece como item ativo (`aria-current="page"`).
- Breadcrumb: Início / Projetos.
- H1 "Projetos", uma linha de descrição ("Estudos de caso de ERP, varejo e logística: do discovery ao resultado medido.") e o contador "3 projetos".
- **Filtro por área:** ERP & Varejo · Logística · Mobile · Gestão & Dados. **Fica escondido enquanto houver menos de 6 projetos**, mas o markup já deve estar pronto para ele.
- Grid uniforme, `auto-fill` com mínimo de ~320px.
  - Cada card: imagem 4:3, selo "Destaque" nos 3 atuais, meta (ano · área), título, uma linha e métrica.
- Bloco de contato curto no fim: "Quer ver algum projeto em detalhe numa conversa?" e o botão de e-mail.
- Atualizar os breadcrumbs dos cases (Início / **Projetos** / Nome), com o link apontando para `projetos.html`.

---

## 3. Páginas de case (`projects/projeto-01..03.html` e o template)

Manter o conteúdo atual. As mudanças são de estrutura de leitura:

1. **Topo:** breadcrumb → eyebrow → título → subtítulo de uma linha → imagem hero 21:9 → **ficha** (Papel · Time · Duração · Ferramentas). A ficha já existe. Só precisa ficar numa faixa horizontal logo abaixo da imagem.
2. **Novo bloco "Em 30 segundos"**, logo depois da ficha, com 3 cartões:
   - Problema (uma ou duas frases);
   - O que eu fiz (uma ou duas frases);
   - **Resultado** (métrica grande, em destaque).
   - Use o texto que já existe no case. Não invente.
3. **Índice clicável** das seções (Contexto · Problema · Processo · Solução · Resultado · Aprendizados), em chips com âncoras.
4. **Ritmo:** no máximo 2 parágrafos entre uma imagem e outra. Seções com título à esquerda e conteúdo à direita no desktop.
5. **Fala de usuário** em destaque (blockquote grande) na seção Problema.
6. **Fim da página:** "Outros projetos", com os cards de anterior e próximo e o link "Ver todos →".

---

## 4. Responsivo

- Home mobile (390px): hero empilhado com a foto abaixo do texto, card grande empilhado (imagem em cima) e cards menores em uma coluna.
- Nada de scroll horizontal. Alvos de toque de pelo menos 44px.

## 5. Pendências (dependem do Arthur)

- [ ] Métrica do app de logística (ou um resultado qualitativo forte no lugar).
- [ ] Imagens reais: foto 1:1, capa do PDV em 16:9 e capas em 21:9 para os cards menores.
  - Com o corte 21:9, use 2 ou 3 telas lado a lado ou um recorte de detalhe. Um celular em pé fica pequeno.
- [ ] Capas 4:3 para a página `/projetos` (podem ser recortes das mesmas imagens).
- [ ] Revisar a versão EN dos textos novos.

## Checklist de entrega

- [ ] Home sem a seção de habilidades e sem a faixa de stats.
- [ ] `projetos.html` criada e linkada no header, na home e nos cases.
- [ ] "Em 30 segundos" e índice nos 3 cases e no template.
- [ ] PT/EN funcionando nos textos novos.
- [ ] Testado em 1440px, 768px e 390px.
