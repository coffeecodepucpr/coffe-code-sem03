# Módulo 14, Projeto Guiado: Login, Dashboard e Perfil Dinâmicos

`SEM 03 // Interface Web, Parte 2: Dinâmica`

---

## // Para que serve este módulo

Nenhum conceito novo aparece aqui. Este módulo junta, em ordem, tudo o que os Módulos 01 a 13 ensinaram separadamente, mostrando como as três telas do projeto ganham comportamento, do início ao fim, em um único fluxo de trabalho.

## // Etapa 1, Conectar o JavaScript (Módulo 01)

Confirme que as três páginas (`login.html`, `dashboard.html`, `perfil.html`) têm `<script src="script.js" defer></script>` no `<head>`. Se o seu projeto organiza scripts por página, pode ser um arquivo por tela (`login.js`, `dashboard.js`, `perfil.js`); o raciocínio é idêntico.

## // Etapa 2, Estruturar os dados mock (Módulos 05, 06, 11)

```javascript
let gruposMock = [
  { id: 1, materia: "Cálculo I", participantes: 5, horario: "terças às 18h" },
  { id: 2, materia: "Estrutura de Dados", participantes: 3, horario: "quintas às 19h" },
  { id: 3, materia: "Banco de Dados", participantes: 8, horario: "sábados às 10h" },
  { id: 4, materia: "Engenharia de Software", participantes: 4, horario: "segundas às 17h" },
];

const usuarioMock = {
  nome: "Ana Martins",
  email: "ana.martins@exemplo.com",
  materias: [1, 2],
};
```

## // Etapa 3, Login: validação completa (Módulos 09, 10)

Conecte o formulário, previna o reload, valide e-mail e senha, mostre erros específicos, limpando mensagens antigas a cada nova tentativa, seguindo exatamente o exemplo do Módulo 10.

```javascript
const formLogin = document.querySelector("#form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    // validação completa, como no Módulo 10
    console.log("Login validado, aqui entraria o redirecionamento");
  });
}
```

> **POR QUE O `IF (FORMLOGIN)`**
> Como o mesmo `script.js` pode estar conectado às três páginas, `#form-login` só existe de verdade na página de Login. Testar `if (formLogin)` antes de adicionar o listener evita um erro nas outras duas páginas, onde esse elemento não existe (Módulo 07).

## // Etapa 4, Dashboard: renderização e busca (Módulos 07, 08, 12)

```javascript
const containerGrid = document.querySelector(".dashboard-grid");

function criarCardHTML(grupo) {
  return `
    <article class="card">
      <h3>${grupo.materia}</h3>
      <p>${grupo.participantes} participantes · ${grupo.horario}</p>
      <button class="botao botao-primario" data-id="${grupo.id}">Participar</button>
    </article>
  `;
}

function renderizarGrupos(lista) {
  if (!containerGrid) return;
  containerGrid.innerHTML = lista.map(criarCardHTML).join("");
}

const campoBusca = document.querySelector(".busca");
if (campoBusca) {
  campoBusca.addEventListener("input", function (event) {
    const termo = event.target.value.toLowerCase();
    const filtrados = gruposMock.filter((g) => g.materia.toLowerCase().includes(termo));
    renderizarGrupos(filtrados);
  });
}

renderizarGrupos(gruposMock);
```

## // Etapa 5, Perfil: dados do usuário e ação de sair de um grupo (Módulos 06, 13)

```javascript
const nomeElemento = document.querySelector(".perfil-info h2");
const emailElemento = document.querySelector(".perfil-info p");

if (nomeElemento && emailElemento) {
  nomeElemento.textContent = usuarioMock.nome;
  emailElemento.textContent = usuarioMock.email;
}

function removerGrupo(id) {
  gruposMock = gruposMock.filter((g) => g.id !== id);
  renderizarMeusGrupos();
}

function renderizarMeusGrupos() {
  const container = document.querySelector(".dashboard-grid");
  if (!container) return;
  const meusGrupos = gruposMock.filter((g) => usuarioMock.materias.includes(g.id));
  container.innerHTML = meusGrupos.map(function (grupo) {
    return `
      <article class="card">
        <h3>${grupo.materia}</h3>
        <p>${grupo.participantes} participantes</p>
        <button class="botao botao-secundario" data-id="${grupo.id}">Sair do grupo</button>
      </article>
    `;
  }).join("");
}
```

