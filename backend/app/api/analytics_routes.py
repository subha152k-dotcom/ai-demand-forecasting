from fastapi import APIRouter


router = APIRouter()


@router.get("/dashboard-analytics")
def dashboard_analytics():

    return {

        "total_sales": 250000,

        "monthly_sales": [
            {
                "month": "January",
                "sales": 40000
            },
            {
                "month": "February",
                "sales": 50000
            },
            {
                "month": "March",
                "sales": 60000
            }
        ],

        "forecast_accuracy": "94%",

        "top_products": [
            "Milk",
            "Rice",
            "Sugar"
        ]
    }

@router.get("/top-products")
def top_products():

    products = [

        {
            "product_name": "Milk",
            "sales": 1200
        },

        {
            "product_name": "Rice",
            "sales": 950
        },

        {
            "product_name": "Sugar",
            "sales": 870
        }
    ]

    sorted_products = sorted(
        products,
        key=lambda x: x["sales"],
        reverse=True
    )

    return {
        "top_products": sorted_products
    }

@router.get("/monthly-revenue")
def monthly_revenue():

    revenue_data = [

        {
            "month": "January",
            "revenue": 45000
        },

        {
            "month": "February",
            "revenue": 52000
        },

        {
            "month": "March",
            "revenue": 61000
        },

        {
            "month": "April",
            "revenue": 70000
        }
    ]

    total_revenue = sum(
        item["revenue"]
        for item in revenue_data
    )

    return {

        "total_revenue": total_revenue,

        "monthly_revenue": revenue_data
    }

@router.get("/forecast-accuracy")
def forecast_accuracy():

    actual_sales = [
        100,
        120,
        140,
        160
    ]

    predicted_sales = [
        98,
        118,
        145,
        158
    ]

    total_error = 0

    for actual, predicted in zip(
        actual_sales,
        predicted_sales
    ):

        total_error += abs(
            actual - predicted
        )

    average_error = total_error / len(
        actual_sales
    )

    accuracy = 100 - average_error

    return {

        "forecast_accuracy_percentage": round(
            accuracy,
            2
        )
    }

@router.get("/sales-trends")
def sales_trends():

    sales_data = [

        {
            "month": "January",
            "sales": 30000
        },

        {
            "month": "February",
            "sales": 45000
        },

        {
            "month": "March",
            "sales": 55000
        },

        {
            "month": "April",
            "sales": 70000
        }
    ]

    trend = "Increasing"

    return {

        "sales_trend": trend,

        "monthly_sales": sales_data
    }

@router.get("/demand-insights")
def demand_insights():

    insights = [

        "Milk demand is increasing steadily",

        "Rice sales show seasonal growth",

        "Sugar demand is stable",

        "Forecast indicates higher sales next month"
    ]

    return {
        "business_insights": insights
    }

@router.get("/product-demand-ranking")
def product_demand_ranking():

    products = [

        {
            "product": "Milk",
            "demand_score": 95
        },

        {
            "product": "Rice",
            "demand_score": 90
        },

        {
            "product": "Sugar",
            "demand_score": 82
        },

        {
            "product": "Oil",
            "demand_score": 75
        }
    ]

    ranked_products = sorted(
        products,
        key=lambda x: x["demand_score"],
        reverse=True
    )

    return {
        "product_demand_ranking": ranked_products
    }

@router.get("/business-growth")
def business_growth():

    previous_month_sales = 50000

    current_month_sales = 65000

    growth_percentage = (

        (current_month_sales - previous_month_sales)

        / previous_month_sales

    ) * 100

    return {

        "previous_month_sales": previous_month_sales,

        "current_month_sales": current_month_sales,

        "growth_percentage": round(
            growth_percentage,
            2
        )
    }
@router.get("/system-health")
def system_health():

    return {

        "api_status": "Running",

        "database_status": "Connected",

        "forecast_engine": "Active",

        "system_version": "1.0.0"
    }
