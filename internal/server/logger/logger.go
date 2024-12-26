package logger

import (
	"fmt"
	"go.uber.org/zap"
	"gopkg.in/natefinch/lumberjack.v2"
	"hiusnef/e-gourmet/pkg/logger"
)

type Config struct {
	Enable    bool   `mapstructure:"enable"`
	Level     string `mapstructure:"level"`
	FileName  string `mapstructure:"filename"`
	DirPath   string `mapstructure:"dir-path"`
	MaxSize   int    `mapstructure:"max-size"`
	MaxBackup int    `mapstructure:"max-backup"`
	MaxAge    int    `mapstructure:"max-age"`
	LocalTime bool   `mapstructure:"local-time"`
	Compress  bool   `mapstructure:"compress"`
}

func logFilePath(isForked bool, conf *Config) string {
	if isForked {
		return fmt.Sprintf("%s/%d/%s.log", conf.DirPath, isForked, conf.FileName)
	}
	return fmt.Sprintf("%s/%s.log", conf.DirPath, conf.FileName)
}

func New(conf *Config, isForked bool) *zap.Logger {
	return logger.NewLogger(
		conf.Level, &lumberjack.Logger{
			Filename:   logFilePath(isForked, conf),
			MaxSize:    conf.MaxSize,
			MaxAge:     conf.MaxAge,
			MaxBackups: conf.MaxBackup,
			LocalTime:  conf.LocalTime,
			Compress:   conf.Compress,
		},
	)
}
