<h1>Desafio_Backend_green</h1>

<h2>Descrição</h2>
Projeto de uma api para um aplicativo para controle de boletos de inquilinos.br>

<h2>Funcionalidades & endpoints</h2>
<h3>Implementadas :heavy_check_mark:</h3>

- `Upload de boletos com arquivo CSV`: Importação dos boletos em arquivo CSV
  - 'Método': POST
  - 'Endpoint': /boleto/upload/csv.
- `Upload de boletos com arquivo PDF`: Ao importar o sistema salvará um PDF no computador local, contendo o boleto para cada página do PDF importado
  - 'Método': POST
  - 'Endpoint': /boleto/upload/pdf.
- `Listagem de boletos cadastrados`: Visualização dos boletos cadastrados no sistema
  - 'Mètodo': GET
  - 'Endpoint': /boleto/.
  - 'Queries': Filtros aplicávis nos boletos.
    -  'nome'
    -  'id_lote'
    -  'valor_inicial'
    -  'valor_final'

<h2>Rodando o projeto 🛠️</h2>
<h3>Pré-Requisitos</h3>

⚠️ [Node](https://nodejs.org/en/)<br>
⚠️ [MySQL](https://dev.mysql.com/downloads/installer/)<br>
⚠️ [VS Code](https://code.visualstudio.com/Download)<br>

Após baixar o projeto no seu dispositivo, você pode abri-lo no VS Code.<br>
Para isso abra o VS Code em seu dispositivo, após clique em:

<h3>VS Code</h3>

- **File >> Open Folder...** ou digite **Ctrl+K** / **Ctrl+O**;
- Abra o terminal em **Terminal >> New Terminal**;
- Digite **npm install** para realizar a instalação das dependências do projeto;

<h3>Banco de Dados</h3>

- Altere o nome do arquivo **.env.example** na raíz do projeto, para **.env**
- Altere as informações da variável **DATABASE_URL** conforme dados do DB, e descomente as váriaveis;<br>
EX: DATABASE_URL="mysql://root:root@localhost:3306/meu_banco_de_dados"
- Após basta entrar no terminal novamente e digitar **npx prisma migrate dev --name init**;
  - Deve aparecer uma solicitação referente a tabela 'lote', aperte 'Y' e continue a rotina normalmente.
- Por último basta digitar no terminal **npx prisma db seed** para realizar a população do banco com dados.

Finalizada todas as etapas acima sem erro, basta voltar no seu MySQL Workbench e dar um refresh que as 'tables' devem ter sido criadas.<br>
Após todos os passo acima serem realizados, digite **npm run dev** e o projeto estará rodando em seu computador.

<h3>Utiliznando o Sistema</h3>

- Dentro do projeto, na pasta **arquivos_testes** existe um arquivo 'endpoints' que contem as rotas, e você deve importar no **INSOMNIA** caso queira realizar os testes nos Endpoints. Nesta mesma pasta há um arquivo CSV e um PDF fake para teste com alguns boletos. 

<h2>Tecnologias Utilizadas</h2>

<ul>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-plain.svg" width="20" height="20"/><b> Visual Studio Code</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20" height="20"/><b> Node.JS</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20" height="20"/><b> TypeScript</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="20" height="20"/><b> Express</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="20" height="20"/><b> Git</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="20" height="20"/><b> MySQL</b></li>
</ul>

# Autores

| [<img src="https://avatars.githubusercontent.com/u/70332789?s=400&u=c6b947894c97e0e941f64aafeb22719ff49589ac&v=4" width=115><br><sub>Angelo Bordin</sub>](https://github.com/angelobordin) |
| :---: |
