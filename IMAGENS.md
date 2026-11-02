# Lista de imagens para exportar

Gerada a partir do HTML — os nomes e dimensoes abaixo sao exatamente os que
estao escritos nas tags comentadas. Exporte com o nome exato e salve em
`assets/images/`.

## Prioridade 1 — as 10 que fazem o site parecer pronto

| Arquivo | Dimensao | O que mostrar |
|---|---|---|
| `perfil.jpg` | 800x1000 | Sua foto, retrato |
| `projeto-01-capa.jpg` | 1600x900 | Capa do PDV |
| `projeto-02-capa.jpg` | 1600x900 | Capa do app de logistica |
| `projeto-03-capa.jpg` | 1600x900 | Capa da Roteirizacao |
| `projeto-01-hero.jpg` | 2100x900 | LCP do case 01 |
| `projeto-02-hero.jpg` | 2100x900 | LCP do case 02 |
| `projeto-03-hero.jpg` | 2100x900 | LCP do case 03 |
| `projeto-01-solucao.png` | 1600x900 | Solucao do case 01 |
| `projeto-02-solucao.png` | 1600x900 | Solucao do case 02 |
| `projeto-03-solucao.png` | 1600x900 | Solucao do case 03 |

Os 3 heros ja vem com `loading=\"eager\"` e `fetchpriority=\"high\"` no comentario.
Nunca coloque `lazy` neles: sao a imagem que o Lighthouse cronometra.

**As imagens de timeline sao opcionais.** Se nao tiver artefato para uma etapa,
apague o `<figure>` inteiro daquela etapa — o layout continua correto.

## index.html

| Arquivo | Dimensao | Conteudo |
|---|---|---|
| `perfil.jpg` | 800x1000 | Retrato de Arthur Souza |
| `projeto-01-capa.jpg` | 1600x900 | (decorativa - alt vazio) |
| `projeto-02-capa.jpg` | 1600x900 | (decorativa - alt vazio) |
| `projeto-03-capa.jpg` | 1600x900 | (decorativa - alt vazio) |

## projeto-01.html

| Arquivo | Dimensao | Conteudo |
|---|---|---|
| `projeto-01-hero.jpg` | 2100x900 | Telas finais do PDV em tablet, celular e terminal, com a venda sendo fechada fora do balcão |
| `projeto-01-contexto.png` | 1600x900 | Diagrama do fluxo antigo: atendimento anotado no papel e busca manual do pedido no caixa |
| `projeto-01-benchmark.png` | 1200x675 | Comparação das frentes de caixa de Linx, TOTVS, Omie e Senior |
| `projeto-01-pesquisa.png` | 1200x675 | Registro da observação da operação de loja, com anotações do fluxo de atendimento |
| `projeto-01-insights.png` | 1200x675 | Síntese da pesquisa apontando o operador de loja como persona principal |
| `projeto-01-definicao.png` | 1200x675 | Comparação entre o fluxo desenhado para desktop e o novo fluxo mobile-first |
| `projeto-01-wireframes.png` | 1200x675 | Wireframes de baixa fidelidade das telas de atendimento e fechamento de venda |
| `projeto-01-prototipo.png` | 1200x675 | Protótipo funcional em código, com animações e interações do fluxo de venda |
| `projeto-01-ui.png` | 1200x675 | Telas finais com os alvos de toque dimensionados e as ações críticas protegidas |
| `projeto-01-handoff.png` | 1200x675 | Protótipo em código usado como handoff, ao lado da tela implementada |
| `projeto-01-solucao.png` | 1600x900 | Novo PDV mobile-first: venda sendo fechada no tablet e pedido recuperado no caixa por código |
| `projeto-01-resultados.png` | 1200x675 | Comparação do tempo médio de fechamento de venda antes e depois do novo PDV |
| `projeto-01-galeria-01-thumb.jpg` | 1200x900 | Tela inicial do PDV em tablet |
| `projeto-01-galeria-02-thumb.jpg` | 1200x900 | Tela de geração da pré-venda com o cupom e o código |
| `projeto-01-galeria-03-thumb.jpg` | 1200x900 | Busca do pedido no caixa pelas três formas de identificação |
| `projeto-01-galeria-04-thumb.jpg` | 1200x900 | Fluxo de uma ação crítica, com a confirmação por senha gerencial |
| `projeto-01-galeria-05-thumb.jpg` | 1200x900 | Conjunto de wireframes de baixa fidelidade do fluxo de venda |
| `projeto-01-galeria-06-thumb.jpg` | 1200x900 | Registro da observação da operação de loja |
| `projeto-01-galeria-01.jpg` | ate 2400px larg. | Galeria: Tela inicial do PDV no tablet, com a venda aberta fora do balcão |
| `projeto-01-galeria-02.jpg` | ate 2400px larg. | Galeria: Pré-venda digital: o cupom que o cliente leva ao caixa |
| `projeto-01-galeria-03.jpg` | ate 2400px larg. | Galeria: No caixa: o pedido encontrado por código, nome ou QR Code |
| `projeto-01-galeria-04.jpg` | ate 2400px larg. | Galeria: Ações críticas: fora da tela inicial e atrás de senha gerencial |
| `projeto-01-galeria-05.jpg` | ate 2400px larg. | Galeria: Wireframes de baixa fidelidade, testados antes de qualquer decisão de estilo |
| `projeto-01-galeria-06.jpg` | ate 2400px larg. | Galeria: Observação da operação acontecendo na loja |

