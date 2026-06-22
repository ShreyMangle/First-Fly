import os
from functools import lru_cache


class Settings:
    """Centralized application settings loaded from environment variables."""

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
    )

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./edupath.db")

    # CORS — comma-separated list of allowed origins
    ALLOWED_ORIGINS: list[str] = [
        o.strip()
        for o in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if o.strip()
    ]

    # App metadata
    APP_ENV: str = os.getenv("APP_ENV", "development")
    APP_TITLE: str = "First Fly API"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = (
        "MHT-CET college recommendation engine — "
        "data-driven admission probability predictions."
    )

    def validate(self) -> None:
        """Raise on missing critical secrets in production."""
        if self.APP_ENV == "production" and not self.SECRET_KEY:
            raise RuntimeError(
                "SECRET_KEY environment variable must be set in production. "
                "Generate one with: python -c \"import secrets; print(secrets.token_hex(32))\""
            )
        if not self.SECRET_KEY:
            # Dev fallback — warn loudly but don't crash
            import warnings
            warnings.warn(
                "SECRET_KEY is not set. Using an insecure default. "
                "Set SECRET_KEY in your .env file before deploying.",
                stacklevel=2,
            )
            self.SECRET_KEY = "dev-insecure-fallback-change-me"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    settings = Settings()
    settings.validate()
    return settings
