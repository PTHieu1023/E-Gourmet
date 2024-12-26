package app

import (
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
	"hiusnef/e-gourmet/internal/server/middleware/errorhandler"
)

type Config struct {
	Name          string `mapstructure:"name"`
	Port          int    `mapstructure:"port"`
	Header        string `mapstructure:"header"`
	Prefork       bool   `mapstructure:"prefork"`
	CaseSensitive bool   `mapstructure:"case-sensitive"`
	Immutable     bool   `mapstructure:"immutable"`
}

func New(conf *Config, logger *zap.Logger) *fiber.App {
	return fiber.New(fiber.Config{
		AppName:       conf.Name,
		ServerHeader:  conf.Header,
		Prefork:       conf.Prefork,
		CaseSensitive: conf.CaseSensitive,
		Immutable:     conf.Immutable,
		ErrorHandler:  errorhandler.New(logger),
	})
}
