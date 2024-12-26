package controllers

import (
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
	"hiusnef/e-gourmet/internal/modules/restaurant/services"
	"hiusnef/e-gourmet/pkg/pagination"
)

type RestaurantController struct {
	logger            *zap.Logger
	restaurantService *services.RestaurantService
}

func NewRestaurantController(restaurantService *services.RestaurantService, logger *zap.Logger) *RestaurantController {
	return &RestaurantController{
		logger:            logger,
		restaurantService: restaurantService,
	}
}

// GetAll godoc
//
//	@Summary		Get list of restaurant
//	@Description	Get list of restaurant
//	@Tags			restaurants
//	@Accept			json
//	@Produce		json
//	@Success		200		{string}  string  "OK"
//	@Failure		400		{string}  error  "Bad Request"
//	@Router			/api/v1/restaurant [get]
func (uc *RestaurantController) GetAll(ctx *fiber.Ctx) error {
	filter, err := pagination.GetPageFilter(ctx)
	if err != nil {
		return err
	}
	restaurants, err := uc.restaurantService.GetAll(filter)

	if err != nil {
		return err
	}

	return ctx.JSON(restaurants)
}
