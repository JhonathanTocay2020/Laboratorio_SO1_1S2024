package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

var conexion = ConexionMysql()

func ConexionMysql() *sql.DB {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	connString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", dbUser, dbPassword, dbHost, dbPort, dbName)

	//connString := "root:secret@tcp(localhost:3306)/clase3?parseTime=true"
	conexion, err := sql.Open("mysql", connString)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Conexion con MySQL Correcta")
	}
	return conexion
}

type Datos struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
	Carnet string `json:"carnet"`
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to my api")
}

func registro(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var dat Datos

	json.NewDecoder((request.Body)).Decode(&dat)

	query := `INSERT INTO estudiantes(nombre, carnet) VALUES (?,?);`
	result, err := conexion.Exec(query, dat.Nombre, dat.Carnet)
	if err != nil {
		fmt.Println(err)
	}
	lastInsertID, _ := result.LastInsertId()
	fmt.Println("Se ha insertado Correctamente: ", lastInsertID)
	json.NewEncoder(response).Encode(dat)
}

func getEstudiantes(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var lista []Datos
	query := "select * from estudiantes;"
	result, err := conexion.Query(query)
	if err != nil {
		fmt.Println(err)
	}

	for result.Next() {
		var logc Datos

		err = result.Scan(&logc.ID, &logc.Nombre, &logc.Carnet)
		if err != nil {
			fmt.Println(err)
		}
		lista = append(lista, logc)
	}
	json.NewEncoder(response).Encode(lista)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", indexRoute)
	router.HandleFunc("/Registrar", registro).Methods("POST")
	router.HandleFunc("/Estudiantes", getEstudiantes).Methods("GET")
	//-------------- Exponer el Puerto
	fmt.Println("Server on port", 8000)
	handler := cors.Default().Handler(router)
	log.Fatal((http.ListenAndServe(":8000", handler)))
	http.Handle("/", router)
}
