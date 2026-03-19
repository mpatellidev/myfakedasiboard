// @ts-nocheck
// ===== DESAFIOS DE PROGRAMAÇÃO — DaSIboard =====

// ─── STATE ────────────────────────────────────────────────────────────────────
var lcState = {
  lang: 'javascript',
  challengeIndex: 0,
  filter: 'all',
  solved: {},
  code: {},
  view: 'list',
  running: false,
};

// ─── CHALLENGES ───────────────────────────────────────────────────────────────
var LC_CHALLENGES = {
  javascript: [
    {
      id: 'js_0', title: 'Dois Somas', difficulty: 'easy', tags: ['array','hash'],
      description: 'Dado um array de inteiros <code>nums</code> e um inteiro <code>target</code>, retorne os <strong>índices</strong> dos dois números que somam <code>target</code>.\n\nVocê pode assumir que cada entrada possui exatamente uma solução.\n\n<pre class="lc-code-block"><code>Entrada: nums = [2,7,11,15], target = 9\nSaída: [0,1]\n\nEntrada: nums = [3,2,4], target = 6\nSaída: [1,2]</code></pre>',
      starterCode: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Escreva sua solução aqui\n  \n}',
      testFn: 'function runTests(fn){var cases=[{args:[[2,7,11,15],9],exp:[0,1]},{args:[[3,2,4],6],exp:[1,2]},{args:[[3,3],6],exp:[0,1]},{args:[[1,2,3,4],7],exp:[2,3]}];return cases.map(function(c){try{var r=fn(c.args[0],c.args[1]);var ok=JSON.stringify((r||[]).slice().sort(function(a,b){return a-b}))===JSON.stringify(c.exp.slice().sort(function(a,b){return a-b}));return{ok:ok,input:JSON.stringify(c.args[0])+", target="+c.args[1],expected:JSON.stringify(c.exp),got:JSON.stringify(r)};}catch(e){return{ok:false,input:"",expected:JSON.stringify(c.exp),got:"Erro: "+e.message};}});}',
      fnName: 'twoSum'
    },
    {
      id: 'js_1', title: 'Palíndromo', difficulty: 'easy', tags: ['string','math'],
      description: 'Dado um inteiro <code>x</code>, retorne <code>true</code> se for um palíndromo (lê igual de frente e de trás).\n\nNúmeros negativos nunca são palíndromos.\n\n<pre class="lc-code-block"><code>121  → true\n-121 → false\n10   → false\n0    → true</code></pre>',
      starterCode: '/**\n * @param {number} x\n * @return {boolean}\n */\nfunction isPalindrome(x) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[{a:121,e:true},{a:-121,e:false},{a:10,e:false},{a:0,e:true},{a:12321,e:true},{a:123,e:false}];return cases.map(function(c){try{var r=fn(c.a);return{ok:r===c.e,input:String(c.a),expected:String(c.e),got:String(r)};}catch(e){return{ok:false,input:String(c.a),expected:String(c.e),got:"Erro: "+e.message};}});}',
      fnName: 'isPalindrome'
    },
    {
      id: 'js_2', title: 'FizzBuzz', difficulty: 'easy', tags: ['math','string'],
      description: 'Dado um inteiro <code>n</code>, retorne um array de strings de 1 a n onde:\n<ul><li>Múltiplos de 3 → <code>"Fizz"</code></li><li>Múltiplos de 5 → <code>"Buzz"</code></li><li>Múltiplos de ambos → <code>"FizzBuzz"</code></li><li>Demais → o número como string</li></ul>\n\n<pre class="lc-code-block"><code>n=5 → ["1","2","Fizz","4","Buzz"]</code></pre>',
      starterCode: '/**\n * @param {number} n\n * @return {string[]}\n */\nfunction fizzBuzz(n) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[{n:5,e:["1","2","Fizz","4","Buzz"]},{n:3,e:["1","2","Fizz"]},{n:1,e:["1"]},{n:15,e:["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]}];return cases.map(function(c){try{var r=fn(c.n);var ok=JSON.stringify(r)===JSON.stringify(c.e);return{ok:ok,input:"n="+c.n,expected:JSON.stringify(c.e.slice(0,5))+"...",got:JSON.stringify((r||[]).slice(0,5))+"..."};}catch(e){return{ok:false,input:"n="+c.n,expected:"...",got:"Erro: "+e.message};}});}',
      fnName: 'fizzBuzz'
    },
    {
      id: 'js_3', title: 'Inverter String', difficulty: 'easy', tags: ['string','array'],
      description: 'Escreva uma função que inverte um array de caracteres <code>s</code> <strong>in-place</strong> com O(1) de memória extra.\n\n<pre class="lc-code-block"><code>["h","e","l","l","o"] → ["o","l","l","e","h"]\n["H","a","n","n","a","h"] → ["h","a","n","n","a","H"]</code></pre>',
      starterCode: '/**\n * @param {character[]} s\n * @return {void}\n */\nfunction reverseString(s) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[[["h","e","l","l","o"],["o","l","l","e","h"]],[["H","a","n","n","a","h"],["h","a","n","n","a","H"]],[["a"],["a"]],[["a","b"],["b","a"]]];return cases.map(function(c){var input=c[0].slice();try{fn(c[0]);var ok=JSON.stringify(c[0])===JSON.stringify(c[1]);return{ok:ok,input:JSON.stringify(input),expected:JSON.stringify(c[1]),got:JSON.stringify(c[0])};}catch(e){return{ok:false,input:JSON.stringify(input),expected:JSON.stringify(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'reverseString'
    },
    {
      id: 'js_4', title: 'Máximo Subarray', difficulty: 'medium', tags: ['array','dp'],
      description: 'Dado um array <code>nums</code>, encontre o subarray contíguo com a <strong>maior soma</strong> e retorne essa soma.\n\n<pre class="lc-code-block"><code>[-2,1,-3,4,-1,2,1,-5,4] → 6  (subarray [4,-1,2,1])\n[1]                      → 1\n[5,4,-1,7,8]             → 23</code></pre>',
      starterCode: '/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[[[-2,1,-3,4,-1,2,1,-5,4],6],[[1],1],[[5,4,-1,7,8],23],[[-1,-2,-3],-1],[[0,0,0],0]];return cases.map(function(c){try{var r=fn(c[0].slice());return{ok:r===c[1],input:JSON.stringify(c[0]),expected:String(c[1]),got:String(r)};}catch(e){return{ok:false,input:JSON.stringify(c[0]),expected:String(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'maxSubArray'
    },
    {
      id: 'js_5', title: 'Parênteses Válidos', difficulty: 'medium', tags: ['stack','string'],
      description: 'Dada uma string <code>s</code> com <code>(</code> <code>)</code> <code>{</code> <code>}</code> <code>[</code> <code>]</code>, determine se é <strong>válida</strong>.\n\nCada abertura deve ser fechada na ordem correta.\n\n<pre class="lc-code-block"><code>"()"      → true\n"()[]{}"  → true\n"(]"      → false\n"([)]"    → false\n"{[]}"    → true</code></pre>',
      starterCode: '/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[["()",true],["()[]{}",true],["(]",false],["([)]",false],["{[]}",true],["",true],["[",false]];return cases.map(function(c){try{var r=fn(c[0]);return{ok:r===c[1],input:\'"\'+c[0]+\'"\',expected:String(c[1]),got:String(r)};}catch(e){return{ok:false,input:\'"\'+c[0]+\'"\',expected:String(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'isValid'
    },
    {
      id: 'js_6', title: 'Escalada de Degraus', difficulty: 'easy', tags: ['dp','math'],
      description: 'Para subir <code>n</code> degraus, você pode subir 1 ou 2 por vez. De quantas maneiras distintas você pode chegar ao topo?\n\n<pre class="lc-code-block"><code>n=2 → 2  (1+1 ou 2)\nn=3 → 3  (1+1+1, 1+2, 2+1)\nn=5 → 8</code></pre>',
      starterCode: '/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[[1,1],[2,2],[3,3],[4,5],[5,8],[10,89]];return cases.map(function(c){try{var r=fn(c[0]);return{ok:r===c[1],input:"n="+c[0],expected:String(c[1]),got:String(r)};}catch(e){return{ok:false,input:"n="+c[0],expected:String(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'climbStairs'
    },
    {
      id: 'js_7', title: 'Maior Elemento', difficulty: 'easy', tags: ['array'],
      description: 'Dado um array de inteiros, retorne o <strong>maior elemento</strong>.\n\n<pre class="lc-code-block"><code>[3,1,4,1,5,9,2,6] → 9\n[-5,-1,-3]         → -1</code></pre>',
      starterCode: '/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction findMax(nums) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[[[3,1,4,1,5,9,2,6],9],[[-5,-1,-3],-1],[[42],42],[[0,0,0],0],[[100,1,50],100]];return cases.map(function(c){try{var r=fn(c[0].slice());return{ok:r===c[1],input:JSON.stringify(c[0]),expected:String(c[1]),got:String(r)};}catch(e){return{ok:false,input:JSON.stringify(c[0]),expected:String(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'findMax'
    },
    {
      id: 'js_8', title: 'Remover Duplicatas', difficulty: 'easy', tags: ['array'],
      description: 'Dado um array <strong>ordenado</strong> <code>nums</code>, remova os duplicados <strong>in-place</strong> e retorne o novo tamanho.\n\nOs primeiros <code>k</code> elementos do array devem conter os únicos na ordem original.\n\n<pre class="lc-code-block"><code>[1,1,2]         → 2  (array: [1,2,...])\n[0,0,1,1,1,2,2] → 3  (array: [0,1,2,...])</code></pre>',
      starterCode: '/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction removeDuplicates(nums) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[[[1,1,2],2,[1,2]],[[0,0,1,1,1,2,2],3,[0,1,2]],[[1],1,[1]],[[1,2,3],3,[1,2,3]]];return cases.map(function(c){var arr=c[0].slice();try{var k=fn(arr);var ok=k===c[1]&&JSON.stringify(arr.slice(0,k))===JSON.stringify(c[2]);return{ok:ok,input:JSON.stringify(c[0]),expected:"k="+c[1]+", arr="+JSON.stringify(c[2]),got:"k="+k+", arr="+JSON.stringify(arr.slice(0,k))};}catch(e){return{ok:false,input:JSON.stringify(c[0]),expected:"k="+c[1],got:"Erro: "+e.message};}});}',
      fnName: 'removeDuplicates'
    },
    {
      id: 'js_9', title: 'Contar Palavras', difficulty: 'easy', tags: ['string','hash'],
      description: 'Dada uma string <code>s</code>, retorne um objeto com a <strong>frequência de cada palavra</strong> (case-insensitive, sem pontuação).\n\n<pre class="lc-code-block"><code>"hello world hello" → {hello:2, world:1}\n"The the THE"        → {the:3}</code></pre>',
      starterCode: '/**\n * @param {string} s\n * @return {Object}\n */\nfunction wordCount(s) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[["hello world hello",{hello:2,world:1}],["the THE The",{the:3}],["a b a c b a",{a:3,b:2,c:1}],["one",{one:1}]];return cases.map(function(c){try{var r=fn(c[0]);var ok=JSON.stringify(r)===JSON.stringify(c[1]);return{ok:ok,input:\'"\'+c[0]+\'"\',expected:JSON.stringify(c[1]),got:JSON.stringify(r)};}catch(e){return{ok:false,input:\'"\'+c[0]+\'"\',expected:JSON.stringify(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'wordCount'
    },
    {
      id: 'js_10', title: 'Número Feliz', difficulty: 'medium', tags: ['math','hash'],
      description: 'Um <strong>número feliz</strong> é definido pelo seguinte processo: substitua o número pela soma dos quadrados de seus dígitos e repita até chegar a 1 (feliz) ou entrar em ciclo sem chegar a 1 (triste).\n\n<pre class="lc-code-block"><code>19 → 1²+9²=82 → 8²+2²=68 → ... → 1  (feliz: true)\n2  → false</code></pre>',
      starterCode: '/**\n * @param {number} n\n * @return {boolean}\n */\nfunction isHappy(n) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[[19,true],[1,true],[2,false],[7,true],[4,false],[100,true]];return cases.map(function(c){try{var r=fn(c[0]);return{ok:r===c[1],input:String(c[0]),expected:String(c[1]),got:String(r)};}catch(e){return{ok:false,input:String(c[0]),expected:String(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'isHappy'
    },
    {
      id: 'js_11', title: 'Girar Array', difficulty: 'medium', tags: ['array','math'],
      description: 'Dado um array <code>nums</code>, gire-o <strong>à direita</strong> em <code>k</code> posições.\n\n<pre class="lc-code-block"><code>[1,2,3,4,5,6,7], k=3 → [5,6,7,1,2,3,4]\n[-1,-100,3,99],  k=2 → [3,99,-1,-100]</code></pre>',
      starterCode: '/**\n * @param {number[]} nums\n * @param {number} k\n * @return {void} modifica in-place\n */\nfunction rotate(nums, k) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[[[1,2,3,4,5,6,7],3,[5,6,7,1,2,3,4]],[[-1,-100,3,99],2,[3,99,-1,-100]],[[1],0,[1]],[[1,2],1,[2,1]]];return cases.map(function(c){var arr=c[0].slice();try{fn(arr,c[1]);var ok=JSON.stringify(arr)===JSON.stringify(c[2]);return{ok:ok,input:JSON.stringify(c[0])+" k="+c[1],expected:JSON.stringify(c[2]),got:JSON.stringify(arr)};}catch(e){return{ok:false,input:JSON.stringify(c[0]),expected:JSON.stringify(c[2]),got:"Erro: "+e.message};}});}',
      fnName: 'rotate'
    },
    {
      id: 'js_12', title: 'Comprimento Maior Substring', difficulty: 'medium', tags: ['string','sliding window'],
      description: 'Dado uma string <code>s</code>, retorne o <strong>comprimento da maior substring sem caracteres repetidos</strong>.\n\n<pre class="lc-code-block"><code>"abcabcbb" → 3  ("abc")\n"bbbbb"    → 1  ("b")\n"pwwkew"   → 3  ("wke")</code></pre>',
      starterCode: '/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n  \n}',
      testFn: 'function runTests(fn){var cases=[["abcabcbb",3],["bbbbb",1],["pwwkew",3],["",0],["au",2],["dvdf",3]];return cases.map(function(c){try{var r=fn(c[0]);return{ok:r===c[1],input:\'"\'+c[0]+\'"\',expected:String(c[1]),got:String(r)};}catch(e){return{ok:false,input:\'"\'+c[0]+\'"\',expected:String(c[1]),got:"Erro: "+e.message};}});}',
      fnName: 'lengthOfLongestSubstring'
    },
  ],

  html: [
    {
      id: 'html_0', title: 'Card de Perfil', difficulty: 'easy', tags: ['layout','semântica'],
      description: 'Crie um <strong>card de perfil</strong> com a classe <code>profile-card</code> contendo:\n<ul><li>Imagem de avatar (use <code>https://i.pravatar.cc/80</code>)</li><li>Nome <strong>"Ada Lovelace"</strong> em tag h2 ou h3</li><li>Descrição <strong>"Primeira programadora da história"</strong> em parágrafo</li><li>Link <strong>"Ver perfil"</strong> com href="#"</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Card</title>\n  <style>\n    body { font-family: sans-serif; display:flex; justify-content:center; padding:20px; }\n    /* Estilize o card aqui */\n  </style>\n</head>\n<body>\n  <!-- Crie o card aqui -->\n\n</body>\n</html>',
      checkFn: function(doc) {
        var card=doc.querySelector('.profile-card');
        var img=doc.querySelector('img');
        var link=doc.querySelector('a');
        var heading=doc.querySelector('h1,h2,h3');
        return [
          {ok:!!card,msg:'Elemento com classe profile-card'},
          {ok:!!img,msg:'Imagem <img> presente'},
          {ok:!!heading,msg:'Nome em tag de título (h1/h2/h3)'},
          {ok:!!link&&link.textContent.toLowerCase().includes('perfil'),msg:'Link "Ver perfil" presente'},
          {ok:!!doc.querySelector('p'),msg:'Descrição em parágrafo <p>'},
        ];
      },
      isHTML: true
    },
    {
      id: 'html_1', title: 'Formulário de Contato', difficulty: 'easy', tags: ['form','acessibilidade'],
      description: 'Construa um formulário com <code>id="contact-form"</code>:\n<ul><li><code>input[type=text]</code> para Nome com <code>&lt;label&gt;</code></li><li><code>input[type=email]</code> para Email com <code>&lt;label&gt;</code></li><li><code>&lt;textarea&gt;</code> para Mensagem com <code>&lt;label&gt;</code></li><li><code>button[type=submit]</code> com texto "Enviar"</li></ul>\nUse atributos <code>for/id</code> para associar labels.',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Contato</title>\n  <style>\n    body { font-family: sans-serif; max-width:400px; margin:20px auto; }\n    label { display:block; margin-top:12px; font-weight:bold; }\n    input, textarea { width:100%; padding:8px; box-sizing:border-box; }\n  </style>\n</head>\n<body>\n  <!-- Formulário aqui -->\n\n</body>\n</html>',
      checkFn: function(doc) {
        var form=doc.querySelector('#contact-form');
        var labels=doc.querySelectorAll('label');
        var nameIn=doc.querySelector('input[type="text"]');
        var emailIn=doc.querySelector('input[type="email"]');
        var ta=doc.querySelector('textarea');
        var btn=doc.querySelector('button[type="submit"],input[type="submit"]');
        var linked=[].slice.call(labels).some(function(l){return l.htmlFor&&doc.getElementById(l.htmlFor);});
        return [
          {ok:!!form,msg:'Form com id="contact-form"'},
          {ok:!!nameIn,msg:'Input type="text" para Nome'},
          {ok:!!emailIn,msg:'Input type="email" para Email'},
          {ok:!!ta,msg:'Textarea para Mensagem'},
          {ok:!!btn,msg:'Botão submit'},
          {ok:labels.length>=3,msg:'Pelo menos 3 labels'},
          {ok:linked,msg:'Labels associadas via for/id'},
        ];
      },
      isHTML: true
    },
    {
      id: 'html_2', title: 'Tabela de Notas', difficulty: 'medium', tags: ['table','semântica'],
      description: 'Crie uma tabela <code>id="grades-table"</code> com:\n<ul><li><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code></li><li>Colunas: Disciplina | Nota | Status</li><li>3 linhas de dados no tbody</li><li>Rodapé com "Média:" e valor calculado</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Notas</title>\n  <style>\n    body { font-family: sans-serif; padding:20px; }\n    table { border-collapse:collapse; width:100%; }\n    th, td { border:1px solid #ccc; padding:10px; text-align:left; }\n    thead { background:#f0f0f0; }\n    tfoot { font-weight:bold; }\n  </style>\n</head>\n<body>\n  <!-- Tabela aqui -->\n\n</body>\n</html>',
      checkFn: function(doc) {
        var table=doc.querySelector('#grades-table');
        var thead=doc.querySelector('thead');
        var tbody=doc.querySelector('tbody');
        var tfoot=doc.querySelector('tfoot');
        var rows=doc.querySelectorAll('tbody tr');
        var ths=doc.querySelectorAll('th');
        return [
          {ok:!!table,msg:'Tabela com id="grades-table"'},
          {ok:!!thead,msg:'<thead> presente'},
          {ok:!!tbody,msg:'<tbody> presente'},
          {ok:!!tfoot,msg:'<tfoot> presente'},
          {ok:rows.length>=3,msg:'Pelo menos 3 linhas no tbody'},
          {ok:ths.length>=3,msg:'Pelo menos 3 colunas no cabeçalho'},
        ];
      },
      isHTML: true
    },
    {
      id: 'html_3', title: 'Lista de Tarefas', difficulty: 'easy', tags: ['form','interatividade'],
      description: 'Crie uma lista de tarefas com:\n<ul><li>Input <code>id="task-input"</code> para digitar nova tarefa</li><li>Botão <code>id="add-btn"</code> "Adicionar"</li><li>Lista <code>id="task-list"</code> (ul ou ol)</li><li>JavaScript: ao clicar Adicionar, cria um <code>&lt;li&gt;</code> com o texto do input</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Tarefas</title>\n  <style>\n    body { font-family: sans-serif; max-width:400px; margin:20px auto; }\n    #task-list li { padding:8px; border-bottom:1px solid #eee; }\n  </style>\n</head>\n<body>\n  <h2>Minhas Tarefas</h2>\n  <!-- Input, botão e lista aqui -->\n\n  <script>\n    // Lógica aqui\n  </script>\n</body>\n</html>',
      checkFn: function(doc) {
        var input=doc.querySelector('#task-input');
        var btn=doc.querySelector('#add-btn');
        var list=doc.querySelector('#task-list');
        return [
          {ok:!!input,msg:'Input com id="task-input"'},
          {ok:!!btn,msg:'Botão com id="add-btn"'},
          {ok:!!list,msg:'Lista com id="task-list"'},
          {ok:!!doc.querySelector('script'),msg:'Tag <script> com lógica'},
        ];
      },
      isHTML: true
    },
    {
      id: 'html_4', title: 'Galeria de Imagens', difficulty: 'medium', tags: ['grid','figure'],
      description: 'Crie uma galeria com <code>id="gallery"</code> contendo pelo menos 4 imagens usando <code>&lt;figure&gt;</code> e <code>&lt;figcaption&gt;</code>.\n\nCada imagem deve ter um <code>alt</code> descritivo. Use https://picsum.photos/200/150?random=N para as imagens.',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Galeria</title>\n  <style>\n    body { font-family: sans-serif; padding:20px; }\n    #gallery { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }\n    figure { margin:0; }\n    img { width:100%; border-radius:8px; }\n    figcaption { text-align:center; margin-top:6px; color:#666; }\n  </style>\n</head>\n<body>\n  <h2>Minha Galeria</h2>\n  <!-- Galeria aqui -->\n\n</body>\n</html>',
      checkFn: function(doc) {
        var gallery=doc.querySelector('#gallery');
        var figures=doc.querySelectorAll('figure');
        var imgs=doc.querySelectorAll('img');
        var captions=doc.querySelectorAll('figcaption');
        var alts=[].slice.call(imgs).every(function(i){return i.alt&&i.alt.length>0;});
        return [
          {ok:!!gallery,msg:'Elemento com id="gallery"'},
          {ok:figures.length>=4,msg:'Pelo menos 4 elementos <figure>'},
          {ok:imgs.length>=4,msg:'Pelo menos 4 imagens'},
          {ok:captions.length>=4,msg:'Pelo menos 4 <figcaption>'},
          {ok:alts,msg:'Todas as imagens têm atributo alt'},
        ];
      },
      isHTML: true
    },
    {
      id: 'html_5', title: 'Nav Responsiva', difficulty: 'hard', tags: ['nav','mobile'],
      description: 'Crie uma barra de navegação <code>&lt;nav id="main-nav"&gt;</code> com:\n<ul><li>Logo/brand à esquerda</li><li>Links: Home, Sobre, Contato</li><li>Botão hamburguer <code>id="menu-btn"</code> visível apenas em mobile (&lt;600px)</li><li>Em mobile, o menu deve toggle ao clicar no hamburguer</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>Nav</title>\n  <style>\n    * { box-sizing:border-box; margin:0; padding:0; }\n    body { font-family:sans-serif; }\n    nav { background:#1a1a2e; color:white; padding:0 20px; }\n    /* Estilos aqui */\n  </style>\n</head>\n<body>\n  <!-- Nav aqui -->\n  <script>\n    /* Toggle menu aqui */\n  </script>\n</body>\n</html>',
      checkFn: function(doc) {
        var nav=doc.querySelector('#main-nav');
        var links=doc.querySelectorAll('nav a');
        var btn=doc.querySelector('#menu-btn');
        var hasHome=[].slice.call(links).some(function(l){return l.textContent.toLowerCase().includes('home');});
        return [
          {ok:!!nav,msg:'Nav com id="main-nav"'},
          {ok:links.length>=3,msg:'Pelo menos 3 links de navegação'},
          {ok:hasHome,msg:'Link "Home" presente'},
          {ok:!!btn,msg:'Botão hamburguer com id="menu-btn"'},
          {ok:!!doc.querySelector('script'),msg:'Script para toggle do menu'},
        ];
      },
      isHTML: true
    },
  ],

  css: [
    {
      id: 'css_0', title: 'Botão Animado', difficulty: 'easy', tags: ['animação','hover'],
      description: 'Estilize o botão <code>#animated-btn</code>:\n<ul><li>Fundo roxo (#7c3aed), texto branco</li><li>Padding 12px 28px, border-radius 8px</li><li>Hover: scale(1.08) e cor mais escura</li><li>Transição suave de 0.2s</li><li>cursor: pointer, sem borda padrão</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Botão</title>\n  <style>\n    body { display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f5f5f5; }\n\n    #animated-btn {\n      /* Escreva aqui */\n    }\n\n    #animated-btn:hover {\n      /* Hover aqui */\n    }\n  </style>\n</head>\n<body>\n  <button id="animated-btn">Clique em mim!</button>\n</body>\n</html>',
      checkFn: function(doc) {
        var btn=doc.querySelector('#animated-btn');
        if(!btn) return [{ok:false,msg:'#animated-btn não encontrado'}];
        var s=doc.defaultView.getComputedStyle(btn);
        return [
          {ok:!!btn,msg:'Elemento #animated-btn existe'},
          {ok:s.backgroundColor!='rgba(0, 0, 0, 0)'&&s.backgroundColor!='transparent',msg:'Cor de fundo definida'},
          {ok:parseFloat(s.borderRadius)>0,msg:'Border-radius aplicado'},
          {ok:s.transition&&s.transition!='all 0s ease 0s'&&s.transition!='none',msg:'Transição CSS definida'},
          {ok:s.cursor==='pointer',msg:'cursor: pointer'},
        ];
      },
      isHTML: true
    },
    {
      id: 'css_1', title: 'Flexbox 3 Colunas', difficulty: 'medium', tags: ['flexbox','layout'],
      description: 'Use Flexbox no <code>#flex-container</code> para criar 3 colunas iguais:\n<ul><li>display: flex com 3 colunas de igual largura</li><li>Gap de 16px entre colunas</li><li>Em telas &lt;600px: colunas empilhadas (flex-direction: column)</li><li>Altura mínima de 100px por coluna</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>Flexbox</title>\n  <style>\n    * { box-sizing:border-box; }\n    body { padding:20px; font-family:sans-serif; }\n\n    #flex-container {\n      /* Flexbox aqui */\n    }\n\n    .col {\n      min-height:100px;\n      padding:16px;\n      border-radius:8px;\n    }\n    .col:nth-child(1) { background:#e0e7ff; }\n    .col:nth-child(2) { background:#fce7f3; }\n    .col:nth-child(3) { background:#d1fae5; }\n\n    @media (max-width:600px) {\n      /* Empilhar aqui */\n    }\n  </style>\n</head>\n<body>\n  <div id="flex-container">\n    <div class="col">Coluna 1</div>\n    <div class="col">Coluna 2</div>\n    <div class="col">Coluna 3</div>\n  </div>\n</body>\n</html>',
      checkFn: function(doc) {
        var c=doc.querySelector('#flex-container');
        if(!c) return [{ok:false,msg:'#flex-container não encontrado'}];
        var s=doc.defaultView.getComputedStyle(c);
        var cols=doc.querySelectorAll('.col');
        return [
          {ok:!!c,msg:'#flex-container existe'},
          {ok:s.display==='flex'||s.display==='inline-flex',msg:'display: flex no container'},
          {ok:parseFloat(s.gap||s.columnGap||0)>0,msg:'Gap entre colunas definido'},
          {ok:cols.length===3,msg:'Exatamente 3 .col'},
        ];
      },
      isHTML: true
    },
    {
      id: 'css_2', title: 'Dark Mode com Variáveis', difficulty: 'medium', tags: ['variáveis','dark mode'],
      description: 'Implemente dark mode com CSS custom properties:\n<ul><li>Defina <code>--bg</code>, <code>--text</code>, <code>--card-bg</code> em <code>:root</code></li><li>Classe <code>.dark</code> no body redefine as variáveis para cores escuras</li><li>Card <code>#theme-card</code> usa as variáveis</li><li>Botão <code>#toggle-btn</code> faz toggle da classe <code>.dark</code></li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Dark Mode</title>\n  <style>\n    :root {\n      /* Defina variáveis claras aqui */\n    }\n    body.dark {\n      /* Redefina para escuro aqui */\n    }\n    body { background:var(--bg); color:var(--text); font-family:sans-serif; transition:.3s; padding:20px; }\n    #theme-card { background:var(--card-bg); padding:20px; border-radius:8px; margin-bottom:16px; }\n  </style>\n</head>\n<body>\n  <div id="theme-card"><h2>Card</h2><p>Conteúdo aqui.</p></div>\n  <button id="toggle-btn" onclick="document.body.classList.toggle(\'dark\')">Alternar</button>\n</body>\n</html>',
      checkFn: function(doc) {
        var card=doc.querySelector('#theme-card');
        var btn=doc.querySelector('#toggle-btn');
        var hasVars=false,hasDark=false;
        try{[].slice.call(doc.styleSheets).forEach(function(ss){try{[].slice.call(ss.cssRules).forEach(function(r){if(r.selectorText===':root'&&r.style&&r.style.cssText&&r.style.cssText.indexOf('--')>=0)hasVars=true;if(r.selectorText&&r.selectorText.indexOf('.dark')>=0)hasDark=true;});}catch(e){}});}catch(e){}
        return [
          {ok:!!card,msg:'#theme-card existe'},
          {ok:!!btn,msg:'#toggle-btn existe'},
          {ok:hasVars,msg:'CSS variables definidas em :root'},
          {ok:hasDark,msg:'Classe .dark redefine variáveis'},
        ];
      },
      isHTML: true
    },
    {
      id: 'css_3', title: 'Card com Sombra e Hover', difficulty: 'easy', tags: ['box-shadow','hover'],
      description: 'Estilize o <code>.card</code>:\n<ul><li>Background branco, border-radius 12px</li><li>Sombra suave: <code>box-shadow: 0 2px 8px rgba(0,0,0,.1)</code></li><li>Padding interno de 24px</li><li>No hover: sombra maior e translateY(-4px)</li><li>Transição de 0.25s</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Card</title>\n  <style>\n    body { background:#f5f5f5; display:flex; justify-content:center; padding:40px; font-family:sans-serif; }\n\n    .card {\n      width:280px;\n      /* Escreva aqui */\n    }\n\n    .card:hover {\n      /* Hover aqui */\n    }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h3>Título do Card</h3>\n    <p>Conteúdo de exemplo do card com estilos CSS.</p>\n  </div>\n</body>\n</html>',
      checkFn: function(doc) {
        var card=doc.querySelector('.card');
        if(!card) return [{ok:false,msg:'.card não encontrado'}];
        var s=doc.defaultView.getComputedStyle(card);
        return [
          {ok:!!card,msg:'.card existe'},
          {ok:s.boxShadow&&s.boxShadow!=='none',msg:'box-shadow definido'},
          {ok:parseFloat(s.borderRadius)>=8,msg:'border-radius >= 8px'},
          {ok:parseFloat(s.paddingTop)>=16,msg:'Padding interno >= 16px'},
          {ok:s.transition&&s.transition!=='all 0s ease 0s',msg:'Transição definida'},
        ];
      },
      isHTML: true
    },
    {
      id: 'css_4', title: 'Grid Responsivo', difficulty: 'medium', tags: ['grid','responsivo'],
      description: 'Crie um grid responsivo com <code>#grid-container</code>:\n<ul><li>CSS Grid com colunas automáticas: <code>repeat(auto-fill, minmax(180px,1fr))</code></li><li>Gap de 16px</li><li>Pelo menos 6 itens <code>.grid-item</code></li><li>Cada item com fundo colorido, padding e border-radius</li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>Grid</title>\n  <style>\n    body { font-family:sans-serif; padding:20px; }\n\n    #grid-container {\n      /* Grid aqui */\n    }\n\n    .grid-item {\n      padding:20px;\n      border-radius:8px;\n      text-align:center;\n      font-weight:bold;\n    }\n  </style>\n</head>\n<body>\n  <div id="grid-container">\n    <div class="grid-item" style="background:#e0e7ff">1</div>\n    <div class="grid-item" style="background:#fce7f3">2</div>\n    <div class="grid-item" style="background:#d1fae5">3</div>\n    <div class="grid-item" style="background:#fef3c7">4</div>\n    <div class="grid-item" style="background:#ffe4e6">5</div>\n    <div class="grid-item" style="background:#e0f2fe">6</div>\n  </div>\n</body>\n</html>',
      checkFn: function(doc) {
        var g=doc.querySelector('#grid-container');
        if(!g) return [{ok:false,msg:'#grid-container não encontrado'}];
        var s=doc.defaultView.getComputedStyle(g);
        var items=doc.querySelectorAll('.grid-item');
        return [
          {ok:!!g,msg:'#grid-container existe'},
          {ok:s.display==='grid',msg:'display: grid'},
          {ok:s.gap!=='0px'&&s.gap!=='normal',msg:'Gap definido'},
          {ok:items.length>=6,msg:'Pelo menos 6 .grid-item'},
        ];
      },
      isHTML: true
    },
    {
      id: 'css_5', title: 'Loader Animado', difficulty: 'hard', tags: ['animação','keyframes'],
      description: 'Crie um loader com <code>#loader</code> usando apenas CSS:\n<ul><li>Círculo de 48px com borda parcial colorida</li><li>Animação de rotação contínua via <code>@keyframes</code></li><li>Centralizado na tela</li><li>Nome da animação deve ser <code>spin</code> ou <code>rotate</code></li></ul>',
      starterCode: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Loader</title>\n  <style>\n    body { display:flex; justify-content:center; align-items:center; min-height:100vh; background:#111; }\n\n    #loader {\n      /* Loader aqui */\n    }\n\n    @keyframes spin {\n      /* Keyframes aqui */\n    }\n  </style>\n</head>\n<body>\n  <div id="loader"></div>\n</body>\n</html>',
      checkFn: function(doc) {
        var loader=doc.querySelector('#loader');
        if(!loader) return [{ok:false,msg:'#loader não encontrado'}];
        var s=doc.defaultView.getComputedStyle(loader);
        var hasKf=false;
        try{[].slice.call(doc.styleSheets).forEach(function(ss){try{[].slice.call(ss.cssRules).forEach(function(r){if(r.type===7)hasKf=true;});}catch(e){}});}catch(e){}
        return [
          {ok:!!loader,msg:'#loader existe'},
          {ok:s.borderRadius==='50%',msg:'border-radius: 50% (círculo)'},
          {ok:s.animationName&&s.animationName!=='none',msg:'animation-name definido'},
          {ok:hasKf,msg:'@keyframes definido no CSS'},
          {ok:s.display!=='none',msg:'Loader visível'},
        ];
      },
      isHTML: true
    },
  ],

  c: [
    {
      id: 'c_0', title: 'Olá, Mundo!', difficulty: 'easy', tags: ['básico','I/O'],
      description: 'Escreva um programa C que imprime exatamente:\n<pre class="lc-code-block"><code>Olá, Mundo!</code></pre>\nUse <code>printf</code> com quebra de linha.',
      starterCode: '#include <stdio.h>\n\nint main() {\n    // Escreva aqui\n    \n    return 0;\n}',
      testCases: [{input:'',expected:'Olá, Mundo!'}],
      isC: true
    },
    {
      id: 'c_1', title: 'Par ou Ímpar', difficulty: 'easy', tags: ['condicional'],
      description: 'Leia um inteiro e imprima <code>par</code> ou <code>impar</code> (sem acento).\n\n<pre class="lc-code-block"><code>Entrada: 4  → par\nEntrada: 7  → impar\nEntrada: 0  → par</code></pre>',
      starterCode: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    \n    // Imprima "par" ou "impar"\n    \n    return 0;\n}',
      testCases: [{input:'4',expected:'par'},{input:'7',expected:'impar'},{input:'0',expected:'par'},{input:'-3',expected:'impar'}],
      isC: true
    },
    {
      id: 'c_2', title: 'Soma de 1 a N', difficulty: 'easy', tags: ['loop','math'],
      description: 'Leia um inteiro <code>n</code> e imprima a soma de 1 até n.\n\n<pre class="lc-code-block"><code>Entrada: 5  → 15\nEntrada: 10 → 55\nEntrada: 1  → 1</code></pre>',
      starterCode: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    \n    // Calcule e imprima a soma\n    \n    return 0;\n}',
      testCases: [{input:'5',expected:'15'},{input:'1',expected:'1'},{input:'10',expected:'55'},{input:'0',expected:'0'}],
      isC: true
    },
    {
      id: 'c_3', title: 'Maior de Três', difficulty: 'easy', tags: ['condicional'],
      description: 'Leia três inteiros e imprima o maior.\n\n<pre class="lc-code-block"><code>Entrada: 3 7 2  → 7\nEntrada: -1 -5 -2 → -1</code></pre>',
      starterCode: '#include <stdio.h>\n\nint main() {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    \n    // Imprima o maior\n    \n    return 0;\n}',
      testCases: [{input:'3 7 2',expected:'7'},{input:'-1 -5 -2',expected:'-1'},{input:'10 10 5',expected:'10'},{input:'1 1 1',expected:'1'}],
      isC: true
    },
    {
      id: 'c_4', title: 'Fibonacci', difficulty: 'medium', tags: ['loop','math'],
      description: 'Leia <code>n</code> e imprima os primeiros <code>n</code> termos de Fibonacci separados por espaço.\n\n<pre class="lc-code-block"><code>Entrada: 6  → 0 1 1 2 3 5\nEntrada: 1  → 0\nEntrada: 2  → 0 1</code></pre>',
      starterCode: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    \n    // Imprima os n primeiros termos de Fibonacci\n    \n    return 0;\n}',
      testCases: [{input:'1',expected:'0'},{input:'2',expected:'0 1'},{input:'6',expected:'0 1 1 2 3 5'},{input:'8',expected:'0 1 1 2 3 5 8 13'}],
      isC: true
    },
    {
      id: 'c_5', title: 'Contador de Vogais', difficulty: 'medium', tags: ['string','loop'],
      description: 'Leia uma string e conte as vogais (a,e,i,o,u — maiúsculas e minúsculas). Imprima o total.\n\n<pre class="lc-code-block"><code>programacao → 5\nhello        → 2\nrhythm       → 0</code></pre>',
      starterCode: '#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main() {\n    char s[256];\n    scanf("%s", s);\n    int count = 0;\n    // Conte vogais\n    printf("%d\\n", count);\n    return 0;\n}',
      testCases: [{input:'programacao',expected:'5'},{input:'hello',expected:'2'},{input:'rhythm',expected:'0'},{input:'AEIOU',expected:'5'}],
      isC: true
    },
    {
      id: 'c_6', title: 'Tabuada', difficulty: 'easy', tags: ['loop','I/O'],
      description: 'Leia um inteiro <code>n</code> e imprima sua tabuada de 1 a 10, um por linha no formato: <code>n x i = resultado</code>\n\n<pre class="lc-code-block"><code>Entrada: 3\nSaída:\n3 x 1 = 3\n3 x 2 = 6\n...\n3 x 10 = 30</code></pre>',
      starterCode: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    \n    // Imprima a tabuada\n    \n    return 0;\n}',
      testCases: [{input:'3',expected:'3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30'}],
      isC: true
    },
    {
      id: 'c_7', title: 'Inverter String', difficulty: 'medium', tags: ['string','array'],
      description: 'Leia uma string e imprima ela ao contrário.\n\n<pre class="lc-code-block"><code>hello   → olleh\nUSP     → PSU\nabc     → cba</code></pre>',
      starterCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[256];\n    scanf("%s", s);\n    \n    // Imprima invertida\n    \n    return 0;\n}',
      testCases: [{input:'hello',expected:'olleh'},{input:'USP',expected:'PSU'},{input:'abc',expected:'cba'},{input:'a',expected:'a'}],
      isC: true
    },
    {
      id: 'c_8', title: 'Fatorial', difficulty: 'easy', tags: ['recursão','math'],
      description: 'Leia um inteiro <code>n</code> (0 ≤ n ≤ 12) e imprima seu fatorial.\n\n<pre class="lc-code-block"><code>0 → 1\n5 → 120\n10 → 3628800</code></pre>',
      starterCode: '#include <stdio.h>\n\nlong long fatorial(int n) {\n    // Implemente aqui (recursivo ou iterativo)\n}\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    printf("%lld\\n", fatorial(n));\n    return 0;\n}',
      testCases: [{input:'0',expected:'1'},{input:'1',expected:'1'},{input:'5',expected:'120'},{input:'10',expected:'3628800'}],
      isC: true
    },
    {
      id: 'c_9', title: 'Número Primo', difficulty: 'medium', tags: ['math','loop'],
      description: 'Leia um inteiro e imprima <code>primo</code> se for primo, ou <code>nao primo</code> caso contrário.\n\n<pre class="lc-code-block"><code>7   → primo\n4   → nao primo\n1   → nao primo\n2   → primo</code></pre>',
      starterCode: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    \n    // Verifique e imprima\n    \n    return 0;\n}',
      testCases: [{input:'7',expected:'primo'},{input:'4',expected:'nao primo'},{input:'1',expected:'nao primo'},{input:'2',expected:'primo'},{input:'13',expected:'primo'}],
      isC: true
    },
  ],
};

