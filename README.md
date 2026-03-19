# DaSIboard — TypeScript + Vite

## Estrutura do projeto

```
dasiboard-ts/
├── src/ts/          # Código TypeScript (todos os módulos)
│   ├── main.ts      # Entry point do index.html
│   ├── main-login.ts# Entry point do login/signup
│   ├── main-profile.ts
│   ├── firebase-config.ts  # Firebase v10 modular (com tipos)
│   ├── auth.ts      # Sistema de autenticação
│   ├── utils.ts     # Utilitários globais
│   └── *.ts         # Demais módulos
├── public/          # Arquivos estáticos (CSS, data, assets)
│   ├── css/
│   ├── data/
│   ├── assets/
│   └── sw.js
├── index.html       # Página principal
├── login.html
├── signup.html
├── profile.html
├── vite.config.ts   # Configuração do Vite
├── tsconfig.json    # Configuração do TypeScript
└── package.json
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build para produção

```bash
npm run build
# Output em: dist/
```

## Deploy no DigitalOcean

Configure o App Platform com:

| Campo | Valor |
|---|---|
| **Build Command** | `npm install && npm run build` |
| **Output Directory** | `dist` |
| **Node Version** | `20` |

## Firebase

O projeto usa Firebase v10 (modular SDK) com:
- **Authentication** — Email/Senha
- **Firestore** — Perfis de usuário
- **Storage** — Fotos de perfil

Veja `FIREBASE_SETUP.md` para configuração completa.
