# GymPoint
Neste repositório você vai encontrar uma aplicação completa (Web, API) de gerenciamento de academia

# About App
Este tem por objetivo gerênciar todos os alunos, matriuclas e planos de uma academia

## Getting Started

Para começar a utiliza o aplicativo, vamos ao pré-requisitos e a sua instalação.

### Pre-requisites

1.  Instalando o Yarn
 > Para instalar o yarn, você possui duas maneiras.
 
 1ª Acessar o site oficial e baixar a versão para o seu S.O.
 2ª Caso esteja no  windows, instalar via Chocolatey é uma otima opção.

Via Chocolatey, acesse o site oficial e siga todas os passos informados, após a instalação digite o seguinte comando:
```
choco install yarn
```

feito isso, no mesmo terminal, execute o seguinte comando: 
```
yarn -v
```
Você verá algo semelhante a isto:
> 1.17.3

A versão 1.17.3 pode variar com o tempo e com a versão que você baixou.

2.  Instalando o Node.JS
 > Para instalar o node, você possui duas maneiras.
 
 1ª Acessar o site oficial e baixar a versão LTS para o seu S.O.
 2ª Caso esteja no  windows, instalar via Chocolatey é uma otima opção.
 
 ##### A versão LTS é a versão mais estável do Node

Via Chocolatey, acesse o site oficial e siga todas os passos informados, após a instalação digite o seguinte comando:
```
choco install nodejs-lts
```
feito isso, no mesmo terminal, execute o seguinte comando: 
```
node -v
```
Você verá algo semelhante a isto:
> v12.14.0

A versão 12.14.0 pode variar com o tempo e com a versão que você baixou.


### Installing and Running

Com os pré-requisitos instalados, agora você precisa baixar este repositório.

Com o dowloand do repositório concluído, descompacte (caso tenha baixado em formato zip) e abra a pasta API no terminal de sua escolha. Feito isso execute os seguintes comandos:

#### API

Esta api possui algumas depedências, a primeira delas, o seu computador precisa estar rodando um servidor de banco de dados MySQL e a ultima depedência é um servidor de banco de dados Redis.

Tendo esses dois servidores rodando na sua maquina, acesse a pasta da API e configure os HOST de cada um no arquivo `.env`

Feito isso, você pode continuar o processo de instalação.

 1.
 ```
 yarn install
 ```
 2. Após a finalização da instalação, no mesmo terminal e pasta, execute a seguinte série de comandos
 ##### aguarde a finalização de cada comando
 ```
 yarn sequelize db:migrate
 ```
 ```
 yarn sequelize db:seed:all
 ```
 
 ```
 yarn dev
 ```
 Aguarde um pouco e você deverar ver uma mensagem semelhante a isto:
 > API Gympoint, online!
 
 Caso a mensagem não apareça, pode acontecer que a porta 3333 (Porta onde a API irar receber todas as requisições efetuadas para ela) pode está sendo usador por algum outro serviço, para resolver este problema você tem duas maneiras.
 
 1ª Finaliza o processo que está ocupando a porta 3333.
 2ª Abra a pasta API em um editor de texto (Recomendo o Visual Studio Code), abra o arquivo .env e altera a chave PORT_API = 3333 para PORT_API = PORTA DE SUA ESCOLHA OU QUE ESTEJA LIVRE NO SEU COMPUTADOR. Feito isso, feche este arquivo e não mexa em mais nada!.
 
 No terminal onde a API está aberta, digite o seguinte comando: 
 ```
 rs
 ```
 
 Pressine a tecla enter e aguarde a mensagem:
 > API, online!
 
 Se aparecer um novo erro, crie uma issue neste respositório, em breve o bug será resolvido.

#### Web

 Após a instalação e execução da API, repita o primeiro passo, porém, agora, na pasta App

 1ª Para instalar
 
 ```
 yarn install
 ```
 
 2ª Após a finalização da instalação, no mesmo terminal e pasta, execute o seguinte comando
 ```
 yarn start
 ```
 Aguarde um pouco e uma nova guia/janela do seu navegador padrão irar abrir, aguarde um pouco, a interface da aplicação irar  aparecer para você.