// ─── RENDER ───────────────────────────────────────────────────────────────────
function initLeetcode() {
  var container = document.getElementById('lc-app');
  if (!container) return;
  try {
    var saved = localStorage.getItem('lc_state_v2');
    if (saved) {
      var p = JSON.parse(saved);
      lcState.solved = p.solved || {};
      lcState.code   = p.code   || {};
      lcState.lang   = p.lang   || 'javascript';
    }
  } catch(e) {}
  lcState.view = 'list';
  renderList(container);
}

function saveState() {
  try { localStorage.setItem('lc_state_v2', JSON.stringify({solved:lcState.solved,code:lcState.code,lang:lcState.lang})); } catch(e) {}
}

// ─── LIST ─────────────────────────────────────────────────────────────────────
function renderList(container) {
  var langs = [
    {key:'javascript',label:'JavaScript',icon:'🟨'},
    {key:'html',label:'HTML',icon:'🟧'},
    {key:'css',label:'CSS',icon:'🟦'},
    {key:'c',label:'C',icon:'⬛'},
  ];
  var challenges = LC_CHALLENGES[lcState.lang] || [];
  var filtered = lcState.filter === 'all' ? challenges : challenges.filter(function(c){return c.difficulty===lcState.filter;});
  var totalSolved = challenges.filter(function(c){return lcState.solved[c.id];}).length;
  var pct = challenges.length ? Math.round(totalSolved/challenges.length*100) : 0;

  var html = '<div class="lc-header">';
  html += '<div class="lc-lang-tabs">';
  langs.forEach(function(l) {
    html += '<button class="lc-lang-tab'+(lcState.lang===l.key?' active':'')+'" onclick="lcSetLang(\''+l.key+'\')">';
    html += '<span>'+l.icon+'</span> '+l.label+'</button>';
  });
  html += '</div>';
  html += '<div class="lc-progress-row">';
  html += '<span class="lc-progress-label">'+totalSolved+'/'+challenges.length+' resolvidos</span>';
  html += '<div class="lc-progress-bar"><div class="lc-progress-fill" style="width:'+pct+'%"></div></div>';
  html += '<span class="lc-progress-pct">'+pct+'%</span></div></div>';

  html += '<div class="lc-filters">';
  ['all','easy','medium','hard'].forEach(function(d) {
    var label = d==='all'?'Todos':d==='easy'?'Fácil':d==='medium'?'Médio':'Difícil';
    html += '<button class="lc-filter-btn'+(lcState.filter===d?' active':'')+'" onclick="lcSetFilter(\''+d+'\')">'+label+'</button>';
  });
  html += '<span class="lc-count">'+filtered.length+' desafio'+(filtered.length!==1?'s':'')+'</span></div>';

  html += '<div class="lc-grid">';
  if (filtered.length === 0) {
    html += '<div class="lc-empty">Nenhum desafio nesta categoria ainda.</div>';
  } else {
    filtered.forEach(function(c, i) {
      var solved = lcState.solved[c.id];
      var diffLabel = {easy:'Fácil',medium:'Médio',hard:'Difícil'}[c.difficulty];
      var origIdx = challenges.indexOf(c);
      html += '<button class="lc-card'+(solved?' lc-card-solved':'')+' anim-fade-up" style="animation-delay:'+( i*0.04)+'s" onclick="lcOpenChallenge(\''+c.id+'\')">';
      html += '<div class="lc-card-top">';
      html += '<span class="lc-card-num">#'+(origIdx+1)+'</span>';
      html += '<span class="lc-diff-badge lc-diff-'+c.difficulty+'">'+diffLabel+'</span>';
      if (solved) html += '<span class="lc-solved-check">✓</span>';
      html += '</div>';
      html += '<div class="lc-card-title">'+c.title+'</div>';
      html += '<div class="lc-card-tags">'+c.tags.map(function(t){return'<span class="lc-tag">'+t+'</span>';}).join('')+'</div>';
      html += '</button>';
    });
  }
  html += '</div>';
  container.innerHTML = html;
}

