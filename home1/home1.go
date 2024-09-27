package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Store struct {
	Data map[string]Value `json:"data"`
}

type Value struct {
	Value string `json:"value"`
}

func readStore(filename string) (*Store, error) {
	file, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	var store Store
	err = json.Unmarshal(file, &store)
	if err != nil {
		return nil, err
	}
	if store.Data == nil {
		store.Data = make(map[string]Value)
	}
	return &store, nil
}

func writeStore(store *Store, filename string) error {
	file, err := json.MarshalIndent(store, "", " ")
	if err != nil {
		return err
	}
	err = os.WriteFile(filename, file, 0644)
	if err != nil {
		return err
	}
	return nil
}

func main() {
	filename := "store.json"
	store, _ := readStore(filename)
	defer writeStore(store, filename)

	for {
		fmt.Println("1.命令行\n")
		fmt.Println("2.使用说明\n")
		fmt.Println("3.退出程序\n")
		var sixflower string
		fmt.Scanln(&sixflower)
		switch sixflower {
		case "2":
			fmt.Println("想要SET请按 4")
			fmt.Println("想要GET请按 5")
			fmt.Println("想要DEL请按 6")
		case "4":
			fmt.Println("Enter key and value:")
			var key, val string
			fmt.Scanln(&key, &val)
			store.Data[key] = Value{Value: val}
			fmt.Println("Set complete.")
		case "5":
			fmt.Println("Enter key to get:")
			var key string
			fmt.Scanln(&key)
			val, exists := store.Data[key]
			if !exists {
				fmt.Println("Key not found.")
			} else {
				fmt.Printf("%s: %s\n", key, val.Value)
			}
		case "6":
			fmt.Println("Enter key to delete:")
			var key string
			fmt.Scanln(&key)
			delete(store.Data, key)
			fmt.Println("Delete complete.")
		case "3":
			fmt.Println("Exiting...")
			os.Exit(0)
		default:
			fmt.Println("Invalid command.")
		}
	}
}