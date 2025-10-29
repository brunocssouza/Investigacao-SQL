-- ================================
-- BANCO DE DADOS: roubo_diamante - versão final
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
(1,'847.392.561-04','Ricardo Mendes','Segurança Noturno'),
(2,'295.710.683-22','Fernanda Alves','Curadora de Joias'),
(3,'163.589.742-37','Júlio Barreto','Técnico de Manutenção'),
(4,'502.841.973-90','Marina Castro','Assistente de Exposição'),
(5,'781.364.209-55','Paulo Moreira','Conservador de Arte'),
(6,'439.218.657-18','Cláudia Freitas','Auxiliar de Limpeza'),
(7,'964.705.132-70','Roberto Nunes','Vigia Externo'),
(8,'128.547.690-03','Helena Duarte','Gerente do Museu'),
(9,'671.230.985-49','Sérgio Tavares','Segurança Interno'),
(10,'370.952.816-21','Carolina Lopes','Restauradora'),
(11,'853.419.207-68','Valéria Pinto','Recepção'),
(12,'214.876.930-52','Célio Andrade','Técnico de Som'),
(13,'507.693.184-95','Márcia Oliveira','Educadora'),
(14,'196.840.572-39','Hugo Santana','Estagiário'),
(15,'780.132.946-10','Lívia Gomes','Auxiliar Administrativo'),
(16,'945.367.120-84','Emanuel Souza','Motorista'),
(17,'539.621.478-07','Débora Reis','Atendimento ao Público'),
(18,'672.903.541-26','Otávio Silva','Jardineiro'),
(19,'408.176.259-13','Patrícia Nunes','Arquivo / Documentação'),
(20,'359.814.702-65','André Lopes','Suporte de TI'),
(21,'312.654.987-40','Sandro Lima','Auxiliar Técnico'),
(22,'904.213.578-11','Tatiane Rocha','Curadora Assistente'),
(23,'175.938.462-90','Rodrigo Mendes','Segurança Noturno'),
(24,'631.485.720-33','Daniela Costa','Educadora'),
(25,'590.327.148-92','Leonardo Pinto','Estagiário'),
(26,'732.614.890-57','Marcos Silva','Conservador'),
(27,'214.789.563-08','Camila Ribeiro','Auxiliar Limpeza'),
(28,'847.302.619-14','Fernando Alves','Vigia Externo'),
(29,'910.547.382-60','Juliana Faria','Curadora de Arte'),
(30,'472.618.903-75','Alexandre Torres','Técnico de Manutenção'),
(31,'301.895.476-23','Renata Dias','Recepção'),
(32,'683.140.259-12','Paulo César','Segurança Interno'),
(33,'518.274.903-84','Adriana Melo','Auxiliar Administrativo'),
(34,'761.309.482-09','Gabriel Souza','Motorista'),
(35,'429.871.305-61','Tatiana Lopes','Assistente de Exposição'),
(36,'894.217.630-47','Rafael Martins','Educador'),
(37,'567.892.413-20','Luciana Gomes','Curadora de Joias'),
(38,'230.648.791-38','Hélio Fernandes','Auxiliar Técnico'),
(39,'615.472.309-55','Mariana Lima','Atendimento ao Público'),
(40,'781.394.025-12','Diego Alves','Segurança Noturno');


CREATE TABLE permissoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  funcionario_id INT,
  sala_id INT
);

-- Inserindo permissões com variação: alguns 1 sala, outros 2, outros 3, e 2 com todas as salas
INSERT INTO permissoes (funcionario_id, sala_id) VALUES
-- Funcionários com 1 sala
(1,1),
(7,5),
(11,5),
(14,4),
(24,3),
(29,2),
(36,2),
(38,4),

-- Funcionários com 2 salas
(2,2),(2,1),
(3,1),(3,4),
(4,2),(4,5),
(5,1),(5,3),
(6,4),(6,5),
(9,1),(9,5),
(10,3),(10,6),
(12,3),(13,2),
(15,5),(16,4),
(17,2),(17,5),
(18,5),(18,6),
(19,3),(19,4),
(20,1),(20,4),