// ─── EDITOR ───────────────────────────────────────────────────────────────────
function lcOpenChallenge(id) {
  var all = [].concat(LC_CHALLENGES.javascript, LC_CHALLENGES.html, LC_CHALLENGES.css, LC_CHALLENGES.c);
  var challenge = null;
  for (var i=0;i<all.length;i++) { if (all[i].id===id){challenge=all[i];break;} }
  if (!challenge) return;
  var challenges = LC_CHALLENGES[lcState.lang];
  lcState.challengeIndex = challenges.indexOf(challenge);
  lcState.view = 'editor';
  var container = document.getElementById('lc-app');
  if (container) renderEditor(container, challenge);
}

function renderEditor(container, challenge) {
  var challenges = LC_CHALLENGES[lcState.lang] || [];
  if (!challenge) challenge = challenges[Math.max(0,lcState.challengeIndex)] || challenges[0];
  if (!challenge) { lcState.view='list'; renderList(container); return; }

  var savedCode = lcState.code[challenge.id] || challenge.starterCode;
  var solved = lcState.solved[challenge.id];
  var idx = challenges.indexOf(challenge);
  var hasPrev = idx>0, hasNext = idx<challenges.length-1;
  var diffLabel = {easy:'Fácil',medium:'Médio',hard:'Difícil'}[challenge.difficulty];
  var langLabel = {javascript:'JavaScript',html:'HTML',css:'CSS',c:'C'}[lcState.lang];

  var html = '<div class="lc-editor-layout">';

  // Left: problem
  html += '<div class="lc-problem-panel">';
  html += '<div class="lc-editor-nav">';
  html += '<button class="lc-back-btn" onclick="lcGoList()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> Desafios</button>';
  html += '<div class="lc-nav-arrows">';
  html += '<button class="lc-arrow-btn" '+(hasPrev?'':'disabled')+' onclick="lcNavChallenge(-1)">‹</button>';
  html += '<span class="lc-nav-pos">'+(idx+1)+' / '+challenges.length+'</span>';
  html += '<button class="lc-arrow-btn" '+(hasNext?'':'disabled')+' onclick="lcNavChallenge(1)">›</button>';
  html += '</div></div>';

  html += '<div class="lc-problem-content">';
  html += '<div class="lc-problem-head">';
  html += '<h2 class="lc-problem-title">'+challenge.title+'</h2>';
  html += '<span class="lc-diff-badge lc-diff-'+challenge.difficulty+'">'+diffLabel+'</span>';
  if (solved) html += '<span class="lc-solved-badge">✓ Resolvido</span>';
  html += '</div>';
  html += '<div class="lc-problem-tags">'+challenge.tags.map(function(t){return'<span class="lc-tag">'+t+'</span>';}).join('')+'</div>';
  html += '<div class="lc-problem-desc">'+challenge.description+'</div>';
  html += '</div>';
  html += '<div class="lc-results" id="lc-results" style="display:none"></div>';
  html += '</div>'; // end problem-panel

  // Right: editor
  html += '<div class="lc-code-panel">';
  html += '<div class="lc-code-toolbar">';
  html += '<span class="lc-lang-badge">'+langLabel+'</span>';
  html += '<div class="lc-code-actions">';
  if (challenge.isC) {
    html += '<button class="lc-btn-external" onclick="lcOpenExternal(\''+challenge.id+'\')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Abrir externo</button>';
  }
  html += '<button class="lc-btn-reset" onclick="lcResetCode(\''+challenge.id+'\')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg> Resetar</button>';
  html += '<button class="lc-btn-run" id="lc-run-btn" onclick="lcRun(\''+challenge.id+'\')">▶ Executar</button>';
  html += '</div></div>';

  html += '<div class="lc-editor-wrap">';
  html += '<div class="lc-line-numbers" id="lc-lines"></div>';
  html += '<textarea class="lc-editor" id="lc-editor" spellcheck="false" autocorrect="off" autocapitalize="off">'+escHtml(savedCode)+'</textarea>';
  html += '</div>';

  if (challenge.isHTML || challenge.isCSS) {
    html += '<div class="lc-preview-wrap">';
    html += '<div class="lc-preview-label"><span>Pré-visualização</span>';
    html += '<button class="lc-preview-refresh" onclick="lcRefreshPreview()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg> Atualizar</button></div>';
    html += '<iframe id="lc-preview" class="lc-preview" sandbox="allow-scripts allow-same-origin"></iframe>';
    html += '</div>';
  }

  html += '</div>'; // end code-panel
  html += '</div>'; // end editor-layout

  container.innerHTML = html;

  // Wire up editor
  setTimeout(function() {
    updateLineNumbers();
    if (challenge.isHTML || challenge.isCSS) lcRefreshPreview();
    var editor = document.getElementById('lc-editor');
    if (editor) {
      editor.addEventListener('keydown', function(e) {
        if (e.key==='Tab') {
          e.preventDefault();
          var s=editor.selectionStart, end=editor.selectionEnd;
          editor.value=editor.value.substring(0,s)+'  '+editor.value.substring(end);
          editor.selectionStart=editor.selectionEnd=s+2;
          lcSaveCode(challenge.id, editor.value);
          updateLineNumbers();
        }
      });
      editor.addEventListener('input', function() {
        lcSaveCode(challenge.id, editor.value);
        updateLineNumbers();
        if (challenge.isHTML || challenge.isCSS) lcRefreshPreview();
      });
      editor.addEventListener('scroll', syncScroll);
    }
  }, 40);
}

