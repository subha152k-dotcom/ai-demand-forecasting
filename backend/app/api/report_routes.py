from fastapi import APIRouter

import pandas as pd
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/download-report")
def download_report():

    data = {

        "Month": [
            "January",
            "February",
            "March"
        ],

        "Sales": [
            40000,
            50000,
            60000
        ]
    }

    df = pd.DataFrame(data)

    file_path = "sales_report.xlsx"

    df.to_excel(
        file_path,
        index=False
    )

    return {
        "message": "Report generated successfully",
        "file": file_path
    }

@router.get("/report-summary")
def report_summary():

    summary = {

        "total_uploaded_datasets": 12,

        "total_forecasts_generated": 28,

        "forecast_accuracy": "94%",

        "top_selling_product": "Milk"
    }

    return {
        "report_summary": summary
    }

@router.get("/export-forecast-history")
def export_forecast_history():

    data = {

        "Month": [
            "May",
            "June",
            "July"
        ],

        "Predicted Sales": [
            220,
            250,
            280
        ]
    }

    df = pd.DataFrame(data)

    file_path = "forecast_history_report.xlsx"

    df.to_excel(
        file_path,
        index=False
    )

    return FileResponse(
        path=file_path,
        filename=file_path,
        media_type="application/octet-stream"
    )