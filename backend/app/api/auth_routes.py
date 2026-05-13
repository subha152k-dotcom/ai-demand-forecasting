from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from app.models.forecast_model import ForecastHistory
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.connection import engine

from app.models.user_model import User
from app.models.user_model import Base
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user_schema import UserRegister
from app.schemas.user_schema import UserLogin
from app.models.dataset_model import Dataset
from app.core.security import hash_password
from app.core.security import verify_password
from app.core.security import create_access_token

Base.metadata.create_all(bind=engine)

router = APIRouter()


@router.post("/register")
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    if not verify_password(
        form_data.password,
        user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token(
        data={
            "sub": user.email,
            "role": user.role
        }
    )

    return {

        "access_token": access_token,

        "token_type": "bearer"
    }