function updateLineNumbers() {
  var editor=document.getElementById('lc-editor');
  var lines=document.getElementById('lc-lines');
  if (!editor||!lines) return;
  var count=editor.value.split('\n').length;
  var out='';
  for(var i=1;i<=count;i++) out+='<span>'+i+'</span>';
  lines.innerHTML=out;
}

function syncScroll() {
  var editor=document.getElementById('lc-editor');
  var lines=document.getElementById('lc-lines');
  if(editor&&lines) lines.scrollTop=editor.scrollTop;
}

function lcGoList() {
  lcState.view='list';
  var c=document.getElementById('lc-app');
  if(c) renderList(c);
}
function lcSetLang(lang) {
  lcState.lang=lang; lcState.filter='all'; saveState();
  var c=document.getElementById('lc-app');
  if(c) renderList(c);
}
function lcSetFilter(f) {
  lcState.filter=f;
  var c=document.getElementById('lc-app');
  if(c) renderList(c);
}
function lcNavChallenge(dir) {
  var challenges=LC_CHALLENGES[lcState.lang]||[];
  var ni=Math.max(0,Math.min(challenges.length-1,lcState.challengeIndex+dir));
  lcState.challengeIndex=ni; lcState.view='editor';
  var c=document.getElementById('lc-app');
  if(c) renderEditor(c, challenges[ni]);
}
function lcSaveCode(id, code) { lcState.code[id]=code; saveState(); }
function lcResetCode(id) {
  var all=[].concat(LC_CHALLENGES.javascript,LC_CHALLENGES.html,LC_CHALLENGES.css,LC_CHALLENGES.c);
  var ch=null; for(var i=0;i<all.length;i++){if(all[i].id===id){ch=all[i];break;}}
  if(!ch) return;
  delete lcState.code[id]; saveState();
  var c=document.getElementById('lc-app');
  if(c) renderEditor(c,ch);
}

