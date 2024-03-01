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

# Cloud Run

## Container Registry

### Paso 1.
Hacer pull de la imagen desde DockerHub

docker pull <<username>>/<<image_name>>

Ej:

sudo docker pull jhonathantocay/claseN_so1


### Paso 2.
Agregarle tag a la imagen.

docker tag <<imagen>> gcr.io/<ID_Proyecto>/<nombre>:<version>

Ej:

docker tag jhonathantocay/claseN_so1 gcr.io/so1-1s24/claseN:V1


### Paso 3.
Hacer push de la imagen tageada

docker push <<imagen>>

Ej:

docker push gcr.io/so1-1s24/front-claseN:V1

**Nota:** habilitar el servicio de **"Google Container Registry API"**