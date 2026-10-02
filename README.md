# ☕ Coffee & Code — SEM 03 | Interface Web (Parte 2: Dinâmica)

```text
> module: sem-03
> tema: interface web — dinâmica
> status: online
> coffee loaded ✓
```

Material da **Semana 03** da trilha do Coffee & Code, o clube de tecnologia da PUCPR.

Na Semana 02 você construiu as três telas em HTML e CSS. Elas abrem no navegador, se ajustam ao celular — mas não fazem nada. O formulário de Login aceita qualquer coisa, o Dashboard mostra sempre os mesmos cards fixos, o botão de sair de um grupo não sai de lugar nenhum.

A Semana 03 existe para dar comportamento a essas telas: JavaScript ES6+, DOM, eventos, validação de formulários e dados em JSON. No fim da semana a interface reage, valida e renderiza — ainda sem backend, mas com lógica de verdade.

## Por onde começar

👉 **[docs/00-comece-aqui.md](docs/00-comece-aqui.md)** — leia este primeiro. Ele explica o caminho da semana e o que vem da Semana 02.

Depois, siga os módulos na ordem:

| # | Módulo | Sobre |
|---|---|---|
| 01 | [Como o JavaScript entra na página](docs/01-como-o-javascript-entra-na-pagina.md) | `<script>`, `defer`, console do navegador |
| 02 | [Variáveis, tipos e operadores](docs/02-variaveis-tipos-e-operadores.md) | `let`/`const`, tipos primitivos, `===` |
| 03 | [Decisões e repetições](docs/03-decisoes-e-repeticoes.md) | `if/else`, `for`, `while`, `for...of` |
| 04 | [Funções e arrow functions](docs/04-funcoes-e-arrow-functions.md) | Funções, arrow functions, escopo |
| 05 | [Arrays e métodos essenciais](docs/05-arrays-e-metodos-essenciais.md) | `.map()`, `.filter()`, `.find()` |
| 06 | [Objetos e desestruturação](docs/06-objetos-e-desestruturacao.md) | Objetos, desestruturação |
| 07 | [O DOM: selecionar e ler](docs/07-o-dom-selecionar-e-ler.md) | `querySelector`, `.value`, `.textContent` |
| 08 | [O DOM: criar e modificar elementos](docs/08-o-dom-criar-e-modificar-elementos.md) | `classList`, `createElement`, `innerHTML` |
| 09 | [Eventos](docs/09-eventos.md) | `addEventListener`, `event.preventDefault()` |
| 10 | [Formulários e validação em JS](docs/10-formularios-e-validacao-em-js.md) | Validação completa do Login |
| 11 | [JSON e dados mock](docs/11-json-e-dados-mock.md) | JSON, `JSON.stringify`/`parse`, dados mock |
| 12 | [Renderizando listas dinamicamente](docs/12-renderizando-listas-dinamicamente.md) | Array de dados → cards na tela |
| 13 | [Estado e componentização](docs/13-estado-e-componentizacao.md) | Estado, ciclo de renderização, componentização |
| 14 | [Projeto guiado](docs/14-projeto-guiado.md) | Construindo as três telas dinâmicas, do início ao fim |

E, para consultar quando precisar:

- 💻 [Exemplo executável](docs/example/) — as três telas com JavaScript real, para consulta
- 🎯 [Desafios](docs/desafios.md) — opcionais, para ir além do pedido
- ✅ [Entregável](docs/entregavel.md) — checklist final antes de fechar a semana

## O exemplo executável

A pasta [`docs/example/`](docs/example/) tem uma implementação de referência das três telas (Login, Dashboard, Perfil), evoluindo o exemplo da Semana 02 com JavaScript real. Baixe o repositório e abra o `index.html` no navegador para navegar entre elas.

É material de **consulta, não gabarito**. O seu projeto tem as suas próprias telas — o exemplo serve para você ver uma solução possível quando travar, não para copiar.

## O entregável

Ao final da Semana 03, o repositório do **seu projeto** (não este aqui) deve ter, além de tudo o que veio das Semanas 01 e 02:

```text
login.html
dashboard.html
perfil.html
script.js         ← novo (ou um por tela), conectado às páginas com defer
css/
└── styles.css
```

O Login precisa validar de verdade, o Dashboard precisa renderizar e filtrar os cards a partir de dados mock, e o Perfil precisa ter pelo menos uma ação funcionando sem recarregar a página.

O checklist completo está em [docs/entregavel.md](docs/entregavel.md).

> **A lógica correta vale mais que polimento visual.** Uma validação que bloqueia corretamente um e-mail mal formatado, mesmo com uma mensagem simples, vale mais nesta semana do que uma interface bonita que aceita qualquer coisa.

## Entregas da turma

Ainda não há entregas da Semana 03. Quer ser a primeira pessoa? Veja [como entregar](entregas/README.md).

## O que não entra nesta semana

Nada de backend, banco de dados ou chamada de rede real. Nada de framework (React ou equivalente) — tudo em JavaScript puro, de propósito. E os dados mock resetam a cada recarregamento de página: isso é esperado.

## Projeto contínuo

Todos os módulos usam o mesmo projeto fictício das semanas anteriores: o **Buscador de Grupos de Estudo**. Se você tem um projeto próprio, o raciocínio de cada módulo se aplica da mesma forma — só troque o nome.

## Como funciona

O Coffee & Code é **100% online**. Cada módulo foi escrito para ser autossuficiente: você estuda no seu ritmo, pode avançar mais rápido, voltar em semanas anteriores e consultar o material durante o projeto.

Os encontros semanais, também online, existem para tirar dúvidas, revisar conceitos, programar junto e mostrar o que você produziu — **não para dar aula**:

- 🗓️ **quarta-feira** — 20h00 às 21h30
- 🗓️ **sábado** — 10h00 às 11h30

Os dois trabalham o mesmo conteúdo. Escolha o que couber melhor na sua semana, e não precisa ficar o horário inteiro na call.

## Travou?

Chega no encontro ou no Discord com uma pergunta específica. `"meu botão renderizado dinamicamente não responde a clique, já tentei X e Y"` costuma ser resolvido muito mais rápido do que `"meu JavaScript não funciona"`.

E lembra: não saber alguma coisa não é problema. Saber pesquisar faz parte da área.

## Diagramas

Todos os diagramas usados nos módulos estão em [`docs/assets/`](docs/assets/), em formato SVG editável.

## Semanas anteriores

- [SEM 01 — Kickoff & Design System](https://github.com/coffeecodepucpr/coffee-code-sem01)
- [SEM 02 — Interface Web (Parte 1: Layout)](https://github.com/coffeecodepucpr/coffee-code-sem02)

---

```text
HTTP 418 — I'm a teapot
> ready to code
```
