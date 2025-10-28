## Atividade 3 – O Roubo do Diamante do Amanhecer

Aplicação web em Next.js para investigar um caso fictício de roubo no museu. A interface permite executar consultas SQL somente-SELECT sobre um banco MySQL com tabelas de funcionários, salas, obras, acessos, movimentações e depoimentos. As consultas são enviadas para a rota `POST /api/query`, que valida e executa o SQL via Prisma.

### Principais pacotes
- **Next.js 16**: framework React para web/app router
- **React 19 / React DOM 19**: biblioteca de UI
- **Prisma 6** e **@prisma/client 6**: ORM e cliente gerado
- **TypeScript 5**: tipagem estática
- **Tailwind CSS 4**: utilitários de estilo (classes já usadas na UI)
- **dotenv 17**: gerenciamento de variáveis de ambiente

## Pré‑requisitos
- **Node.js 18+** e **npm**
- **MySQL 8+** em execução (local ou remoto)

## Configuração e uso
1. **Ambientação**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   Crie um arquivo `.env` na raiz com a variável `DATABASE_URL` apontando para seu MySQL/PostGRES:
   ```dotenv
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   ```
   Em prisma/schema.prisma, altere o 'provider' para seu SGBD de preferência (MySQL é o padrão)

5. **Executar o servidor**
   ```bash
   npm run dev
   # http://localhost:3000
   ```

### Como usar
- Na página inicial (`/`), escreva uma consulta SELECT simples e clique em "Executar".
- Restrições de segurança (aplicadas na API):
  - Apenas comandos que iniciam com `SELECT` são aceitos
  - Sem `;`, comentários (`--`, `/* */`) ou `UNION`
  - Palavras como `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, etc. são bloqueadas

#### Exemplo de chamada à API
```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"SELECT * FROM funcionarios"}'
```

## Estrutura relevante
- `app/page.tsx`: interface para escrever e executar consultas
- `app/api/query/route.ts`: endpoint que valida e executa SELECT via Prisma
- `lib/prisma.ts`: inicialização do Prisma Client
- `prisma/schema.prisma`: modelo e datasource (MySQL)
- `prisma.config.ts`: configuração do Prisma CLI
- `app/generated/prisma/*`: cliente Prisma gerado (não editar manualmente)
- `public/diamante.png`: imagem usada na página

## Scripts úteis
- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção
- `npm run start`: inicia build de produção

