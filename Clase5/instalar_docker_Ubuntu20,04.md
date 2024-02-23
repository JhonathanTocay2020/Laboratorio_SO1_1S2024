1. Actualizar el SO

   ```bash
   sudo apt-get update
   ```

2. Instale los paquetes necesarios para permitir que `apt` use paquetes a través de HTTPS:

   ```bash
   sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
   ```

3. Agregue la clave GPG oficial de Docker:

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

4. Agregue el repositorio de Docker:

   ```bash
   echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. Actualizar

   ```bash
   sudo apt-get update
   ```

6. Ahora puedes instalar Docker:

   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

El paquete `docker-ce` debe incluir Docker Engine, `docker-ce-cli` es el cliente de línea de comandos y `containerd.io` es el tiempo de ejecución del contenedor.
