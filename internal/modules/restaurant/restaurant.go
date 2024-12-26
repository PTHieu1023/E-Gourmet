package restaurant

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
	"go.uber.org/zap"
	"hiusnef/e-gourmet/internal/modules/restaurant/controllers"
	"hiusnef/e-gourmet/internal/modules/restaurant/repositories"
	"hiusnef/e-gourmet/internal/modules/restaurant/services"
)

var (
	restaurantCtrl *controllers.RestaurantController
	restaurantSrv  *services.RestaurantService
	restaurantRepo *repositories.RestaurantRepository
)

func GetRestaurantRepository() *repositories.RestaurantRepository {
	return restaurantRepo
} // Export for other module usage

func Register(app *fiber.App, db *sqlx.DB, logger *zap.Logger) {
	restaurantRepo = repositories.NewRestaurantRepository(db)
	restaurantSrv = services.NewRestaurantService(restaurantRepo, logger)
	restaurantCtrl = controllers.NewRestaurantController(restaurantSrv, logger)
	registerHttpApi(app)
}

func registerHttpApi(app *fiber.App) {
	app.Group("/api").
		Group("/v1/restaurant").
		Get("/", restaurantCtrl.GetAll).
		Get("/error", func(ctx *fiber.Ctx) error {
			return fiber.NewError(fiber.StatusBadRequest, "Something went wrong")
		}).
		Get("/panic", func(ctx *fiber.Ctx) error {
			panic("Panic pro")
		})
}
