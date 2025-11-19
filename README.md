## O Roubo do Diamante do Amanhecer

Aplicação web em Next.js (App Router) para investigar um caso fictício de roubo no museu. A interface permite executar consultas SQL somente‑SELECT sobre um banco compatível com libSQL/Turso.

### Principais pacotes
- Next.js (App Router)
- React / React DOM
- TypeScript
- Tailwind CSS
- libSQL client (`@libsql/client`)
- dotenv

## Pré‑requisitos
- **Node.js 18+** e **npm**
- Banco libSQL/Turso (ou libsql local)

## Configuração e uso
1. **Ambientação**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   Crie um arquivo `.env` na raiz com as variáveis abaixo:
   ```dotenv
   # URL do banco libSQL/Turso (obrigatório)
   DATABASE_URL="libsql://<sua-instancia>.turso.io"

   # Token de autenticação do Turso (se necessário para sua instância)
   TURSO_AUTH_TOKEN="seu_token_opcional"

   # Nome do culpado (texto simples) para validação em /api/accuse
   # Valor padrão, se ausente: "Hugo Martins"
   CULPRIT_NAME="Hugo Martins"

   # Senha de administrador (texto simples) para login em /admin
   ADMIN_PASSWORD="sua_senha_segura"
   ```

5. **Executar o servidor**
   ```bash
   npm run dev
   # http://localhost:3000
   ```

### Como usar (UI)
- Introdução: escolha a dificuldade e inicie o jogo.
- Navegação (botões flutuantes): alterna entre
  - Introdução (Jornal/Informações)
  - Bloco de Anotações
  - Consultas (console + exemplos)
- Consultas: apenas SELECT simples. A execução chama `POST /api/query`.
- “Acusar um Suspeito”: chama `POST /api/accuse`, comparando o nome (minúsculas) com `CULPRIT_NAME`.

#### Restrições de segurança (aplicadas na API de consultas)
- Somente comandos que iniciam com `SELECT`
- Bloqueio de `;`, comentários (`--`, `/* */`) e `UNION`
- Palavras como `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, etc. são bloqueadas

#### Exemplo de chamada à API
```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"SELECT * FROM funcionarios"}'
```

## Estrutura relevante
- `app/page.tsx`: alterna entre Introdução e Game
- `components/Game.tsx`: exibe uma seção por vez (sem carrossel), com navegação por botões
- `app/api/query/route.ts`: valida e executa SELECT via libSQL (`queryRaw`)
- `app/api/accuse/route.ts`: compara nome com `CULPRIT_NAME`
- `app/api/winners/route.ts`: lista vencedores
- `app/api/admin/*`: endpoints administrativos
- `lib/db.ts`: cliente libSQL e helpers (`queryRaw`, `execute`) usando `DATABASE_URL` (+ `TURSO_AUTH_TOKEN` quando necessário)

## Área Administrativa
- Login em `/admin` com senha definida em `ADMIN_PASSWORD` (texto simples).
- Em caso de sucesso o backend define o cookie `admin_auth=1` (httpOnly).
- O middleware (`middleware.ts`) protege `/admin/crud` e `/api/admin/*` e exige esse cookie.

## Scripts úteis
- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção
- `npm run start`: inicia o build de produção

## Notas
- O projeto não usa Prisma. Existe um artefato gerado em `app/generated/prisma` que não é utilizado pela aplicação.
