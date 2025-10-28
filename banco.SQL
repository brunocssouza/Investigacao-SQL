-- ================================
-- BANCO DE DADOS: roubo_diamante
-- ================================

DROP DATABASE IF EXISTS roubo_diamante;
CREATE DATABASE roubo_diamante;
USE roubo_diamante;

-- ================================
-- TABELA FUNCIONARIOS
-- ================================
CREATE TABLE funcionarios (
    id INT PRIMARY KEY,
    cpf VARCHAR(14),
    nome VARCHAR(50),
    cargo VARCHAR(50)
);

INSERT INTO funcionarios (id, cpf, nome, cargo) VALUES
(1, '847.392.561-04', 'Ricardo Mendes', 'Segurança Noturno'),
(2, '295.710.683-22', 'Fernanda Alves', 'Curadora de Joias'),
(3, '163.589.742-37', 'Júlio Barreto', 'Técnico de Manutenção'),
(4, '502.841.973-90', 'Marina Castro', 'Assistente de Exposição'),
(5, '781.364.209-55', 'Paulo Moreira', 'Conservador de Arte'),
(6, '439.218.657-18', 'Cláudia Freitas', 'Auxiliar de Limpeza'),
(7, '964.705.132-70', 'Roberto Nunes', 'Vigia Externo'),
(8, '128.547.690-03', 'Helena Duarte', 'Gerente do Museu'),
(9, '671.230.985-49', 'Sérgio Tavares', 'Segurança Interno'),
(10, '370.952.816-21', 'Carolina Lopes', 'Restauradora'),
(11, '853.419.207-68', 'Valéria Pinto', 'Recepção'),
(12, '214.876.930-52', 'Célio Andrade', 'Técnico de Som'),
(13, '507.693.184-95', 'Márcia Oliveira', 'Educadora'),
(14, '196.840.572-39', 'Hugo Santana', 'Estagiário'),
(15, '780.132.946-10', 'Lívia Gomes', 'Auxiliar Administrativo'),
(16, '945.367.120-84', 'Emanuel Souza', 'Motorista'),
(17, '539.621.478-07', 'Débora Reis', 'Atendimento ao Público'),
(18, '672.903.541-26', 'Otávio Silva', 'Jardineiro'),
(19, '408.176.259-13', 'Patrícia Nunes', 'Arquivo / Documentação'),
(20, '359.814.702-65', 'André Lopes', 'Suporte de TI');


-- ================================
-- TABELA SALAS
-- ================================
CREATE TABLE salas (
    id INT PRIMARY KEY,
    nome VARCHAR(50),
    localizacao VARCHAR(50)
);

INSERT INTO salas (id, nome, localizacao) VALUES
(1, 'Sala de Tesouros', 'Subsolo'),
(2, 'Galeria Antiga', 'Térreo'),
(3, 'Sala Moderna', '1º Andar'),
(4, 'Depósito Técnico', 'Subsolo'),
(5, 'Hall Principal', 'Entrada');

-- ================================
-- TABELA OBRAS (inclui o diamante)
-- ================================
CREATE TABLE obras (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    tipo VARCHAR(50),
    sala_id INT
);

INSERT INTO obras (id, nome, tipo, sala_id) VALUES
(1, 'Diamante do Amanhecer', 'Joia', 1),
(2, 'Trono de Mármore', 'Escultura', 2),
(3, 'Horizonte Perdido', 'Pintura', 3),
(4, 'Relógio Dourado', 'Antiguidade', 1),
(5, 'Máscara Maia', 'Artefato', 2);

-- ================================
-- TABELA ACESSOS
-- ================================
CREATE TABLE acessos (
    id INT PRIMARY KEY,
    funcionario_id INT,
    sala_id INT,
    data DATE,
    hora_entrada TIME,
    hora_saida TIME
);

