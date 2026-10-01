# Módulo 06, Objetos e Desestruturação

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // O problema

Um grupo de estudo não é só um nome: tem matéria, quantidade de participantes, horário, e provavelmente mais informações no futuro. Guardar tudo isso em variáveis soltas (`materia1`, `participantes1`, `horario1`) perde completamente a noção de que essas informações pertencem à mesma coisa. Um objeto resolve exatamente isso.

## // Objeto: agrupando propriedades de uma coisa só

```javascript
const grupo = {
  materia: "Cálculo I",
  participantes: 5,
  horario: "terças às 18h",
};

console.log(grupo.materia); // Cálculo I
console.log(grupo["materia"]); // mesma coisa, forma alternativa
```

> **OBJETO: EM PALAVRAS SIMPLES**
> É uma forma de agrupar várias informações relacionadas (propriedades) dentro de uma única coisa nomeada, em vez de espalhar cada informação em uma variável separada.

## // Array × objeto: quando usar cada um

| | Array | Objeto |
|---|---|---|
| Representa | Uma **lista** de coisas | As **características** de uma coisa |
| Acesso | Por posição (`array[0]`) | Por nome (`objeto.propriedade`) |
| Exemplo nesta semana | A lista inteira de grupos | Um grupo específico, com suas informações |

Na prática, os dois quase sempre aparecem juntos: um **array de objetos**, exatamente a estrutura que você já usou no Módulo 05 (`grupos`, onde cada item é um objeto `{ materia, participantes }`).

## // Lendo e alterando propriedades

```javascript
grupo.participantes = grupo.participantes + 1;
console.log(grupo.participantes); // 6
```

Diferente de um array (onde `.map()`/`.filter()` sempre devolvem algo novo), alterar uma propriedade de um objeto diretamente (`grupo.participantes = ...`) muda o objeto original. Isso importa especialmente quando o mesmo objeto está guardado dentro de um array: alterar uma propriedade dele altera o item correspondente dentro do array também.

## // Métodos dentro de um objeto

Um objeto pode guardar não só valores, mas também funções:

```javascript
const grupo = {
  materia: "Cálculo I",
  participantes: 5,
  estaCheio: function () {
    return this.participantes >= 10;
  },
};

console.log(grupo.estaCheio()); // false
```

`this`, dentro de um método de objeto, se refere ao próprio objeto: `this.participantes` é o mesmo que `grupo.participantes`, só que a função não precisa saber o nome da variável de fora. Você não vai usar `this` extensivamente nesta semana (o Módulo 13 volta a esse assunto com mais profundidade), mas vale reconhecer o padrão.

## // Desestruturação: extraindo propriedades direto

```javascript
const grupo = { materia: "Cálculo I", participantes: 5, horario: "terças às 18h" };

// sem desestruturação
const materia1 = grupo.materia;
const participantes1 = grupo.participantes;

// com desestruturação, mesmo resultado, uma linha
const { materia, participantes } = grupo;

console.log(materia); // Cálculo I
console.log(participantes); // 5
```

> **DESESTRUTURAÇÃO: EM PALAVRAS SIMPLES**
> É uma forma direta de extrair propriedades de um objeto (ou itens de um array) para variáveis separadas, sem precisar escrever `objeto.propriedade` várias vezes.

Isso aparece com muita frequência dentro de funções que recebem um objeto como parâmetro:

```javascript
function descreverGrupo({ materia, participantes }) {
  return `${materia} tem ${participantes} participantes`;
}

console.log(descreverGrupo(grupo));
```

A função recebe o objeto inteiro, mas já "abre" ele em `materia` e `participantes` direto na definição do parâmetro, sem uma linha extra para isso dentro do corpo da função.

## // Bom exemplo × mau exemplo

**Mau exemplo**: informações relacionadas espalhadas em variáveis soltas:

```javascript
const materiaGrupo1 = "Cálculo I";
const participantesGrupo1 = 5;
const materiaGrupo2 = "Estrutura de Dados";
const participantesGrupo2 = 3;
```

**Bom exemplo**: agrupadas como deveriam, prontas para virar um array:

```javascript
const grupos = [
  { materia: "Cálculo I", participantes: 5 },
  { materia: "Estrutura de Dados", participantes: 3 },
];
```

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| `undefined` ao acessar uma propriedade | Nome da propriedade digitado errado (`grupo.materias` em vez de `grupo.materia`) | Confira o nome exato, incluindo maiúsculas/minúsculas |
| Alterar um objeto sem perceber que outro lugar também referencia ele | Objetos são alterados "no lugar", diferente do resultado de `.map()`/`.filter()` | Tenha clareza de quando você quer alterar o original, e quando quer uma cópia |
| Desestruturar com o nome errado | O nome na desestruturação precisa bater com o nome da propriedade no objeto | `const { materia } = grupo` só funciona se a propriedade se chamar exatamente `materia` |

## // Prática guiada

1. No `script.js`, crie um objeto `grupo` com `materia`, `participantes` e `horario`.
2. Leia e imprima cada propriedade usando `objeto.propriedade`.
3. Reescreva a leitura usando desestruturação (`const { materia, participantes, horario } = grupo;`).
4. Escreva uma função `descreverGrupo({ materia, participantes })` que devolve uma frase combinando as duas informações.

## // Pratique sozinho

> **DESAFIO**
> Crie um objeto `usuario` representando o Perfil do projeto (`nome`, `email`, `materias`, este último um array). Escreva uma função `resumoDoUsuario(usuario)` que usa desestruturação no parâmetro e devolve uma frase incluindo o nome e a quantidade de matérias (`usuario.materias.length`).

## // Aplicando no projeto da semana

1. Confirme que cada grupo do seu array de dados é um objeto com propriedades nomeadas claramente.
2. Escreva pelo menos uma função que recebe um objeto como parâmetro e usa desestruturação nele.
3. Commit: `git commit -m "Estrutura dados do Perfil como objeto, com desestruturação"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Um array `grupos` guarda objetos. Você pega um desses objetos (`const g = grupos[0];`) e altera `g.participantes = 99;`. O item correspondente dentro do array `grupos` também muda?

Resposta: sim. `g` não é uma cópia do objeto: é uma referência ao mesmo objeto que já estava dentro do array. Alterar uma propriedade através de `g` altera o próprio objeto, que é o mesmo que está em `grupos[0]`. Isso é diferente do comportamento de `.map()`/`.filter()` (Módulo 05), que sempre devolvem uma estrutura nova.

## // Resumo do módulo

- [ ] Sei criar um objeto e ler/alterar suas propriedades.
- [ ] Sei a diferença entre quando usar array e quando usar objeto.
- [ ] Sei usar desestruturação para extrair propriedades, inclusive dentro de parâmetros de função.
- [ ] Sei que alterar uma propriedade de um objeto altera o original, ao contrário de `.map()`/`.filter()`.
- [ ] Os dados do meu projeto (grupos, usuário) já estão estruturados como objetos claros.

---

**Próximo módulo:** `07-o-dom-selecionar-e-ler.md`, variáveis, funções, arrays e objetos prontos. Hora de conectar tudo isso à página de verdade.

`Material de Estudo // Coffee & Code`
