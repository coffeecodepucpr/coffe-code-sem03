# Módulo 01, Como o JavaScript Entra na Página

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // Antes de começar

No Módulo 00 você viu o modelo: HTML é estrutura, CSS é apresentação, JavaScript é comportamento. Este módulo resolve uma pergunta bem prática antes de qualquer lógica: onde esse código mora, e quando exatamente ele roda?

## // Conectando um arquivo `.js` ao HTML

Do mesmo jeito que CSS vive em um arquivo separado conectado por `<link>`, JavaScript vive em um arquivo `.js` conectado por `<script>`:

```html
<head>
  <script src="script.js" defer></script>
</head>
```

## // Por que `defer` importa

> **O PROBLEMA SEM `DEFER`**
> O navegador lê o HTML de cima para baixo. Se um `<script>` aparece no meio do `<head>`, antes do `<body>` existir, e esse script tenta selecionar um elemento do `<body>` (Módulo 07), ele simplesmente não vai encontrar nada, porque esse elemento ainda não foi lido pelo navegador.

Duas soluções tradicionais, e uma moderna:

| Abordagem | Como funciona |
|---|---|
| `<script>` no fim do `<body>` | Funciona, mas mistura a organização do HTML com a localização do JS |
| `<script defer>` no `<head>` | O navegador baixa o arquivo em paralelo, mas só executa depois que todo o HTML foi lido, sendo a opção recomendada |
| `<script async>` | Executa assim que terminar de baixar, podendo interromper a leitura do HTML, então raramente é o que você quer para scripts que leem o DOM |

Use `<script src="script.js" defer></script>` no `<head>` como padrão, por dois motivos: mantém a organização do HTML (todo `<script>` e `<link>` juntos, no `<head>`) e garante que o HTML inteiro já existe antes do seu código rodar.

## // Console: onde seu código "fala" com você

Todo navegador tem um **console**, acessível pelas ferramentas de desenvolvedor (geralmente tecla F12, ou clique direito → Inspecionar → aba Console). `console.log(...)` imprime qualquer valor ali, e é a ferramenta mais usada para entender o que seu código está fazendo:

```javascript
console.log("O script carregou");
console.log(2 + 2);
```

> **HÁBITO QUE VALE A PENA CRIAR AGORA**
> Sempre que algo não fizer o que você espera, o primeiro passo é abrir o console. Um erro em vermelho ali quase sempre diz exatamente o arquivo e a linha onde o problema está. Ignorar essa mensagem e tentar adivinhar custa muito mais tempo do que lê-la.

## // O JavaScript roda uma vez, de cima para baixo

Diferente do que às vezes se imagina, um arquivo `.js` não fica "esperando" indefinidamente: ele executa uma vez, linha por linha, de cima para baixo, no momento em que é carregado (respeitando `defer`, como você viu acima). Código que precisa rodar *depois*, em resposta a uma ação da pessoa (um clique, por exemplo), precisa ser organizado para isso, e é exatamente o que o Módulo 09 (Eventos) ensina. Por enquanto, todo exemplo deste módulo em diante roda direto, assim que o arquivo carrega.

## // Bom exemplo × mau exemplo

**Mau exemplo**: script no meio do `<head>`, sem `defer`, tentando ler o `<body>`:

```html
<head>
  <script src="script.js"></script>
</head>
<body>
  <h1>Buscador de Grupos de Estudo</h1>
</body>
```

Se `script.js` tentar selecionar o `<h1>`, ele falha: o `<body>` ainda não existe no momento em que o script roda.

**Bom exemplo**: mesmo script, com `defer`:

```html
<head>
  <script src="script.js" defer></script>
</head>
<body>
  <h1>Buscador de Grupos de Estudo</h1>
</body>
```

## // Erros comuns

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| `null` ao tentar selecionar um elemento | Script rodou antes do HTML existir | Adicione `defer` ao `<script>` |
| Nada aparece no console | Caminho do `src` errado, ou arquivo não salvo | Confira o caminho relativo e se o arquivo foi salvo |
| Erro em vermelho ignorado | Parece mais rápido continuar tentando sem ler | Leia a primeira mensagem de erro: ela quase sempre aponta a causa exata |

## // Prática guiada

1. Crie o arquivo `script.js` na raiz do seu projeto (ou em uma pasta `js/`, se preferir organizar assim).
2. Conecte ele em `dashboard.html`, `login.html` e `perfil.html`, usando `<script src="script.js" defer></script>` no `<head>` de cada um.
3. Dentro de `script.js`, escreva `console.log("Script carregado com sucesso");`.
4. Abra cada página no navegador, abra o console (F12), e confirme que a mensagem aparece nas três.

## // Pratique sozinho

> **DESAFIO**
> Remova temporariamente o `defer` do `<script>` do Dashboard, e adicione, logo no topo de `script.js`, uma linha tentando ler algo do `<body>` (você vai aprender a sintaxe exata no Módulo 07, por enquanto, se quiser só observar o erro, use `document.body.innerHTML` dentro de um `console.log`). Veja o que aparece no console. Depois, devolva o `defer` e confirme que o erro desaparece.

## // Aplicando no projeto da semana

1. Crie `script.js` e conecte nas três páginas do seu projeto, com `defer`.
2. Confirme, via `console.log`, que o script carrega corretamente nas três.
3. Commit: `git commit -m "Conecta script.js às três telas"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Um colega tira o `defer` do `<script>` "porque parece mais simples" e move o `<script>` para o fim do `<body>` em vez disso. Isso resolve o mesmo problema que `defer` resolve?

Resposta: sim, funciona: colocar o `<script>` no fim do `<body>` garante que todo o HTML acima já foi lido antes do script rodar, pelo mesmo motivo que `defer` garante isso. A diferença é organizacional: com `defer` no `<head>`, todo `<link>` e `<script>` ficam juntos, em um lugar previsível; movendo o script para o fim do `<body>`, a localização passa a depender de onde alguém lembrou de colocá-lo. Nenhuma das duas está "errada": `defer` no `<head>` é só a convenção mais comum hoje.

## // Resumo do módulo

- [ ] Sei conectar um arquivo `.js` externo ao HTML.
- [ ] Sei por que `defer` evita o erro mais comum de quem está começando com JavaScript.
- [ ] Sei abrir o console do navegador e usar `console.log` para inspecionar valores.
- [ ] Sei que um script roda uma vez, de cima para baixo, no carregamento da página.
- [ ] As três páginas do meu projeto já têm `script.js` conectado corretamente.

---

**Próximo módulo:** `02-variaveis-tipos-e-operadores.md`, antes de qualquer lógica, o vocabulário mínimo: onde os valores ficam guardados.

`Material de Estudo // Coffee & Code`
