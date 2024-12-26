package config

import (
	"github.com/spf13/viper"
	"hiusnef/e-gourmet/internal/server/app"
	"hiusnef/e-gourmet/internal/server/database"
	"hiusnef/e-gourmet/internal/server/logger"
	"hiusnef/e-gourmet/internal/server/middleware/cors"
	"hiusnef/e-gourmet/internal/server/middleware/storage"

	"os"
	"strings"
)

type Config struct {
	Server   *app.Config      `mapstructure:"server"`
	Storage  *storage.Config  `mapstructure:"storage"`
	Logger   *logger.Config   `mapstructure:"logger"`
	CORS     *cors.Config     `mapstructure:"cors"`
	Database *database.Config `mapstructure:"database"`
}

func New() *Config {
	v := viper.New()
	v.AddConfigPath("./configs")
	v.SetConfigName("default.properties")
	v.SetConfigType("yaml")

	if err := v.ReadInConfig(); err != nil {
		panic(err)
	}

	customConfigFile := os.Getenv("CONFIG_FILE_PATH")
	v.SetConfigFile(customConfigFile)

	if err := v.MergeInConfig(); err != nil {
		panic(err)
	}

	v.AutomaticEnv()
	v.SetEnvPrefix("EG")
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	var conf Config
	if err := v.Unmarshal(&conf); err != nil {
		panic(err)
	}

	return &conf
}
