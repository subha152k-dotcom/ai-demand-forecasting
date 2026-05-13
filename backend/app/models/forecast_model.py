from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime

from datetime import datetime

from app.database.connection import Base


class ForecastHistory(Base):

    __tablename__ = "forecast_history"

    id = Column(Integer, primary_key=True, index=True)

    uploaded_file = Column(
        String(255),
        nullable=False
    )

    predicted_sales = Column(
        Float,
        nullable=False
    )

    forecast_month = Column(
        Integer,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )