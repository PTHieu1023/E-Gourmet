package database

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"

	// Database drivers
	_ "github.com/lib/pq"
)

type Config struct {
	Driver          string `mapstructure:"driver"`
	Host            string `mapstructure:"host"`
	Port            int    `mapstructure:"port"`
	User            string `mapstructure:"user"`
	Password        string `mapstructure:"password"`
	DBName          string `mapstructure:"dbname"`
	SSLMode         string `mapstructure:"sslmode"`
	IdlePoolSize    int    `mapstructure:"idle-pool-size"`
	MaxPoolSize     int    `mapstructure:"max-pool-size"`
	IdlePoolTimeout string `mapstructure:"idle-pool-timeout"`
	MaxPoolTimeout  string `mapstructure:"max-pool-timeout"`
}

func New(conf *Config) *sqlx.DB {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		conf.Host, conf.Port, conf.User, conf.Password, conf.DBName, conf.SSLMode)

	DB, err := sqlx.Connect(conf.Driver, dsn)
	if err != nil {
		panic(err)
	}

	DB.SetMaxIdleConns(conf.IdlePoolSize)
	DB.SetMaxOpenConns(conf.MaxPoolSize)
	if idlePoolTimeout, err := time.ParseDuration(conf.IdlePoolTimeout); err == nil {
		DB.SetConnMaxIdleTime(idlePoolTimeout)
	}
	if maxPoolTimeout, err := time.ParseDuration(conf.MaxPoolTimeout); err == nil {
		DB.SetConnMaxLifetime(maxPoolTimeout)
	}
	return DB
}
