# Use uma imagem oficial do Node.js como base
FROM node:18

# Crie um diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o contêiner
COPY . .

# Exponha a porta na qual o servidor vai rodar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
