# CLASE 7 - Redis

### Paso 1: Descargar la imagen de Redis

Ejecuta el siguiente comando para descargar la imagen de Redis desde el Docker Hub:

```bash
docker pull redis
```

### Paso 2: Iniciar un contenedor Redis
Una vez que la descarga esté completa, puedes iniciar un contenedor Redis ejecutando el siguiente comando:

```bash
docker run --name mi-redis -p 6379:6379 -d redis
```

con contraseña: 
```bash
docker run --name db_redis -p 6379:6379 -d -e REDIS_PASSWORD=redis1234 redis
```



Este comando crea un nuevo contenedor llamado "mi-redis" a partir de la imagen de Redis descargada. También hace que el puerto 6379 del contenedor esté disponible en el puerto 6379 de tu sistema host.

### Paso 3: Verificar que Redis esté en ejecución
Puedes verificar que el contenedor de Redis esté en ejecución ejecutando el siguiente comando:

```bash
docker ps
```

Deberías ver una entrada que muestra que el contenedor "mi-redis" está en estado "Up" y que el puerto 6379 se está redirigiendo correctamente.

### Paso 4: Conectar a Redis
Para conectarte a tu servidor Redis en el contenedor, puedes usar una herramienta cliente de Redis, como "redis-cli". Puedes ejecutarlo desde tu terminal local con el siguiente comando:

```bash
redis-cli
```

### Paso 5: Insertar y Eliminar

Listamos las db que existen:

```bash
CONFIG GET databases
```

### Paso 6: Insertar y Eliminar

Utilizaremos el siguiente json: 

```JSON
{
  "nombre": "Jhonathan",
  "edad": 22,
  "ciudad": "Guatemala"
}
```

Para Agregar un dato se realiza con: 

```bash
SET mi_clave '{"nombre":"Jhonathan","edad":22,"ciudad":"Guatemala"}'
```
Obtener 

```bash
GET mi_clave
```

ELIMINAR la key
```bash
DEL mi_clave
```

listar todas las llaves
```bash
Keys *
```
Eliminar todas las llaves 

```bash
FLUSHALL
```

### Paso 6: Detener y eliminar el contenedor (opcional)
Si deseas detener y eliminar el contenedor de Redis cuando hayas terminado, puedes usar los siguientes comandos:

```bash
docker stop mi-redis
docker rm mi-redis
```

Esto detendrá el contenedor y lo eliminará.

### [Conectar_GO_Redis](https://redis.io/docs/connect/clients/go/)

### [Redis_Docker](https://hub.docker.com/_/redis)

