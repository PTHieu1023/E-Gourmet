package models

type Restaurant struct {
	Id   string `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
	Menu []struct {
		Id   string `json:"id" `
		Name string `json:"name"`
	} `json:"menu"`
}
