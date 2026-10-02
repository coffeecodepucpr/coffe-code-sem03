# Exemplo executável: Buscador de Grupos de Estudo (Semana 03)

Evolução do exemplo da Semana 02, agora com JavaScript real. As três telas (Login, Dashboard, Perfil) têm comportamento de verdade: sem nenhum backend, sem framework.

## Isto NÃO é gabarito obrigatório

É uma referência de nível alcançável. Seu projeto real não precisa se parecer com este: precisa aplicar os mesmos conceitos (validação, DOM, eventos, renderização a partir de dados, estado).

## O que este exemplo demonstra

- `<script defer>` conectando `script.js` às três páginas (Módulo 01)
- Validação completa do Login (vazio, formato, tamanho mínimo, mensagens específicas, limpas a cada tentativa) (Módulo 10)
- Dashboard renderizado inteiramente a partir de `gruposMock` via `.map()` + `innerHTML`, nunca HTML fixo (Módulo 12)
- Busca funcionando de verdade, filtrando em tempo real sem reload (Módulos 05, 09, 12)
- Estado vazio ("Nenhum grupo encontrado") quando a busca não retorna nada
- Perfil refletindo `usuarioMock` (nome, e-mail, tags), nunca texto fixo (Módulo 06)
- "Sair do grupo" seguindo rigorosamente o ciclo estado → renderização: nunca remove o card direto do DOM, sempre atualiza `usuarioMock.materias` primeiro (Módulo 13)
- `criarCardHTML(grupo, opts)` como função de componente, reutilizada no Dashboard *e* no Perfil, com o botão mudando conforme o contexto (Módulo 13)
- Delegação de eventos: um único `addEventListener` no grid, não um por card, já que os cards são criados depois do carregamento da página (Módulo 14)
- `if (!elemento) return;` no topo de cada função de inicialização, já que o mesmo `script.js` roda nas três páginas (Módulo 07)

## Arquivos

```
docs/example/
├── index.html
├── login.html
├── dashboard.html
├── perfil.html
├── styles.css       (herdado da Semana 02, com pequenos acréscimos)
└── script.js         (novo: toda a lógica da Semana 03)
```

## Testando

Abra qualquer página direto no navegador. No Dashboard, digite na busca para filtrar. No Perfil, clique em "Sair do grupo" e observe a tela (e a contagem, e as tags) atualizarem sem reload. Abra o console (F12) para ver os logs de cada ação.

## Nota sobre ferramentas de captura de tela

Se usar uma ferramenta antiga de renderização (como `wkhtmltoimage`, baseada em um WebKit de ~2013) para tirar print, o grid pode aparecer em 1 coluna: CSS Grid não existia quando esse motor foi criado. Em qualquer navegador atual, renderiza corretamente.
