CREATE DATABASE IF NOT EXISTS agrogestor_bi
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE agrogestor_bi;

CREATE TABLE IF NOT EXISTS propriedades (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    municipio VARCHAR(100),
    estado CHAR(2),
    area_hectares DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS safras (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    propriedade_id BIGINT NOT NULL,
    cultura VARCHAR(80) NOT NULL,
    periodo VARCHAR(20) NOT NULL,
    area_plantada DECIMAL(10,2) NOT NULL,
    produtividade_estimada DECIMAL(10,2),
    custo_por_hectare DECIMAL(12,2),
    FOREIGN KEY (propriedade_id) REFERENCES propriedades(id)
);

CREATE TABLE IF NOT EXISTS custos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    safra_id BIGINT NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    descricao VARCHAR(255),
    valor DECIMAL(12,2) NOT NULL,
    data_lancamento DATE,
    FOREIGN KEY (safra_id) REFERENCES safras(id)
);