## // Etapa 6, Conectando cliques aos botões renderizados (Módulo 09)

Botões criados via `innerHTML` (Etapas 4 e 5) não existiam no momento em que um `addEventListener` direto seria adicionado a cada um: eles só passam a existir depois da renderização. A forma mais simples de resolver isso, com o que você já sabe, é adicionar o listener no **container** (que já existe desde o início), e verificar, dentro do callback, se o clique realmente aconteceu em um botão:

```javascript
if (containerGrid) {
  containerGrid.addEventListener("click", function (event) {
    if (event.target.matches(".botao-secundario")) {
      const id = Number(event.target.dataset.id);
      removerGrupo(id);
    }
  });
}
```

`event.target.dataset.id` lê o atributo `data-id` que você já incluiu em `criarCardHTML`: é assim que o clique sabe *qual* grupo remover, mesmo o botão tendo sido criado dinamicamente.

## // Checklist de fechamento das três telas

- [ ] Login valida de verdade, com mensagens específicas por campo, sem recarregar a página.
- [ ] Dashboard renderiza os cards a partir de `gruposMock`, não de HTML fixo.
- [ ] A busca do Dashboard filtra em tempo real, sem reload.
- [ ] Perfil mostra dados de `usuarioMock`, não texto fixo.
- [ ] Pelo menos uma ação (sair de um grupo) segue o ciclo estado → renderização (Módulo 13), sem alterar o DOM diretamente.
- [ ] Nenhuma das três páginas gera erro no console ao carregar.

## // Erros comuns ao juntar tudo

| Erro | Por que acontece | Como corrigir |
|---|---|---|
| Erro no console em páginas onde um elemento não existe | O mesmo `script.js` roda nas três páginas, mas nem todo elemento existe em todas | Sempre teste `if (elemento)` antes de usar, especialmente formulários e containers específicos de uma tela |
| Clique em botão renderizado dinamicamente não faz nada | `addEventListener` foi colocado direto no botão, antes dele existir | Coloque o listener no container (que já existia), e confira `event.target` dentro do callback |
| Dados e tela dessincronizados depois de uma ação | Alterar o DOM direto em vez de passar pelo estado | Revise o Módulo 13; toda ação deveria terminar em atualizar o estado e chamar a renderização de novo |

## // Aplicando no projeto da semana

Esta é a aplicação: não existe uma atividade separada. Ao final deste módulo, as três telas devem passar pelo checklist do Módulo 15.

Commit final desta etapa: `git commit -m "Finaliza comportamento dinâmico das três telas"`.

## // Checkpoint

> **ANTES DE SEGUIR, PENSE NISTO**
> Se você tivesse que explicar para alguém, em três frases, por que a ordem JavaScript conectado → dados estruturados → DOM e eventos → validação → renderização fez sentido, o que você diria?

Resposta possível: sem o script conectado (Módulo 01), nenhuma lógica roda. Sem dados estruturados (Módulos 05, 06, 11), não existe o que validar ou renderizar. E só depois de saber selecionar/alterar o DOM e escutar eventos (Módulos 07 a 09) que validação (Módulo 10) e renderização dinâmica (Módulos 12, 13) fazem sentido. Cada uma dessas duas últimas etapas é, na prática, uma combinação das anteriores aplicada a um objetivo específico.

## // Resumo do módulo

- [ ] Consigo repetir, de memória, a sequência de etapas usada para dar comportamento a uma tela do zero.
- [ ] As três telas do meu projeto (Login, Dashboard, Perfil) passaram por todas as seis etapas.
- [ ] O checklist de fechamento das três telas está completo.

---

**Próximo módulo:** `15`, antes de considerar a semana concluída, uma revisão final contra os critérios reais do entregável (veja `entregavel.md`).

`Material de Estudo // Coffee & Code`
