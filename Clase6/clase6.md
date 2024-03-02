# Clase 6

### React Graphviz

Comando para Instalar Graphviz

```sh
npm i graphviz-react
```

### Referencia: [React_Graphviz](https://www.npmjs.com/package/graphviz-react)

### Instalar Stress

1. Actualizar los paquetes
```sh
sudo apt-get update
```

2. Instalar el paquete stress
```sh
sudo apt-get install -y stress
```

3. Aplicar Stress
```sh
sudo stress --cpu 2 --timeout 60s
```

# Instalacion de Docker - bash

```sh
#!/bin/bash

# Instalación de Docker
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Instalación de Nginx y ejecución en un contenedor Docker
sudo apt-get install -y nginx
sudo docker pull nginx
sudo docker run -d --name mynginx -p 2020:80 nginx
```