INSERT INTO acessos (id, funcionario_id, sala_id, data, hora_entrada, hora_saida) VALUES
(1, 1, 1, '2025-09-15', '01:45:00', '02:15:00'), -- Segurança Noturno (ronda)
(2, 3, 1, '2025-09-15', '02:05:00', '02:40:00'), -- ⚠ Técnico entrou após o segurança
(3, 9, 1, '2025-09-15', '01:30:00', '01:50:00'),
(4, 4, 2, '2025-09-15', '08:00:00', '08:30:00'),
(5, 2, 1, '2025-09-14', '18:00:00', '18:30:00'),
(6, 6, 4, '2025-09-15', '06:00:00', '06:20:00'),
(7, 7, 5, '2025-09-15', '02:00:00', '02:10:00'),
(8, 10, 3, '2025-09-15', '09:00:00', '09:30:00'),
(9, 11, 5, '2025-09-14', '10:00:00', '12:00:00'),
(10, 12, 3, '2025-09-14', '11:00:00', '13:00:00'),
(11, 13, 2, '2025-09-13', '09:00:00', '11:00:00'),
(12, 14, 4, '2025-09-13', '14:00:00', '15:30:00'),
(13, 15, 5, '2025-09-12', '08:30:00', '09:30:00'),
(14, 16, 4, '2025-09-12', '07:00:00', '08:00:00'),
(15, 17, 2, '2025-09-11', '10:30:00', '12:30:00'),
(16, 18, 5, '2025-09-11', '13:00:00', '14:00:00'),
(17, 19, 3, '2025-09-10', '09:15:00', '10:15:00'),
(18, 20, 1, '2025-09-10', '16:00:00', '17:00:00');

-- ================================
-- TABELA MOVIMENTACOES
-- ================================
CREATE TABLE movimentacoes (
    id INT PRIMARY KEY,
    obra_id INT,
    sala_origem INT,
    sala_destino INT,
    data DATE,
    hora TIME,
    responsavel_id INT,
    acao VARCHAR(50)
);

INSERT INTO movimentacoes (id, obra_id, sala_origem, sala_destino, data, hora, responsavel_id, acao) VALUES
(1, 1, 1, 4, '2025-09-15', '02:25:00', 3, 'transferência não registrada'), -- ⚠ Eduardo equivalent
(2, 2, 2, 2, '2025-09-14', '17:30:00', 2, 'checagem de exposição'),
(3, 3, 3, 3, '2025-09-15', '08:15:00', 5, 'inspeção de conservação'),
(4, 4, 1, 1, '2025-09-14', '14:00:00', 2, 'verificação de segurança'),
(5, 5, 2, 2, '2025-09-15', '09:00:00', 4, 'revisão visual'),
(6, 6, 1, 1, '2025-09-14', '10:20:00', 12, 'checagem rotineira'),
(7, 7, 3, 3, '2025-09-13', '09:40:00', 13, 'inspeção visual'),
(8, 8, 2, 2, '2025-09-12', '11:10:00', 15, 'verificação'),
(9, 9, 1, 1, '2025-09-11', '14:00:00', 19, 'movimentação normal'),
(10, 10, 5, 5, '2025-09-10', '16:30:00', 16, 'transporte interno');

-- ================================
-- TABELA DEPOIMENTOS
-- ================================
CREATE TABLE depoimentos (
    id INT PRIMARY KEY,
    funcionario_id INT,
    relato TEXT,
    data DATE,
    hora TIME
);

INSERT INTO depoimentos (id, funcionario_id, relato, data, hora) VALUES
(1, 1, 'Fiz minha ronda às duas e notei o técnico Júlio próximo à Sala de Tesouros.', '2025-09-15', '08:00:00'),
(2, 2, 'Nenhum problema ontem, revisei as peças no fim da tarde.', '2025-09-15', '08:05:00'),
(3, 3, 'Recebi um alerta de falha elétrica e fui verificar. Saí da sala antes das duas.', '2025-09-15', '08:10:00'), -- ⚠ MENTIRA: saiu 02:40
(4, 4, 'Cheguei às oito e a porta da Sala de Tesouros estava entreaberta.', '2025-09-15', '08:20:00'),
(5, 5, 'Marina me avisou do sumiço, fui o primeiro a confirmar que o diamante sumiu.', '2025-09-15', '08:25:00'),
(6, 6, 'Só entrei no depósito para limpar. Nem sabia do roubo.', '2025-09-15', '08:30:00'),
(7, 7, 'Não notei nada de anormal do lado de fora.', '2025-09-15', '08:35:00'),
(8, 8, 'Revisei os relatórios e notei um acesso fora de hora: Júlio às 2h05.', '2025-09-15', '08:40:00'),
(9, 9, 'Fiz ronda às 1h40 e deixei o local seguro.', '2025-09-15', '08:45:00'),
(10, 10, 'Ouvi comentários de que o técnico estava nervoso antes do turno.', '2025-09-15', '09:00:00');
