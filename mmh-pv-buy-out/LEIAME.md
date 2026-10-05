# Versao otimizada

Estrutura:

    index.html
    css/app.min.css     CSS final (purgado e minificado)
    css-fonte/header.css  fonte legivel do CSS do topo, escrito a mao
    js/app.js           substitui jQuery + bootstrap.bundle
    img/                imagens redimensionadas e recomprimidas

## O que mudou

**Imagens (2.11 MB -> 251 KB)**
Redimensionadas para o tamanho real de exibicao (ex: packshots de 1080px -> 900px,
avatares de 395px -> 170px) e salvas no melhor formato por arquivo: WebP para fotos,
PNG quantizado para arte com cores planas. Todas ganharam `width`/`height`
(evita layout shift) e `loading="lazy"` fora da primeira dobra.

**Elementor e WordPress removidos**
O topo da pagina (barra CNN + manchete + area do player) era markup gerado pelo
Elementor: ~10,5 KB de divs aninhadas, classes com hash (`elementor-element-5392c4cc`)
e atributos `data-*`. Foi reescrito em HTML semantico (`<header>`, `<nav>`, `<hr>`)
com CSS proprio em `css-fonte/header.css`, reproduzindo os mesmos valores computados
medidos no original em 420px, 768px, 1024px e 1280px.

Com isso sairam tambem `frontend.min.css`, `post-1604.css` e os quatro
`widget-*.min.css` — 196 KB de framework que existiam so para aquele topo.
Nao resta nenhuma classe `elementor-*`, `wp-*` ou `e-*` no HTML nem no CSS.

**CSS (472 KB -> 37 KB)**
Os 12 arquivos viraram um so. Regras sem correspondencia no HTML foram removidas
(Bootstrap trazia a biblioteca inteira). Comentarios e espacos removidos.

**JavaScript (~175 KB -> 4.6 KB)**
- jQuery (90 KB) nao era necessario: so era usado para o scroll suave e o countdown.
- bootstrap.bundle.min.js (80 KB) so era usado pelo accordion do FAQ.
- Os dois viraram `js/app.js`, que carrega com `defer`.
- O `setInterval` que escondia os comentarios rodava a cada 500ms para sempre;
  agora para assim que termina.

**Fonte de icones**
A CDN do bootstrap-icons baixava a fonte inteira (~100 KB) para 2 glifos.
Trocados por SVG inline / mascara CSS.

**Rede**
3 requisicoes externas a menos (jQuery, bootstrap-icons, e os CSS separados).
De 14 arquivos locais para 3 (HTML + 1 CSS + 1 JS).
`preconnect` para os dominios do player, que agora e o unico recurso externo critico.

## Habilitar gzip/brotli no servidor

O conteudo de texto comprime muito bem: index.html 49 KB -> 9 KB,
app.min.css 37 KB -> 9 KB. Se o servidor nao estiver comprimindo, ative.

## Notas

As tags `<i class="fa fa-check-circle">` dos blocos de preco foram removidas:
a FontAwesome nunca foi carregada nessa pagina, entao elas nao renderizavam nada
nem na versao original.

A barra do topo ficou com o menu principal comecando 28px mais a esquerda que no
original. Era espaco vazio que o Elementor reservava dentro da caixa da marca;
replicar isso exigiria um numero magico no CSS sem beneficio visual.
