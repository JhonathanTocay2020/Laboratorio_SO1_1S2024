package main

import (
	"fmt"
	"os/exec"
	"time"
)

func main() {
	// Lanzar un goroutine que ejecute la función cada n segundos
	interval := 5 // segundos
	ticker := time.NewTicker(time.Second * time.Duration(interval))
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			fmt.Println("DATOS OBTENIDOS DESDE EL MODULO:")
			fmt.Println("")

			cmd := exec.Command("sh", "-c", "cat /proc/modulo_ram")
			out, err := cmd.CombinedOutput()
			if err != nil {
				fmt.Println(err)
			}
			output := string(out[:])
			fmt.Println(output)
		}
	}
}

/*{
	"Total_Ram": 8000,
	"Ram_en_Uso": 6000,
	"Ram_libre": 2000,
	"Porcentaje_en_uso": 75
}*/
