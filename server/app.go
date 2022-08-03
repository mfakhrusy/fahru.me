package main

import (
	"context"
	"log"

	"github.com/edgedb/edgedb-go"
)

func main() {
	ctx := context.Background()
	db, err := edgedb.CreateClient(ctx, edgedb.Options{})

	// opts := edgedb.Options{
	// 	Database: "edgedb",
	// 	User:     "edgedb",
	// 	TLSOptions: edgedb.TLSOptions{
	// 		SecurityMode: "insecure",
	// 	},
	// }

	// db, err := edgedb.CreateClientDSN(ctx, url, opts)

	if err != nil {
		log.Fatal(err)
	}

	// create a user object type.
	err = db.Execute(ctx, `
	    CREATE TYPE User {
	        CREATE REQUIRED PROPERTY name -> str;
	        CREATE PROPERTY dob -> datetime;
	    }
	`)

	if err != nil {
		log.Fatal(err)
	}
}
