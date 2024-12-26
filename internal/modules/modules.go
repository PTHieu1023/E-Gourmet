package modules

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
	"go.uber.org/zap"
	"hiusnef/e-gourmet/internal/modules/restaurant"
)

func RegisterModules(app *fiber.App, db *sqlx.DB, logger *zap.Logger) {
	restaurant.Register(app, db, logger)
}
