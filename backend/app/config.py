from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENVIRONMENT: str = "production"
    ALLOWED_ORIGINS: list = ["*"]
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"

settings = Settings()