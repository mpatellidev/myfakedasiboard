// ===== DESAFIOS DE PROGRAMAÇÃO — DaSIboard =====
// Editor de código integrado com desafios de HTML, CSS, JS e C
// C: executado via Anthropic API (LLM interpreta/simula output)
// JS: executado em sandbox iframe
// HTML/CSS: preview ao vivo em iframe

'use strict';

// ─── STATE ────────────────────────────────────────────────────────────────────
let lcState = {
  lang: 'javascript',
  challengeIndex: 0,
  filter: 'all',      // 'all' | 'easy' | 'medium' | 'hard'
  solved: {},         // { 'js_0': true, ... }
  code: {},           // { 'js_0': '...user code...', ... }
  view: 'list',       // 'list' | 'editor'
  running: false,
  testResults: null,
};

// ─── CHALLENGES DATABASE ──────────────────────────────────────────────────────
const LC_CHALLENGES = {
  javascript: [
    {
      id: 'js_0', title: 'Dois Somas', difficulty: 'easy',
      tags: ['array', 'hash'],
      description: `Dado um array de inteiros \`nums\` e um inteiro \`target\`, retorne os **índices** dos dois números que somam \`target\`.

Você pode assumir que cada entrada possui exatamente uma solução, e não pode usar o mesmo elemento duas vezes.

**Exemplo 1:**
\`\`\`
Entrada: nums = [2,7,11,15], target = 9
Saída: [0,1]
\`\`\`

**Exemplo 2:**
\`\`\`
Entrada: nums = [3,2,4], target = 6
Saída: [1,2]
\`\`\``,
      starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Escreva sua solução aqui
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args: [[2,7,11,15],9], expected: [0,1] },
    { args: [[3,2,4],6],     expected: [1,2] },
    { args: [[3,3],6],       expected: [0,1] },
    { args: [[1,2,3,4],7],   expected: [2,3] },
  ];
  return cases.map(({args,expected}) => {
    try {
      const res = fn(...args);
      const ok = JSON.stringify(res?.sort?.()) === JSON.stringify([...expected].sort());
      return { ok, input: JSON.stringify(args[0])+', target='+args[1], expected: JSON.stringify(expected), got: JSON.stringify(res) };
    } catch(e) { return { ok:false, input:JSON.stringify(args[0]), expected:JSON.stringify(expected), got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'twoSum',
    },
    {
      id: 'js_1', title: 'Palíndromo', difficulty: 'easy',
      tags: ['string', 'math'],
      description: `Dado um inteiro \`x\`, retorne \`true\` se \`x\` for um palíndromo, e \`false\` caso contrário.

Um número palíndromo é aquele que lê o mesmo de trás para frente.

**Exemplo 1:** \`x = 121\` → \`true\`
**Exemplo 2:** \`x = -121\` → \`false\` (negativos nunca são palíndromos)
**Exemplo 3:** \`x = 10\` → \`false\``,
      starterCode: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args:[121],    expected:true },
    { args:[-121],   expected:false },
    { args:[10],     expected:false },
    { args:[0],      expected:true },
    { args:[12321],  expected:true },
    { args:[123],    expected:false },
  ];
  return cases.map(({args,expected}) => {
    try {
      const res = fn(...args);
      return { ok:res===expected, input:String(args[0]), expected:String(expected), got:String(res) };
    } catch(e) { return { ok:false, input:String(args[0]), expected:String(expected), got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'isPalindrome',
    },
    {
      id: 'js_2', title: 'Maior Elemento', difficulty: 'easy',
      tags: ['array'],
      description: `Dado um array de inteiros \`nums\`, encontre e retorne o **maior elemento**.

**Exemplo:**
\`\`\`
Entrada: [3,1,4,1,5,9,2,6]
Saída: 9
\`\`\``,
      starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMax(nums) {
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args:[[3,1,4,1,5,9,2,6]], expected:9 },
    { args:[[-5,-1,-3]],        expected:-1 },
    { args:[[42]],              expected:42 },
    { args:[[0,0,0]],           expected:0 },
    { args:[[100,1,50]],        expected:100 },
  ];
  return cases.map(({args,expected}) => {
    try {
      const res = fn(...args);
      return { ok:res===expected, input:JSON.stringify(args[0]), expected:String(expected), got:String(res) };
    } catch(e) { return { ok:false, input:JSON.stringify(args[0]), expected:String(expected), got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'findMax',
    },
    {
      id: 'js_3', title: 'FizzBuzz', difficulty: 'easy',
      tags: ['math', 'string'],
      description: `Dado um inteiro \`n\`, retorne um array de strings de \`1\` a \`n\` onde:
- Múltiplos de 3 → \`"Fizz"\`
- Múltiplos de 5 → \`"Buzz"\`
- Múltiplos de ambos → \`"FizzBuzz"\`
- Demais → o número como string

**Exemplo (n=5):** \`["1","2","Fizz","4","Buzz"]\``,
      starterCode: `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args:[5],  expected:["1","2","Fizz","4","Buzz"] },
    { args:[15], expected:["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] },
    { args:[1],  expected:["1"] },
  ];
  return cases.map(({args,expected}) => {
    try {
      const res = fn(...args);
      const ok = JSON.stringify(res) === JSON.stringify(expected);
      return { ok, input:'n='+args[0], expected:JSON.stringify(expected.slice(0,6))+(expected.length>6?'...':''), got:JSON.stringify((res||[]).slice(0,6))+((res||[]).length>6?'...':'') };
    } catch(e) { return { ok:false, input:'n='+args[0], expected:'...', got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'fizzBuzz',
    },
    {
      id: 'js_4', title: 'Número Válido de Parênteses', difficulty: 'medium',
      tags: ['stack', 'string'],
      description: `Dada uma string \`s\` contendo apenas os caracteres \`'('`, \`')'`, \`'{'`, \`'}'`, \`'['`, \`']'\`, determine se a sequência de entrada é **válida**.

Uma entrada é válida se:
1. Cada abre-chave é fechada com o tipo correto
2. Os parênteses são fechados na ordem correta

**Exemplos:**
- \`"()"\` → \`true\`
- \`"()[]{}"  \` → \`true\`
- \`"(]"\` → \`false\`
- \`"([)]"\` → \`false\``,
      starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args:["()"],      expected:true },
    { args:["()[]{}"], expected:true },
    { args:["(]"],      expected:false },
    { args:["([)]"],    expected:false },
    { args:["{[]}"],    expected:true },
    { args:[""],        expected:true },
    { args:["["],       expected:false },
  ];
  return cases.map(({args,expected}) => {
    try {
      const res = fn(...args);
      return { ok:res===expected, input:'"'+args[0]+'"', expected:String(expected), got:String(res) };
    } catch(e) { return { ok:false, input:'"'+args[0]+'"', expected:String(expected), got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'isValid',
    },
    {
      id: 'js_5', title: 'Inverter String', difficulty: 'easy',
      tags: ['string', 'array'],
      description: `Escreva uma função que inverte uma string. A entrada é fornecida como um array de caracteres \`s\`.

Você deve fazer isso **in-place** com O(1) de memória extra.

**Exemplo 1:** \`["h","e","l","l","o"]\` → \`["o","l","l","e","h"]\`
**Exemplo 2:** \`["H","a","n","n","a","h"]\` → \`["h","a","n","n","a","H"]\``,
      starterCode: `/**
 * @param {character[]} s
 * @return {void} Modifica s no lugar
 */
function reverseString(s) {
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args:[["h","e","l","l","o"]], expected:["o","l","l","e","h"] },
    { args:[["H","a","n","n","a","h"]], expected:["h","a","n","n","a","H"] },
    { args:[["a"]], expected:["a"] },
    { args:[["a","b"]], expected:["b","a"] },
  ];
  return cases.map(({args,expected}) => {
    const input = [...args[0]];
    try {
      fn(args[0]);
      const ok = JSON.stringify(args[0]) === JSON.stringify(expected);
      return { ok, input:JSON.stringify(input), expected:JSON.stringify(expected), got:JSON.stringify(args[0]) };
    } catch(e) { return { ok:false, input:JSON.stringify(input), expected:JSON.stringify(expected), got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'reverseString',
    },
    {
      id: 'js_6', title: 'Subarray de Soma Máxima', difficulty: 'medium',
      tags: ['array', 'dp'],
      description: `Dado um array de inteiros \`nums\`, encontre o **subarray contíguo** (com pelo menos um elemento) que tem a maior soma, e retorne essa soma.

**Exemplo 1:** \`[-2,1,-3,4,-1,2,1,-5,4]\` → \`6\` (subarray \`[4,-1,2,1]\`)
**Exemplo 2:** \`[1]\` → \`1\`
**Exemplo 3:** \`[5,4,-1,7,8]\` → \`23\``,
      starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args:[[-2,1,-3,4,-1,2,1,-5,4]], expected:6 },
    { args:[[1]],                      expected:1 },
    { args:[[5,4,-1,7,8]],             expected:23 },
    { args:[[-1,-2,-3]],               expected:-1 },
    { args:[[0,0,0]],                  expected:0 },
  ];
  return cases.map(({args,expected}) => {
    try {
      const res = fn(...args);
      return { ok:res===expected, input:JSON.stringify(args[0]), expected:String(expected), got:String(res) };
    } catch(e) { return { ok:false, input:JSON.stringify(args[0]), expected:String(expected), got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'maxSubArray',
    },
    {
      id: 'js_7', title: 'Escalada de Degraus', difficulty: 'easy',
      tags: ['dp', 'math'],
      description: `Você está subindo uma escada. São necessários \`n\` degraus para chegar ao topo.

A cada vez, você pode subir \`1\` ou \`2\` degraus. De quantas maneiras distintas você pode chegar ao topo?

**Exemplo 1:** \`n = 2\` → \`2\` (1+1 ou 2)
**Exemplo 2:** \`n = 3\` → \`3\` (1+1+1, 1+2, 2+1)`,
      starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  
}`,
      testFn: `
function runTests(fn) {
  const cases = [
    { args:[1], expected:1 },
    { args:[2], expected:2 },
    { args:[3], expected:3 },
    { args:[4], expected:5 },
    { args:[5], expected:8 },
    { args:[10],expected:89 },
  ];
  return cases.map(({args,expected}) => {
    try {
      const res = fn(...args);
      return { ok:res===expected, input:'n='+args[0], expected:String(expected), got:String(res) };
    } catch(e) { return { ok:false, input:'n='+args[0], expected:String(expected), got:'Erro: '+e.message }; }
  });
}`,
      fnName: 'climbStairs',
    },
  ],

  html: [
    {
      id: 'html_0', title: 'Card de Perfil', difficulty: 'easy',
      tags: ['layout', 'semântica'],
      description: `Crie um **card de perfil** HTML com:
- Uma imagem de avatar (pode usar \`https://i.pravatar.cc/80\`)
- O nome **"Ada Lovelace"** em destaque
- A descrição **"Primeira programadora da história"**
- Um link com texto **"Ver perfil"** (href="#")

Use tags semânticas corretas. O card deve ter a classe \`profile-card\`.`,
      starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Card de Perfil</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; padding: 20px; }
    /* Escreva seu CSS aqui */
  </style>
</head>
<body>
  <!-- Crie o card aqui -->

</body>
</html>`,
      testFn: null,
      checkFn: (doc) => {
        const card = doc.querySelector('.profile-card');
        const img  = doc.querySelector('img');
        const link = doc.querySelector('a');
        const checks = [
          { ok: !!card,                               msg: 'Existe elemento com classe profile-card' },
          { ok: !!img,                                msg: 'Existe uma imagem <img>' },
          { ok: !!doc.querySelector('h1,h2,h3'),      msg: 'Nome em tag de título (h1/h2/h3)' },
          { ok: !!link && link.textContent.toLowerCase().includes('perfil'), msg: 'Link "Ver perfil" presente' },
          { ok: !!doc.querySelector('p'),             msg: 'Descrição em parágrafo <p>' },
        ];
        return checks;
      },
      fnName: null, isHTML: true,
    },
    {
      id: 'html_1', title: 'Formulário de Contato', difficulty: 'easy',
      tags: ['form', 'acessibilidade'],
      description: `Construa um **formulário de contato** semântico com:
- Campo \`<input type="text">\` para **Nome** com \`<label>\` associado
- Campo \`<input type="email">\` para **Email** com \`<label>\`
- \`<textarea>\` para **Mensagem** com \`<label>\`
- Botão \`<button type="submit">\` com texto "Enviar"

Use atributos \`for\`/\`id\` para associar labels corretamente. O form deve ter \`id="contact-form"\`.`,
      starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Formulário de Contato</title>
  <style>
    body { font-family: sans-serif; max-width: 400px; margin: 20px auto; }
    label { display: block; margin-top: 12px; font-weight: bold; }
    input, textarea { width: 100%; padding: 8px; box-sizing: border-box; }
  </style>
</head>
<body>
  <!-- Construa o formulário aqui -->

</body>
</html>`,
      testFn: null,
      checkFn: (doc) => {
        const form     = doc.querySelector('#contact-form');
        const labels   = doc.querySelectorAll('label');
        const nameIn   = doc.querySelector('input[type="text"]');
        const emailIn  = doc.querySelector('input[type="email"]');
        const textarea = doc.querySelector('textarea');
        const submit   = doc.querySelector('button[type="submit"], input[type="submit"]');
        const labelsLinked = [...labels].some(l => l.htmlFor && doc.getElementById(l.htmlFor));
        return [
          { ok: !!form,       msg: 'Form com id="contact-form"' },
          { ok: !!nameIn,     msg: 'Input type="text" para Nome' },
          { ok: !!emailIn,    msg: 'Input type="email" para Email' },
          { ok: !!textarea,   msg: 'Textarea para Mensagem' },
          { ok: !!submit,     msg: 'Botão de submit' },
          { ok: labels.length >= 3, msg: 'Pelo menos 3 labels' },
          { ok: labelsLinked, msg: 'Labels associadas via for/id' },
        ];
      },
      fnName: null, isHTML: true,
    },
    {
      id: 'html_2', title: 'Tabela de Notas', difficulty: 'medium',
      tags: ['table', 'semântica'],
      description: `Crie uma **tabela de notas** com as seguintes especificações:
- Use \`<table>\`, \`<thead>\`, \`<tbody>\`, \`<tfoot>\`
- **Cabeçalho:** Disciplina | Nota | Status
- **3 linhas de dados** com disciplinas, notas e status
- **Rodapé** com uma célula mostrando "Média:" e a média das notas
- A tabela deve ter \`id="grades-table"\``,
      starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Tabela de Notas</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
    thead { background: #f0f0f0; }
    tfoot { font-weight: bold; background: #f9f9f9; }
  </style>
</head>
<body>
  <!-- Crie a tabela aqui -->

</body>
</html>`,
      testFn: null,
      checkFn: (doc) => {
        const table  = doc.querySelector('#grades-table');
        const thead  = doc.querySelector('thead');
        const tbody  = doc.querySelector('tbody');
        const tfoot  = doc.querySelector('tfoot');
        const rows   = doc.querySelectorAll('tbody tr');
        const ths    = doc.querySelectorAll('th');
        return [
          { ok: !!table,       msg: 'Tabela com id="grades-table"' },
          { ok: !!thead,       msg: 'Elemento <thead>' },
          { ok: !!tbody,       msg: 'Elemento <tbody>' },
          { ok: !!tfoot,       msg: 'Elemento <tfoot>' },
          { ok: rows.length >= 3, msg: 'Pelo menos 3 linhas no tbody' },
          { ok: ths.length >= 3,  msg: 'Pelo menos 3 colunas no cabeçalho' },
        ];
      },
      fnName: null, isHTML: true,
    },
  ],

  css: [
    {
      id: 'css_0', title: 'Botão Animado', difficulty: 'easy',
      tags: ['animação', 'hover'],
      description: `Estilize um botão com id \`#animated-btn\` que já existe no HTML:
- Fundo com cor primária (ex: \`#7c3aed\`) e texto branco
- Padding de 12px 28px, border-radius de 8px
- **No hover:** o botão deve escalar (\`scale(1.08)\`) e ficar mais escuro
- Transição suave de **0.2s** em todas as propriedades
- Remova a borda padrão e adicione cursor pointer`,
      starterCode: `<!-- HTML fixo — edite apenas o <style> -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Botão Animado</title>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f5f5f5; }

    /* Escreva o CSS do botão aqui */
    #animated-btn {

    }

    #animated-btn:hover {

    }
  </style>
</head>
<body>
  <button id="animated-btn">Clique em mim!</button>
</body>
</html>`,
      testFn: null,
      checkFn: (doc) => {
        const btn = doc.querySelector('#animated-btn');
        if (!btn) return [{ ok:false, msg:'Botão #animated-btn não encontrado' }];
        const style = doc.defaultView?.getComputedStyle(btn) || {};
        const hasBg    = style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent';
        const hasRad   = parseFloat(style.borderRadius) > 0;
        const hasTrans = style.transition && style.transition !== 'all 0s ease 0s' && style.transition !== 'none';
        const hasCursor= style.cursor === 'pointer';
        return [
          { ok: !!btn,      msg: 'Elemento #animated-btn existe' },
          { ok: hasBg,      msg: 'Cor de fundo definida' },
          { ok: hasRad,     msg: 'Border-radius aplicado' },
          { ok: hasTrans,   msg: 'Transição CSS definida' },
          { ok: hasCursor,  msg: 'cursor: pointer' },
        ];
      },
      fnName: null, isHTML: true,
    },
    {
      id: 'css_1', title: 'Layout com Flexbox', difficulty: 'medium',
      tags: ['flexbox', 'layout'],
      description: `Use **Flexbox** para criar um layout de 3 colunas de igual largura dentro de um container \`#flex-container\`.

Requisitos:
- Três \`<div>\` com classes \`.col\` lado a lado
- Gap de 16px entre as colunas
- Cada coluna com altura mínima de 100px e um fundo diferente
- Em telas < 600px, as colunas devem empilhar verticalmente (uma por linha)`,
      starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Layout</title>
  <style>
    * { box-sizing: border-box; }
    body { padding: 20px; font-family: sans-serif; }

    /* Container */
    #flex-container {

    }

    /* Colunas */
    .col {
      min-height: 100px;
      padding: 16px;
      border-radius: 8px;
    }

    .col:nth-child(1) { background: #e0e7ff; }
    .col:nth-child(2) { background: #fce7f3; }
    .col:nth-child(3) { background: #d1fae5; }

    @media (max-width: 600px) {
      /* Empilhar aqui */
    }
  </style>
</head>
<body>
  <div id="flex-container">
    <div class="col">Coluna 1</div>
    <div class="col">Coluna 2</div>
    <div class="col">Coluna 3</div>
  </div>
</body>
</html>`,
      testFn: null,
      checkFn: (doc) => {
        const container = doc.querySelector('#flex-container');
        if (!container) return [{ ok:false, msg:'#flex-container não encontrado' }];
        const style  = doc.defaultView?.getComputedStyle(container) || {};
        const cols   = doc.querySelectorAll('.col');
        const isFlex = style.display === 'flex' || style.display === 'inline-flex';
        const hasGap = parseFloat(style.gap || style.columnGap) > 0;
        return [
          { ok: !!container,    msg: '#flex-container existe' },
          { ok: isFlex,         msg: 'display: flex no container' },
          { ok: hasGap,         msg: 'gap entre colunas definido' },
          { ok: cols.length===3,msg: 'Exatamente 3 .col dentro do container' },
        ];
      },
      fnName: null, isHTML: true,
    },
    {
      id: 'css_2', title: 'Dark Mode com Variáveis', difficulty: 'medium',
      tags: ['variáveis', 'dark mode'],
      description: `Implemente um **tema escuro** usando **CSS custom properties** (variáveis CSS).

Requisitos:
- Defina variáveis em \`:root\`: \`--bg\`, \`--text\`, \`--card-bg\`, \`--primary\`
- Crie um \`.dark\` class na \`<body>\` que **redefine** as variáveis para cores escuras
- Um card com \`id="theme-card"\` deve usar essas variáveis para fundo e texto
- Um botão \`#toggle-btn\` que ao clicar adiciona/remove a classe \`.dark\` no body`,
      starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dark Mode</title>
  <style>
    :root {
      /* Defina suas variáveis aqui */
    }

    body.dark {
      /* Redefina as variáveis no modo escuro */
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: sans-serif;
      transition: background .3s, color .3s;
      padding: 20px;
    }

    #theme-card {
      background: var(--card-bg);
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div id="theme-card">
    <h2>Card de exemplo</h2>
    <p>Este card usa variáveis CSS para tematização.</p>
  </div>
  <button id="toggle-btn" onclick="document.body.classList.toggle('dark')">
    Alternar tema
  </button>
</body>
</html>`,
      testFn: null,
      checkFn: (doc) => {
        const card = doc.querySelector('#theme-card');
        const btn  = doc.querySelector('#toggle-btn');
        const root = doc.documentElement;
        const rootStyle = doc.defaultView?.getComputedStyle(root) || {};
        const hasBgVar  = doc.documentElement.style.getPropertyValue('--bg') !== undefined;
        // Check CSS vars in stylesheet
        const sheets = [...(doc.styleSheets || [])];
        let hasVars = false, hasDark = false;
        sheets.forEach(sheet => {
          try {
            [...sheet.cssRules].forEach(r => {
              if (r.selectorText === ':root' && r.style?.cssText?.includes('--')) hasVars = true;
              if (r.selectorText?.includes('.dark')) hasDark = true;
            });
          } catch(e) {}
        });
        return [
          { ok: !!card,    msg: '#theme-card existe' },
          { ok: !!btn,     msg: '#toggle-btn existe' },
          { ok: hasVars,   msg: 'Variáveis CSS definidas em :root' },
          { ok: hasDark,   msg: 'Classe .dark redefine variáveis' },
        ];
      },
      fnName: null, isHTML: true,
    },
  ],

  c: [
    {
      id: 'c_0', title: 'Olá, Mundo!', difficulty: 'easy',
      tags: ['básico', 'I/O'],
      description: `Escreva um programa C que imprime exatamente:
\`\`\`
Olá, Mundo!
\`\`\`

Use \`printf\` com quebra de linha (\`\\n\`).`,
      starterCode: `#include <stdio.h>

int main() {
    // Escreva seu código aqui
    
    return 0;
}`,
      expectedOutput: 'Olá, Mundo!',
      fnName: null, isC: true,
    },
    {
      id: 'c_1', title: 'Soma de N até 1', difficulty: 'easy',
      tags: ['loop', 'math'],
      description: `Escreva um programa C que leia um inteiro \`n\` da entrada padrão e imprima a **soma de 1 até n**.

**Entrada:** Um inteiro \`n\` (ex: \`5\`)
**Saída:** A soma (ex: \`15\`)

Use um loop \`for\` ou \`while\`.`,
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Calcule e imprima a soma de 1 até n
    
    return 0;
}`,
      testCases: [
        { input: '5',  expected: '15' },
        { input: '1',  expected: '1'  },
        { input: '10', expected: '55' },
        { input: '0',  expected: '0'  },
      ],
      fnName: null, isC: true,
    },
    {
      id: 'c_2', title: 'Par ou Ímpar', difficulty: 'easy',
      tags: ['condicional', 'math'],
      description: `Escreva um programa C que leia um inteiro e imprima \`"par"\` se for par ou \`"impar"\` se for ímpar.

**Entrada:** Um inteiro
**Saída:** \`par\` ou \`impar\` (sem acento, em minúsculo)`,
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Verifique e imprima "par" ou "impar"
    
    return 0;
}`,
      testCases: [
        { input: '4',  expected: 'par'   },
        { input: '7',  expected: 'impar' },
        { input: '0',  expected: 'par'   },
        { input: '-3', expected: 'impar' },
      ],
      fnName: null, isC: true,
    },
    {
      id: 'c_3', title: 'Fibonacci', difficulty: 'medium',
      tags: ['loop', 'math'],
      description: `Escreva um programa C que leia \`n\` e imprima os primeiros \`n\` termos da sequência de Fibonacci, **separados por espaço**.

**Entrada:** \`6\`
**Saída:** \`0 1 1 2 3 5\`

Obs: A sequência começa em 0, 1, 1, 2, 3, 5, 8...`,
      starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    
    // Imprima os n primeiros termos de Fibonacci
    
    return 0;
}`,
      testCases: [
        { input: '1',  expected: '0'             },
        { input: '2',  expected: '0 1'           },
        { input: '6',  expected: '0 1 1 2 3 5'  },
        { input: '8',  expected: '0 1 1 2 3 5 8 13' },
      ],
      fnName: null, isC: true,
    },
    {
      id: 'c_4', title: 'Maior de Três', difficulty: 'easy',
      tags: ['condicional'],
      description: `Leia três inteiros e imprima o maior deles.

**Entrada:** Três inteiros na mesma linha separados por espaço
**Saída:** O maior dos três

**Exemplo:**
- Entrada: \`3 7 2\` → Saída: \`7\`
- Entrada: \`-1 -5 -2\` → Saída: \`-1\``,
      starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    
    // Imprima o maior dos três
    
    return 0;
}`,
      testCases: [
        { input: '3 7 2',    expected: '7'  },
        { input: '-1 -5 -2', expected: '-1' },
        { input: '10 10 5',  expected: '10' },
        { input: '1 1 1',    expected: '1'  },
      ],
      fnName: null, isC: true,
    },
    {
      id: 'c_5', title: 'Contador de Vogais', difficulty: 'medium',
      tags: ['string', 'loop'],
      description: `Leia uma string e conte quantas **vogais** (a,e,i,o,u — maiúsculas e minúsculas) ela contém. Imprima o total.

**Entrada:** Uma string sem espaços (ex: \`programacao\`)
**Saída:** O número de vogais (ex: \`5\`)`,
      starterCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char s[256];
    scanf("%s", s);
    
    int count = 0;
    // Conte as vogais
    
    printf("%d\\n", count);
    return 0;
}`,
      testCases: [
        { input: 'programacao', expected: '5' },
        { input: 'hello',       expected: '2' },
        { input: 'rhythm',      expected: '0' },
        { input: 'AEIOU',       expected: '5' },
      ],
      fnName: null, isC: true,
    },
  ],
};

// ─── RENDER ───────────────────────────────────────────────────────────────────
function initLeetcode() {
  const container = document.getElementById('lc-app');
  if (!container) return;

  // Load persisted state
  try {
    const saved = localStorage.getItem('lc_state');
    if (saved) {
      const p = JSON.parse(saved);
      lcState.solved = p.solved || {};
      lcState.code   = p.code   || {};
      lcState.lang   = p.lang   || 'javascript';
    }
  } catch(e) {}

  if (lcState.view === 'editor') {
    renderEditor(container);
  } else {
    lcState.view = 'list';
    renderList(container);
  }
}

function saveState() {
  try {
    localStorage.setItem('lc_state', JSON.stringify({
      solved: lcState.solved,
      code:   lcState.code,
      lang:   lcState.lang,
    }));
  } catch(e) {}
}

// ─── LIST VIEW ────────────────────────────────────────────────────────────────
function renderList(container) {
  const langs = [
    { key: 'javascript', label: 'JavaScript', icon: '🟨' },
    { key: 'html',       label: 'HTML',        icon: '🟧' },
    { key: 'css',        label: 'CSS',         icon: '🟦' },
    { key: 'c',          label: 'C',           icon: '⬛' },
  ];
  const difficulties = ['all','easy','medium','hard'];
  const challenges = LC_CHALLENGES[lcState.lang] || [];
  const filtered = lcState.filter === 'all' ? challenges : challenges.filter(c => c.difficulty === lcState.filter);

  const totalSolved = challenges.filter(c => lcState.solved[c.id]).length;
  const pct = challenges.length ? Math.round(totalSolved / challenges.length * 100) : 0;

  container.innerHTML = `
    <div class="lc-header">
      <div class="lc-lang-tabs">
        ${langs.map(l => `
          <button class="lc-lang-tab ${lcState.lang === l.key ? 'active' : ''}"
                  onclick="lcSetLang('${l.key}')">
            <span>${l.icon}</span> ${l.label}
          </button>
        `).join('')}
      </div>
      <div class="lc-progress-row">
        <span class="lc-progress-label">${totalSolved}/${challenges.length} resolvidos</span>
        <div class="lc-progress-bar"><div class="lc-progress-fill" style="width:${pct}%"></div></div>
        <span class="lc-progress-pct">${pct}%</span>
      </div>
    </div>
    <div class="lc-filters">
      ${difficulties.map(d => `
        <button class="lc-filter-btn ${lcState.filter === d ? 'active' : ''}" onclick="lcSetFilter('${d}')">
          ${d === 'all' ? 'Todos' : d === 'easy' ? 'Fácil' : d === 'medium' ? 'Médio' : 'Difícil'}
        </button>
      `).join('')}
      <span class="lc-count">${filtered.length} desafio${filtered.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="lc-grid">
      ${filtered.length ? filtered.map((c, i) => buildChallengeCard(c, i)).join('') : `
        <div class="lc-empty">Nenhum desafio nesta categoria ainda.</div>
      `}
    </div>
  `;
}

function buildChallengeCard(c, i) {
  const solved = lcState.solved[c.id];
  const diffClass = { easy: 'lc-diff-easy', medium: 'lc-diff-medium', hard: 'lc-diff-hard' }[c.difficulty];
  const diffLabel = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' }[c.difficulty];
  return `
    <button class="lc-card ${solved ? 'lc-card-solved' : ''} anim-fade-up"
            style="animation-delay:${i*0.04}s"
            onclick="lcOpenChallenge('${c.id}')">
      <div class="lc-card-top">
        <span class="lc-card-num">#${i+1}</span>
        <span class="lc-diff-badge ${diffClass}">${diffLabel}</span>
        ${solved ? '<span class="lc-solved-check">✓</span>' : ''}
      </div>
      <div class="lc-card-title">${c.title}</div>
      <div class="lc-card-tags">${c.tags.map(t => `<span class="lc-tag">${t}</span>`).join('')}</div>
    </button>
  `;
}

// ─── EDITOR VIEW ─────────────────────────────────────────────────────────────
function lcOpenChallenge(id) {
  const all = Object.values(LC_CHALLENGES).flat();
  const challenge = all.find(c => c.id === id);
  if (!challenge) return;
  lcState.challengeIndex = LC_CHALLENGES[lcState.lang].indexOf(challenge);
  lcState.view = 'editor';
  lcState.testResults = null;
  const container = document.getElementById('lc-app');
  if (container) renderEditor(container, challenge);
}

function renderEditor(container, challenge) {
  const lang = lcState.lang;
  const challenges = LC_CHALLENGES[lang] || [];
  if (!challenge) {
    challenge = challenges[Math.max(0, lcState.challengeIndex)] || challenges[0];
  }
  if (!challenge) { lcState.view = 'list'; renderList(container); return; }

  const codeKey = challenge.id;
  const savedCode = lcState.code[codeKey] || challenge.starterCode;
  const solved = lcState.solved[challenge.id];
  const idx = challenges.indexOf(challenge);
  const hasPrev = idx > 0;
  const hasNext = idx < challenges.length - 1;

  const descHtml = mdToHtml(challenge.description);

  container.innerHTML = `
    <div class="lc-editor-layout">
      <!-- Left: problem -->
      <div class="lc-problem-panel">
        <div class="lc-editor-nav">
          <button class="lc-back-btn" onclick="lcGoList()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            Desafios
          </button>
          <div class="lc-nav-arrows">
            <button class="lc-arrow-btn" ${!hasPrev ? 'disabled' : ''} onclick="lcNavChallenge(-1)" title="Anterior">‹</button>
            <span class="lc-nav-pos">${idx+1} / ${challenges.length}</span>
            <button class="lc-arrow-btn" ${!hasNext ? 'disabled' : ''} onclick="lcNavChallenge(1)" title="Próximo">›</button>
          </div>
        </div>
        <div class="lc-problem-content">
          <div class="lc-problem-head">
            <h2 class="lc-problem-title">${challenge.title}</h2>
            <span class="lc-diff-badge lc-diff-${challenge.difficulty}">
              ${{easy:'Fácil',medium:'Médio',hard:'Difícil'}[challenge.difficulty]}
            </span>
            ${solved ? '<span class="lc-solved-badge">✓ Resolvido</span>' : ''}
          </div>
          <div class="lc-problem-tags">${challenge.tags.map(t=>`<span class="lc-tag">${t}</span>`).join('')}</div>
          <div class="lc-problem-desc">${descHtml}</div>
        </div>
        <!-- Test results panel -->
        <div class="lc-results" id="lc-results" style="display:none"></div>
      </div>
      <!-- Right: editor -->
      <div class="lc-code-panel">
        <div class="lc-code-toolbar">
          <span class="lc-lang-badge">${lcLangLabel(lang)}</span>
          <div class="lc-code-actions">
            <button class="lc-btn-reset" onclick="lcResetCode('${challenge.id}')" title="Resetar código">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg>
              Resetar
            </button>
            <button class="lc-btn-run ${lcState.running ? 'lc-btn-running' : ''}" id="lc-run-btn"
                    onclick="lcRun('${challenge.id}')" ${lcState.running ? 'disabled' : ''}>
              ${lcState.running ? '<span class="lc-spinner"></span> Executando...' : '▶ Executar'}
            </button>
          </div>
        </div>
        <div class="lc-editor-wrap">
          <textarea class="lc-editor" id="lc-editor"
                    spellcheck="false" autocorrect="off" autocapitalize="off"
                    oninput="lcSaveCode('${challenge.id}', this.value)">${escHtml(savedCode)}</textarea>
          <div class="lc-line-numbers" id="lc-lines"></div>
        </div>
        ${challenge.isHTML ? `
          <div class="lc-preview-wrap">
            <div class="lc-preview-label">
              <span>Pré-visualização</span>
              <button class="lc-preview-refresh" onclick="lcRefreshPreview('${challenge.id}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg>
                Atualizar
              </button>
            </div>
            <iframe id="lc-preview" class="lc-preview" sandbox="allow-scripts"></iframe>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Init editor
  setTimeout(() => {
    updateLineNumbers();
    if (challenge.isHTML) lcRefreshPreview(challenge.id);
  }, 50);

  // Tab key in textarea
  const editor = document.getElementById('lc-editor');
  if (editor) {
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = editor.selectionStart, end = editor.selectionEnd;
        editor.value = editor.value.substring(0, s) + '  ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = s + 2;
        lcSaveCode(challenge.id, editor.value);
        updateLineNumbers();
      }
    });
    editor.addEventListener('input', updateLineNumbers);
    editor.addEventListener('scroll', syncScroll);
  }
}

function lcLangLabel(lang) {
  return { javascript:'JavaScript', html:'HTML', css:'CSS', c:'C' }[lang] || lang;
}

function lcGoList() {
  lcState.view = 'list';
  lcState.testResults = null;
  const c = document.getElementById('lc-app');
  if (c) renderList(c);
}

function lcSetLang(lang) {
  lcState.lang = lang;
  lcState.view = 'list';
  lcState.filter = 'all';
  saveState();
  const c = document.getElementById('lc-app');
  if (c) renderList(c);
}

function lcSetFilter(f) {
  lcState.filter = f;
  const c = document.getElementById('lc-app');
  if (c) renderList(c);
}

function lcNavChallenge(dir) {
  const challenges = LC_CHALLENGES[lcState.lang] || [];
  const ni = Math.max(0, Math.min(challenges.length - 1, lcState.challengeIndex + dir));
  lcState.challengeIndex = ni;
  lcState.view = 'editor';
  lcState.testResults = null;
  const c = document.getElementById('lc-app');
  if (c) renderEditor(c, challenges[ni]);
}

function lcSaveCode(id, code) {
  lcState.code[id] = code;
  saveState();
}

function lcResetCode(id) {
  const all = Object.values(LC_CHALLENGES).flat();
  const ch = all.find(c => c.id === id);
  if (!ch) return;
  delete lcState.code[id];
  saveState();
  const c = document.getElementById('lc-app');
  if (c) renderEditor(c, ch);
}

// ─── LINE NUMBERS ─────────────────────────────────────────────────────────────
function updateLineNumbers() {
  const editor = document.getElementById('lc-editor');
  const lines  = document.getElementById('lc-lines');
  if (!editor || !lines) return;
  const count = editor.value.split('\n').length;
  lines.innerHTML = Array.from({ length: count }, (_, i) => `<span>${i + 1}</span>`).join('');
}

function syncScroll() {
  const editor = document.getElementById('lc-editor');
  const lines  = document.getElementById('lc-lines');
  if (editor && lines) lines.scrollTop = editor.scrollTop;
}

// ─── HTML PREVIEW ─────────────────────────────────────────────────────────────
function lcRefreshPreview(id) {
  const editor  = document.getElementById('lc-editor');
  const preview = document.getElementById('lc-preview');
  if (!editor || !preview) return;
  const code = editor.value;
  preview.srcdoc = code;
}

// ─── RUN CODE ────────────────────────────────────────────────────────────────
async function lcRun(challengeId) {
  if (lcState.running) return;
  const all = Object.values(LC_CHALLENGES).flat();
  const challenge = all.find(c => c.id === challengeId);
  if (!challenge) return;

  lcState.running = true;
  const runBtn = document.getElementById('lc-run-btn');
  if (runBtn) {
    runBtn.disabled = true;
    runBtn.innerHTML = '<span class="lc-spinner"></span> Executando...';
  }

  const editor = document.getElementById('lc-editor');
  const code = editor?.value || lcState.code[challengeId] || challenge.starterCode;

  let results = [];

  try {
    if (challenge.isC) {
      results = await runCChallenge(challenge, code);
    } else if (challenge.isHTML) {
      results = await runHTMLChallenge(challenge, code);
    } else {
      results = runJSChallenge(challenge, code);
    }
  } catch(e) {
    results = [{ ok: false, input: '—', expected: '—', got: 'Erro interno: ' + e.message }];
  }

  lcState.running = false;
  if (runBtn) {
    runBtn.disabled = false;
    runBtn.innerHTML = '▶ Executar';
  }

  const allPassed = results.length > 0 && results.every(r => r.ok);
  if (allPassed) {
    lcState.solved[challengeId] = true;
    saveState();
  }

  showTestResults(results, allPassed);
}

// ─── JS RUNNER ────────────────────────────────────────────────────────────────
function runJSChallenge(challenge, code) {
  try {
    const fullCode = code + '\n\n' + challenge.testFn + '\nreturn runTests(' + challenge.fnName + ');';
    // eslint-disable-next-line no-new-func
    const fn = new Function(fullCode);
    return fn();
  } catch(e) {
    return [{ ok: false, input: '—', expected: '—', got: 'Erro de sintaxe: ' + e.message }];
  }
}

// ─── HTML/CSS CHECKER ─────────────────────────────────────────────────────────
async function runHTMLChallenge(challenge, code) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:800px;height:600px;';
    iframe.sandbox = 'allow-scripts';
    document.body.appendChild(iframe);

    const cleanup = () => { try { document.body.removeChild(iframe); } catch(e) {} };

    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        const checks = challenge.checkFn ? challenge.checkFn(doc) : [];
        cleanup();
        resolve(checks.map(c => ({ ok: c.ok, input: '—', expected: c.ok ? '✓' : '✗', got: c.msg })));
      } catch(e) {
        cleanup();
        resolve([{ ok: false, input: '—', expected: '—', got: 'Erro ao verificar: ' + e.message }]);
      }
    };

    iframe.srcdoc = code;
    setTimeout(() => { iframe.onload?.(); }, 1500);
  });
}

// ─── C RUNNER (via Anthropic API) ────────────────────────────────────────────
async function runCChallenge(challenge, code) {
  const testCases = challenge.testCases || (challenge.expectedOutput ? [{ input: '', expected: challenge.expectedOutput }] : []);
  const results = [];

  for (const tc of testCases) {
    try {
      const output = await executeC(code, tc.input, challenge.title);
      const got = output.trim();
      const expected = tc.expected.trim();
      results.push({ ok: got === expected, input: tc.input || '(sem entrada)', expected, got });
    } catch(e) {
      results.push({ ok: false, input: tc.input || '—', expected: tc.expected, got: 'Erro: ' + e.message });
    }
  }
  return results;
}

async function executeC(code, input, title) {
  const prompt = `Você é um compilador e executor de C. Execute mentalmente o seguinte código C com a entrada fornecida e retorne APENAS a saída do programa — exatamente como printf/puts produziria, sem explicações, sem markdown, sem prefixos.

Código C:
\`\`\`c
${code}
\`\`\`

Entrada stdin: ${input || '(vazia)'}

Responda APENAS com a saída exata do programa (o que seria impresso no terminal). Se houver erro de compilação, responda com: COMPILE_ERROR: [motivo]`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error('API error ' + response.status);
  const data = await response.json();
  const text = data.content?.[0]?.text || '';
  if (text.startsWith('COMPILE_ERROR:')) throw new Error(text.replace('COMPILE_ERROR:', '').trim());
  return text;
}

// ─── RESULTS UI ──────────────────────────────────────────────────────────────
function showTestResults(results, allPassed) {
  const panel = document.getElementById('lc-results');
  if (!panel) return;
  panel.style.display = 'block';

  const passCount = results.filter(r => r.ok).length;

  panel.innerHTML = `
    <div class="lc-results-header ${allPassed ? 'lc-results-pass' : 'lc-results-fail'}">
      <span class="lc-results-icon">${allPassed ? '🎉' : '❌'}</span>
      <span class="lc-results-summary">
        ${allPassed ? 'Todos os testes passaram!' : `${passCount}/${results.length} testes passaram`}
      </span>
      ${allPassed ? '<span class="lc-badge-solved">✓ Resolvido</span>' : ''}
    </div>
    <div class="lc-test-cases">
      ${results.map((r, i) => `
        <div class="lc-test-case ${r.ok ? 'lc-test-pass' : 'lc-test-fail'}">
          <div class="lc-test-header">
            <span class="lc-test-icon">${r.ok ? '✓' : '✗'}</span>
            <span class="lc-test-label">Caso ${i + 1}</span>
            ${r.input !== '—' ? `<span class="lc-test-input">entrada: <code>${escHtml(String(r.input))}</code></span>` : ''}
          </div>
          ${!r.ok ? `
            <div class="lc-test-detail">
              <div><span class="lc-test-key">Esperado:</span> <code>${escHtml(String(r.expected))}</code></div>
              <div><span class="lc-test-key">Obtido:</span> <code class="lc-got-wrong">${escHtml(String(r.got))}</code></div>
            </div>
          ` : ''}
          ${r.ok && r.got !== '✓' ? `<div class="lc-test-detail"><span class="lc-test-key">Saída:</span> <code>${escHtml(String(r.got))}</code></div>` : ''}
        </div>
      `).join('')}
    </div>
  `;

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── MARKDOWN LITE ────────────────────────────────────────────────────────────
function mdToHtml(md) {
  return md
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_,lang,code) => `<pre class="lc-code-block"><code>${code.trim()}</code></pre>`)
    .replace(/`([^`]+)`/g, '<code class="lc-inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/,'<p>').replace(/$/,'</p>')
    .replace(/<p><h/g,'<h').replace(/<\/h(\d)><\/p>/g,'</h$1>')
    .replace(/<p><pre/g,'<pre').replace(/<\/pre><\/p>/g,'</pre>');
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
