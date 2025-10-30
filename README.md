## O Roubo do Diamante do Amanhecer

Aplicação web em Next.js para investigar um caso fictício de roubo no museu. A interface permite executar consultas SQL somente-SELECT sobre um banco MySQL com tabelas de funcionários, salas, obras, acessos, movimentações e depoimentos. As consultas são enviadas para a rota `POST /api/query`, que valida e executa o SQL diretamente via `mysql2` (sem Prisma).

### Principais pacotes
- **Next.js 16**: framework React para web/app router
- **React 19 / React DOM 19**: biblioteca de UI
- **mysql2 3**: driver MySQL para Node.js (modo promise)
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
   Crie um arquivo `.env` na raiz com a variável `DATABASE_URL` apontando para seu MySQL:
   ```dotenv
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   ```
   O driver `mysql2` utiliza esta URL para abrir o pool de conexões.

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
- `app/api/query/route.ts`: endpoint que valida e executa SELECT via `mysql2`
- `lib/db.ts`: pool de conexão e helper de consulta SQL sem Prisma
- `public/diamante.png`: imagem usada na página

## Scripts úteis
- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção
- `npm run start`: inicia build de produção

