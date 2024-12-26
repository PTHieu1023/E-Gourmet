package services

import (
	"go.uber.org/zap"
	"hiusnef/e-gourmet/internal/modules/restaurant/repositories"
	"hiusnef/e-gourmet/pkg/pagination"
)

type RestaurantService struct {
	logger               *zap.Logger
	restaurantRepository *repositories.RestaurantRepository
}

func NewRestaurantService(restaurantRepository *repositories.RestaurantRepository, logger *zap.Logger) *RestaurantService {
	return &RestaurantService{
		logger:               logger,
		restaurantRepository: restaurantRepository,
	}

}

func (rs *RestaurantService) GetAll(filter *pagination.PageFilter) (*pagination.Pagination, error) {
	rs.logger.Debug("Get all Restaurants")
	return rs.restaurantRepository.GetAll(filter)
}
