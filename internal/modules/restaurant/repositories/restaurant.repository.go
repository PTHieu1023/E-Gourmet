package repositories

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/jmoiron/sqlx"
	"hiusnef/e-gourmet/internal/modules/restaurant/models"
	"hiusnef/e-gourmet/pkg/pagination"
)

type RestaurantRepository struct {
	DB *sqlx.DB
}

func NewRestaurantRepository(db *sqlx.DB) *RestaurantRepository {
	return &RestaurantRepository{
		DB: db,
	}
}

func (r *RestaurantRepository) GetAll(filter *pagination.PageFilter) (*pagination.Pagination, error) {
	// Query to get the total count of restaurants for pagination
	var totalCount int
	err := r.DB.QueryRow(
		"SELECT COUNT(*) FROM restaurants r",
	).Scan(&totalCount)
	if err != nil {
		return nil, err
	}

	// Calculate the total number of pages
	totalPages := (totalCount + filter.Size - 1) / filter.Size // Ceiling division

	// Pagination query with ordering
	var restaurants []interface{}
	query := "SELECT " +
		"r.*, " +
		"CASE " +
		"WHEN COUNT(m.id) = 0 THEN NULL " +
		"ELSE json_agg(json_build_object('id', m.id, 'name', m.name)) " +
		"END AS menus " +
		"FROM restaurants r " +
		"LEFT JOIN public.menus m ON r.id = m.restaurant_id " +
		"GROUP BY r.id, r.name "

	for index, order := range filter.OrderBy {
		if index == 0 {
			query += " ORDER BY "
		} else {
			query += ", "
		}

		if order[0] == '-' {
			query += fmt.Sprintf(" %s DESC ", order[1:])
		} else {
			query += order
		}
	}

	rows, err := r.DB.Query(
		query+" LIMIT $1 OFFSET $2 ",
		filter.Size, (filter.Page-1)*filter.Size,
	)

	if err != nil {
		return nil, err
	}

	defer func() { _ = rows.Close() }()

	// Scan the results into the restaurants slice
	for rows.Next() {
		restaurant := models.Restaurant{}
		var menus sql.NullString
		err = rows.Scan(&restaurant.Id, &restaurant.Name, &menus)
		if err != nil {
			return nil, err
		}

		if menus.Valid {
			err = json.Unmarshal([]byte(menus.String), &restaurant.Menu)
			if err != nil {
				return nil, err
			}
		}

		restaurants = append(restaurants, restaurant)
	}

	// Build pagination result
	result := &pagination.Pagination{
		Page:       filter.Page,
		Size:       filter.Size,
		TotalCount: totalCount,
		TotalPage:  totalPages,
		Count:      len(restaurants), // The number of restaurants returned in this page
		Content:    restaurants,      // Assuming this field exists in Pagination struct
	}

	return result, nil
}