var _lcPreviewTimer = null;
function lcRefreshPreview() {
  clearTimeout(_lcPreviewTimer);
  _lcPreviewTimer = setTimeout(function() {
    var editor=document.getElementById('lc-editor');
    var preview=document.getElementById('lc-preview');
    if(!editor||!preview) return;
    // Use srcdoc for live preview
    preview.srcdoc = editor.value;
  }, 150);
}

// ─── RUN ──────────────────────────────────────────────────────────────────────
async function lcRun(challengeId) {
  if (lcState.running) return;
  var all=[].concat(LC_CHALLENGES.javascript,LC_CHALLENGES.html,LC_CHALLENGES.css,LC_CHALLENGES.c);
  var challenge=null;
  for(var i=0;i<all.length;i++){if(all[i].id===challengeId){challenge=all[i];break;}}
  if(!challenge) return;

  lcState.running=true;
  var runBtn=document.getElementById('lc-run-btn');
  if(runBtn){runBtn.disabled=true;runBtn.innerHTML='<span class="lc-spinner"></span> Executando...';}

  var editor=document.getElementById('lc-editor');
  var code=editor?editor.value:(lcState.code[challengeId]||challenge.starterCode);
  var results=[];

  try {
    if (challenge.isC) results=await runCChallenge(challenge,code);
    else if (challenge.isHTML || challenge.isCSS) {
      // Refresh live preview too
      lcRefreshPreview();
      results=await runHTMLChallenge(challenge,code);
    }
    else results=runJSChallenge(challenge,code);
  } catch(e) {
    results=[{ok:false,input:'—',expected:'—',got:'Erro interno: '+e.message}];
  }

  lcState.running=false;
  if(runBtn){runBtn.disabled=false;runBtn.innerHTML='▶ Executar';}

  var allPassed=results.length>0&&results.every(function(r){return r.ok;});
  if(allPassed){lcState.solved[challengeId]=true;saveState();}
  showTestResults(results,allPassed);
}

