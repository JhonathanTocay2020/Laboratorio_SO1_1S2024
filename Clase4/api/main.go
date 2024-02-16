package main

import (
	"fmt"
	"net/http"
	"os/exec"
	"strconv"
)

var process *exec.Cmd

func main() {
	http.HandleFunc("/start", StartProcess)
	http.HandleFunc("/stop", StopProcess)
	http.HandleFunc("/resume", ResumeProcess)
	http.HandleFunc("/kill", KillProcess)

	go func() {
		if err := http.ListenAndServe(":8080", nil); err != nil {
			fmt.Println(err)
		}
	}()

	select {}
}

func StartProcess(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("bash", "-c", "./prueba1")
	err := cmd.Start()
	if err != nil {
		http.Error(w, "Error al iniciar el proceso", http.StatusInternalServerError)
		return
	}

	// Obtener el PID del proceso hijo
	childPID := cmd.Process.Pid

	// Almacenar el cmd para futuras operaciones si es necesario
	process = cmd

	fmt.Fprintf(w, "Proceso iniciado con PID del hijo: %d", childPID)
}

/*func StartProcess(w http.ResponseWriter, r *http.Request) {
	// Crear un nuevo proceso
	//cmd := exec.Command("sleep", "600")
	//cmd := exec.Command("bash", "-c", "while true; do echo 'Running'; sleep 1; done")
	cmd := exec.Command("bash", "-c", "./prueba1")
	err := cmd.Start()
	if err != nil {
		http.Error(w, "Error al iniciar el proceso", http.StatusInternalServerError)
		return
	}

	// Obtener el comando con PID
	process = cmd
	fmt.Fprintf(w, "Proceso iniciado con PID: %d", cmd.Process.Pid)
}*/

func StopProcess(w http.ResponseWriter, r *http.Request) {
	pidStr := r.URL.Query().Get("pid")
	if pidStr == "" {
		http.Error(w, "Se requiere el parámetro 'pid'", http.StatusBadRequest)
		return
	}

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "El parámetro 'pid' debe ser un número entero", http.StatusBadRequest)
		return
	}

	// Enviar señal SIGSTOP al proceso con el PID proporcionado
	cmd := exec.Command("kill", "-SIGSTOP", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al detener el proceso con PID %d", pid), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Proceso con PID %d detenido", pid)
}

func ResumeProcess(w http.ResponseWriter, r *http.Request) {
	pidStr := r.URL.Query().Get("pid")
	if pidStr == "" {
		http.Error(w, "Se requiere el parámetro 'pid'", http.StatusBadRequest)
		return
	}

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "El parámetro 'pid' debe ser un número entero", http.StatusBadRequest)
		return
	}

	// Enviar señal SIGCONT al proceso con el PID proporcionado
	cmd := exec.Command("kill", "-SIGCONT", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al reanudar el proceso con PID %d", pid), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Proceso con PID %d reanudado", pid)
}

func KillProcess(w http.ResponseWriter, r *http.Request) {
	pidStr := r.URL.Query().Get("pid")
	if pidStr == "" {
		http.Error(w, "Se requiere el parámetro 'pid'", http.StatusBadRequest)
		return
	}

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "El parámetro 'pid' debe ser un número entero", http.StatusBadRequest)
		return
	}

	// Enviar señal SIGCONT al proceso con el PID proporcionado
	cmd := exec.Command("kill", "-9", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al intentar terminar el proceso con PID %d", pid), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Proceso con PID %d ha terminado", pid)
}