## projeto-02.html

| Arquivo | Dimensao | Conteudo |
|---|---|---|
| `projeto-02-hero.jpg` | 2100x900 | Telas do aplicativo de logística em celular, com a lista de paradas e a captura de prova |
| `projeto-02-contexto.png` | 1600x900 | Diagrama do processo anterior: romaneio em papel, sem ordem de paradas nem rota planejada |
| `projeto-02-pesquisa.png` | 1200x675 | Diagrama ligando a plataforma de otimização do gestor ao aplicativo do entregador |
| `projeto-02-insights.png` | 1200x675 | Síntese das entrevistas com entregadores, agrupada por tema |
| `projeto-02-fluxos.png` | 1200x675 | Fluxo da entrega, do romaneio otimizado até a prova de entrega sincronizada |
| `projeto-02-wireframes.png` | 1200x675 | Wireframes de baixa fidelidade da lista de paradas e da tela de prova de entrega |
| `projeto-02-ui.png` | 1200x675 | Telas finais do aplicativo, com alto contraste e alvos alcançáveis com uma mão |
| `projeto-02-handoff.png` | 1200x675 | Arquivo de Figma estruturado com variáveis, usado no handoff |
| `projeto-02-solucao.png` | 1600x900 | Telas do app: lista de paradas ordenada, captura de assinatura e foto da mercadoria |
| `projeto-02-resultados.png` | 1200x675 | Diagrama do ciclo: romaneio otimizado, execução no app e prova voltando para a gestão |
| `projeto-02-galeria-01-thumb.jpg` | 1200x900 | Tela principal do app com a sequência de paradas já ordenada |
| `projeto-02-galeria-02-thumb.jpg` | 1200x900 | Tela de captura de assinatura do entregador e de quem recebeu |
| `projeto-02-galeria-03-thumb.jpg` | 1200x900 | Tela de registro fotográfico da mercadoria entregue |
| `projeto-02-galeria-04-thumb.jpg` | 1200x900 | Estados de conexão do app, com entrega concluída offline e pendente de sincronização |
| `projeto-02-galeria-05-thumb.jpg` | 1200x900 | Conjunto de wireframes de baixa fidelidade do fluxo de entrega |
| `projeto-02-galeria-06-thumb.jpg` | 1200x900 | Tela da plataforma de otimização de romaneios usada pelo gestor de logística |
| `projeto-02-galeria-01.jpg` | ate 2400px larg. | Galeria: A tela que responde “qual é a próxima parada” |
| `projeto-02-galeria-02.jpg` | ate 2400px larg. | Galeria: Captura de assinatura na porta do cliente |
| `projeto-02-galeria-03.jpg` | ate 2400px larg. | Galeria: Foto da mercadoria no local: a prova que não pode ser forjada |
| `projeto-02-galeria-04.jpg` | ate 2400px larg. | Galeria: Sem sinal: a entrega se conclui e sincroniza depois |
| `projeto-02-galeria-05.jpg` | ate 2400px larg. | Galeria: Wireframes de baixa fidelidade, validados antes de subir a fidelidade |
| `projeto-02-galeria-06.jpg` | ate 2400px larg. | Galeria: A plataforma do gestor, onde a sequência é otimizada |

