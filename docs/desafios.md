# Desafios, Semana 03

Desafios opcionais, organizados pelos módulos da semana. Nenhum é obrigatório para a entrega básica; veja `entregavel.md` para o que é obrigatório. Use estes desafios se terminou os módulos principais e quer se aprofundar, ou se quer deixar o entregável mais robusto.

---

## // Fundamentos de JavaScript (Módulos 02–04)

**Se você está começando**
- Escreva uma função `formatarParticipantes(n)` que devolve `"1 participante"` (singular) quando `n` for 1, e `"N participantes"` (plural) para qualquer outro valor.
- Pesquise sobre template literals com múltiplas variáveis e reescreva uma das mensagens de erro do Módulo 10 usando uma.

**Se você já tem experiência**
- Pesquise a diferença entre `function` declarada e arrow function em relação ao valor de `this`, e escreva um exemplo próprio mostrando um caso em que essa diferença importa.

---

## // Arrays e objetos (Módulos 05–06)

**Se você está começando**
- Use `.sort()` para ordenar `gruposMock` por quantidade de participantes, do menor para o maior, e confirme o resultado no console.

**Se você já tem experiência**
- Pesquise sobre `.reduce()` e use ele para somar o total de participantes de todos os grupos em um único número.
- Pesquise sobre spread operator (`...`) para criar uma cópia de um objeto com uma propriedade alterada, sem mutar o original.

---

## // DOM e eventos (Módulos 07–09)

**Se você está começando**
- Adicione um contador visível na tela ("X grupos encontrados"), atualizado toda vez que a busca do Dashboard filtra a lista.

**Se você já tem experiência**
- Pesquise sobre delegação de eventos (o padrão que você já usou no Módulo 14, com `event.target.matches(...)`) e aplique o mesmo padrão em outro contexto do seu projeto, como cliques em tags de matéria no Perfil.
- Pesquise sobre `event.stopPropagation()` e identifique um cenário no seu projeto onde ele faria sentido.

---

## // Validação (Módulo 10)

**Se você está começando**
- Adicione uma checagem de confirmação de senha (dois campos, que precisam ser iguais) à tela de cadastro, se você tiver uma.

**Se você já tem experiência**
- Pesquise sobre Expressões Regulares (Regex) e use uma para validar o formato do e-mail de forma mais rigorosa do que só checar `.includes("@")`.

---

## // JSON e dados mock (Módulo 11)

**Se você está começando**
- Exporte `gruposMock` como um arquivo `.json` separado (copie o resultado de `JSON.stringify(gruposMock, null, 2)`), e documente essa decisão em `docs/arquitetura.md`.

**Se você já tem experiência**
- Pesquise sobre `fetch()` para ler esse mesmo arquivo `.json` local (em vez de ele estar escrito direto no `script.js`), sem se preocupar em enviar dados a lugar nenhum ainda, só em buscar um arquivo estático.

---

## // Renderização, estado e componentização (Módulos 12–13)

**Se você está começando**
- Adicione um estado vazio visível ("Nenhum grupo encontrado") quando uma busca não retornar nenhum resultado.

**Se você já tem experiência**
- Extraia um segundo componente reutilizável (por exemplo, `criarTagHTML(materia)` para as tags do Perfil) e aplique o mesmo raciocínio de reutilização do Módulo 13.
- Implemente `adicionarGrupo(novoGrupo)` (do desafio do Módulo 13) conectado a um formulário real de "criar grupo", seguindo o ciclo estado → renderização.

---

## // Desafio geral (todos)

Peça para outra pessoa (ou você mesmo, revisando depois de um intervalo) usar suas três telas sem nenhuma explicação sua: tentar um login errado e um certo, buscar um grupo no Dashboard, sair de um grupo no Perfil. Essa pessoa entende o que está acontecendo em cada ação, mesmo sem saber que os dados são mock? Se a resposta for sim, seu entregável está em um bom nível. Se não, volte ao módulo correspondente.
