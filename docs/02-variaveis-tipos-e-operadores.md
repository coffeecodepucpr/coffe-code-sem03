# Módulo 02, Variáveis, Tipos e Operadores

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // O problema

Qualquer programa precisa guardar valores temporariamente: o nome digitado em um campo, a quantidade de grupos encontrados, se um formulário está válido ou não. Sem um jeito de guardar e nomear esses valores, cada linha de código precisaria recalcular tudo do zero, sem memória do que já foi processado.

## // Variáveis

> **VARIÁVEL: EM PALAVRAS SIMPLES**
> É um nome que aponta para um valor guardado na memória do navegador enquanto a página está aberta, permitindo usar esse valor de novo, em qualquer parte do código, só pelo nome.

```javascript
let materia = "Cálculo I";
console.log(materia); // Cálculo I
```

## // `let` × `const`

```javascript
const nomeDoProjeto = "Buscador de Grupos de Estudo"; // nunca vai mudar
let quantidadeDeGrupos = 3; // pode mudar depois
quantidadeDeGrupos = 4; // válido
```

| Palavra | Quando usar |
|---|---|
| `const` | O valor não vai ser reatribuído depois de criado; a maioria das suas variáveis deveria começar como `const` |
| `let` | O valor precisa mudar em algum momento (um contador, um resultado de busca que se atualiza) |

> **ATENÇÃO**
> Você talvez encontre `var` em códigos mais antigos. Evite usá-lo em código novo: `var` tem um comportamento de escopo mais confuso e foi substituído por `let`/`const` há anos. Se `const` falhar porque o valor realmente precisa mudar, use `let`, nunca `var`.

`const` impede reatribuir a variável inteira, mas não "congela" automaticamente um array ou objeto guardado nela: você ainda pode alterar itens de dentro dele. O Módulo 05 e o Módulo 06 voltam a esse ponto.

## // Os tipos primitivos

```javascript
const materia = "Cálculo I";       // string, texto
let participantes = 5;              // number, número
let temVaga = true;                 // boolean, verdadeiro/falso
let observacao = null;              // ausência intencional de valor
let horario;                        // undefined, declarada, mas sem valor ainda
```

| Tipo | Representa | Exemplo |
|---|---|---|
| `string` | Texto, sempre entre aspas (ou crases, para template literals) | `"Cálculo I"` |
| `number` | Qualquer número, inteiro ou decimal; não existe tipo separado para decimal | `5`, `3.5` |
| `boolean` | Só dois valores possíveis | `true`, `false` |
| `null` | "Aqui não tem valor, de propósito" | `null` |
| `undefined` | "Ainda não recebeu valor nenhum" | uma variável só declarada |

A diferença entre `null` e `undefined` é sutil mas real: `null` é uma ausência de valor que *você* decidiu explicitamente; `undefined` é o que o próprio JavaScript coloca quando nada foi atribuído ainda.

## // Operadores aritméticos

```javascript
const total = 5 + 3;   // 8
const resto = 10 % 3;  // 1, resto da divisão
```

`%` (módulo) é menos comum no dia a dia, mas aparece bastante em lógica de alternância, por exemplo, para dar um fundo diferente a linhas pares e ímpares de uma tabela.

## // Operadores de comparação: `===` importa

```javascript
console.log(5 === 5);     // true
console.log(5 === "5");   // false
console.log(5 == "5");    // true, evite!
```

> **POR QUE `===` E NÃO `==`**
> `==` compara o valor *convertendo* os tipos primeiro: `5 == "5"` dá `true`, mesmo sendo um número e uma string. `===` compara valor *e* tipo, sem converter nada, mais previsível, e é o padrão recomendado em qualquer código novo. Trate `==` como uma armadilha a evitar, não como uma opção equivalente mais curta.

| Operador | Significado |
|---|---|
| `===` | Igual (valor e tipo) |
| `!==` | Diferente (valor e tipo) |
| `>`, `<`, `>=`, `<=` | Maior, menor, maior ou igual, menor ou igual |

