from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.connection import Base


class Dataset(Base):

    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)

    file_name = Column(String(255), nullable=False)

    file_path = Column(String(500), nullable=False)

    uploaded_by = Column(
        String(150),
        nullable=False
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )