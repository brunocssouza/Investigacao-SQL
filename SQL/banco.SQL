--
-- Estrutura para tabela `vencedores`
--
DROP TABLE IF EXISTS `vencedores`;

CREATE TABLE vencedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  dificuldade TEXT,
  senac TEXT
);


INSERT INTO
  `vencedores` (`nome`, `sobrenome`, `dificuldade`, `senac`)
VALUES
  (
    'Jair',
    'Barbosa',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Alessandro',
    'Santos',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Kaua',
    'Barros',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Inácio',
    'Keiber',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Matheus',
    'Giaretta',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Emanuelle',
    'Prestes',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Carlos',
    'Veber',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Marcos',
    'Noll',
    'Detetive Novato',
    'Santo Ângelo'
  ),
  (
    'Joao',
    'Faganello',
    'Detetive Novato',
    'Santo Ângelo'
  );

--
-- Estrutura para tabela `depoimento_culpado`
--
DROP TABLE IF EXISTS `depoimento_culpado`;

CREATE TABLE `depoimento_culpado` (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  `relato` varchar(255) NOT NULL
);

INSERT INTO
  `depoimento_culpado` (`id`, `relato`)
VALUES
  (
    1,
    'Perdão! Sim... sim! Foi eu... mas eu precisava do dinheiro que me prometeram! E se eu te ajudar? Sempre a pessoa usava sintetizador de voz, então não sei exatamente se era homem ou mulher. Mas tenho certeza que é um funcionário daqui pelo tanto que parecia saber sobre o lugar. Eu realmente não sei te informar mais que isso! Nossas conversas sempre '
  );

--
-- Estrutura para tabela `depoimento_culpado`
--
DROP TABLE IF EXISTS `credenciais`;

CREATE TABLE `credenciais` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `senha` varchar(255) NOT NULL
) ;

INSERT INTO
  `credenciais` (`id`, `senha`)
VALUES
  (
    1,
    '$2a$12$DgXBwkt31DRk7pgTQejLKexQVHHbeWKa7U2d4lJ5kUoBb35r6giZS'
  );

--
-- Estrutura para tabela `acessos`
--
DROP TABLE IF EXISTS `acessos`;

CREATE TABLE `acessos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `data` char(10) NOT NULL,
  `entrada` char(5) NOT NULL,
  `saida` char(5) NOT NULL,
  `funcionario_id` INTEGER NOT NULL,
  `sala_id` INTEGER NOT NULL
) ;

--
-- Fazendo dump de dados para tabela `acessos`
--
INSERT INTO
  `acessos` (
    `id`,
    `data`,
    `entrada`,
    `saida`,
    `funcionario_id`,
    `sala_id`
  )
VALUES
  (1, '15-09-2025', '01:45', '02:15', 1, 1),
  (2, '15-09-2025', '02:05', '02:40', 3, 1),
  (3, '15-09-2025', '01:30', '02:55', 9, 1),
  (4, '15-09-2025', '02:10', '02:50', 30, 1),
  (5, '15-09-2025', '02:00', '02:20', 23, 1),
  (6, '15-09-2025', '02:00', '02:58', 7, 5),
  (7, '15-09-2025', '09:00', '09:30', 10, 3),
  (8, '15-09-2025', '08:00', '08:30', 4, 2),
  (9, '14-09-2025', '18:00', '18:30', 2, 1),
  (10, '15-09-2025', '02:05', '02:25', 5, 1),
  (11, '14-09-2025', '10:00', '12:00', 11, 5),
  (12, '14-09-2025', '11:00', '13:00', 12, 3),
  (13, '13-09-2025', '09:00', '11:00', 13, 2),
  (14, '13-09-2025', '14:00', '15:30', 14, 4),
  (15, '12-09-2025', '08:30', '09:30', 15, 5),
  (16, '12-09-2025', '07:00', '08:00', 16, 4),
  (17, '11-09-2025', '10:30', '12:30', 17, 2),
  (18, '11-09-2025', '13:00', '14:00', 18, 5),
  (19, '10-09-2025', '09:15', '10:15', 19, 3),
  (20, '10-09-2025', '16:00', '17:00', 20, 1);

-- --------------------------------------------------------
--
-- Estrutura para tabela `depoimentos`
--
DROP TABLE IF EXISTS `depoimentos`;

CREATE TABLE `depoimentos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `relato` text NOT NULL,
  `data` char(10) NOT NULL,
  `hora` char(5) NOT NULL,
  `funcionario_id` INTEGER NOT NULL
) ;

--
-- Fazendo dump de dados para tabela `depoimentos`
--
INSERT INTO
  `depoimentos` (`id`, `relato`, `data`, `hora`, `funcionario_id`)
VALUES
  (
    1,
    'Ronda às duas. Notei Júlio próximo à Sala de Tesouros. Estranho.',
    '15-09-2025',
    '08:00',
    1
  ),
  (
    2,
    'Nenhum problema ontem, revisei as peças no fim da tarde.',
    '15-09-2025',
    '08:05',
    2
  ),
  (
    3,
    'Tenho certeza que foi o Ricardo!',
    '15-09-2025',
    '08:10',
    3
  ),
  (
    4,
    'Cheguei às 08:00, porta da Sala de Tesouros entreaberta.',
    '15-09-2025',
    '08:20',
    4
  ),
  (
    5,
    'Marina avisou do sumiço, fui confirmar o diamante.',
    '15-09-2025',
    '08:25',
    5
  ),
  (
    6,
    'Acredita em mim! Eu vi quem roubou! Sou novo aqui, então não sei o nome de todo mundo. Mas era um homem!',
    '15-09-2025',
    '08:35',
    7
  ),
  (
    7,
    'Revisei relatórios e notei acessos fora de hora.',
    '15-09-2025',
    '08:40',
    8
  ),
  (
    8,
    'Fiz ronda às 01:40 e deixei o local seguro.',
    '15-09-2025',
    '08:45',
    9
  ),
  (
    9,
    'Ouvi que o técnico estava nervoso antes do turno.',
    '15-09-2025',
    '09:00',
    10
  ),
  (
    11,
    'Atendi visitantes pela manhã.',
    '14-09-2025',
    '12:10',
    11
  ),
  (
    12,
    'Ajuste sonoro na Sala Moderna.',
    '14-09-2025',
    '13:15',
    12
  ),
  (
    13,
    'Oficina educativa para crianças.',
    '13-09-2025',
    '11:10',
    13
  ),
  (
    14,
    'Treinamento durante o dia.',
    '13-09-2025',
    '15:40',
    14
  ),
  (
    15,
    'Atualizei planilhas administrativas.',
    '12-09-2025',
    '09:45',
    15
  ),
  (
    16,
    'Entreguei materiais ao depósito cedo.',
    '12-09-2025',
    '08:05',
    16
  ),
  (
    17,
    'Apoiei equipe de educação na visita.',
    '11-09-2025',
    '12:35',
    17
  ),
  (
    18,
    'Fiz poda e manutenção externa.',
    '11-09-2025',
    '14:20',
    18
  ),
  (
    19,
    'Organizei arquivos históricos.',
    '10-09-2025',
    '10:25',
    19
  ),
  (
    20,
    'Resolvi chamados de TI pela manhã.',
    '10-09-2025',
    '17:05',
    20
  ),
  (
    23,
    'Não tenho muita informação. Mas sei que o Ricardo tem uma richa com o Júlio. Sempre contam mentira um do outro',
    '15-09-2025',
    '09:20',
    5
  ),
  (
    24,
    'Um outro funcionário viu o mesmo que eu! O ladrão era algum tipo de Técnico!',
    '15-09-2025',
    '09:25',
    3
  ),
  (
    25,
    'Não vi nada fora do extraordinário.',
    '15-09-2025',
    '09:30',
    30
  ),
  (
    26,
    'Ronda feita, mas horário pode estar errado.',
    '15-09-2025',
    '09:35',
    23
  ),
  (
    27,
    'Vi movimentação estranha perto do depósito.',
    '15-09-2025',
    '09:40',
    4
  ),
  (
    28,
    'Me contaram que reconheceram o culpado como alguém que normalmente trabalha na Galeria.',
    '15-09-2025',
    '09:45',
    7
  ),
  (
    29,
    'O furto ocorreu entre 02:00 e 03:00 da manhã',
    '15-09-2025',
    '09:50',
    8
  ),
  (
    30,
    'Não lembro de ter visto nada de estranho.',
    '15-09-2025',
    '09:55',
    9
  );

-- --------------------------------------------------------
--
-- Estrutura para tabela `funcionarios`
--
DROP TABLE IF EXISTS `funcionarios`;

CREATE TABLE `funcionarios` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `cpf` varchar(14) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cargo` varchar(50) NOT NULL
) ;

--
-- Fazendo dump de dados para tabela `funcionarios`
--
INSERT INTO
  `funcionarios` (`id`, `cpf`, `nome`, `cargo`)
VALUES
  (
    1,
    '847.392.561-04',
    'Ricardo Mendes',
    'Segurança Noturno'
  ),
  (
    2,
    '295.710.683-22',
    'Fernanda Alves',
    'Curadora de Joias'
  ),
  (
    3,
    '163.589.742-37',
    'Júlio Barreto',
    'Técnico de Manutenção'
  ),
  (
    4,
    '502.841.973-90',
    'Marina Castro',
    'Assistente de Exposição'
  ),
  (
    5,
    '781.364.209-55',
    'Paulo Moreira',
    'Conservador de Arte'
  ),
  (
    6,
    '439.218.657-18',
    'Cláudia Freitas',
    'Auxiliar de Limpeza'
  ),
  (
    7,
    '964.705.132-70',
    'Roberto Nunes',
    'Vigia Externo'
  ),
  (
    8,
    '128.547.690-03',
    'Helena Duarte',
    'Gerente do Museu'
  ),
  (
    9,
    '671.230.985-49',
    'Sérgio Tavares',
    'Segurança Interno'
  ),
  (
    10,
    '370.952.816-21',
    'Carolina Lopes',
    'Restauradora'
  ),
  (11, '853.419.207-68', 'Valéria Pinto', 'Recepção'),
  (
    12,
    '214.876.930-52',
    'Célio Andrade',
    'Técnico de Som'
  ),
  (
    13,
    '507.693.184-95',
    'Márcia Oliveira',
    'Educadora'
  ),
  (
    14,
    '196.840.572-39',
    'Hugo Santana',
    'Estagiário'
  ),
  (
    15,
    '780.132.946-10',
    'Lívia Gomes',
    'Auxiliar Administrativo'
  ),
  (
    16,
    '945.367.120-84',
    'Emanuel Souza',
    'Motorista'
  ),
  (
    17,
    '539.621.478-07',
    'Débora Reis',
    'Atendimento ao Público'
  ),
  (
    18,
    '672.903.541-26',
    'Otávio Silva',
    'Jardineiro'
  ),
  (
    19,
    '408.176.259-13',
    'Patrícia Nunes',
    'Arquivo / Documentação'
  ),
  (
    20,
    '359.814.702-65',
    'André Lopes',
    'Suporte de TI'
  ),
  (
    21,
    '312.654.987-40',
    'Sandro Lima',
    'Auxiliar Técnico'
  ),
  (
    22,
    '904.213.578-11',
    'Tatiane Rocha',
    'Curadora Assistente'
  ),
  (
    23,
    '175.938.462-90',
    'Rodrigo Mendes',
    'Segurança Noturno'
  ),
  (
    24,
    '631.485.720-33',
    'Daniela Costa',
    'Educadora'
  ),
  (
    25,
    '590.327.148-92',
    'Leonardo Pinto',
    'Estagiário'
  ),
  (
    26,
    '732.614.890-57',
    'Marcos Silva',
    'Conservador'
  ),
  (
    27,
    '214.789.563-08',
    'Camila Ribeiro',
    'Auxiliar Limpeza'
  ),
  (
    28,
    '847.302.619-14',
    'Fernando Alves',
    'Vigia Externo'
  ),
  (
    29,
    '910.547.382-60',
    'Juliana Faria',
    'Curadora de Arte'
  ),
  (
    30,
    '472.618.903-75',
    'Hugo Martins',
    'Técnico de Manutenção'
  ),
  (31, '301.895.476-23', 'Renata Dias', 'Recepção'),
  (
    32,
    '683.140.259-12',
    'Paulo César',
    'Segurança Interno'
  ),
  (
    33,
    '518.274.903-84',
    'Adriana Melo',
    'Auxiliar Administrativo'
  ),
  (
    34,
    '761.309.482-09',
    'Gabriel Souza',
    'Motorista'
  ),
  (
    35,
    '429.871.305-61',
    'Tatiana Lopes',
    'Assistente de Exposição'
  ),
  (
    36,
    '894.217.630-47',
    'Rafael Martins',
    'Educador'
  ),
  (
    37,
    '567.892.413-20',
    'Luciana Gomes',
    'Curadora de Joias'
  ),
  (
    38,
    '230.648.791-38',
    'Hélio Fernandes',
    'Auxiliar Técnico'
  ),
  (
    39,
    '615.472.309-55',
    'Mariana Lima',
    'Atendimento ao Público'
  ),
  (
    40,
    '781.394.025-12',
    'Diego Alves',
    'Segurança Noturno'
  );

-- --------------------------------------------------------
--
-- Estrutura para tabela `movimentacoes`
--
DROP TABLE IF EXISTS `movimentacoes`;

CREATE TABLE `movimentacoes` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `data` char(10) NOT NULL,
  `hora` char(5) NOT NULL,
  `descricao` varchar(50) NOT NULL,
  `obra_id` INTEGER NOT NULL,
  `sala_origem` INTEGER NOT NULL,
  `sala_destino` INTEGER DEFAULT NULL
) ;

--
-- Fazendo dump de dados para tabela `movimentacoes`
--
INSERT INTO
  `movimentacoes` (
    `id`,
    `data`,
    `hora`,
    `descricao`,
    `obra_id`,
    `sala_origem`,
    `sala_destino`
  )
VALUES
  (
    1,
    '15-09-2025',
    '02:25',
    'Destino não informado',
    1,
    1,
    NULL
  ),
  (
    2,
    '14-09-2025',
    '17:30',
    'Checagem de exposição',
    2,
    2,
    2
  ),
  (
    3,
    '15-09-2025',
    '08:15',
    'Inspeção de conservação',
    3,
    3,
    3
  ),
  (
    4,
    '14-09-2025',
    '14:00',
    'Verificação de segurança',
    4,
    1,
    1
  ),
  (
    5,
    '15-09-2025',
    '09:00',
    'Revisão visual',
    5,
    2,
    2
  ),
  (
    6,
    '14-09-2025',
    '10:20',
    'Checagem rotineira',
    6,
    6,
    6
  ),
  (
    7,
    '13-09-2025',
    '09:40',
    'Inspeção visual',
    7,
    3,
    3
  ),
  (8, '12-09-2025', '11:10', 'Verificação', 8, 1, 1),
  (
    9,
    '11-09-2025',
    '14:00',
    'Movimentação normal',
    9,
    1,
    1
  ),
  (
    10,
    '10-09-2025',
    '16:30',
    'Transporte interno',
    10,
    2,
    2
  ),
  (
    11,
    '13-09-2025',
    '15:30',
    'Inspeção artística',
    11,
    2,
    2
  ),
  (
    12,
    '12-09-2025',
    '10:45',
    'Checagem documental',
    12,
    3,
    3
  );

-- --------------------------------------------------------
--
-- Estrutura para tabela `obras`
--
DROP TABLE IF EXISTS `obras`;

CREATE TABLE `obras` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nome` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `sala_id` INTEGER NOT NULL
) ;

--
-- Fazendo dump de dados para tabela `obras`
--
INSERT INTO
  `obras` (`id`, `nome`, `tipo`, `sala_id`)
VALUES
  (1, 'Diamante do Amanhecer', 'Joia', 1),
  (2, 'Trono de Mármore', 'Escultura', 2),
  (3, 'Horizonte Perdido', 'Pintura', 3),
  (4, 'Relógio Dourado', 'Antiguidade', 1),
  (5, 'Máscara Maia', 'Artefato', 2),
  (6, 'Escultura de Bronze', 'Escultura', 6),
  (7, 'Pintura Estelar', 'Pintura', 3),
  (8, 'Candelabro Antigo', 'Antiguidade', 1),
  (9, 'Relicário da Rainha', 'Joia', 1),
  (10, 'Vaso Chines', 'Artefato', 2),
  (11, 'Estátua de Vênus', 'Escultura', 2),
  (12, 'Tábua Egípcia', 'Artefato', 3);

-- --------------------------------------------------------
--
-- Estrutura para tabela `permissoes`
--
DROP TABLE IF EXISTS `permissoes`;

CREATE TABLE `permissoes` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `funcionario_id` INTEGER NOT NULL,
  `sala_id` INTEGER NOT NULL
) ;

--
-- Fazendo dump de dados para tabela `permissoes`
--
INSERT INTO
  `permissoes` (`id`, `funcionario_id`, `sala_id`)
VALUES
  (80, 1, 1),
  (81, 7, 5),
  (82, 11, 5),
  (83, 14, 4),
  (84, 24, 3),
  (85, 29, 2),
  (86, 36, 2),
  (87, 38, 4),
  (88, 2, 2),
  (89, 2, 1),
  (90, 3, 1),
  (91, 3, 4),
  (92, 4, 2),
  (93, 4, 5),
  (94, 5, 1),
  (95, 5, 3),
  (96, 6, 4),
  (97, 6, 5),
  (98, 9, 1),
  (99, 9, 5),
  (100, 10, 3),
  (101, 10, 6),
  (102, 12, 3),
  (103, 13, 2),
  (104, 15, 5),
  (105, 16, 4),
  (106, 17, 2),
  (107, 17, 5),
  (108, 18, 5),
  (109, 18, 6),
  (110, 19, 3),
  (111, 19, 4),
  (112, 20, 1),
  (113, 20, 4),
  (114, 21, 4),
  (115, 21, 2),
  (116, 21, 6),
  (117, 22, 2),
  (118, 22, 3),
  (119, 22, 5),
  (120, 23, 1),
  (121, 23, 5),
  (122, 23, 2),
  (123, 25, 3),
  (124, 25, 1),
  (125, 25, 4),
  (126, 26, 2),
  (127, 26, 3),
  (128, 26, 1),
  (129, 27, 4),
  (130, 27, 2),
  (131, 27, 5),
  (132, 30, 1),
  (133, 30, 4),
  (134, 30, 6),
  (135, 32, 1),
  (136, 32, 5),
  (137, 32, 3),
  (138, 33, 5),
  (139, 33, 2),
  (140, 33, 4),
  (141, 35, 2),
  (142, 35, 3),
  (143, 35, 6),
  (144, 37, 1),
  (145, 37, 2),
  (146, 37, 3),
  (147, 8, 1),
  (148, 8, 2),
  (149, 8, 3),
  (150, 8, 4),
  (151, 8, 5),
  (152, 8, 6),
  (153, 40, 1),
  (154, 40, 2),
  (155, 40, 3),
  (156, 40, 4),
  (157, 40, 5),
  (158, 40, 6);

-- --------------------------------------------------------
--
-- Estrutura para tabela `salas`
--
DROP TABLE IF EXISTS `salas`;

CREATE TABLE `salas` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nome` varchar(50) NOT NULL,
  `localizacao` varchar(50) NOT NULL
) ;

--
-- Fazendo dump de dados para tabela `salas`
--
INSERT INTO
  `salas` (`id`, `nome`, `localizacao`)
VALUES
  (1, 'Sala de Tesouros', 'Subsolo'),
  (2, 'Galeria Antiga', 'Térreo'),
  (3, 'Sala Moderna', '1º Andar'),
  (4, 'Depósito Técnico', 'Subsolo'),
  (5, 'Hall Principal', 'Entrada'),
  (6, 'Galeria Contemporânea', '2º Andar');

-- Índices (compatível com SQLite/libSQL)
CREATE INDEX IF NOT EXISTS `fk_acessos_funcionarios1_idx` ON `acessos` (`funcionario_id`);
CREATE INDEX IF NOT EXISTS `fk_acessos_salas1_idx` ON `acessos` (`sala_id`);

-- Índices de tabela `depoimentos`
CREATE INDEX IF NOT EXISTS `fk_depoimentos_funcionarios1_idx` ON `depoimentos` (`funcionario_id`);

-- Índices de tabela `movimentacoes`
CREATE INDEX IF NOT EXISTS `fk_movimentacoes_obras1_idx` ON `movimentacoes` (`obra_id`);
CREATE INDEX IF NOT EXISTS `fk_movimentacoes_salas1_idx` ON `movimentacoes` (`sala_origem`);
CREATE INDEX IF NOT EXISTS `fk_movimentacoes_salas2_idx` ON `movimentacoes` (`sala_destino`);

-- Índices de tabela `obras`
CREATE INDEX IF NOT EXISTS `fk_obras_salas1_idx` ON `obras` (`sala_id`);

-- Índices de tabela `permissoes`
CREATE INDEX IF NOT EXISTS `fk_permissoes_funcionarios_idx` ON `permissoes` (`funcionario_id`);
CREATE INDEX IF NOT EXISTS `fk_permissoes_salas1_idx` ON `permissoes` (`sala_id`);