// ─── JS: WEB WORKER LOCAL (100% no navegador, sandbox isolado) ────────────────
function runJSChallenge(challenge, code) {
  return new Promise(function(resolve) {
    // Captura console.log dentro do worker para exibir como output
    var workerSrc = [
      '// Worker sandbox para JS',
      'var _logs = [];',
      'var console = {',
      '  log: function() { _logs.push(Array.prototype.slice.call(arguments).map(String).join(" ")); },',
      '  error: function() { _logs.push("ERROR: " + Array.prototype.slice.call(arguments).map(String).join(" ")); },',
      '  warn: function() { _logs.push("WARN: " + Array.prototype.slice.call(arguments).map(String).join(" ")); },',
      '};',
      'self.onmessage = function(e) {',
      '  var payload = e.data;',
      '  try {',
      '    var fn = new Function(payload.code + "\n\n" + payload.testFn + "\nreturn runTests(" + payload.fnName + ");");',
      '    var results = fn();',
      '    self.postMessage({ ok: true, results: results, logs: _logs });',
      '  } catch(err) {',
      '    self.postMessage({ ok: false, error: err.message, logs: _logs });',
      '  }',
      '};',
    ].join('\n');

    var blob = new Blob([workerSrc], { type: 'application/javascript' });
    var url  = URL.createObjectURL(blob);
    var worker = new Worker(url);
    var timer = setTimeout(function() {
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve([{ ok:false, input:'—', expected:'—', got:'Timeout: execução demorou mais de 5s' }]);
    }, 5000);

    worker.onmessage = function(e) {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      var d = e.data;
      if (!d.ok) {
        resolve([{ ok:false, input:'—', expected:'—', got:'Erro: ' + d.error }]);
      } else {
        resolve(d.results || []);
      }
    };
    worker.onerror = function(e) {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve([{ ok:false, input:'—', expected:'—', got:'Erro no worker: ' + e.message }]);
    };
    worker.postMessage({ code: code, testFn: challenge.testFn, fnName: challenge.fnName });
  });
}

