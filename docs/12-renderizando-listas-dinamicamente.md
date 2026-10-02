# Módulo 12, Renderizando Listas Dinamicamente

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // O problema

Olhe o HTML do seu Dashboard, herdado da Semana 02:

```html
<section class="dashboard-grid">
  <article class="card">
    <h3>Cálculo I</h3>
    <p>5 participantes · encontros às terças</p>
    <button class="botao botao-primario">Participar</button>
  </article>
  <article class="card">
    <h3>Estrutura de Dados</h3>
    <p>3 participantes · encontros às quintas</p>
    <button class="botao botao-primario">Participar</button>
  </article>
  <!-- ...mais quatro cards, cada um copiado e colado -->
</section>
```

Cada card foi escrito à mão. Se um grupo novo for criado, alguém precisa editar o HTML. Se um grupo for removido, alguém precisa lembrar de apagar o trecho certo. Isso não escala, e, mais importante, não é assim que uma interface real funciona: a lista de grupos vem de algum lugar (por enquanto, um array que você mesmo escreve; nas próximas semanas do clube, uma API de verdade), e a tela precisa se organizar sozinha em cima dela.

## // A ideia central

> **RENDERIZAÇÃO DINÂMICA: EM PALAVRAS SIMPLES**
> É gerar o HTML de uma lista de elementos automaticamente, a partir de um array de dados, em vez de escrever cada elemento manualmente. Mude o array, e a tela muda junto, sem precisar tocar no HTML.

O caminho, em três passos:

1. Tenha um **array de objetos** representando os dados (você viu isso no Módulo 06 e vai formalizar como JSON no Módulo 11).
2. Para cada objeto do array, **construa** o pedaço de HTML (ou o elemento DOM) correspondente.
3. **Insira** esse HTML dentro de um container que já existe na página.

## // Do array aos elementos, visualmente

<div align="center">
<img src="./assets/mock-data-to-render.svg" alt="Array de objetos, com .map(), virando elementos renderizados na tela" width="520">
</div>

Cada objeto do array, `{ materia: "Cálculo I", participantes: 5 }`, vira, na tela, um card com essas informações. A ordem se mantém: o primeiro item do array é o primeiro card; se o array tiver seis itens, a tela tem seis cards.

## // O método `.map()` aplicado a renderização

Você já viu `.map()` no Módulo 05 transformando um array em outro array. Renderização usa exatamente essa ideia, só que o array de saída é um array de **strings de HTML**:

```javascript
const grupos = [
  { materia: "Cálculo I", participantes: 5 },
  { materia: "Estrutura de Dados", participantes: 3 },
  { materia: "Banco de Dados", participantes: 8 },
];

const htmlDosCards = grupos.map(function (grupo) {
  return `
    <article class="card">
      <h3>${grupo.materia}</h3>
      <p>${grupo.participantes} participantes</p>
      <button class="botao botao-primario">Participar</button>
    </article>
  `;
});
```

`htmlDosCards` agora é um array de três strings, cada uma um pedaço de HTML pronto. Falta só juntar essas strings e colocar na página.

## // Template literals: escrevendo HTML dentro do JavaScript

Repare que o HTML do exemplo acima está entre crases, não aspas comuns. Isso se chama *template literal*, uma forma de string que permite quebrar linha livremente e, principalmente, **inserir valores de variáveis diretamente**, usando `${...}`:

```javascript
const materia = "Cálculo I";
const texto = `A matéria é ${materia}.`;
// texto agora é: "A matéria é Cálculo I."
```

Sem template literals, o mesmo resultado exigiria concatenar strings com `+`, muito mais difícil de ler quando o HTML tem várias linhas e vários valores, como no exemplo dos cards.

## // Juntando tudo e inserindo na página

```javascript
const container = document.querySelector(".dashboard-grid");

function renderizarGrupos(lista) {
  const html = lista.map(function (grupo) {
    return `
      <article class="card">
        <h3>${grupo.materia}</h3>
        <p>${grupo.participantes} participantes</p>
        <button class="botao botao-primario">Participar</button>
      </article>
    `;
  }).join("");

  container.innerHTML = html;
}

renderizarGrupos(grupos);
```

Três pontos que merecem atenção:

| Parte | Por que está ali |
|---|---|
| `.join("")` | `.map()` devolve um array de strings; `.join("")` junta todas em uma string só, sem nenhum separador entre elas |
| `container.innerHTML = html` | Substitui todo o conteúdo do container pelo HTML gerado, inclusive apagando o que existia antes |
| `function renderizarGrupos(lista)` | Uma função, não um script solto, assim você pode chamar de novo sempre que os dados mudarem (depois de uma busca, por exemplo) |

> **SOBRE `INNERHTML` E SEGURANÇA**
> Você já viu no Módulo 08 (Semana 03) que `innerHTML` não deve receber texto digitado por uma pessoa sem tratamento: o risco é injeção de código. Neste caso específico, os dados vêm de um array que *você* escreveu (ou, mais adiante, de uma API controlada), não de um campo de formulário aberto ao público; por isso é uma aplicação aceitável de `innerHTML` aqui. Se, no futuro, algum desses valores puder vir digitado por um usuário sem qualquer tratamento, a mesma cautela do Módulo 08 volta a valer.

