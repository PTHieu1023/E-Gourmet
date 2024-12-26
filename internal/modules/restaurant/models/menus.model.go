package models

type Menu struct {
	Id         string `json:"id" db:"id"`
	Name       string `json:"name" db:"name"`
	Restaurant struct {
		Id   string `json:"id" db:"id"`
		Name string `json:"name" db:"name"`
	} `json:"restaurant" db:"restaurant"`
}
