package presenter

import "hiusnef/e-gourmet/internal/modules/restaurant/models"

type RestaurantRes struct {
	*models.Restaurant `json:"data"`
}
