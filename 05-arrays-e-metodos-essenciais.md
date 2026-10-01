# Módulo 05, Arrays e Métodos Essenciais

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // O problema

O Dashboard não tem "um grupo", tem vários. Guardar cada grupo em uma variável separada (`grupo1`, `grupo2`, `grupo3`...) não escala e não permite percorrer todos de uma vez com o `for...of` que você já conhece do Módulo 03. É exatamente isso que um array resolve.

## // Array: uma lista ordenada

```javascript
const materias = ["Cálculo I", "Estrutura de Dados", "Banco de Dados"];
console.log(materias[0]); // Cálculo I, o primeiro índice é 0, não 1
console.log(materias.length); // 3
```

## // Adicionando e removendo itens

```javascript
materias.push("Redes de Computadores"); // adiciona no fim
materias.pop(); // remove o último
```

## // `.forEach()`: executar algo para cada item

```javascript
materias.forEach(function (materia) {
  console.log(materia);
});
```

Parecido com o `for...of` do Módulo 03, mas na forma de método do array, muito comum quando você só precisa *fazer algo* com cada item (como imprimir), sem criar um array novo a partir disso.

## // `.map()`: transformar cada item em outra coisa

```javascript
const participantes = [5, 3, 8];
const dobro = participantes.map(function (numero) {
  return numero * 2;
});
console.log(dobro); // [10, 6, 16]
```

`.map()` sempre devolve um **array novo**, do mesmo tamanho que o original, com cada item transformado pela função. O array original (`participantes`) não é alterado.

## // `.filter()`: manter só o que passa em um teste

```javascript
const grupos = [
  { materia: "Cálculo I", participantes: 5 },
  { materia: "Estrutura de Dados", participantes: 12 },
  { materia: "Banco de Dados", participantes: 3 },
];

const comVagas = grupos.filter(function (grupo) {
  return grupo.participantes < 10;
});
console.log(comVagas.length); // 2
```

`.filter()` também devolve um array novo, só que, em vez de transformar cada item, ele decide, item por item, se aquele item continua no array resultante (quando a função devolve `true`) ou é descartado (quando devolve `false`).

## // `.map()` × `.filter()`, lado a lado

| | `.map()` | `.filter()` |
|---|---|---|
| O que devolve | Um array do **mesmo tamanho**, com cada item transformado | Um array **menor ou igual**, só com os itens que passaram no teste |
| A função interna | Devolve o novo valor de cada item | Devolve `true` ou `false` para cada item |
| Uso típico nesta semana | Transformar dados em HTML (Módulo 12) | Implementar busca/filtro (Dashboard) |

Os dois são frequentemente combinados em sequência: primeiro filtra, depois transforma o que sobrou.

## // `.find()`: achar um único item

```javascript
const grupo = grupos.find(function (g) {
  return g.materia === "Banco de Dados";
});
console.log(grupo); // { materia: "Banco de Dados", participantes: 3 }
```

Diferente de `.filter()`, `.find()` devolve só o **primeiro** item que bate com a condição, não um array. Se nenhum item bater, devolve `undefined`.

## // Arrow functions dentro de métodos de array

Na prática, é muito comum ver `.map()`/`.filter()` com arrow functions, por ficarem mais curtos:

```javascript
const dobro = participantes.map((numero) => numero * 2);
const comVagas = grupos.filter((grupo) => grupo.participantes < 10);
```

Isso é exatamente a mesma lógica dos exemplos anteriores, só na forma curta que você viu no Módulo 04.

## // Bom exemplo × mau exemplo

**Mau exemplo**: usar `.forEach()` quando o objetivo era transformar:

```javascript
let dobro = [];
participantes.forEach(function (numero) {
  dobro.push(numero * 2);
});
```

Funciona, mas exige criar um array vazio manualmente e ir empurrando itens: mais código para fazer o que `.map()` já resolve em uma linha.

**Bom exemplo**: a ferramenta certa para o objetivo:

```javascript
const dobro = participantes.map((numero) => numero * 2);
```

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| Esperar que `.map()` altere o array original | `.map()` sempre devolve um array **novo** | Guarde o resultado em uma variável nova, ou reatribua a mesma |
| Usar `.map()` quando só precisava filtrar | Os dois "processam" o array, fácil confundir o objetivo | Pergunte: quero manter todos transformados (`.map`), ou descartar alguns (`.filter`)? |
| `.find()` tratado como se devolvesse um array | `.find()` devolve um item só (ou `undefined`) | Use `.filter()` se precisar de vários resultados |
| Esquecer que índice de array começa em `0` | Hábito de contar a partir de `1` | O primeiro item é sempre `array[0]` |

## // Prática guiada

1. No `script.js`, crie o array `grupos`, com pelo menos 5 objetos `{ materia, participantes }`.
2. Use `.map()` para criar um array só com os nomes das matérias (`grupo.materia`).
3. Use `.filter()` para criar um array só com os grupos que têm menos de 8 participantes.
4. Use `.find()` para encontrar um grupo específico pelo nome da matéria.
5. Imprima os três resultados no console e confirme que cada um faz o que você esperava.

## // Pratique sozinho

> **DESAFIO**
> A partir do array `grupos`, use `.filter()` seguido de `.map()` em sequência para produzir um array só com os *nomes* dos grupos que têm 5 ou mais participantes (primeiro filtre, depois transforme o resultado).

## // Aplicando no projeto da semana

1. Estruture os dados do seu Dashboard como um array de objetos (mesmo que ainda não esteja indo para a tela, isso vem no Módulo 12).
2. Escreva, usando `.filter()`, a lógica de busca que vai alimentar o campo de busca do Dashboard.
3. Commit: `git commit -m "Adiciona array de grupos e lógica de filtro"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Você quer os nomes das matérias, em maiúsculas, só dos grupos com vagas disponíveis (menos de 10 participantes). Quais dois métodos você combina, e em que ordem faz mais sentido aplicá-los?

Resposta: `.filter()` primeiro, para manter só os grupos com menos de 10 participantes, seguido de `.map()`, para transformar cada grupo restante no nome da matéria em maiúsculas (`grupo.materia.toUpperCase()`). A ordem importa por eficiência, não por correção: filtrar primeiro significa que o `.map()` seguinte processa menos itens.

## // Resumo do módulo

- [ ] Sei criar, ler e modificar um array.
- [ ] Sei a diferença entre `.forEach()`, `.map()` e `.filter()`.
- [ ] Sei que `.map()` e `.filter()` sempre devolvem um array novo, sem alterar o original.
- [ ] Sei usar `.find()` para localizar um único item.
- [ ] Já estruturei os dados do meu projeto como um array de objetos.

---

**Próximo módulo:** `06-objetos-e-desestruturacao.md`, cada item desses arrays é um objeto. Hora de entender essa estrutura a fundo.

`Material de Estudo // Coffee & Code`
