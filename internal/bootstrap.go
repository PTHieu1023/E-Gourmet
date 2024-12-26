package internal

import (
	"fmt"
	"github.com/gofiber/swagger"
	"hiusnef/e-gourmet/internal/modules"
	"hiusnef/e-gourmet/internal/server"
	"os"
	"os/signal"
	"syscall"
	"time"

	"go.uber.org/zap"

	// Built in middlewares
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"

	//Custom middlewares
	"hiusnef/e-gourmet/internal/server/middleware/logger"

	_ "hiusnef/e-gourmet/docs"
)

func start() {
	port := fmt.Sprintf(":%d", server.Config().Server.Port)
	if err := server.App().Listen(port); err != nil {
		server.Logger().Error("Failed to start server", zap.Error(err))
	}
}

func cleanDB() {
	if err := server.DB().Close(); err != nil {
		server.Logger().Error("Error closing database", zap.Error(err))
	} else {
		server.Logger().Info("Database closed successfully.")
	}
}

func shutdown(isRunning chan bool) {
	if server.App() == nil {
		server.Logger().Fatal("App not found")
	}

	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	<-signalChannel // Block until a termination signal is received

	server.Logger().Info("Gracefully shutting down the server...")

	if err := server.App().ShutdownWithTimeout(5 * time.Second); err != nil {
		server.Logger().Error("Error during server shutdown", zap.Error(err))
	}

	// Run cleanup tasks
	server.Logger().Info("Running cleanup tasks...")
	cleanDB()

	server.Logger().Info("Server shutdown complete.")

	// Notify the main goroutine
	isRunning <- false
}

func Bootstrap() {
	isRunning := make(chan bool, 1)

	server.App().Use(logger.New(server.Logger()))
	server.App().Use(recover.New())
	server.App().Use(cors.New(cors.Config{
		AllowOrigins: server.Config().CORS.AllowOrigins,
		AllowMethods: server.Config().CORS.AllowMethods,
		AllowHeaders: server.Config().CORS.AllowHeaders,
	}))
	server.App().Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	server.App().Static(server.Config().Storage.URLPrefix, server.Config().Storage.ResourcePath)

	server.App().Get("/api-docs/*", swagger.HandlerDefault)
	// Assign router and handler into app
	modules.RegisterModules(server.App(), server.DB(), server.Logger())

	server.Logger().Info("Completed setting up server!")

	go start()
	go shutdown(isRunning)

	<-isRunning
}