// ─── HTML/CSS: IFRAME LOCAL (100% no navegador) ────────────────────────────────
function runHTMLChallenge(challenge, code) {
  return new Promise(function(resolve) {
    var iframe = document.createElement('iframe');
    // Posição fora da viewport mas ainda "renderizável" para getComputedStyle funcionar
    iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:960px;height:800px;visibility:hidden;pointer-events:none;border:none;';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    document.body.appendChild(iframe);
    var done = false;
    function finish() {
      if (done) return; done = true;
      setTimeout(function() { try { document.body.removeChild(iframe); } catch(e) {} }, 200);
    }
    function check() {
      try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var checks = challenge.checkFn ? challenge.checkFn(doc) : [];
        finish();
        resolve(checks.map(function(c) { return { ok:c.ok, input:'—', expected:c.ok?'✓':'✗', got:c.msg }; }));
      } catch(e) {
        finish();
        resolve([{ ok:false, input:'—', expected:'—', got:'Erro ao verificar: ' + e.message }]);
      }
    }
    iframe.onload = function() { setTimeout(check, 600); };
    iframe.srcdoc = code;
    setTimeout(function() { if (!done) check(); }, 4000);
  });
}

// ─── C: WANDBOX API (gratuita, sem chave, CORS habilitado) ──────────────────
// Wandbox é um compilador online japonês, gratuito e de código aberto.
// Não exige cadastro nem chave de API. CORS liberado para o browser.
async function runCChallenge(challenge, code) {
  var cases = challenge.testCases || [];
  var results = [];
  for (var i = 0; i < cases.length; i++) {
    var tc = cases[i];
    try {
      var output = await executeCWandbox(code, tc.input || '');
      var got      = output.trim().replace(/\r/g, '');
      var expected = (tc.expected || '').trim().replace(/\r/g, '');
      results.push({ ok: got === expected, input: tc.input || '(sem entrada)', expected: expected, got: got });
    } catch(e) {
      results.push({ ok:false, input: tc.input||'—', expected: tc.expected||'—', got: 'Erro: ' + e.message });
    }
  }
  return results;
}

