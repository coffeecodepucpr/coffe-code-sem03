# Módulo 04, Funções e Arrow Functions

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // O problema

Se a lógica de decidir "Cheio / Quase cheio / Vagas disponíveis" do Módulo 03 precisar rodar para seis grupos diferentes, copiar e colar aquele bloco de `if/else` seis vezes é exatamente o tipo de repetição que deveria virar uma única peça reutilizável.

## // O que é uma função

> **FUNÇÃO: EM PALAVRAS SIMPLES**
> É um bloco de código nomeado, que agrupa uma tarefa e pode ser executado (chamado) quantas vezes for preciso, de qualquer lugar do código.

```javascript
function statusDoGrupo(participantes) {
  if (participantes >= 10) {
    return "Cheio";
  } else if (participantes >= 5) {
    return "Quase cheio";
  } else {
    return "Vagas disponíveis";
  }
}

console.log(statusDoGrupo(8));  // Quase cheio
console.log(statusDoGrupo(12)); // Cheio
```

| Parte | Significado |
|---|---|
| `statusDoGrupo` | Nome da função |
| `participantes` | Parâmetro, o nome que a função usa para receber um valor |
| `8`, `12` | Argumentos, os valores reais passados em cada chamada |
| `return` | O valor que a função devolve para quem a chamou |

## // `return` interrompe a função

Assim que uma linha `return` executa, a função para ali: nenhuma linha depois dela, dentro da mesma função, roda. É por isso que o `if/else if/else` do exemplo acima funciona sem precisar de nada além de três `return`.

## // Arrow functions

```javascript
function dobrar(numero) {
  return numero * 2;
}

const dobrar = (numero) => numero * 2;
```

As duas formas fazem exatamente a mesma coisa: arrow function é só uma sintaxe mais curta. Quando o corpo da função é uma única expressão que já é o retorno, o `return` e as chaves `{}` podem ser omitidos, como no exemplo acima.

Para um corpo com mais de uma linha, as chaves e o `return` explícito voltam a ser necessários:

```javascript
const statusDoGrupo = (participantes) => {
  if (participantes >= 10) {
    return "Cheio";
  }
  return "Vagas disponíveis";
};
```

> **QUAL FORMA USAR**
> Não existe uma resposta universalmente "certa": este guia usa principalmente `function nome(...) { ... }` por ser mais explícita para quem está começando, e arrow functions em contextos curtos (como dentro de `.map()`, no Módulo 05). Priorize a forma que deixar o código mais claro para você reler depois: código curto nem sempre é código mais fácil.

## // Escopo: o que uma função "enxerga"

```javascript
function exemplo() {
  const valorLocal = "só existe aqui dentro";
  console.log(valorLocal);
}

exemplo();
console.log(valorLocal); // erro: valorLocal não existe aqui fora
```

Uma variável criada dentro de uma função (com `let` ou `const`) não existe fora dela: esse limite se chama **escopo**. Ele evita que qualquer parte do código altere qualquer variável sem controle, e é o motivo pelo qual duas funções diferentes podem usar o mesmo nome de variável internamente sem conflito.

## // Por que organizar em funções, especificamente nesta semana

Toda a segunda metade deste guia depende de funções nomeadas e reutilizáveis: `renderizarGrupos(...)` (Módulo 12), `validarFormulario(...)` (Módulo 10), `filtrarPorBusca(...)`: cada uma dessas é uma função que pode ser chamada de novo sempre que os dados mudam, sem duplicar lógica. Sem esse hábito, cada nova funcionalidade viraria código solto, copiado e colado.

## // Bom exemplo × mau exemplo

**Mau exemplo**: lógica duplicada em vez de uma função:

```javascript
if (participantesGrupo1 >= 10) { console.log("Cheio"); }
if (participantesGrupo2 >= 10) { console.log("Cheio"); }
if (participantesGrupo3 >= 10) { console.log("Cheio"); }
```

**Bom exemplo**: uma função, chamada três vezes:

```javascript
function statusDoGrupo(participantes) {
  return participantes >= 10 ? "Cheio" : "Vagas disponíveis";
}

console.log(statusDoGrupo(participantesGrupo1));
console.log(statusDoGrupo(participantesGrupo2));
console.log(statusDoGrupo(participantesGrupo3));
```

(Repare no operador ternário `condição ? valorSeVerdadeiro : valorSeFalso`, uma forma curta de escrever um `if/else` de uma linha só, útil quando os dois resultados são simples.)

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| Função "não retorna nada" (`undefined`) | Esquecer o `return` | Toda função que deveria devolver um valor precisa de `return` explícito |
| Variável "não existe" fora da função | Tentar usar uma variável criada dentro de uma função, fora dela | Declare a variável fora da função se ela precisa ser usada em outro lugar |
| Confundir parâmetro com argumento | São conceitos próximos, fácil de trocar o nome | Parâmetro é o nome na definição da função; argumento é o valor passado na chamada |
| Arrow function com corpo de várias linhas sem chaves | Tentar aplicar a forma curta a um corpo que precisa de `return` explícito | Adicione `{ }` e `return` quando o corpo tiver mais de uma expressão |

## // Prática guiada

1. No `script.js`, escreva a função `statusDoGrupo(participantes)`, usando o exemplo desta seção.
2. Chame ela três vezes, com números diferentes, imprimindo cada resultado no console.
3. Reescreva a mesma função como arrow function, guardada em uma constante, e confirme que o comportamento é idêntico.

## // Pratique sozinho

> **DESAFIO**
> Escreva uma função `mensagemDeBoasVindas(nome)` que devolve `"Bem-vinda(o), " + nome + "!"`. Depois, escreva uma segunda função `mensagemDeVagas(participantes, limite)` que devolve quantas vagas ainda restam (`limite - participantes`), ou `"Grupo cheio"` se o resultado for zero ou negativo.

## // Aplicando no projeto da semana

1. Transforme pelo menos duas lógicas do seu projeto (por exemplo, `statusDoGrupo` e uma validação simples) em funções nomeadas, reutilizáveis.
2. Confirme que nenhuma dessas lógicas está duplicada em mais de um lugar do código.
3. Commit: `git commit -m "Organiza lógica em funções reutilizáveis"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Uma função `calcularStatus(participantes)` tem um `console.log(status)` no lugar de `return status`. O que acontece quando você tenta usar `const resultado = calcularStatus(8);` depois?

Resposta: `resultado` vai receber `undefined`. `console.log` só imprime um valor no console: ele não *devolve* nada para quem chamou a função. Sem um `return` explícito, toda função devolve `undefined` por padrão, mesmo que ela tenha feito algo visível (como imprimir no console) internamente.

## // Resumo do módulo

- [ ] Sei escrever uma função com `function nome(parametro) { ... return ...; }`.
- [ ] Sei escrever a mesma lógica como arrow function.
- [ ] Sei explicar por que `return` é necessário para a função devolver um valor.
- [ ] Sei o que significa escopo, e por que uma variável de dentro de uma função não existe fora dela.
- [ ] Já organizei pelo menos duas lógicas do meu projeto em funções nomeadas.

---

**Próximo módulo:** `05-arrays-e-metodos-essenciais.md`, funções prontas; agora, a ferramenta que você mais vai usar nesta semana: transformar listas de dados.

`Material de Estudo // Coffee & Code`
