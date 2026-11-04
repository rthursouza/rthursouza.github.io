/* ============================================================================
   PORTFÓLIO — ARTHUR SOUZA · PRODUCT DESIGNER
   ----------------------------------------------------------------------------
   Arquivo : script.js
   Stack   : JavaScript Vanilla (ES6+) · sem dependências · sem build

   CARREGAMENTO
   ------------
   Este arquivo é incluído com <script defer>: executa depois do HTML estar
   parseado e antes do DOMContentLoaded. Por isso não há wrapper de "espere o
   DOM" — quando o código roda, o documento inteiro já existe.

   O único JavaScript fora daqui é o bootstrap inline no <head>, que roda
   antes da primeira pintura para trocar .no-js por .js e restaurar o idioma
   escolhido (evita dois flashes visuais).

   CONTRATO COM O CSS
   ------------------
   Este script só escreve os estados abaixo. O CSS só lê estes estados.
   Nenhum dos dois conhece os seletores do outro.

     .is-scrolled   em [data-header]        header saiu do topo
     .is-open       em [data-nav-panel]     drawer mobile aberto
     .is-nav-open   em <html>               trava a rolagem do documento
     .is-visible    em [data-reveal]        elemento entrou no viewport
     .is-current    em link do [data-scrollspy]
     data-theme     em <html>               tema em vigor: claro | escuro

   Além disso mantém corretos os atributos que o CSS lê diretamente:
   aria-expanded em [data-nav-toggle] e aria-pressed em [data-lang-value],
   em [data-theme-toggle] e em [data-filter-value]. E escreve hidden em
   [data-project-filter] e nos itens de [data-project-grid] (/projetos).
   Estado de acessibilidade e estado visual têm uma fonte de verdade só.

   REGRAS DE MARCAÇÃO (herdadas do HTML)
   -------------------------------------
   O JavaScript NUNCA seleciona por class. Toda âncora de comportamento é um
   data-*. Assim, renomear uma classe por motivo de design nunca quebra o
   comportamento — e vice-versa.

   PERFORMANCE
   -----------
   Não existe um único listener de 'scroll' neste arquivo. Header, animações
   de entrada e scrollspy usam IntersectionObserver, que o navegador avalia
   fora da thread principal e só notifica quando algo realmente muda.

   MÓDULOS
   -------
   01 · Utilitários
   02 · Ano corrente
   03 · Idioma (pt-BR ⇄ en)
   04 · Tema (claro ⇄ escuro)
   05 · Estado do header
   06 · Animações de entrada
   07 · Menu mobile
   08 · Scrollspy
   09 · Lightbox
   10 · Filtro e contador de projetos
   11 · Inicialização
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     01 · UTILITÁRIOS
     ========================================================================== */

  const $ = (selector, context = document) => context.querySelector(selector);

  const $$ = (selector, context = document) =>
    Array.prototype.slice.call(context.querySelectorAll(selector));

  const root = document.documentElement;

  const supportsIO = 'IntersectionObserver' in window;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* O mesmo breakpoint de 56rem usado no CSS para trocar o drawer pela
     navegação horizontal. Duplicado aqui por necessidade — media queries não
     são legíveis a partir da folha de estilo sem varrer o CSSOM. Se o valor
     mudar no CSS, precisa mudar aqui. */
  const desktopQuery = window.matchMedia('(min-width: 56rem)');

  /* Evento próprio, disparado ao trocar de idioma. Permite que módulos
     independentes (hoje o lightbox) reajam sem que o módulo de idioma
     precise conhecê-los. */
  const LANG_CHANGE_EVENT = 'portfolio:langchange';

  /* Compatibilidade: Safari < 14 só tem addListener em MediaQueryList. */
  function onMediaChange(mediaQuery, handler) {
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handler);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handler);
    }
  }


  /* ==========================================================================
     02 · ANO CORRENTE
     Mantém o rodapé correto sem edição manual. Há dois [data-year] por
     página — um em cada idioma.
     ========================================================================== */

  function initYear() {
    const year = String(new Date().getFullYear());
    $$('[data-year]').forEach((element) => {
      element.textContent = year;
    });
  }


  /* ==========================================================================
     03 · IDIOMA
     --------------------------------------------------------------------------
     O texto visível é trocado inteiramente pelo CSS: cada frase existe nos
     dois idiomas no HTML e a folha de estilo esconde a inativa. Este módulo
     cuida apenas do que o CSS não alcança:

       • o atributo lang e o data-lang em <html> (que ligam a regra do CSS);
       • texto que vive dentro de atributos (alt, aria-label, content) e o
         <title>, declarados no HTML como data-en-<atributo> / data-en;
       • aria-pressed dos dois botões do seletor;
       • persistência da escolha em localStorage.

     Os valores em português são lidos uma única vez, na inicialização, e
     guardados em memória. Não existe dicionário externo e nenhum texto é
     duplicado em JavaScript: a fonte de verdade continua sendo o HTML.
     ========================================================================== */

  const LANG_STORAGE_KEY = 'portfolio-lang';
  const LANG_PT = 'pt-BR';
  const LANG_EN = 'en';
  const EN_ATTR_PREFIX = 'data-en-';

  /* Varre o documento uma vez e monta a lista de atributos traduzíveis.
     Inclui o <head>: title e as metas de SEO também têm gêmeo em inglês. */
  function collectLangTargets() {
    const targets = [];
    const elements = document.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      const attributes = element.attributes;
      let pairs = null;

      for (let j = 0; j < attributes.length; j += 1) {
        const name = attributes[j].name;
        const englishValue = attributes[j].value;

        if (name === 'data-en') {
          /* Sem sufixo = o próprio conteúdo de texto do elemento (<title>). */
          pairs = pairs || [];
          pairs.push({ attribute: null, pt: element.textContent, en: englishValue });
        } else if (name.indexOf(EN_ATTR_PREFIX) === 0) {
          const attribute = name.slice(EN_ATTR_PREFIX.length);
          pairs = pairs || [];
          pairs.push({
            attribute: attribute,
            pt: element.getAttribute(attribute) || '',
            en: englishValue
          });
        }
      }

      if (pairs) {
        targets.push({ element: element, pairs: pairs });
      }
    }

    return targets;
  }

  function applyLangToAttributes(targets, lang) {
    const useEnglish = lang === LANG_EN;

    targets.forEach((target) => {
      target.pairs.forEach((pair) => {
        const value = useEnglish ? pair.en : pair.pt;

        if (pair.attribute === null) {
          target.element.textContent = value;
        } else {
          target.element.setAttribute(pair.attribute, value);
        }
      });
    });
  }

  function initLang() {
    const switches = $$('[data-lang-switch]');
    const buttons = $$('[data-lang-value]');
    const targets = collectLangTargets();

    /* O bootstrap inline já pôde ter escrito data-lang="en" antes da pintura
       — mas ele só mexe em <html>. Os atributos ainda estão em português, e
       é esta primeira chamada que os sincroniza. */
    const initialLang = root.getAttribute('data-lang') === LANG_EN ? LANG_EN : LANG_PT;

    function setLang(lang, persist) {
      root.setAttribute('lang', lang);

      if (lang === LANG_EN) {
        root.setAttribute('data-lang', LANG_EN);
      } else {
        root.removeAttribute('data-lang');
      }

      applyLangToAttributes(targets, lang);

      buttons.forEach((button) => {
        const isActive = button.getAttribute('data-lang-value') === lang;
        button.setAttribute('aria-pressed', String(isActive));
      });

      if (persist) {
        try {
          window.localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch (error) {
          /* Modo privado ou storage bloqueado: a troca funciona nesta
             sessão, apenas não sobrevive ao recarregamento. */
        }
      }

      document.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: { lang } }));
    }

    /* Delegação: um listener por grupo, não um por botão. */
    switches.forEach((group) => {
      group.addEventListener('click', (event) => {
        const button = event.target.closest('[data-lang-value]');
        if (!button || !group.contains(button)) return;

        const lang = button.getAttribute('data-lang-value');
        if (lang !== LANG_PT && lang !== LANG_EN) return;
        if (lang === root.getAttribute('lang')) return;

        setLang(lang, true);
      });
    });

    setLang(initialLang, false);
  }


  /* ==========================================================================
     04 · TEMA
     --------------------------------------------------------------------------
     O trabalho pesado já foi feito: o bootstrap inline do <head> resolveu o
     tema antes da primeira pintura — preferência salva, senão a do sistema.
     Quando este módulo roda, data-theme já está escrito e a página já está
     com a cor certa. Sobra para cá apenas o que depende de interação:

       • alternar o atributo no clique e guardar a escolha;
       • manter o aria-pressed dos botões (o mesmo atributo que o CSS lê para
         decidir qual ícone mostrar — uma fonte de verdade só);
       • acompanhar a preferência do sistema enquanto ninguém escolheu nada;
       • manter a <meta name="theme-color"> em dia, que é a cor da barra do
         navegador no celular.

     O valor do theme-color é lido do próprio --c-bg já computado, em vez de
     repetido aqui. O bloco de tokens continua sendo o único lugar do projeto
     onde uma cor é escrita.
     ========================================================================== */

  const THEME_STORAGE_KEY = 'portfolio-theme';
  const THEME_LIGHT = 'claro';
  const THEME_DARK = 'escuro';

  function initTheme() {
    const buttons = $$('[data-theme-toggle]');
    const themeMeta = $('meta[name="theme-color"]');
    const systemLight = window.matchMedia('(prefers-color-scheme: light)');

    let chosen = null;

    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === THEME_LIGHT || saved === THEME_DARK) chosen = saved;
    } catch (error) {
      /* Modo privado ou storage bloqueado: a troca vale só nesta sessão. */
    }

    function setTheme(theme, persist) {
      root.setAttribute('data-theme', theme);

      buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(theme === THEME_LIGHT));
      });

      /* Depois de trocar o atributo: a leitura tem de pegar o valor novo. */
      if (themeMeta) {
        const bg = getComputedStyle(root).getPropertyValue('--c-bg').trim();
        if (bg) themeMeta.setAttribute('content', bg);
      }

      if (persist) {
        chosen = theme;
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
          /* Idem: a escolha simplesmente não sobrevive ao recarregamento. */
        }
      }
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === THEME_LIGHT;
        setTheme(isLight ? THEME_DARK : THEME_LIGHT, true);
      });
    });

    /* Enquanto a pessoa não escolheu, o site acompanha o sistema ao vivo —
       inclusive quando o próprio sistema troca sozinho ao anoitecer. */
    onMediaChange(systemLight, (event) => {
      if (chosen) return;
      setTheme(event.matches ? THEME_LIGHT : THEME_DARK, false);
    });

    /* Sincroniza aria-pressed e theme-color com o que o bootstrap já pintou. */
    setTheme(root.getAttribute('data-theme') === THEME_LIGHT ? THEME_LIGHT : THEME_DARK, false);
  }


  /* ==========================================================================
     05 · ESTADO DO HEADER
     --------------------------------------------------------------------------
     Uma sentinela de 1px posicionada 4rem abaixo do topo. Enquanto ela está
     visível, estamos no topo da página. Quando sai, o header ganha fundo.

     Um listener de scroll dispararia dezenas de vezes por segundo para
     responder a uma pergunta binária. O observer responde duas vezes: quando
     cruza para dentro e quando cruza para fora.
     ========================================================================== */

  function initHeaderState() {
    const header = $('[data-header]');
    const sentinel = $('[data-nav-sentinel]');

    if (!header || !sentinel || !supportsIO) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
      });
    });

    observer.observe(sentinel);
  }


  /* ==========================================================================
     06 · ANIMAÇÕES DE ENTRADA
     --------------------------------------------------------------------------
     Cada [data-reveal] recebe .is-visible ao entrar no viewport e é
     imediatamente desobservado: a animação acontece uma vez, e o observer
     encolhe conforme a pessoa rola. Ao fim da página não sobra nada sendo
     observado.

     O fade-in e o slide-up em si são do CSS (opacity + transform). O JS só
     informa "chegou a hora" — separação que mantém a animação inteiramente
     na thread de composição.
     ========================================================================== */

  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    /* Sem IntersectionObserver ou com movimento reduzido: tudo visível de
       imediato. O conteúdo nunca depende da animação para existir. */
    if (!supportsIO || reducedMotion.matches) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, self) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          self.unobserve(entry.target);
        });
      },
      {
        /* A margem inferior negativa segura o disparo até o elemento estar
           confortavelmente dentro da tela, e não colado na borda. */
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
      }
    );

    items.forEach((item) => observer.observe(item));

    /* Se a pessoa ativar "reduzir movimento" com a página aberta, o que
       ainda não apareceu passa a aparecer sem animação. */
    onMediaChange(reducedMotion, (event) => {
      if (!event.matches) return;
      items.forEach((item) => {
        item.classList.add('is-visible');
        observer.unobserve(item);
      });
    });
  }


  /* ==========================================================================
     07 · MENU MOBILE
     --------------------------------------------------------------------------
     Painel lateral com escurecimento, rolagem travada, foco preso e fechamento
     por Escape, clique no fundo, clique em qualquer link ou mudança para
     desktop.

     Sobre o aria-label do botão: ele continua sendo "Abrir menu" nos dois
     estados, de propósito. Quem muda é o aria-expanded — que é exatamente o
     atributo criado para comunicar aberto/fechado. Reescrever o label criaria
     um segundo dono para a mesma informação e entraria em conflito com a
     troca de idioma, que também escreve nesse atributo.
     ========================================================================== */

  function initNav() {
    const toggle = $('[data-nav-toggle]');
    const panel = $('[data-nav-panel]');
    const backdrop = $('[data-nav-backdrop]');

    if (!toggle || !panel) return;

    let isOpen = false;

    /* Recalculado a cada abertura: o conteúdo focável do painel muda com o
       idioma ativo (os gêmeos escondidos não devem entrar na conta). */
    function focusableItems() {
      const inPanel = $$('a[href], button:not([disabled])', panel).filter(
        (element) => element.getClientRects().length > 0
      );
      /* O botão de fechar vem depois do painel na ordem do documento. */
      return inPanel.concat([toggle]);
    }

    function open() {
      if (isOpen) return;
      isOpen = true;

      panel.classList.add('is-open');
      root.classList.add('is-nav-open');
      toggle.setAttribute('aria-expanded', 'true');

      if (backdrop) backdrop.hidden = false;

      const items = focusableItems();
      if (items.length) items[0].focus();
    }

    function close(restoreFocus) {
      if (!isOpen) return;
      isOpen = false;

      panel.classList.remove('is-open');
      root.classList.remove('is-nav-open');
      toggle.setAttribute('aria-expanded', 'false');

      if (backdrop) backdrop.hidden = true;

      if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => {
      if (isOpen) close(true);
      else open();
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => close(true));
    }

    /* Delegação: qualquer link dentro do painel fecha o menu antes de
       navegar. Vale tanto para âncoras da própria página quanto para os
       links que apontam para ../index.html a partir de um case. */
    panel.addEventListener('click', (event) => {
      if (!isOpen) return;
      const link = event.target.closest('a[href]');
      if (link && panel.contains(link)) close(false);
    });

    /* Foco preso: enquanto o menu cobre a tela, Tab circula apenas entre o
       painel e o botão que o abriu. Sem isto, a tabulação continuaria para
       o conteúdo escondido atrás do escurecimento. */
    document.addEventListener('keydown', (event) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }

      if (event.key !== 'Tab') return;

      const items = focusableItems();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* Ao chegar no desktop o painel volta a ser uma barra horizontal.
       Fechar aqui é obrigatório: senão a trava de rolagem em <html>
       sobreviveria à mudança de largura. */
    onMediaChange(desktopQuery, (event) => {
      if (event.matches) close(false);
    });
  }


  /* ==========================================================================
     08 · SCROLLSPY
     --------------------------------------------------------------------------
     Marca no menu qual seção está sendo lida. Observa uma faixa horizontal
     entre 25% e 45% da altura da tela: a seção que cruza essa faixa é a
     seção "em leitura". Se nenhuma cruzar (topo ou fim da página), o último
     valor conhecido é mantido — evita o menu piscar entre estados.

     Só o estado visual (.is-current) é escrito. Não escrevemos aria-current
     porque ele mudaria continuamente durante a rolagem, e um valor de
     "página atual" que muda sozinho é mais ruído do que informação — a
     estrutura de headings já orienta quem usa leitor de tela.
     ========================================================================== */

  function initScrollSpy() {
    const list = $('[data-scrollspy]');
    if (!list || !supportsIO) return;

    /* Map preserva a ordem de inserção: é ela que define "a primeira seção
       visível na ordem do documento". */
    const sections = new Map();

    $$('a[href*="#"]', list).forEach((link) => {
      const id = (link.hash || '').slice(1);
      if (!id) return;

      const section = document.getElementById(decodeURIComponent(id));
      if (section) sections.set(section, link);
    });

    if (!sections.size) return;

    const visible = new Set();
    let current = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });

        let next = null;
        sections.forEach((link, section) => {
          if (next === null && visible.has(section)) next = section;
        });

        if (next === null || next === current) return;
        current = next;

        sections.forEach((link, section) => {
          link.classList.toggle('is-current', section === current);
        });
      },
      { rootMargin: '-25% 0px -55% 0px' }
    );

    sections.forEach((link, section) => observer.observe(section));
  }


  /* ==========================================================================
     09 · LIGHTBOX
     --------------------------------------------------------------------------
     Usa o <dialog> nativo. Ele entrega, sem uma linha de JavaScript de
     acessibilidade: foco preso, Escape para fechar, conteúdo de fundo inerte,
     ::backdrop e devolução do foco ao fechar.

     O que sobra para o script: trocar a imagem, navegar entre elas e manter
     o contador. E, se o navegador não suportar showModal, não fazer nada —
     cada item da galeria é um <a> para a imagem em tamanho real, então o
     clique continua funcionando pelo comportamento padrão do navegador.
     ========================================================================== */

  function initLightbox() {
    const dialog = $('[data-lightbox]');
    const gallery = $('[data-gallery]');

    if (!dialog || !gallery || typeof dialog.showModal !== 'function') return;

    const image = $('[data-lightbox-image]', dialog);
    const caption = $('[data-lightbox-caption]', dialog);
    const counter = $('[data-lightbox-counter]', dialog);
    const closeButton = $('[data-lightbox-close]', dialog);
    const prevButton = $('[data-lightbox-prev]', dialog);
    const nextButton = $('[data-lightbox-next]', dialog);
    const links = $$('a[href]', gallery);

    if (!image || !links.length) return;

    /* A área clicável "vazia" ao redor da imagem — clicar nela fecha. */
    const figure = image.parentElement;

    let index = 0;

    /* O contador tem um rótulo oculto ("Imagem") seguido do texto "1 / 6".
       Trocar o textContent do <p> apagaria o rótulo, então isolamos o número
       em um nó de texto próprio e mexemos apenas nele. */
    const counterText = document.createTextNode('');

    if (counter) {
      Array.prototype.slice.call(counter.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) counter.removeChild(node);
      });
      counter.appendChild(counterText);
    }

    function isEnglish() {
      return root.getAttribute('data-lang') === LANG_EN;
    }

    function render() {
      const link = links[index];
      if (!link) return;

      const captionPt = link.getAttribute('data-caption') || '';
      const captionEn = link.getAttribute('data-caption-en') || captionPt;
      const text = isEnglish() ? captionEn : captionPt;

      /* O alt vem da miniatura quando ela existe. Quando não existe, fica
         vazio de propósito: a legenda está no mesmo <figure> e descreve a
         imagem — repetir o texto faria o leitor de tela anunciar duas vezes. */
      const thumb = link.querySelector('img');

      image.src = link.href;
      image.alt = thumb ? thumb.getAttribute('alt') || '' : '';

      if (caption) caption.textContent = text;
      counterText.nodeValue = ' ' + (index + 1) + ' / ' + links.length;

      /* Galeria de um item só não precisa de setas. */
      const single = links.length < 2;
      if (prevButton) prevButton.hidden = single;
      if (nextButton) nextButton.hidden = single;

      preload(index + 1);
      preload(index - 1);
    }

    /* Antecipa o vizinho para que a navegação pareça instantânea. */
    function preload(position) {
      const link = links[(position + links.length) % links.length];
      if (!link) return;
      const preloader = new Image();
      preloader.src = link.href;
    }

    function open(startIndex) {
      index = startIndex;
      render();
      dialog.showModal();
    }

    function go(step) {
      index = (index + step + links.length) % links.length;
      render();
    }

    /* Delegação: um listener na galeria inteira, não um por item. */
    gallery.addEventListener('click', (event) => {
      /* Deixa passar Ctrl/Cmd/Shift-clique e o botão do meio: quem quer
         abrir a imagem em outra aba continua conseguindo. */
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof event.button === 'number' && event.button !== 0) return;

      const link = event.target.closest('a[href]');
      if (!link || !gallery.contains(link)) return;

      const position = links.indexOf(link);
      if (position === -1) return;

      event.preventDefault();
      open(position);
    });

    if (closeButton) closeButton.addEventListener('click', () => dialog.close());
    if (prevButton) prevButton.addEventListener('click', () => go(-1));
    if (nextButton) nextButton.addEventListener('click', () => go(1));

    /* Clique fora da imagem fecha. Escape já é nativo do <dialog>. */
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || event.target === figure) dialog.close();
    });

    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
      }
    });

    /* O <dialog> devolve o foco a quem estava focado antes de abrir. Depois
       de navegar entre imagens, porém, o item certo é o que está sendo visto
       — e não aquele em que se clicou lá atrás. */
    dialog.addEventListener('close', () => {
      const link = links[index];
      if (link) link.focus();
    });

    /* Trocar de idioma com o visualizador aberto atualiza a legenda. */
    document.addEventListener(LANG_CHANGE_EVENT, () => {
      if (dialog.open) render();
    });
  }


  /* ==========================================================================
     10 · FILTRO E CONTADOR DE PROJETOS (/projetos.html)
     --------------------------------------------------------------------------
     O contador é sempre recalculado a partir da grade: o número escrito no
     HTML é só o fallback sem JavaScript, e quem adiciona um projeto não
     precisa lembrar de atualizá-lo.

     O filtro nasce com hidden no HTML e só é revelado quando a grade tem
     pelo menos data-filter-min itens. Abaixo disso, continua escondido e
     inerte. Filtrar esconde os <li> pelo atributo hidden — que o CSS já faz
     vencer qualquer display — e reescreve o contador e o singular/plural.
     ========================================================================== */

  const FILTER_ALL = 'todos';

  function initProjectFilter() {
    const grid = $('[data-project-grid]');
    if (!grid) return;

    const items = $$('[data-project-area]', grid);
    const counts = $$('[data-project-count]');
    const nouns = $$('[data-plural-other]');
    const empty = $('[data-project-empty]');
    const filter = $('[data-project-filter]');

    function renderCount(total) {
      counts.forEach((element) => {
        element.textContent = String(total);
      });
      nouns.forEach((element) => {
        const key = total === 1 ? 'data-plural-one' : 'data-plural-other';
        element.textContent = element.getAttribute(key) || element.textContent;
      });
      if (empty) empty.hidden = total > 0;
    }

    renderCount(items.length);

    if (!filter) return;

    const minimum = parseInt(filter.getAttribute('data-filter-min'), 10) || 0;
    if (items.length < minimum) return;

    const buttons = $$('[data-filter-value]', filter);
    filter.hidden = false;

    function apply(value) {
      let shown = 0;

      items.forEach((item) => {
        const areas = (item.getAttribute('data-project-area') || '').split(/\s+/);
        const match = value === FILTER_ALL || areas.indexOf(value) !== -1;
        item.hidden = !match;
        if (match) shown += 1;
      });

      buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.getAttribute('data-filter-value') === value));
      });

      renderCount(shown);
    }

    /* Delegação: um listener para o grupo inteiro. */
    filter.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter-value]');
      if (!button || !filter.contains(button)) return;
      if (button.getAttribute('aria-pressed') === 'true') return;
      apply(button.getAttribute('data-filter-value'));
    });
  }


  /* ==========================================================================
     11 · INICIALIZAÇÃO
     --------------------------------------------------------------------------
     Cada módulo verifica sozinho se os elementos de que precisa existem na
     página, então a mesma lista roda na home e nos estudos de caso — o
     scrollspy simplesmente não encontra [data-scrollspy] em um case, e o
     lightbox não encontra [data-gallery] na home.

     Uma exceção que não aparece aqui: a rolagem suave. Ela é
     scroll-behavior: smooth no CSS, junto com scroll-padding para compensar
     o header fixo — e desligada automaticamente em prefers-reduced-motion.
     Fazer isso em JavaScript custaria código e entregaria menos.
     ========================================================================== */

  initYear();
  initLang();
  initTheme();
  initHeaderState();
  initReveal();
  initNav();
  initScrollSpy();
  initLightbox();
  initProjectFilter();
})();
