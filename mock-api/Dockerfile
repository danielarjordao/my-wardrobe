# Dockerfile para a API Mock usando json-server
# O node:20-alpine é uma imagem leve do Node.js baseada no Alpine Linux, ideal para rodar aplicações Node.js em produção.
FROM node:20-alpine

# Instalar o json-server globalmente na imagem para servir a API mock. A versão 0.17.4 é especificada para garantir compatibilidade e estabilidade.
RUN npm install -g json-server@0.17.4

# Definir a pasta de trabalho dentro do container onde o json-server irá rodar. Esta pasta será usada para armazenar o arquivo db.json que contém os dados da API mock.
WORKDIR /app

# Copiar o arquivo db.json para a pasta de trabalho do container. O db.json deve conter os dados estruturados que a API mock irá servir.
COPY db.json .

# Expor a porta 3000, que é a porta padrão onde o json-server roda. Isso permite que a API mock seja acessível externamente através desta porta.
EXPOSE 3000

# Comandos para iniciar o json-server, configurando-o para ouvir em todas as interfaces de rede (
# json-server: inicializa o servidor JSON usando o arquivo db.json como fonte de dados.
# --host 0.0.0.0 : configura o servidor para aceitar conexões de qualquer endereço IP, permitindo que seja acessível de fora do container.
# --port 3000 : define a porta onde o json-server irá rodar, que é a porta exposta anteriormente.
# db.json : especifica o arquivo de dados que o json-server irá usar para servir a API mock.
CMD ["json-server", "--host", "0.0.0.0", "--port", "3000", "db.json"]