## // Re-renderizar: o padrão que faz tudo funcionar junto

A parte que realmente conecta este módulo ao resto da semana: `renderizarGrupos` pode ser chamada **de novo**, quantas vezes for preciso, com uma lista diferente, e a tela reflete isso instantaneamente:

```javascript
function filtrarPorBusca(termo) {
  const filtrados = grupos.filter(function (grupo) {
    return grupo.materia.toLowerCase().includes(termo.toLowerCase());
  });
  renderizarGrupos(filtrados);
}
```

Chame `filtrarPorBusca("cálculo")`, e a tela passa a mostrar só os grupos cujo nome contém "cálculo", sem nenhum reload, sem reescrever HTML manualmente. É a mesma função de renderização de sempre, só que alimentada por um array diferente a cada chamada.

## // Bom exemplo × mau exemplo

**Mau exemplo**: concatenando o container em vez de substituir:

```javascript
grupos.forEach(function (grupo) {
  container.innerHTML += `<article class="card">...</article>`;
});
```

Cada `+=` refaz o `innerHTML` inteiro do zero e adiciona por cima: lento, e se essa função rodar de novo (depois de uma busca, por exemplo), os cards antigos nunca são removidos, só se acumulam.

**Bom exemplo**: construir o HTML todo primeiro, escrever uma vez:

```javascript
const html = grupos.map(function (grupo) {
  return `<article class="card">...</article>`;
}).join("");
container.innerHTML = html;
```

Uma escrita só no DOM, e cada chamada de `renderizarGrupos` substitui completamente o conteúdo anterior, sem acúmulo.

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| Cards duplicando a cada busca | Usar `+=` em vez de substituir o `innerHTML` | Monte a string inteira com `.map().join("")` e atribua uma vez só |
| `undefined` aparecendo no card | Nome da propriedade do objeto digitado errado (`grupo.materias` em vez de `grupo.materia`) | Confira o nome exato das propriedades no array de dados |
| Nada aparece na tela | Selecionou o container antes dele existir no HTML, ou `querySelector` com seletor errado | Confirme que o `<script>` roda depois do HTML (Módulo 01) e que a classe/id bate |
| Função de renderização não roda de novo após um filtro | Esquecer de chamar `renderizarGrupos(...)` de novo dentro da função de busca | Toda mudança nos dados exibidos precisa terminar em uma nova chamada de renderização |

## // Prática guiada

1. No `script.js` do Dashboard, crie o array `grupos` com pelo menos 4 objetos (`materia`, `participantes`).
2. Escreva `renderizarGrupos(lista)`, usando `.map()` e template literals, seguindo o exemplo desta seção.
3. Chame `renderizarGrupos(grupos)` uma vez, ao carregar a página.
4. Abra o Dashboard no navegador e confirme: os cards que antes eram HTML fixo agora vêm do array. Adicione um quinto objeto ao array, salve, recarregue. O quinto card aparece sozinho?

## // Pratique sozinho

> **DESAFIO**
> Conecte o campo de busca do Dashboard (já existente desde a Semana 02) a uma função `filtrarPorBusca(termo)`, usando `.filter()` seguido de `renderizarGrupos(...)`. Teste digitando parte do nome de uma matéria e confirme que só os cards correspondentes continuam na tela, sem reload.

## // Aplicando no projeto da semana

1. Transforme o grid de cards do Dashboard do seu projeto em conteúdo renderizado a partir de um array, não mais HTML fixo.
2. Implemente a busca funcionando de verdade, usando o padrão filtrar → renderizar.
3. Confirme que adicionar ou remover um item do array (direto no código, por enquanto) reflete corretamente na tela após recarregar.
4. Commit: `git commit -m "Renderiza grid do Dashboard dinamicamente a partir de um array"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Sua função de busca chama `grupos.filter(...)`, mas esquece de chamar `renderizarGrupos(...)` com o resultado. O que a pessoa usando a busca vai observar, e por quê?

Resposta: nada muda na tela. `.filter()` só cria um novo array filtrado: ele não tem nenhum efeito visual por si só. A tela só reflete dados novos quando `renderizarGrupos` (ou equivalente) é chamada de novo, passando esse array filtrado como argumento. Filtrar dados e atualizar a tela são dois passos separados; o primeiro não implica o segundo.

## // Resumo do módulo

- [ ] Sei explicar por que cards escritos à mão no HTML não escalam.
- [ ] Sei usar `.map()` combinado com template literals para gerar HTML a partir de um array.
- [ ] Sei por que `.join("")` é necessário depois do `.map()`.
- [ ] Sei por que substituir `innerHTML` (não concatenar com `+=`) evita duplicação.
- [ ] Sei que toda mudança nos dados exibidos precisa terminar em uma nova chamada da função de renderização.
- [ ] O grid do Dashboard do meu projeto já renderiza a partir de um array, com busca funcionando.

---

**Próximo módulo:** `13-estado-e-componentizacao.md`, a lista renderiza. Agora, como organizar isso quando a interface cresce e vários pedaços da tela dependem dos mesmos dados?

`Material de Estudo // Coffee & Code`
