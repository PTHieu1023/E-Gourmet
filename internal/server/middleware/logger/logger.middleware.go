package logger

import (
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
	"time"
)

type Config struct {
	*zap.Logger
}

func New(logger *zap.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		c.Locals("startTime", time.Now())

		if err := c.Next(); err != nil {
			return err
		}

		fields := []zap.Field{
			zap.String("method", c.Method()),
			zap.String("ip", c.IP()),
			zap.Int("status", c.Response().StatusCode()),
			zap.String("latency", time.Since(c.Locals("startTime").(time.Time)).String()),
			zap.String("url", c.OriginalURL()),
		}

		logger.Info("Request", fields...)
		return nil
	}
}
