# Clase 3 - Modulos de Kernel

## Herramientas a Utilizar

* __GCC (GNU Compiler Collection)__: Conjunto de compiladores de código abierto desarrollado por el Proyecto GNU. Estos compiladores permiten traducir el código fuente escrito en varios lenguajes de programación, como C, C++, Ada, Fortran, entre otros

* __Make__: es una herramienta de construcción utilizada en el desarrollo de software para automatizar el proceso de compilación y generación de ejecutables a partir del código fuente. Su función principal es coordinar y controlar la ejecución de tareas específicas definidas en archivos llamados "makefiles"


## Instalacion de GCC y Make

Verificamos si tenemos instalado estas herramientas. 

```sh
gcc --version

make --version
```

Si solamente falta make

```sh
sudo apt install make
```

Si falta GCC, también instala make

```sh
sudo apt install build-essential

sudo apt-get install manpages-dev
```
# GCC v12

```sh
sudo apt-get update
sudo apt-get install gcc-12 g++-12
```

Verificar las rutas de instalacion
```sh
whereis gcc-12 g++-12
```

Supongamos que los ejecutables se instalaron en /usr/bin/gcc-12 y /usr/bin/g++-12, entonces puedes configurar las alternativas con los siguientes comandos:

```sh
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-12 100

sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-12 100
```

# Modulo

Compilar archivo

```sh
make all
```

Borrar los archivos compilados

```sh
make clean
```

Insertar modulo

```sh
sudo insmod <<nombre_modulo>>.ko
```

Obtener los mensajes de entrada y salida del modulo

```sh
sudo dmesg
```

Verificar informacion de los procesos en el directorio /proc

```sh
cd /proc
```

Listar modulos

```sh
ls
```

Leer archivo escrito

```sh
cat <<nombre_archivo>>
```

Eliminar modulo
```sh
sudo rmmod <<nombre_modulo>>.ko
```

# Wails

Instalacion de Wails version de Go mayor al 1.18
```sh
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

comando wails

version de wails
```sh
wails version
```

Si no funciona verificar el $GOPATH
```sh
echo $GOPATH
```

Inicializar el proyecto
```sh
wails init -n myproject -t react
```
ejecutar el proyecto de wails

```sh
wails dev
```

## Solucionar $GOPATH 

Si el $GOPATH imprime vacio se debe de configurar y definir la variable de entorno GOPATH.

Seguir los siguientes pasos. 

1. Crear el directorio de trabajo de GOPATH:
```sh
mkdir -p $HOME/go
```

2. Configurar las variables de entorno

```sh
nano ~/.bashrc
```

Debemos de agregar las siguientes líneas al final del archivo:

```sh
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

Guarda los cambios y cierra el editor.

3. Recargar la configuración de la shell para que se apliquen los cambios, ademas cierra todas las terminales que se han abierto.

```sh
source ~/.bashrc
```

4. Verifica de nuevo si se han agregado los correctamente la variable de entorno

```sh
echo $GOPATH
```
y comprueba de nuevo si 
```sh
wails version
```