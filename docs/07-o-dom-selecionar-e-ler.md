# Módulo 07, O DOM: Selecionar e Ler

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // O problema

Todo código que você escreveu até agora roda isolado, imprimindo resultado só no console. Para realmente mudar o que uma pessoa vê na tela, o JavaScript precisa primeiro **encontrar** o elemento HTML certo, e é exatamente isso que este módulo resolve.

## // O que é o DOM

> **DOM: EM PALAVRAS SIMPLES**
> Quando o navegador lê um arquivo HTML, ele constrói, na memória, uma representação de toda a estrutura da página: o DOM (Document Object Model). É essa representação, não o arquivo `.html` em si, que o JavaScript consegue ler e alterar.

Isso conecta direto com o Módulo 02 (HTML) da Semana 02: a árvore de elementos pai/filho/irmão que você viu lá *é* o DOM. Selecionar um elemento significa encontrar um ponto específico dessa árvore.

## // `document`: o ponto de entrada

Todo acesso ao DOM começa pelo objeto global `document`, que representa a página inteira:

```javascript
console.log(document.title); // o texto da aba do navegador
```

## // Selecionando elementos

```javascript
const titulo = document.querySelector("h1");
const primeiroCard = document.querySelector(".card");
const todosOsCards = document.querySelectorAll(".card");
const campoEmail = document.querySelector("#email");
```

| Método | O que devolve |
|---|---|
| `querySelector(seletor)` | O **primeiro** elemento que combina com o seletor CSS, ou `null` se nenhum combinar |
| `querySelectorAll(seletor)` | Uma coleção com **todos** os elementos que combinam |
| `getElementById(id)` | O elemento com aquele `id` específico (sem o `#` na frente, diferente de `querySelector`) |

O seletor passado para `querySelector`/`querySelectorAll` é exatamente a mesma sintaxe CSS que você já usa desde a Semana 02: `.classe`, `#id`, `tag`, `.pai .filho`, tudo funciona igual.

## // Por que `querySelectorAll` não é um array "de verdade"

```javascript
const cards = document.querySelectorAll(".card");
console.log(cards.length); // funciona, igual array
cards.forEach(function (card) {
  console.log(card); // funciona, igual array
});
```

`querySelectorAll` devolve uma **NodeList**, parecida com array o suficiente para usar `.length` e `.forEach()`, mas sem `.map()` ou `.filter()` nativamente. Se precisar dessas ferramentas, converta primeiro: `Array.from(cards)`.

## // Lendo conteúdo e atributos

```javascript
const titulo = document.querySelector("h1");
console.log(titulo.textContent); // o texto dentro do elemento

const campoEmail = document.querySelector("#email");
console.log(campoEmail.value); // o que a pessoa digitou no campo
```

> **`VALUE` × `TEXTCONTENT`**
> `.value` lê (ou altera) o valor de campos de formulário (`input`, `select`, `textarea`). `.textContent` lê (ou altera) o texto de elementos comuns (`p`, `span`, `h1`, `div`). Usar um no lugar do outro é um dos erros mais comuns de quem está começando: um `input` não tem `.textContent` útil, e um `<p>` não tem `.value`.

## // Verificando se um elemento foi encontrado

```javascript
const elemento = document.querySelector(".card-destaque");
if (elemento) {
  console.log("Elemento encontrado");
} else {
  console.log("Nenhum elemento com essa classe existe na página");
}
```

Quando `querySelector` não encontra nada, ele devolve `null`, que é falsy (Módulo 03). Testar `if (elemento)` antes de usar o resultado evita um erro comum: tentar ler uma propriedade de `null`.

## // Bom exemplo × mau exemplo

**Mau exemplo**: assumir que o elemento sempre existe:

```javascript
const campo = document.querySelector("#campo-que-nao-existe");
console.log(campo.value); // erro: não é possível ler propriedade de null
```

**Bom exemplo**: verificando antes:

```javascript
const campo = document.querySelector("#campo-que-nao-existe");
if (campo) {
  console.log(campo.value);
} else {
  console.log("Campo não encontrado, confira o seletor");
}
```

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| `Cannot read properties of null` | `querySelector` não encontrou nada, e o código tentou usar o resultado mesmo assim | Confira o seletor; considere testar `if (elemento)` antes de usar |
| `.value` devolvendo `undefined` em um `<p>` | Confundir `.value` com `.textContent` | `<p>`, `<span>`, `<h1>` usam `.textContent`; campos de formulário usam `.value` |
| `querySelectorAll(...).map is not a function` | NodeList não tem `.map()` nativamente | Use `.forEach()`, ou converta com `Array.from(...)` antes de usar `.map()` |
| Seletor não encontra nada, mesmo existindo na página | Script rodou antes do HTML existir | Confirme que o `<script>` tem `defer` (Módulo 01) |

## // Prática guiada

1. No `script.js` do Dashboard, selecione o elemento `<h1>` da página com `querySelector` e imprima seu `.textContent` no console.
2. Selecione todos os elementos com a classe `.card` usando `querySelectorAll`, e imprima quantos foram encontrados (`.length`).
3. Selecione o campo de busca (`.busca`, da Semana 02) e imprima `.value`. Mesmo vazio, confirme que não dá erro.
4. Tente selecionar um seletor que você sabe que não existe na página, e escreva o `if (elemento)` para lidar com esse caso sem erro.

## // Pratique sozinho

> **DESAFIO**
> No Login, selecione os campos de e-mail e senha com `querySelector`. Imprima, no console, uma frase combinando os dois valores (mesmo vazios), usando template literals (Módulo 12 da Semana 02).

## // Aplicando no projeto da semana

1. No `script.js` de cada tela do seu projeto, selecione pelo menos três elementos reais (um título, um container, um campo de formulário ou botão).
2. Confirme, com `console.log`, que cada seleção encontrou o elemento certo.
3. Commit: `git commit -m "Adiciona seleção inicial de elementos do DOM"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> `document.querySelector("#busca").value` devolve `undefined` em vez do texto digitado. O elemento com `id="busca"` existe na página, e o `<script>` já tem `defer`. O que mais você investigaria?

Resposta: se o elemento selecionado realmente é um campo de formulário (`input`, `select`, `textarea`), `.value` só existe de forma útil nesses elementos. Se `#busca` for, por engano, uma `<div>` ou outro elemento sem campo de entrada, `.value` não vai conter o texto esperado. Vale conferir a tag exata do elemento com esse `id` no HTML.

## // Resumo do módulo

- [ ] Sei o que é o DOM, e por que ele é diferente do arquivo `.html` em si.
- [ ] Sei usar `querySelector` e `querySelectorAll`.
- [ ] Sei a diferença entre `.value` e `.textContent`, e quando usar cada um.
- [ ] Sei verificar se um elemento foi encontrado antes de usá-lo.
- [ ] Já selecionei elementos reais das três telas do meu projeto.

---

**Próximo módulo:** `08-o-dom-criar-e-modificar-elementos.md`, selecionar é só o primeiro passo. Agora, como criar e alterar o que está na tela.

`Material de Estudo // Coffee & Code`
