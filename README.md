# 🌱 AgroGestor BI

**Plataforma de gestão agrícola com dashboard de indicadores, cadastro de propriedades rurais, acompanhamento de safras e controle de custos.**

O AgroGestor BI é um projeto de desenvolvimento de software voltado à organização de informações agrícolas e ao acompanhamento de indicadores que auxiliam na visualização dos dados de uma propriedade rural.

A proposta é aproximar **tecnologia, gestão e agronegócio** por meio de uma aplicação web.

## ✨ Funcionalidades

- **Dashboard:** visualização de indicadores e gráficos relacionados à gestão agrícola.
- **Propriedades rurais:** cadastro e gerenciamento de propriedades.
- **Safras:** organização de informações sobre culturas, períodos, áreas plantadas e produtividade estimada.
- **Controle de custos:** registro de despesas por categoria, com associação às safras.
- **Indicadores agrícolas:** acompanhamento de área plantada, produtividade estimada e custos por hectare.

> **Nota:** os números demonstrativos exibidos na interface são fictícios e não devem ser utilizados como referência para decisões reais.

## 🛠️ Tecnologias

| Tecnologia | Aplicação |
|---|---|
| Java | Lógica da aplicação |
| Spring Boot | Desenvolvimento do backend e APIs |
| Spring Data JPA / Hibernate | Persistência e mapeamento de dados |
| MySQL | Banco de dados relacional |
| HTML, CSS e JavaScript | Interface web |
| Maven | Gerenciamento de dependências e build |
| Git e GitHub | Versionamento e publicação do código |

## 📂 Estrutura do projeto

```text
AgroGestor-BI/
├── database/
│   └── schema.sql
├── frontend/
│   ├── css/
│   ├── js/
│   └── index.html
├── src/
│   ├── main/
│   │   ├── java/com/agrogestor/bi/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── exception/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   └── resources/
│   │       ├── static/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## ⚙️ Como executar localmente

### Pré-requisitos

- Java compatível com a versão definida no `pom.xml`.
- Maven instalado.
- MySQL instalado e em execução.

### 1. Clone o repositório

```bash
git clone https://github.com/matheusvccarvalho/AgroGestor-BI.git
cd AgroGestor-BI
```

### 2. Prepare o banco de dados

Execute o script `database/schema.sql` no MySQL para criar o banco e as tabelas.

### 3. Configure a conexão

Por padrão, a aplicação utiliza o banco local `agrogestor_bi`. Se necessário, configure as variáveis de ambiente:

```bash
export DB_URL="jdbc:mysql://localhost:3306/agrogestor_bi"
export DB_USERNAME="seu_usuario"
export DB_PASSWORD="sua_senha"
```

Ajuste a URL e as credenciais de acordo com sua instalação do MySQL.

### 4. Execute a aplicação

Com o Maven instalado:

```bash
mvn spring-boot:run
```

Depois, acesse:

http://localhost:8080

## 📊 Indicadores agrícolas

O projeto contempla informações como:

- Área plantada;
- Produtividade estimada;
- Produção estimada;
- Custos por hectare;
- Custos associados às safras.

Os indicadores são apresentados para fins demonstrativos e podem ser utilizados como base para futuras evoluções da plataforma.

## 🚀 Próximas evoluções

- Aprimoramento dos indicadores e relatórios;
- Novos recursos de análise de dados;
- Possível integração com ferramentas de Business Intelligence.

## 👨‍💻 Autor

**Matheus Vinicius Carvalho**

Estudante de Engenharia de Software interessado em desenvolvimento de software, dados e soluções tecnológicas para o agronegócio.

- GitHub: [@matheusvccarvalho](https://github.com/matheusvccarvalho)
- Projeto: [AgroGestor-BI](https://github.com/matheusvccarvalho/AgroGestor-BI)

---

*Projeto desenvolvido para fins educacionais e de portfólio.*
