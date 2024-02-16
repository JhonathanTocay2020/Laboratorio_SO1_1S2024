#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid;

    /* fork a child process */
    pid = fork();

    if (pid < 0) {
        /* error occurred */
        fprintf(stderr, "Fork Failed");
        return 1;
    } else if (pid == 0) {
        /* child process */
        execlp("/bin/ls", "ls", NULL);
        // Si execlp() tiene éxito, el código siguiente nunca se ejecutará en el proceso hijo
        perror("execlp"); // Imprimir un mensaje de error en caso de que execlp() falle
    } else {
        /* parent process */
        /* parent will wait for the child to complete */
        wait(NULL);
        printf("Child with PID %d Complete\n", pid);
    }

    return 0;
}