-- Funcionários com 3 salas
(21,4),(21,2),(21,6),
(22,2),(22,3),(22,5),
(23,1),(23,5),(23,2),
(25,3),(25,1),(25,4),
(26,2),(26,3),(26,1),
(27,4),(27,2),(27,5),
(30,1),(30,4),(30,6), -- culpado
(32,1),(32,5),(32,3),
(33,5),(33,2),(33,4),
(35,2),(35,3),(35,6),
(37,1),(37,2),(37,3),

-- Funcionários com todas as salas
(8,1),(8,2),(8,3),(8,4),(8,5),(8,6),
(40,1),(40,2),(40,3),(40,4),(40,5),(40,6);



-- ================================
-- TABELA SALAS
-- ================================
CREATE TABLE salas (
    id INT PRIMARY KEY,
    nome VARCHAR(50),
    localizacao VARCHAR(50)
);

INSERT INTO salas (id, nome, localizacao) VALUES
(1,'Sala de Tesouros','Subsolo'),
(2,'Galeria Antiga','Térreo'),
(3,'Sala Moderna','1º Andar'),
(4,'Depósito Técnico','Subsolo'),
(5,'Hall Principal','Entrada'),
(6,'Galeria Contemporânea','2º Andar');

-- ================================
-- TABELA OBRAS
-- ================================
CREATE TABLE obras (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    tipo VARCHAR(50),
    sala_id INT
);

INSERT INTO obras (id, nome, tipo, sala_id) VALUES
(1,'Diamante do Amanhecer','Joia',1),
(2,'Trono de Mármore','Escultura',2),
(3,'Horizonte Perdido','Pintura',3),
(4,'Relógio Dourado','Antiguidade',1),
(5,'Máscara Maia','Artefato',2),
(6,'Escultura de Bronze','Escultura',6),
(7,'Pintura Estelar','Pintura',3),
(8,'Candelabro Antigo','Antiguidade',1),
(9,'Relicário da Rainha','Joia',1),
(10,'Vaso Chines','Artefato',2),
(11,'Estátua de Vênus','Escultura',2),
(12,'Tábua Egípcia','Artefato',3);

-- ================================
-- TABELA ACESSOS
-- ================================
CREATE TABLE acessos (
    id INT PRIMARY KEY,
    funcionario_id INT,
    sala_id INT,
    data CHAR(10),
    entrada CHAR(5),
    saida CHAR(5)
);

-- horários múltiplos e suspeitos, incluindo o culpado
INSERT INTO acessos (id, funcionario_id, sala_id, data, entrada, saida) VALUES
(1,1,1,'15-09-2025','01:45','02:15'),
(2,3,1,'15-09-2025','02:05','02:40'),
(3,9,1,'15-09-2025','01:30','01:50'),
(4,30,1,'15-09-2025','02:10','02:50'),
(5,23,1,'15-09-2025','02:00','02:20'),
(6,7,5,'15-09-2025','02:00','02:10'),
(7,10,3,'15-09-2025','09:00','09:30'),
(8,4,2,'15-09-2025','08:00','08:30'),
(9,2,1,'14-09-2025','18:00','18:30'),
(10,5,1,'15-09-2025','02:05','02:25'),
-- registros inúteis
(11,11,5,'14-09-2025','10:00','12:00'),
(12,12,3,'14-09-2025','11:00','13:00'),
(13,13,2,'13-09-2025','09:00','11:00'),
(14,14,4,'13-09-2025','14:00','15:30'),
(15,15,5,'12-09-2025','08:30','09:30'),
(16,16,4,'12-09-2025','07:00','08:00'),
(17,17,2,'11-09-2025','10:30','12:30'),
(18,18,5,'11-09-2025','13:00','14:00'),
(19,19,3,'10-09-2025','09:15','10:15'),
(20,20,1,'10-09-2025','16:00','17:00');

-- ================================
-- TABELA MOVIMENTACOES
-- ================================
CREATE TABLE movimentacoes (
    id INT PRIMARY KEY,
    obra_id INT,
    sala_origem INT,
    sala_destino INT,
    data CHAR(10),
    hora CHAR(5),
    acao VARCHAR(50)
);

