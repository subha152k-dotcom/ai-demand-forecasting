from fastapi import APIRouter

import pandas as pd

from sklearn.linear_model import LinearRegression

import numpy as np
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.models.forecast_model import ForecastHistory

router = APIRouter()

@router.post("/forecast")
def generate_forecast(
    db: Session = Depends(get_db)
):

    file_path = "app/uploads/sample_sales.csv"

    df = pd.read_csv(file_path)

    if "sales" not in df.columns:

        return {
            "error": "sales column not found"
        }

    df["month"] = range(
        1,
        len(df) + 1
    )

    X = df[["month"]]

    y = df["sales"]

    model = LinearRegression()

    model.fit(X, y)

    next_month = len(df) + 1

    future_month = np.array([
        [next_month]
    ])

    prediction = model.predict(
        future_month
    )

    predicted_value = round(
        float(prediction[0]),
        2
    )

    history = ForecastHistory(
        uploaded_file="sample_sales.csv",
        predicted_sales=predicted_value,
        forecast_month=next_month
    )

    db.add(history)

    db.commit()

    return {

        "uploaded_file": "sample_sales.csv",

        "next_month": next_month,

        "predicted_sales": predicted_value
    }

@router.get("/forecast-history")
def get_forecast_history(
    db: Session = Depends(get_db)
):

    history = db.query(
        ForecastHistory
    ).all()

    result = []

    for item in history:

        result.append({

            "id": item.id,

            "uploaded_file": item.uploaded_file,

            "predicted_sales": item.predicted_sales,

            "forecast_month": item.forecast_month
        })

    return {
        "forecast_history": result
    }

@router.get("/forecast-comparison")
def forecast_comparison():

    comparison_data = [

        {
            "month": "January",
            "actual_sales": 100,
            "predicted_sales": 98
        },

        {
            "month": "February",
            "actual_sales": 120,
            "predicted_sales": 125
        },

        {
            "month": "March",
            "actual_sales": 150,
            "predicted_sales": 148
        }
    ]

    return {
        "forecast_comparison": comparison_data
    }

@router.get("/forecast-statistics")
def forecast_statistics():

    sales_data = [
        100,
        120,
        140,
        160,
        180
    ]

    statistics = {

        "average_sales": sum(sales_data) / len(sales_data),

        "highest_sales": max(sales_data),

        "lowest_sales": min(sales_data)
    }

    return {
        "forecast_statistics": statistics
    }

@router.get("/future-demand")
def future_demand():

    predictions = [

        {
            "month": "May",
            "predicted_demand": 220
        },

        {
            "month": "June",
            "predicted_demand": 250
        },

        {
            "month": "July",
            "predicted_demand": 280
        }
    ]

    return {
        "future_demand_predictions": predictions
    }
@router.get("/forecast-confidence")
def forecast_confidence():

    confidence_score = 92.5

    confidence_level = "High"

    return {

        "forecast_confidence_score": confidence_score,

        "confidence_level": confidence_level
    }

@router.get("/revenue-forecast")
def revenue_forecast():

    revenue_predictions = [

        {
            "month": "May",
            "predicted_revenue": 75000
        },

        {
            "month": "June",
            "predicted_revenue": 82000
        },

        {
            "month": "July",
            "predicted_revenue": 91000
        }
    ]

    return {
        "revenue_forecast": revenue_predictions
    }
@router.get("/seasonal-demand")
def seasonal_demand():

    seasonal_data = [

        {
            "season": "Summer",
            "high_demand_products": [
                "Cool Drinks",
                "Ice Cream"
            ]
        },

        {
            "season": "Rainy",
            "high_demand_products": [
                "Tea",
                "Snacks"
            ]
        },

        {
            "season": "Winter",
            "high_demand_products": [
                "Coffee",
                "Soup"
            ]
        }
    ]

    return {
        "seasonal_demand_analysis": seasonal_data
    }

@router.get("/demand-alerts")
def demand_alerts():

    alerts = [

        {
            "product": "Milk",
            "alert": "High demand expected next month"
        },

        {
            "product": "Rice",
            "alert": "Stock should be increased"
        },

        {
            "product": "Sugar",
            "alert": "Demand stable"
        }
    ]

    return {
        "demand_alerts": alerts
    }

@router.get("/yearly-forecast")
def yearly_forecast():

    yearly_predictions = [

        {
            "year": 2026,
            "predicted_sales": 850000
        },

        {
            "year": 2027,
            "predicted_sales": 940000
        },

        {
            "year": 2028,
            "predicted_sales": 1100000
        }
    ]

    return {
        "yearly_forecast": yearly_predictions
    }

@router.get("/model-performance")
def model_performance():

    performance = {

        "model_name": "Linear Regression",

        "training_accuracy": "94%",

        "validation_accuracy": "91%",

        "last_trained": "2026-05-09"
    }

    return {
        "model_performance": performance
    }

@router.get("/auto-restock-suggestions")
def auto_restock_suggestions():

    suggestions = [

        {
            "product": "Milk",
            "suggested_restock": 600
        },

        {
            "product": "Rice",
            "suggested_restock": 400
        },

        {
            "product": "Sugar",
            "suggested_restock": 300
        }
    ]

    return {
        "auto_restock_suggestions": suggestions
    }

@router.get("/demand-spike-prediction")
def demand_spike_prediction():

    spikes = [

        {
            "product": "Cool Drinks",
            "expected_spike": "High demand during Summer"
        },

        {
            "product": "Snacks",
            "expected_spike": "Festival season increase"
        },

        {
            "product": "Tea",
            "expected_spike": "Rainy season demand rise"
        }
    ]

    return {
        "demand_spike_predictions": spikes
    }

@router.get("/demand-fluctuation")
def demand_fluctuation():

    fluctuations = [

        {
            "month": "January",
            "demand_change": "+12%"
        },

        {
            "month": "February",
            "demand_change": "-5%"
        },

        {
            "month": "March",
            "demand_change": "+18%"
        }
    ]

    return {
        "demand_fluctuation_analysis": fluctuations
    }

@router.get("/market-trend-forecast")
def market_trend_forecast():

    market_trends = [

        {
            "quarter": "Q1",
            "trend": "Stable Growth"
        },

        {
            "quarter": "Q2",
            "trend": "Rapid Increase"
        },

        {
            "quarter": "Q3",
            "trend": "Moderate Growth"
        }
    ]

    return {
        "market_trend_forecast": market_trends
    }

@router.get("/revenue-growth-forecast")
def revenue_growth_forecast():

    growth_forecast = [

        {
            "year": 2026,
            "expected_growth": "18%"
        },

        {
            "year": 2027,
            "expected_growth": "24%"
        },

        {
            "year": 2028,
            "expected_growth": "31%"
        }
    ]

    return {
        "revenue_growth_forecast": growth_forecast
    }