## projeto-03.html

| Arquivo | Dimensao | Conteudo |
|---|---|---|
| `projeto-03-hero.jpg` | 2100x900 | Tela da plataforma de roteirização com a rota calculada e as seções de acompanhamento |
| `projeto-03-contexto.png` | 1600x900 | Tela da Roteirização com a rota calculada pelo sistema e as paradas reordenáveis por arraste |
| `projeto-03-pesquisa.png` | 1200x675 | Notas da entrevista com o gestor de logística, organizadas por decisão que ele precisa tomar |
| `projeto-03-insights.png` | 1200x675 | A planilha antiga do gestor, anotada com o que virou requisito de tela |
| `projeto-03-fluxos.png` | 1200x675 | Fluxo do cálculo automático da rota e do ponto em que o gestor pode reordenar à mão |
| `projeto-03-ia.png` | 1200x675 | Mapa das seções da plataforma, cada uma respondendo a uma pergunta do gestor |
| `projeto-03-wireframes.png` | 1200x675 | Wireframes das seções de roteirização e de acompanhamento |
| `projeto-03-handoff.png` | 1200x675 | Comparação entre o protótipo e a tela implementada, com os ajustes de leitura apontados |
| `projeto-03-solucao.png` | 1600x900 | Tela da Roteirização com a rota calculada, a estimativa de custo e as seções de acompanhamento |
| `projeto-03-resultados.png` | 1200x675 | Comparação do custo médio por rota antes e depois da plataforma de roteirização |
| `projeto-03-galeria-01-thumb.jpg` | 1200x900 | Tela da rota calculada, com a estimativa de custo e de horário |
| `projeto-03-galeria-02-thumb.jpg` | 1200x900 | Interação de arraste para reordenar as paradas da rota |
| `projeto-03-galeria-03-thumb.jpg` | 1200x900 | Seção de acompanhamento com status das paradas e localização do entregador |
| `projeto-03-galeria-04-thumb.jpg` | 1200x900 | Seção de análise com comparativo entre entregas e histórico |
| `projeto-03-galeria-05-thumb.jpg` | 1200x900 | Comentários registrados pelo entregador exibidos na plataforma do gestor |
| `projeto-03-galeria-06-thumb.jpg` | 1200x900 | A planilha que o gestor mantinha, anotada durante a pesquisa |
| `projeto-03-galeria-01.jpg` | ate 2400px larg. | Galeria: A rota calculada, com estimativa de custo e horário antes da saída |
| `projeto-03-galeria-02.jpg` | ate 2400px larg. | Galeria: Reordenar paradas por arraste: onde o gestor discorda do sistema |
| `projeto-03-galeria-03.jpg` | ate 2400px larg. | Galeria: Acompanhamento da rota em andamento, com a posição do entregador |
| `projeto-03-galeria-04.jpg` | ate 2400px larg. | Galeria: Comparativo entre entregas e o histórico da operação |
| `projeto-03-galeria-05.jpg` | ate 2400px larg. | Galeria: Os comentários do entregador chegando na gestão, sem redigitação |
| `projeto-03-galeria-06.jpg` | ate 2400px larg. | Galeria: A planilha antiga, anotada com o que virou requisito de tela |

## Imagens de compartilhamento (Open Graph)

| Arquivo | Dimensao | Onde aparece |
|---|---|---|
| `og-cover.jpg` | 1200x630 | Preview da home |
| `og-projeto-01.jpg` | 1200x630 | Preview do case 01 |
| `og-projeto-02.jpg` | 1200x630 | Preview do case 02 |
| `og-projeto-03.jpg` | 1200x630 | Preview do case 03 |

Formato: WebP ou JPG. Nenhuma acima de ~300 KB; os heros abaixo de 150 KB.
Comprima em squoosh.app antes de salvar.

