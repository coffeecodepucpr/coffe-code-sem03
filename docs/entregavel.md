# Entregável, Semana 03

`SEM 03 // Interface Web, Parte 2: Dinâmica`

Use este arquivo como checklist final antes de considerar a Semana 03 concluída. Ele reúne o que é **obrigatório**; os desafios extras em `desafios.md` são opcionais.

## // O que você deve ter em mãos agora

Se você seguiu os módulos em ordem, seu repositório agora deve ter, além de tudo o que veio das Semanas 01 e 02: um `script.js` (ou um por tela) conectado às três páginas, dados estruturados como mock, formulário de Login validando de verdade, Dashboard renderizando e filtrando dinamicamente, e Perfil refletindo dados reais com pelo menos uma ação funcional.

## // Checklist do entregável

### > JavaScript básico

- [ ] `script.js` conectado às três páginas com `defer`, sem erro no console ao carregar nenhuma delas.
- [ ] Nenhuma comparação usa `==`, só `===`.
- [ ] Toda lógica repetida está organizada em funções nomeadas, não duplicada.

### > DOM e eventos

- [ ] Elementos selecionados com `querySelector`/`querySelectorAll`, nunca assumindo que existem sem checar.
- [ ] Pelo menos três interações reais usam `addEventListener` (formulário, busca, um botão de ação).
- [ ] O formulário de Login usa `event.preventDefault()`.

### > Validação

- [ ] Login valida e-mail (obrigatório + formato) e senha (obrigatório + tamanho mínimo).
- [ ] Mensagens de erro são específicas, aparecem perto do campo correspondente, e são limpas a cada nova tentativa.
- [ ] Nenhum campo com só espaços em branco passa como preenchido (`.trim()` aplicado).

### > Dados e renderização

- [ ] Os dados do Dashboard (e do Perfil, se aplicável) estão estruturados como array de objetos, nomeados como mock, com `id` único por item.
- [ ] O grid do Dashboard é gerado inteiramente por `.map()` + `innerHTML` (ou equivalente), não por HTML fixo.
- [ ] A busca do Dashboard filtra em tempo real, sem recarregar a página.

### > Estado e componentização

- [ ] Pelo menos uma ação (remover, adicionar) segue o ciclo estado → renderização, nunca altera o DOM diretamente sem antes atualizar o estado.
- [ ] Pelo menos uma função de componente (como `criarCardHTML`) é reutilizada em mais de um lugar, ou está pronta para ser.

## // O que NÃO é esperado nesta semana

- Não é esperado nenhum backend, banco de dados ou chamada de rede real a um servidor seu.
- Não é esperado nenhum framework (React ou equivalente): tudo em JavaScript puro, de propósito.
- Não é esperado tratamento de erro sofisticado para falhas de rede (ainda não existe rede real).
- Não é esperada persistência entre recarregamentos de página: os dados mock resetam a cada vez que a página é aberta, e isso é esperado.

> **A LÓGICA CORRETA VALE MAIS QUE POLIMENTO VISUAL**
> Uma validação que bloqueia corretamente um e-mail mal formatado, mesmo com uma mensagem de erro simples, vale mais nesta avaliação do que uma interface bonita que aceita qualquer coisa no formulário. Comportamento correto é o que está sendo avaliado esta semana.

## // Como revisar antes de entregar

> **O TESTE MAIS IMPORTANTE DESTA SEMANA**
> Abra o console do navegador (F12) nas três telas, sem fazer nada ainda. Aparece algum erro em vermelho só de carregar a página? Depois, use cada tela normalmente: login errado, login certo, busca, sair de um grupo. Algum erro aparece durante o uso?

Se a resposta for "nenhum erro" nos dois casos, sua entrega está no caminho certo. Se algum erro aparecer, ele quase sempre aponta o arquivo e a linha exatos. Volte ao módulo correspondente.

## // Onde tirar dúvidas

Os encontros semanais do Coffee & Code existem para isso. "Meu botão renderizado dinamicamente não responde a clique, já tentei X e Y" é muito mais rápido de resolver do que "meu JavaScript não funciona".

Se quiser se aprofundar além do que foi pedido, veja `desafios.md`.

## // O que vem na Semana 04

A Semana 03 termina com uma interface que reage, valida e renderiza, mas inteiramente com dados que vivem só no próprio código, que desaparecem a cada recarregamento de página. É essa lacuna (persistência, e depois comunicação com um servidor de verdade) que as próximas semanas do clube começam a preencher.

Bom trabalho até aqui.

`Material de Estudo // Coffee & Code`