INSERT INTO movimentacoes (id, obra_id, sala_origem, sala_destino, data, hora, acao) VALUES
(1,1,1,0,'15-09-2025','02:25','Destino nao informado'),
(2,2,2,2,'14-09-2025','17:30','Checagem de exposição'),
(3,3,3,3,'15-09-2025','08:15','Inspeção de conservação'),
(4,4,1,1,'14-09-2025','14:00','Verificação de segurança'),
(5,5,2,2,'15-09-2025','09:00','Revisão visual'),
(6,6,6,6,'14-09-2025','10:20','Checagem rotineira'),
(7,7,3,3,'13-09-2025','09:40','Inspeção visual'),
(8,8,1,1,'12-09-2025','11:10','Verificação'),
(9,9,1,1,'11-09-2025','14:00','Movimentação normal'),
(10,10,2,2,'10-09-2025','16:30','Transporte interno'),
(11,11,2,2,'13-09-2025','15:30','Inspeção artística'),
(12,12,3,3,'12-09-2025','10:45','Checagem documental');

-- ================================
-- TABELA DEPOIMENTOS
-- ================================
CREATE TABLE depoimentos (
    id INT PRIMARY KEY,
    funcionario_id INT,
    relato TEXT,
    data CHAR(10),
    hora CHAR(5)
);

INSERT INTO depoimentos (id, funcionario_id, relato, data, hora) VALUES
(1,1,'Ronda às duas. Notei Júlio próximo à Sala de Tesouros. Estranho.', '15-09-2025','08:00'),
(2,2,'Nenhum problema ontem, revisei as peças no fim da tarde.', '15-09-2025','08:05'),
(3,3,'Recebi alerta elétrico. Acho que saí por volta de 01:50.', '15-09-2025','08:10'),
(4,4,'Cheguei às 08:00, porta da Sala de Tesouros entreaberta.', '15-09-2025','08:20'),
(5,5,'Marina avisou do sumiço, fui confirmar o diamante.', '15-09-2025','08:25'),
(6,7,'Não notei nada do lado de fora, mas ouvi falar que Júlio estava estranho.', '15-09-2025','08:35'),
(7,8,'Revisei relatórios e notei acessos fora de hora.', '15-09-2025','08:40'),
(8,9,'Fiz ronda às 01:40 e deixei o local seguro.', '15-09-2025','08:45'),
(9,10,'Ouvi que o técnico estava nervoso antes do turno.', '15-09-2025','09:00'),
(11,11,'Atendi visitantes pela manhã.', '14-09-2025','12:10'),
(12,12,'Ajuste sonoro na Sala Moderna.', '14-09-2025','13:15'),
(13,13,'Oficina educativa para crianças.', '13-09-2025','11:10'),
(14,14,'Treinamento durante o dia.', '13-09-2025','15:40'),
(15,15,'Atualizei planilhas administrativas.', '12-09-2025','09:45'),
(16,16,'Entreguei materiais ao depósito cedo.', '12-09-2025','08:05'),
(17,17,'Apoiei equipe de educação na visita.', '11-09-2025','12:35'),
(18,18,'Fiz poda e manutenção externa.', '11-09-2025','14:20'),
(19,19,'Organizei arquivos históricos.', '10-09-2025','10:25'),
(20,20,'Resolvi chamados de TI pela manhã.', '10-09-2025','17:05'),
(21,23,'Acho que saí da sala por volta de 02:10.', '15-09-2025','08:50'),
(23,5,'Ouvi dizer que Júlio e Rodrigo estavam na mesma hora no subsolo.', '15-09-2025','09:20'),
(24,3,'Acho que fui visto saindo por volta de 02:35.', '15-09-2025','09:25'),
(25,30,'Somente manutenção, saí antes de 03:00.', '15-09-2025','09:30'),
(26,23,'Ronda feita, mas horário pode estar errado.', '15-09-2025','09:35'),
(27,4,'Vi movimentação estranha perto do depósito.', '15-09-2025','09:40'),
(28,7,'Ouvi ruído no subsolo.', '15-09-2025','09:45'),
(29,8,'Comparando horários, algo não bate.', '15-09-2025','09:50'),
(30,9,'Todos os acessos parecem corretos, exceto um.', '15-09-2025','09:55');
