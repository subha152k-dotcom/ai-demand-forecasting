from fastapi import FastAPI

from app.api.auth_routes import router as auth_router

from app.api.dataset_routes import router as dataset_router

from app.api.forecast_routes import router as forecast_router

from app.api.analytics_routes import router as analytics_router

from app.api.report_routes import router as report_router

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(

    title="Advanced AI Demand Forecasting API",

    description="""
    AI-powered demand forecasting system
    with authentication, dataset upload,
    analytics, forecasting, and reporting.
    """,

    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    tags=["Authentication"]
)

app.include_router(
    dataset_router,
    tags=["Dataset Management"]
)

app.include_router(
    forecast_router,
    tags=["AI Forecasting"]
)

app.include_router(
    analytics_router,
    tags=["Analytics"]
)

app.include_router(
    report_router,
    tags=["Reports"]
)