@router.get("/sales-performance")
def sales_performance():

    performance = {

        "best_month": "April",

        "highest_sales": 70000,

        "average_monthly_sales": 56000,

        "performance_status": "Excellent"
    }

    return {
        "sales_performance": performance
    }
@router.get("/low-demand-products")
def low_demand_products():

    products = [

        {
            "product_name": "Jam",
            "sales": 120
        },

        {
            "product_name": "Butter",
            "sales": 150
        },

        {
            "product_name": "Cheese",
            "sales": 180
        }
    ]

    return {
        "low_demand_products": products
    }

@router.get("/kpi-metrics")
def kpi_metrics():

    metrics = {

        "total_products": 125,

        "active_datasets": 18,

        "forecast_models_trained": 32,

        "prediction_success_rate": "94%",

        "monthly_growth_rate": "18%"
    }

    return {
        "kpi_metrics": metrics
    }
@router.get("/inventory-suggestions")
def inventory_suggestions():

    suggestions = [

        {
            "product": "Milk",
            "recommended_stock": 500
        },

        {
            "product": "Rice",
            "recommended_stock": 350
        },

        {
            "product": "Sugar",
            "recommended_stock": 250
        }
    ]

    return {
        "inventory_suggestions": suggestions
    }

@router.get("/business-recommendations")
def business_recommendations():

    recommendations = [

        "Increase Milk inventory for next month",

        "Promote Rice products during festival season",

        "Reduce low-demand stock items",

        "Train forecasting model weekly for better accuracy"
    ]

    return {
        "business_recommendations": recommendations
    }

@router.get("/stock-risk-analysis")
def stock_risk_analysis():

    risks = [

        {
            "product": "Milk",
            "risk": "Low Stock Risk"
        },

        {
            "product": "Rice",
            "risk": "Balanced Stock"
        },

        {
            "product": "Sugar",
            "risk": "Overstock Risk"
        }
    ]

    return {
        "stock_risk_analysis": risks
    }

@router.get("/executive-summary")
def executive_summary():

    summary = {

        "total_revenue": 350000,

        "forecast_growth": "22%",

        "top_product": "Milk",

        "forecast_accuracy": "94%",

        "system_health": "Excellent"
    }

    return {
        "executive_dashboard_summary": summary
    }

@router.get("/regional-demand")
def regional_demand():

    regions = [

        {
            "region": "Chennai",
            "high_demand_product": "Milk"
        },

        {
            "region": "Bangalore",
            "high_demand_product": "Rice"
        },

        {
            "region": "Hyderabad",
            "high_demand_product": "Sugar"
        }
    ]

    return {
        "regional_demand_analysis": regions
    }

@router.get("/profit-estimation")
def profit_estimation():

    estimated_revenue = 900000

    estimated_expense = 650000

    estimated_profit = (
        estimated_revenue - estimated_expense
    )

    return {

        "estimated_revenue": estimated_revenue,

        "estimated_expense": estimated_expense,

        "estimated_profit": estimated_profit
    }

@router.get("/customer-purchase-insights")
def customer_purchase_insights():

    insights = [

        {
            "customer_type": "Retail",
            "most_purchased_product": "Milk"
        },

        {
            "customer_type": "Wholesale",
            "most_purchased_product": "Rice"
        },

        {
            "customer_type": "Online",
            "most_purchased_product": "Snacks"
        }
    ]

    return {
        "customer_purchase_insights": insights
    }

@router.get("/restock-priority")
def restock_priority():

    priorities = [

        {
            "product": "Milk",
            "priority": "High"
        },

        {
            "product": "Rice",
            "priority": "Medium"
        },

        {
            "product": "Sugar",
            "priority": "Low"
        }
    ]

    return {
        "restock_priorities": priorities
    }

@router.get("/inventory-turnover")
def inventory_turnover():

    turnover = [

        {
            "product": "Milk",
            "turnover_rate": "Fast Moving"
        },

        {
            "product": "Rice",
            "turnover_rate": "Moderate"
        },

        {
            "product": "Sugar",
            "turnover_rate": "Slow Moving"
        }
    ]

    return {
        "inventory_turnover_analysis": turnover
    }