async function executeCWandbox(code, stdin) {
  // Wandbox API: https://wandbox.org/api/compile.json
  // compiler: gcc-head (GCC mais recente), sem necessidade de auth
  var body = JSON.stringify({
    compiler:  'gcc-head',
    code:       code,
    stdin:      stdin || '',
    'compiler-option-raw': '-O0 -lm',
    'save':     false
  });

  var response;
  try {
    response = await fetch('https://wandbox.org/api/compile.json', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body:    body,
    });
  } catch(e) {
    throw new Error('Sem conexão com o compilador Wandbox. Verifique sua internet. ' +
      'Você pode testar o código em: https://wandbox.org');
  }

  if (!response.ok) {
    throw new Error('Wandbox retornou erro HTTP ' + response.status +
      '. Tente abrir em: https://wandbox.org');
  }

  var data = await response.json();

  // Erro de compilação
  if (data.status !== '0' && data['compiler_error']) {
    var errMsg = data['compiler_error'] || 'Erro de compilação desconhecido';
    // Limpar mensagens longas do GCC para exibição mais amigável
    var lines = errMsg.split('\n').filter(function(l) { return l.trim(); }).slice(0, 6);
    throw new Error('Erro de compilação:\n' + lines.join('\n'));
  }

  // Retorna stdout (program_output) ou string vazia
  return data['program_output'] || data['program_error'] || '';
}

// ─── EXTERNAL FALLBACKS ──────────────────────────────────────────────────────
function lcOpenExternal(challengeId) {
  var all = [].concat(LC_CHALLENGES.javascript, LC_CHALLENGES.html, LC_CHALLENGES.css, LC_CHALLENGES.c);
  var ch = null;
  for (var i=0;i<all.length;i++) { if (all[i].id===challengeId){ch=all[i];break;} }
  var editor = document.getElementById('lc-editor');
  var code = editor ? editor.value : (ch ? ch.starterCode : '');

  // Build a small menu with external options
  var existing = document.getElementById('lc-external-menu');
  if (existing) { existing.remove(); return; }

  var options = [
    { name:'Wandbox (GCC online)', url:'https://wandbox.org/', note:'Cole o código lá', icon:'🔧' },
    { name:'Godbolt (Compiler Explorer)', url:'https://godbolt.org/', note:'Visualize assembly + output', icon:'⚙️' },
    { name:'OnlineGDB', url:'https://www.onlinegdb.com/online_c_compiler', note:'IDE completa online', icon:'🐛' },
    { name:'Ideone', url:'https://ideone.com/', note:'Simples e rápido', icon:'💡' },
  ];

  var menu = document.createElement('div');
  menu.id = 'lc-external-menu';
  menu.className = 'lc-external-menu';
  menu.innerHTML = '<div class="lc-ext-title"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Compiladores externos</div>' +
    '<div class="lc-ext-hint">O código abaixo foi copiado para a área de transferência.</div>' +
    options.map(function(o) {
      return '<a href="'+o.url+'" target="_blank" rel="noopener" class="lc-ext-option">'+
        '<span class="lc-ext-icon">'+o.icon+'</span>'+
        '<span class="lc-ext-info"><strong>'+o.name+'</strong><small>'+o.note+'</small></span>'+
        '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'+
        '</a>';
    }).join('') +
    '<button class="lc-ext-close" onclick="document.getElementById(\'lc-external-menu\').remove()">Fechar</button>';

  // Copy code to clipboard
  try { navigator.clipboard.writeText(code); } catch(e) {}

  // Position below the toolbar
  var toolbar = document.querySelector('.lc-code-toolbar');
  if (toolbar) {
    toolbar.style.position = 'relative';
    toolbar.appendChild(menu);
  } else {
    document.getElementById('lc-app').appendChild(menu);
  }

  // Close on outside click
  setTimeout(function() {
    document.addEventListener('click', function handler(e) {
      if (menu && !menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 100);
}

function showTestResults(results,allPassed) {
  var panel=document.getElementById('lc-results');
  if(!panel) return;
  panel.style.display='block';
  var passCount=results.filter(function(r){return r.ok;}).length;
  var html='<div class="lc-results-header '+(allPassed?'lc-results-pass':'lc-results-fail')+'">';
  html+='<span class="lc-results-icon">'+(allPassed?'🎉':'❌')+'</span>';
  html+='<span class="lc-results-summary">'+(allPassed?'Todos os testes passaram!':passCount+'/'+results.length+' testes passaram')+'</span>';
  if(allPassed) html+='<span class="lc-badge-solved">✓ Resolvido</span>';
  html+='</div><div class="lc-test-cases">';
  results.forEach(function(r,i) {
    html+='<div class="lc-test-case '+(r.ok?'lc-test-pass':'lc-test-fail')+'">';
    html+='<div class="lc-test-header"><span class="lc-test-icon">'+(r.ok?'✓':'✗')+'</span>';
    html+='<span class="lc-test-label">Caso '+(i+1)+'</span>';
    if(r.input&&r.input!=='—') html+='<span class="lc-test-input">entrada: <code>'+escHtml(String(r.input))+'</code></span>';
    html+='</div>';
    if(!r.ok) {
      html+='<div class="lc-test-detail">';
      html+='<div><span class="lc-test-key">Esperado:</span> <code>'+escHtml(String(r.expected))+'</code></div>';
      html+='<div><span class="lc-test-key">Obtido:</span> <code class="lc-got-wrong">'+escHtml(String(r.got))+'</code></div>';
      html+='</div>';
    } else if(r.got&&r.got!=='✓') {
      html+='<div class="lc-test-detail"><span class="lc-test-key">OK: </span><code>'+escHtml(String(r.got))+'</code></div>';
    }
    html+='</div>';
  });
  html+='</div>';
  panel.innerHTML=html;
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
