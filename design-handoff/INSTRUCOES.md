# Handoff — aplicar paleta "Papel & Tinta" + tipografia ao portfólio

Pacote nesta pasta (`design-handoff/`):

- `tokens.css` — valores de cor, tipografia e sombra, já traduzidos para os **nomes de token que o `style.css` do portfólio já usa** (`--c-*`, `--font-*`, `--shadow*`), com contrastes WCAG calculados. Modo escuro (padrão do site) + modo claro opcional.
- `fonts/` — 7 arquivos .woff2 locais (Bricolage Grotesque 600/800, Source Serif 4 400/400i/600, Inter 400/600). Subset latin, cobre pt-BR, licença OFL, ~154 KB.

## Por que a aplicação é simples

O `style.css` do portfólio concentra tudo no bloco `:root` (seção `02 · TOKENS`) — fora dele não há cor escrita à mão. Logo, **a reskin é trocar valores nesse bloco, não reescrever componentes**. A tipografia é o único ponto que adiciona tokens novos (`--font-display` e `--font-serif`), porque o site hoje só tem `--font-sans`.

## Prompt sugerido para o Claude no VS Code

> Aplique a nova identidade visual ao portfólio usando `design-handoff/tokens.css` como fonte de valores. Regras:
>
> 1. **Não importe o tokens.css**: substitua os valores no bloco `:root · 02 · TOKENS` do `style.css`, mantendo os nomes de token existentes. Adicione os tokens novos `--font-display`, `--font-serif` e os de estado (`--c-positive`, `--c-danger`, `--c-warning`).
> 2. **Fontes locais**: copie os `@font-face` do tokens.css para o topo do `style.css` (ajuste os caminhos para `design-handoff/fonts/…` ou mova a pasta para `assets/fonts/`). Remova os `<link>` de `fonts.googleapis.com` (preconnect e stylesheet) do `index.html` e de todos os `projects/*.html`.
> 3. **Hierarquia tipográfica**: headings de peso display (hero, títulos de seção, números grandes) passam a `--font-display` (pesos 600/800, com contenção — 1 a 2 ocorrências por tela); prosa longa de cases (`.prose`) e citações (`.quote`, sempre em itálico) passam a `--font-serif`; todo o resto (nav, labels, chips, botões, meta) permanece `--font-sans` (Inter). **Mantenha a escala fluida `--fs-*` e os line-heights atuais** — só as famílias mudam.
> 4. **Contraste**: os pares já foram verificados (comentários no tokens.css). Atenção a dois pontos: texto sobre o accent usa `--c-accent-ink` (nunca branco no modo escuro); no modo claro, `#C1502E` só passa AA em texto grande/UI — texto corrido em accent usa `#A8431F`.
> 5. **Proibições da identidade**: nada de preto `#000` ou branco `#FFF` puros como texto/fundo dominantes (no modo claro, `#FFFFFF` é permitido como superfície de card); sem gradientes chamativos, neon ou glassmorphism — os tons `--c-glass`/`--c-overlay` já estão reencaixados na paleta.
> 6. **Favicon**: o SVG inline no `<head>` usa `#0B0B0F` e `#4F8CFF` — atualize para `#20293A` (fundo) e `#E08A63` (letra).
> 7. Verifique depois: nenhuma ocorrência restante de `#4F8CFF`, `#0B0B0F`, `fonts.googleapis` ou de hex antigo fora do bloco de tokens (`grep` no projeto inteiro, incluindo `script.js`, `og-generator.html` e os meta theme-color dos HTML).
> 8. O modo claro (`[data-theme="claro"]` no tokens.css) é opcional — só implemente a alternância se eu pedir.

## Mapa de equivalência (resumo)

| Token do portfólio | Antes (azul/preto) | Escuro novo | Claro novo (opcional) |
|---|---|---|---|
| `--c-bg` | `#0B0B0F` | `#20293A` | `#FAF5EB` |
| `--c-surface` | `#15151C` | `#2A3549` | `#FFFFFF` |
| `--c-text` | `#FFFFFF` | `#F2EDE3` | `#27364B` |
| `--c-text-muted` | `#A1A1AA` | `#B7BDCB` | `#56607A` |
| `--c-accent` | `#4F8CFF` | `#E08A63` | `#C1502E` |
| `--c-accent-ink` | `#06060A` | `#20293A` | `#FFFFFF` |
| `--font-sans` | Inter (CDN) | Inter (local) | idem |
| *(novo)* `--font-display` | — | Bricolage Grotesque | idem |
| *(novo)* `--font-serif` | — | Source Serif 4 | idem |

Racional da paleta: papel quente + tinta de caneta; o terracota é a cor de ação/destaque, sempre sobre bases serenas. Texto nunca é preto ou branco puro — é tinta sobre papel (escuro: papel à luz de abajur).
