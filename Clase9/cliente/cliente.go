package main

import (
	pb "cliente/proto" // nombre_proyecto/carpeta
	"context"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
)

var ctx = context.Background()

type Data struct {
	Sede         string
	Municipio    string
	Departamento string
	Partido      string
}

func insertData(c *fiber.Ctx) error {
	var data map[string]string
	e := c.BodyParser(&data)
	if e != nil {
		return e
	}

	voto := Data{
		Sede:         data["sede"],
		Municipio:    data["municipio"],
		Departamento: data["departamento"],
		Partido:      data["partido"],
	}
	fmt.Println(voto)
	go sendServer(voto)
	return nil
}

func sendServer(voto Data) {
	//conn, err := grpc.Dial("localhost:3001", grpc.WithTransportCredentials(insecure.NewCredentials()), grpc.WithBlock())
	conn, err := grpc.Dial("localhost:3001", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalln(err)
	}

	cl := pb.NewGetInfoClient(conn)
	defer func(conn *grpc.ClientConn) {
		err := conn.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(conn)

	ret, err := cl.ReturnInfo(ctx, &pb.RequestId{
		Sede:         voto.Sede,
		Municipio:    voto.Municipio,
		Departamento: voto.Departamento,
		Partido:      voto.Partido,
	})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("Respuesta del server " + ret.GetInfo())
}

func main() {
	app := fiber.New()

	app.Get("/grpc", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"res": "todo bien",
		})
	})
	app.Post("/grpc/insert", insertData)

	err := app.Listen(":3000")
	if err != nil {
		return
	}
}
