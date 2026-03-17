<div align="center">

# 🎓 DaSIboard

**O dashboard universitário do curso de Sistemas de Informação da EACH-USP**

[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-0969da?style=flat-square&logo=github)](https://alexzjss.github.io/dasiboard)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-bem--vindos-brightgreen?style=flat-square)](https://github.com/alexzjss/dasiboard/pulls)

*Calendário · Horários · Kanban · Notas · Ferramentas · Desafios — em um só lugar*

</div>

---

## ✨ O que é o DaSIboard?

O DaSIboard é um painel acadêmico desenvolvido por e para estudantes de **Sistemas de Informação da USP (EACH)**. Ele centraliza as principais necessidades do dia a dia universitário: calendário de eventos, horários de aula, controle de tarefas, acompanhamento de notas, materiais de estudo e ferramentas de produtividade — tudo acessível diretamente pelo navegador, sem instalação, sem login e sem rastreamento.

O projeto é **100% estático** (HTML + CSS + JS puro), hospedado no GitHub Pages, e qualquer aluno pode contribuir com dados via Pull Request.

---

## 📋 Funcionalidades

### 🏠 Home
Painel central com visão geral do dia:
- Saudação personalizada com hora e data
- **Próxima aula** com horário e sala
- **Próximos eventos** do calendário acadêmico
- **Reflexão do dia** — citação filosófica ou motivacional trocada diariamente
- **Contagem regressiva** para o próximo evento ou prova importante
- **Tarefas pendentes** do Kanban em destaque
- **Última newsletter** do DASI
- Cards de estatísticas: eventos, semestres, tarefas e GPA

### 📅 Calendário
- Grade mensal interativa com navegação por mês
- Tipos de eventos: `prova`, `entrega`, `evento`, `apresentação`, `deadline`
- Filtros por tipo e por turma
- Painel lateral com detalhes do dia selecionado
- Integração com entidades e eventos das ligas/grupos

### 🗓 Horários
- Visualização da grade horária semanal por turma
- Suporte a múltiplas turmas (2026104, 2026194…)
- Link direto para o JupiterWeb

### 📌 Kanban
- Quadro de tarefas pessoal com colunas: *A Fazer*, *Em andamento*, *Concluído*
- Criação, edição, movimentação e exclusão de cards
- Tags coloridas e datas
- Persistência local (localStorage)

### 📰 Newsletter
- Publicações periódicas com novidades, eventos, coberturas e destaques do curso
- Visualização modal com conteúdo completo
- Histórico de edições anteriores

### 👨‍🏫 Docentes
- Base de dados com os professores da EACH
- Busca por nome, disciplina ou departamento
- Contato por e-mail, Lattes e site pessoal
- Salas e horários de atendimento

### 🏛 Entidades
- Diretório das ligas, grupos e entidades estudantis do curso
- Eventos, processos seletivos e informações de cada grupo
- Links para redes sociais e inscrições

### 📖 Estudos
- Repositório de materiais de estudo compartilhados
- Filtros por disciplina, tipo e semestre
- Upload colaborativo via PR

### 📊 Notas & GPA
- Lançamento de notas por disciplina e semestre
- Cálculo automático de média ponderada por créditos
- Gráfico de evolução do GPA por semestre
- Restauração dos 8 semestres padrão do curso
- 100% local (sem envio de dados)

### 🔧 Ferramentas
- **Pomodoro Timer** — ciclos de foco com notificação
- **Calculadora de Notas** — simule médias e pesos
- **Notas Rápidas** — bloco de notas persistente
- **Checklist** — lista de verificação simples
- **Sorteador** — sorteio aleatório de listas
- **Conversor de Unidades** — temperatura, comprimento, etc.
- **Gerador de Referências ABNT** — livro, artigo, site
- **Checklist ABNT** — verificação de trabalhos acadêmicos
- **Flashcards** — estudo por repetição espaçada

### 🎮 Desafios de Programação
- Desafios práticos de **HTML, CSS, JavaScript e C**
- Editor de código com syntax highlighting e numeração de linhas
- Pré-visualização ao vivo para HTML/CSS
- Execução de JavaScript via Web Worker (sandbox local)
- Compilação de C via Wandbox (GCC online, gratuito)
- Testes automáticos com feedback por caso de teste

---

## 🗂 Estrutura do Projeto

```
dasiboard-main/
├── index.html              # Ponto de entrada único (SPA)
├── css/
│   ├── style.css           # Estilos principais (temas, componentes, responsivo)
│   └── animations.css      # Keyframes e classes de animação
├── js/
│   ├── app.js              # Roteamento, home, utilitários globais
│   ├── calendar.js         # Lógica do calendário
│   ├── schedule.js         # Grade horária
│   ├── kanban.js           # Quadro Kanban
│   ├── newsletter.js       # Newsletter
│   ├── docentes.js         # Base de docentes
│   ├── entidades.js        # Entidades estudantis
│   ├── estudos.js          # Repositório de estudos
│   ├── gpa.js              # Notas & GPA
│   ├── ferramentas.js      # Ferramentas de produtividade
│   ├── leetcode.js         # Desafios de programação
│   ├── search.js           # Busca global
│   ├── pacman.js           # Easter egg 👾
│   └── utils.js            # Funções auxiliares
├── data/
│   ├── events.json         # Eventos do calendário ← contribua aqui!
│   ├── newsletter.json     # Edições da newsletter ← contribua aqui!
│   ├── schedule.json       # Horários das turmas ← contribua aqui!
│   ├── entidades.json      # Dados das entidades
│   ├── gpa_defaults.json   # Grade curricular padrão (8 semestres)
│   ├── estudos/            # Materiais de estudo
│   └── turmas/             # Dados por turma
└── assets/
    ├── logo-dasi.jpg
    └── logo-si.svg
```

---

## 🤝 Como Contribuir

### Adicionar Eventos ao Calendário

Edite `data/events.json` adicionando um objeto no array:

```json
{
  "date": "2026-06-15",
  "title": "Prova de Algoritmos II",
  "description": "Conteúdo: grafos e programação dinâmica",
  "type": "prova",
  "turmas": ["2026102"]
}
```

**Tipos disponíveis:** `prova` · `entrega` · `evento` · `apresentacao` · `deadline`

**Campos opcionais:** `turmas` (array de turmas), `entidade` (id da entidade ligada)

### Adicionar Newsletter

Edite `data/newsletter.json`:

```json
{
  "date": "2026-06-01",
  "title": "Newsletter #12 — Semana das Entidades",
  "summary": "Resumo da semana com eventos das ligas e avisos do curso.",
  "content": "Conteúdo completo em markdown ou HTML..."
}
```

### Atualizar Horários

Edite `data/schedule.json` ou adicione um novo arquivo em `data/turmas/`.

### Fluxo de Contribuição

1. **Fork** o repositório
2. Edite o(s) arquivo(s) de dados desejado(s)
3. Abra um **Pull Request** com uma descrição clara da mudança
4. Após revisão, será mergeado e publicado automaticamente no GitHub Pages

---

## 🐛 Reportar Problemas

Encontrou um bug, dado errado ou tem uma sugestão?

- Abra uma [Issue](https://github.com/alexzjss/dasiboard/issues) com a etiqueta adequada (`bug`, `sugestão`, `dados`, `visual`)
- Para bugs, inclua: navegador, tema ativo, e o que aconteceu vs. o que era esperado

---

## 🎨 Temas Visuais

O DaSIboard conta com **mais de 15 temas** selecionáveis no rodapé da sidebar:

| Tema | Estilo |
|------|--------|
| Padrão | Escuro elegante |
| Super | Azul noturno |
| Hackerman | Verde terminal |
| Sith | Vermelho imperial |
| Gatilho | Roxo intenso |
| **D20** 🎲 | **RGB Rainbow — LED strip contínua** |
| Grifinho | Claro, dourado |
| Bidu | Claro, laranja |
| Ocean | Claro, azul |
| Grace | Claro, rosa |
| + outros | ... |

---

## 🛠 Tecnologias

- **HTML5 / CSS3 / JavaScript ES6+** — sem frameworks, sem build tools
- **CSS Custom Properties** para temas dinâmicos
- **CSS Grid + Flexbox** para layout responsivo
- **localStorage** para persistência de dados do usuário
- **Web Workers** para execução sandbox de JS
- **Wandbox API** para compilação de C (GCC online)
- **GitHub Pages** para hospedagem estática gratuita

---

## 📜 Licença

MIT © DaSIboard contributors — feito com 🧠 por alunos de SI da USP.

> *"A educação é a arma mais poderosa que você pode usar para mudar o mundo."*
