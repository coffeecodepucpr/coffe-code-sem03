// script.js: Buscador de Grupos de Estudo, Semana 03
// Exemplo de referência. Conectado às três páginas via <script defer>.
// Nenhum backend: os dados abaixo são mock (Módulo 11), e tudo roda
// seguindo o ciclo estado → renderização (Módulo 13).

// ---------- Estado (Módulo 13) ----------

let gruposMock = [
  { id: 1, materia: "Cálculo I", participantes: 5, horario: "encontros às terças" },
  { id: 2, materia: "Estrutura de Dados", participantes: 3, horario: "encontros às quintas" },
  { id: 3, materia: "Banco de Dados", participantes: 8, horario: "encontros aos sábados" },
  { id: 4, materia: "Engenharia de Software", participantes: 4, horario: "encontros às segundas" },
  { id: 5, materia: "Redes de Computadores", participantes: 6, horario: "encontros às quartas" },
  { id: 6, materia: "Sistemas Operacionais", participantes: 2, horario: "encontros às sextas" },
];

const usuarioMock = {
  nome: "Ana Martins",
  email: "ana.martins@exemplo.com",
  materias: [1, 2, 3], // ids dos grupos dos quais ela participa
};

// ---------- Componente reutilizável (Módulo 13) ----------

function criarCardHTML(grupo, { acao } = {}) {
  const rotuloBotao = acao === "sair" ? "Sair do grupo" : "Participar";
  const classeBotao = acao === "sair" ? "botao-secundario" : "botao-primario";
  return `
    <article class="card">
      <h3>${grupo.materia}</h3>
      <p>${grupo.participantes} participantes · ${grupo.horario}</p>
      <button class="botao ${classeBotao}" type="button" data-id="${grupo.id}" data-acao="${acao || "participar"}">
        ${rotuloBotao}
      </button>
    </article>
  `;
}

function htmlEstadoVazio(mensagem) {
  return `<p class="estado-vazio">${mensagem}</p>`;
}

// ============================================================
// LOGIN (Módulo 10)
// ============================================================

function iniciarLogin() {
  const form = document.querySelector("#form-login");
  if (!form) return; // esta página não é o Login

  const campoEmail = document.querySelector("#email");
  const campoSenha = document.querySelector("#senha");
  const erroEmail = document.querySelector("#erro-email");
  const erroSenha = document.querySelector("#erro-senha");
  const mensagemSucesso = document.querySelector("#mensagem-sucesso");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    erroEmail.textContent = "";
    erroSenha.textContent = "";
    mensagemSucesso.textContent = "";
    let valido = true;

    if (!email) {
      erroEmail.textContent = "Digite seu e-mail.";
      valido = false;
    } else if (!email.includes("@")) {
      erroEmail.textContent = "Digite um e-mail válido.";
      valido = false;
    }

    if (!senha) {
      erroSenha.textContent = "Digite sua senha.";
      valido = false;
    } else if (senha.length < 8) {
      erroSenha.textContent = "A senha precisa ter pelo menos 8 caracteres.";
      valido = false;
    }

    if (valido) {
      mensagemSucesso.textContent = "Login válido! (sem backend ainda, nada é enviado de verdade)";
      console.log("Formulário válido:", { email });
    }
  });
}

// ============================================================
// DASHBOARD (Módulos 12, 13)
// ============================================================

function iniciarDashboard() {
  const grid = document.querySelector("#dashboard-grid");
  if (!grid) return; // esta página não é o Dashboard

  function renderizarGrupos(lista) {
    grid.innerHTML = lista.length
      ? lista.map((g) => criarCardHTML(g, { acao: "participar" })).join("")
      : htmlEstadoVazio("Nenhum grupo encontrado para essa busca.");
  }

  const campoBusca = document.querySelector("#busca");
  if (campoBusca) {
    campoBusca.addEventListener("input", function (event) {
      const termo = event.target.value.trim().toLowerCase();
      const filtrados = gruposMock.filter((g) =>
        g.materia.toLowerCase().includes(termo)
      );
      renderizarGrupos(filtrados);
    });
  }

  // Delegação de eventos (Módulo 14): o listener fica no grid, que já
  // existe desde o início: os botões dentro dele são criados depois.
  grid.addEventListener("click", function (event) {
    const botao = event.target.closest("button[data-acao='participar']");
    if (!botao) return;
    console.log("Participar clicado, grupo id:", botao.dataset.id);
  });

  renderizarGrupos(gruposMock);
}

// ============================================================
// PERFIL (Módulos 06, 13, 14)
// ============================================================

function iniciarPerfil() {
  const grid = document.querySelector("#perfil-grid");
  if (!grid) return; // esta página não é o Perfil

  const nomeEl = document.querySelector("#perfil-nome");
  const emailEl = document.querySelector("#perfil-email");
  const tagsEl = document.querySelector("#perfil-tags");
  const contagemEl = document.querySelector("#perfil-contagem");

  const { nome, email } = usuarioMock;
  nomeEl.textContent = nome;
  emailEl.textContent = email;

  function meusGrupos() {
    return gruposMock.filter((g) => usuarioMock.materias.includes(g.id));
  }

  function renderizarTags(lista) {
    tagsEl.innerHTML = lista.map((g) => `<span class="tag">${g.materia}</span>`).join("");
  }

  function renderizarMeusGrupos() {
    const lista = meusGrupos();
    contagemEl.textContent = `Você está em ${lista.length} grupo${lista.length === 1 ? "" : "s"} de estudo.`;
    grid.innerHTML = lista.length
      ? lista.map((g) => criarCardHTML(g, { acao: "sair" })).join("")
      : htmlEstadoVazio("Você ainda não participa de nenhum grupo.");
    renderizarTags(lista);
  }

  // Ação real, seguindo o ciclo estado → renderização (Módulo 13):
  // sair de um grupo NUNCA remove o card direto do DOM, só atualiza
  // o estado (usuarioMock.materias) e manda renderizar de novo.
  function sairDoGrupo(id) {
    usuarioMock.materias = usuarioMock.materias.filter((materiaId) => materiaId !== id);
    renderizarMeusGrupos();
  }

  grid.addEventListener("click", function (event) {
    const botao = event.target.closest("button[data-acao='sair']");
    if (!botao) return;
    sairDoGrupo(Number(botao.dataset.id));
  });

  renderizarMeusGrupos();
}

// ============================================================
// Ponto de entrada (Módulo 01): roda uma vez, ao carregar cada página
// ============================================================

iniciarLogin();
iniciarDashboard();
iniciarPerfil();
