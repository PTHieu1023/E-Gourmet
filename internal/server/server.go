package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
	"go.uber.org/zap"
	"hiusnef/e-gourmet/internal/server/app"
	"hiusnef/e-gourmet/internal/server/config"
	"hiusnef/e-gourmet/internal/server/database"
	"hiusnef/e-gourmet/internal/server/logger"
)

var _app *fiber.App
var _db *sqlx.DB
var _conf *config.Config
var _log *zap.Logger

func Config() *config.Config {
	if _conf == nil {
		_conf = config.New()
		Logger().Info("Initiated configs")
	}
	return _conf
}

func Logger() *zap.Logger {
	if _log == nil {
		_log = logger.New(Config().Logger, Config().Server.Prefork)
		Logger().Info("Initiated logger")
	}
	return _log
}

func DB() *sqlx.DB {
	if _db == nil {
		_db = database.New(Config().Database)
		Logger().Info("Initiated database")
	}
	return _db
}

func App() *fiber.App {
	if _app == nil {
		_app = app.New(Config().Server, Logger())
		Logger().Info("Initiated app")
	}
	return _app
}
