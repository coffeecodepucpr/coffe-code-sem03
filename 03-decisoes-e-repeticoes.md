# Módulo 03, Decisões e Repetições

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // O problema

Um formulário de Login precisa se comportar diferente dependendo do que foi digitado: campo vazio bloqueia o envio, e-mail sem "@" bloqueia o envio, tudo certo libera o envio. Um Dashboard precisa passar por cada grupo da lista para decidir como mostrá-lo. Nenhuma dessas coisas é possível com código que só executa uma linha atrás da outra, sempre igual: é necessário *decidir* e *repetir*.

## // `if`, `else if`, `else`

```javascript
const participantes = 8;

if (participantes >= 10) {
  console.log("Grupo cheio");
} else if (participantes >= 5) {
  console.log("Quase cheio");
} else {
  console.log("Vagas disponíveis");
}
```

O JavaScript testa as condições **de cima para baixo** e entra no primeiro bloco verdadeiro, ignorando os demais, por isso a ordem das condições importa. Se `participantes >= 5` viesse antes de `participantes >= 10`, um grupo com 12 participantes cairia no bloco errado ("Quase cheio"), porque 12 também é `>= 5`.

## // Valores truthy e falsy

Dentro de uma condição, o JavaScript converte qualquer valor para `true` ou `false` automaticamente. A lista do que é tratado como falso é curta, vale decorar:

> **FALSY: OS ÚNICOS VALORES TRATADOS COMO FALSOS**
> `false`, `0`, `""` (string vazia), `null`, `undefined` e `NaN`. Praticamente qualquer outro valor, incluindo `"0"` (string) e arrays vazios `[]`, é tratado como verdadeiro.

```javascript
const nome = "";
if (!nome) {
  console.log("Nome não preenchido");
}
```

`!nome` pode ser lido como "não existe um nome preenchido", e funciona porque uma string vazia é falsy. Essa leitura ("não existe X") é uma forma natural de verificar campos vazios antes de seguir com qualquer lógica.

## // `for`: repetir um número conhecido de vezes

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

As três partes entre parênteses: `let i = 0` (ponto de partida), `i < 5` (condição para continuar), `i++` (o que muda a cada volta). O laço para assim que a condição vira falsa.

## // `for...of`: percorrer os valores de uma coleção

```javascript
const materias = ["Cálculo I", "Estrutura de Dados", "Banco de Dados"];

for (const materia of materias) {
  console.log(materia);
}
```

Diferente do `for` tradicional, `for...of` não trabalha com índice: ele entrega, a cada volta, o *valor* seguinte da coleção diretamente. Para arrays de dados (o caso mais comum no restante desta semana), `for...of` costuma ser mais direto de ler do que controlar um índice manualmente.

## // `while`: repetir enquanto uma condição for verdadeira

```javascript
let tentativas = 0;
while (tentativas < 3) {
  console.log("Tentativa " + tentativas);
  tentativas++;
}
```

Use `while` quando você não sabe de antemão *quantas* vezes vai repetir: só sabe a condição que deve continuar sendo verdadeira. `for` é mais comum quando o número de repetições já é conhecido (como percorrer um array).

> **CUIDADO COM LAÇO INFINITO**
> Se a condição de um `while` nunca virar falsa, por exemplo, esquecer o `tentativas++`, o código trava a aba do navegador, repetindo para sempre. Sempre confirme que existe algo, dentro do laço, que eventualmente torna a condição falsa.

## // Bom exemplo × mau exemplo

**Mau exemplo**: ordem das condições escondendo um caso:

```javascript
if (participantes >= 0) {
  console.log("Vagas disponíveis");
} else if (participantes >= 10) {
  console.log("Grupo cheio"); // nunca vai rodar
}
```

Como `participantes >= 0` é verdadeiro para praticamente qualquer número válido, o segundo bloco nunca é alcançado.

**Bom exemplo**: condição mais restritiva primeiro:

```javascript
if (participantes >= 10) {
  console.log("Grupo cheio");
} else if (participantes >= 0) {
  console.log("Vagas disponíveis");
}
```

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| Bloco errado sendo executado | Condições na ordem errada, uma mais ampla "capturando" o caso antes da mais específica | Coloque as condições mais restritivas primeiro |
| Laço que nunca termina | Esquecer de atualizar a variável que a condição do `while` depende | Confirme que existe uma atualização dentro do laço |
| `for...of` usado para tentar pegar o índice | `for...of` entrega o valor, não a posição | Use `for` tradicional, ou `array.forEach((item, indice) => ...)`, se precisar do índice |
| Confundir `=` com `===` dentro de um `if` | Erro de digitação comum | `=` atribui um valor (e não deveria aparecer dentro de um `if`); `===` compara |

## // Prática guiada

1. No `script.js`, crie um array `materias` com pelo menos 4 strings.
2. Use `for...of` para imprimir cada matéria no console, precedida de "Matéria: ".
3. Escreva um `if/else if/else` que recebe um número de participantes e imprime "Cheio", "Quase cheio" ou "Vagas disponíveis", seguindo a lógica desta seção.
4. Teste com pelo menos três valores diferentes, confirmando que cada um cai no bloco certo.

## // Pratique sozinho

> **DESAFIO**
> Escreva um `for` que imprime, de 1 a 10, apenas os números pares (dica: use `%` para verificar se o resto da divisão por 2 é zero). Depois, reescreva a mesma lógica usando `while`, e confirme que o resultado é idêntico.

## // Aplicando no projeto da semana

1. No `script.js`, escreva um `for...of` que percorre uma lista de matérias do seu projeto e imprime cada uma no console. Isso não aparece na tela ainda (isso vem no Módulo 12), mas confirma que a lógica de repetição está correta antes de conectar ao DOM.
2. Escreva uma condição `if/else` real do seu projeto, por exemplo, decidir uma mensagem diferente dependendo da quantidade de participantes de um grupo.
3. Commit: `git commit -m "Adiciona lógica de decisão e repetição inicial"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Você tem um array com 5 matérias e precisa decidir, para cada uma, se o nome é "longo" (mais de 15 caracteres) ou "curto". Que combinação de ferramentas deste módulo resolve isso?

Resposta: um `for...of` para percorrer o array, combinado com um `if/else` dentro do laço, comparando `materia.length > 15` a cada volta. A repetição (`for...of`) garante que toda matéria seja avaliada; a decisão (`if/else`), dentro do laço, resolve cada uma individualmente.

## // Resumo do módulo

- [ ] Sei escrever `if`, `else if`, `else`, e sei por que a ordem das condições importa.
- [ ] Sei listar os valores tratados como falsy.
- [ ] Sei a diferença entre `for`, `for...of` e `while`, e quando usar cada um.
- [ ] Sei identificar o risco de um laço infinito.
- [ ] Já escrevi pelo menos uma decisão e uma repetição reais no meu projeto.

---

**Próximo módulo:** `04-funcoes-e-arrow-functions.md`, decisão e repetição já funcionam soltas. Hora de organizar isso em blocos reutilizáveis.

`Material de Estudo // Coffee & Code`
