package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-redis/redis/v8"
	"github.com/rs/cors"
)

var rdb *redis.Client // Creamos el Redis CLient

// Creamos la Estructura del JSON
type Person struct {
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
	Edad     int    `json:"edad"`
}

func main() {
	// Configurar la Conexion de Redis
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Host de la base de Redis
		Password: "",               // contraseña Redis (Si tiene)
		DB:       0,                // Numero de la DB
	})

	// Integramos CORS
	c := cors.Default()
	corsHandler := c.Handler

	// Ruta para agregar una persona a la lista
	http.HandleFunc("/AgregarPersona", func(w http.ResponseWriter, r *http.Request) {
		// Decodificar JSON
		decoder := json.NewDecoder(r.Body)
		var persona Person
		err := decoder.Decode(&persona)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Insertar persona en la lista
		personJSON, err := json.Marshal(persona)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		err = rdb.RPush(context.Background(), "lista_personas", personJSON).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Println("Persona Registrada en Redis: ", persona)
		fmt.Fprintf(w, "Se ha Registrado la Persona en la Lista! (%d personas registradas en total)", rdb.LLen(context.Background(), "lista_personas").Val())
	})

	// Ruta para obtener la lista de personas
	http.HandleFunc("/ListaPersonas", func(w http.ResponseWriter, r *http.Request) {
		// Obtener todos los elementos de la lista
		personasJSON, err := rdb.LRange(context.Background(), "lista_personas", 0, -1).Result()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var personas []Person
		for _, personaJSON := range personasJSON {
			var persona Person
			err := json.Unmarshal([]byte(personaJSON), &persona)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			personas = append(personas, persona)
		}

		// Devolver la lista de personas
		json.NewEncoder(w).Encode(personas)
	})

	// Iniciar el servidor HTTP con CORS
	fmt.Println("Iniciando en el puerto 3300")
	err := http.ListenAndServe(":3300", corsHandler(http.DefaultServeMux))
	if err != nil {
		log.Fatal("Error al iniciar el servidor HTTP:", err)
	}
}
