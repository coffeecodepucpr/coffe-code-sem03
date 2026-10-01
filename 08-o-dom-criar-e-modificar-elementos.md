# Módulo 08, O DOM: Criar e Modificar Elementos

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // Antes de começar

O Módulo 07 resolveu "encontrar". Este módulo resolve "mudar": alterar texto, classes, e até criar elementos que não existiam no HTML original. É a peça que falta antes de renderizar qualquer lista dinâmica (Módulo 12).

## // Alterando texto

```javascript
const titulo = document.querySelector("h1");
titulo.textContent = "Bem-vinda de volta!";
```

Atribuir um novo valor a `.textContent` substitui o texto do elemento: a mesma propriedade que você usou para *ler* no Módulo 07 também serve para *escrever*.

## // Alterando classes com `classList`

```javascript
const card = document.querySelector(".card");
card.classList.add("destaque");
card.classList.remove("oculto");
card.classList.toggle("selecionado");
```

| Método | Efeito |
|---|---|
| `.add("classe")` | Adiciona a classe, se ainda não estiver presente |
| `.remove("classe")` | Remove a classe, se estiver presente |
| `.toggle("classe")` | Adiciona se não tiver, remove se já tiver |

`classList` é a forma recomendada de alterar aparência via JavaScript: em vez de escrever estilos CSS diretamente no JavaScript, você liga e desliga classes que já têm suas regras definidas no `styles.css`, mantendo a separação entre estrutura/comportamento (JS) e apresentação (CSS) que vem desde a Semana 02.

## // Criando elementos novos

```javascript
const lista = document.querySelector(".lista-materias");
const item = document.createElement("li");
item.textContent = "Cálculo I";
lista.appendChild(item);
```

Três passos, sempre na mesma ordem: **criar** o elemento (`createElement`), **configurar** ele (texto, classes, atributos), e **inserir** ele em algum lugar da página (`appendChild`, no elemento que vai ser o pai dele).

## // Removendo elementos

```javascript
const item = document.querySelector(".card-antigo");
item.remove();
```

## // `innerHTML`: poderoso, mas com uma regra de segurança

```javascript
const card = document.querySelector(".card");
card.innerHTML = "<strong>Cálculo I</strong>, 5 participantes";
```

`innerHTML` interpreta o texto atribuído como HTML de verdade: permite criar vários elementos de uma vez, em uma linha, em vez de várias chamadas de `createElement`. É a técnica usada no Módulo 12 para renderizar listas inteiras.

> **A REGRA QUE NÃO MUDA**
> `innerHTML` nunca deve receber diretamente um texto que uma pessoa digitou sem tratamento: isso abre espaço para injeção de código (alguém digitar `<script>` malicioso em um campo, por exemplo). Quando o conteúdo vem de dados que você controla (um array que você mesmo escreveu, ou mais adiante uma API confiável), é uma aplicação aceitável. Quando o conteúdo vem direto de um campo de formulário sem nenhum tratamento, prefira `.textContent`.

## // Comparando as três formas de alterar conteúdo

| Opção | Vantagem | Cuidado |
|---|---|---|
| `.textContent` | Simples, sempre seguro para texto puro | Não interpreta tags HTML, se você atribuir `"<b>texto</b>"`, aparece literalmente com as tags visíveis |
| `createElement` + `appendChild` | Controle total da estrutura, elemento por elemento | Mais linhas de código para estruturas grandes |
| `innerHTML` | Cria várias camadas de HTML rapidamente, em uma linha | Nunca usar com texto não confiável, sem tratamento |

## // Bom exemplo × mau exemplo

**Mau exemplo**: `innerHTML` recebendo texto de um campo, sem nenhum tratamento:

```javascript
const nomeDigitado = document.querySelector("#nome").value;
resultado.innerHTML = nomeDigitado; // risco, se nomeDigitado vier de qualquer pessoa
```

**Bom exemplo**: mesmo caso, com `.textContent`, seguro:

```javascript
const nomeDigitado = document.querySelector("#nome").value;
resultado.textContent = nomeDigitado;
```

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| Tags aparecendo como texto literal na tela | Usou `.textContent` esperando que `innerHTML` interpretasse as tags | Use `innerHTML` quando o conteúdo realmente contém tags HTML |
| Elemento criado, mas não aparece na página | Esqueceu o `appendChild` (ou equivalente) depois de `createElement` | `createElement` só cria o elemento na memória; ele precisa ser inserido em algum lugar do DOM |
| `classList.add` "não funciona" | O nome da classe não bate com o que existe no CSS | Confira o nome exato, incluindo maiúsculas/minúsculas |
| `innerHTML` usado com valor não confiável | Esquecer a regra de segurança | Troque para `.textContent` sempre que o conteúdo vier de uma pessoa sem tratamento |

## // Prática guiada

1. No Dashboard, selecione o `<h1>` e altere seu `.textContent` para uma saudação diferente.
2. Selecione um `.card` e use `classList.add` para adicionar uma classe nova (pode ser só para teste, sem estilo definido ainda).
3. Crie um elemento `<li>` novo com `createElement`, dê um `.textContent`, e insira ele em algum container existente com `appendChild`.
4. Remova um elemento da página usando `.remove()`.

## // Pratique sozinho

> **DESAFIO**
> Crie três elementos `<li>` diferentes, cada um com um texto diferente, e insira todos dentro do mesmo container, usando um `for...of` (Módulo 03) combinado com `createElement` e `appendChild` dentro do laço.

## // Aplicando no projeto da semana

1. No Perfil, use `classList` para destacar visualmente algum elemento (por exemplo, marcar o grupo atualmente selecionado).
2. Pratique criar pelo menos um elemento novo via `createElement` + `appendChild`, mesmo que o conteúdo ainda seja fixo (a versão dinâmica de verdade vem no Módulo 12).
3. Commit: `git commit -m "Adiciona criação e modificação de elementos do DOM"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Você quer mostrar, dentro de um card, um texto que inclui `<strong>` para destacar uma palavra. `.textContent` funciona para isso?

Resposta: não. `.textContent` trata qualquer coisa atribuída a ele como texto puro: se você escrever `"<strong>5 vagas</strong>"`, o card vai mostrar literalmente os caracteres `<strong>` e `</strong>` na tela, em vez de aplicar negrito. Para que as tags sejam interpretadas como HTML de verdade, é necessário usar `innerHTML` (ou `createElement`, construindo o elemento `<strong>` separadamente). Como esse conteúdo não vem de uma pessoa digitando, é um uso aceitável de `innerHTML`.

## // Resumo do módulo

- [ ] Sei alterar texto de um elemento já existente.
- [ ] Sei usar `classList.add`, `.remove()` e `.toggle()`.
- [ ] Sei criar um elemento novo com `createElement` e inseri-lo com `appendChild`.
- [ ] Sei a diferença entre `.textContent` e `innerHTML`, e quando cada um é seguro de usar.
- [ ] Já pratiquei criar e modificar elementos reais em pelo menos uma tela do meu projeto.

---

**Próximo módulo:** `09-eventos.md`, até agora, tudo roda assim que a página carrega. Hora de reagir a cliques, digitação e envios de formulário.

`Material de Estudo // Coffee & Code`
