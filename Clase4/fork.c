// PID > 0 es un proceso padre
// PID == 0 es un proceso hijo
// PID == -1 es un error

#include <unistd.h>
#include <stdio.h>

int main() {
    int pid;
    pid = fork();

    if (pid > 0) {
        printf("Proceso padre. PID: %d\n", getpid()); while (1); // while(1) se utiliza para que el proceso quede en Ejecucion
    } else if (pid == 0) {
        printf("Proceso hijo. PID: %d\n", getpid()); while (1); // while(1) se utiliza para que el proceso quede en Ejecucion
    } else {
        printf("Error al crear el proceso hijo.\n");
    }

    return 0;
}