## // Operadores lógicos

```javascript
const podeParticipar = temVaga && participantes < 10;
const precisaAvisar = !temVaga || participantes === 0;
```

| Operador | Significado |
|---|---|
| `&&` (E) | Verdadeiro só se os dois lados forem verdadeiros |
| \|\| (OU) | Verdadeiro se pelo menos um lado for verdadeiro |
| `!` (NÃO) | Inverte um valor booleano |

## // Bom exemplo × mau exemplo

**Mau exemplo**: comparação com `==`, gerando resultado inesperado:

```javascript
const participantesTexto = "5"; // veio de um input, por exemplo
if (participantesTexto == 5) {
  console.log("Vai rodar, mesmo sendo tipos diferentes");
}
```

**Bom exemplo**: convertendo o tipo explicitamente, depois comparando com `===`:

```javascript
const participantesTexto = "5";
const participantesNumero = Number(participantesTexto);
if (participantesNumero === 5) {
  console.log("Comparação clara, sem surpresa");
}
```

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| `const` "não deixa mudar o valor" quando deveria | Tentar reatribuir uma variável que muda ao longo do código | Troque para `let` desde a criação |
| Comparação com `==` dando resultado inesperado | Conversão automática de tipo escondendo o problema real | Use sempre `===` |
| `undefined` aparecendo sem explicação | Variável usada antes de receber um valor | Confirme que a variável foi inicializada antes de ser lida |
| Número tratado como texto (`"5" + "3"` = `"53"`) | Valor veio de um campo de formulário, que sempre entrega string | Converta com `Number(...)` antes de operações matemáticas |

## // Prática guiada

1. No `script.js`, crie três variáveis com `const`: `nomeDoProjeto`, `materiaPrincipal`, `totalDeGrupos`.
2. Imprima as três no console, uma por `console.log`.
3. Crie uma variável `let vagasDisponiveis = 3;`. Escreva uma linha que subtrai 1 dela e imprime o resultado.
4. Escreva uma comparação com `===` entre duas variáveis diferentes e imprima o resultado (`true` ou `false`).

## // Pratique sozinho

> **DESAFIO**
> Crie uma variável `participantesTexto = "8"` (uma string, de propósito). Sem usar `Number(...)`, tente somar `participantesTexto + 1` e observe o resultado no console: provavelmente não é o que você esperava. Depois, corrija convertendo com `Number(participantesTexto)` antes de somar, e compare os dois resultados.

## // Aplicando no projeto da semana

1. No `script.js`, declare como `const` os valores que não vão mudar no seu projeto (nome do app, por exemplo) e como `let` os que vão.
2. Garanta que qualquer comparação no seu código usa `===`, nunca `==`.
3. Commit: `git commit -m "Adiciona variáveis e tipos base do projeto"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Um campo de formulário sempre entrega o valor digitado como `string`, mesmo que a pessoa digite só números. Por que isso importa para o restante da lógica que você vai escrever esta semana?

Resposta: porque qualquer comparação ou cálculo que espera um `number` vai se comportar de forma inesperada se receber uma `string` sem conversão, por exemplo, `"5" + "3"` resulta em `"53"` (concatenação de texto), não `8`. Sempre que um valor vier de um campo de formulário e precisar ser tratado como número, é necessário convertê-lo explicitamente com `Number(...)` antes.

## // Resumo do módulo

- [ ] Sei a diferença entre `let` e `const`, e por que evitar `var`.
- [ ] Sei nomear os tipos primitivos (`string`, `number`, `boolean`, `null`, `undefined`).
- [ ] Sei por que `===` é mais seguro que `==`.
- [ ] Sei usar `&&`, `||` e `!`.
- [ ] Sei por que um valor vindo de um formulário precisa de conversão antes de virar número.

---

**Próximo módulo:** `03-decisoes-e-repeticoes.md`, com variáveis e comparações prontas, hora de controlar o que o código faz, e quantas vezes.

`Material de Estudo // Coffee & Code`
