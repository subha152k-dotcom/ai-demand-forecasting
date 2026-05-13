from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException
import pandas as pd
import os
import shutil

from sqlalchemy.orm import Session

from fastapi.responses import FileResponse

from app.database.connection import get_db

from app.core.auth_dependency import admin_required

from app.models.dataset_model import Dataset

from fastapi import Depends

from app.core.auth_dependency import get_current_user

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@router.post("/upload-dataset")
def upload_dataset(
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    allowed_extensions = [
        ".csv",
        ".xlsx"
    ]

    file_extension = os.path.splitext(
        file.filename
    )[1].lower()

    if file_extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail="Only CSV and Excel files are allowed"
        )

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    try:

        if file_extension == ".csv":

            df = pd.read_csv(file_path)

        else:

            df = pd.read_excel(file_path)

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid dataset file"
        )

    missing_values = int(
        df.isnull().sum().sum()
    )

    duplicate_values = int(
        df.duplicated().sum()
    )

    df = df.drop_duplicates()

    df = df.fillna(0)

    dataset_entry = Dataset(

        file_name=file.filename,

        file_path=file_path,

        uploaded_by=str(current_user)

    )

    db.add(dataset_entry)

    db.commit()

    db.refresh(dataset_entry)

    return {

        "message":
        "Dataset uploaded successfully",

        "uploaded_by":
        str(current_user),

        "file_name":
        file.filename,

        "rows":
        int(len(df)),

        "columns":
        int(len(df.columns)),

        "missing_values_found":
        missing_values,

        "duplicate_values_found":
        duplicate_values
    }

@router.get("/dataset-history")
def dataset_history(
    db: Session = Depends(get_db)
):

    datasets = db.query(
        Dataset
    ).all()

    result = []

    for item in datasets:

        result.append({

            "id": item.id,

            "file_name": item.file_name,

            "uploaded_by": item.uploaded_by,

            "uploaded_at": item.uploaded_at
        })

    return {
        "datasets": result
    }

@router.delete("/delete-dataset/{dataset_id}")
def delete_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(admin_required)
):

    dataset = db.query(
        Dataset
    ).filter(
        Dataset.id == dataset_id
    ).first()

    if not dataset:

        return {
            "message": "Dataset not found"
        }

    if os.path.exists(
        dataset.file_path
    ):

        os.remove(
            dataset.file_path
        )

    db.delete(dataset)

    db.commit()

    return {
        "message":
        "Dataset deleted successfully"
    }

@router.get("/download-dataset/{dataset_id}")
def download_dataset(
    dataset_id: int,
    db: Session = Depends(get_db)
):

    dataset = db.query(
        Dataset
    ).filter(
        Dataset.id == dataset_id
    ).first()

    if not dataset:

        return {
            "message": "Dataset not found"
        }

    return FileResponse(

        path=dataset.file_path,

        filename=dataset.file_name,

        media_type="application/octet-stream"
    )

@router.get("/search-dataset")
def search_dataset(
    file_name: str,
    db: Session = Depends(get_db)
):

    datasets = db.query(
        Dataset
    ).filter(
        Dataset.file_name.contains(file_name)
    ).all()

    result = []

    for item in datasets:

        result.append({

            "id": item.id,

            "file_name": item.file_name,

            "uploaded_by": item.uploaded_by
        })

    return {
        "search_results": result
    }

@router.get("/dataset-summary")
def dataset_summary():

    file_path = "app/uploads/sample_sales.csv"

    if not os.path.exists(file_path):

        return {
            "message":
            "Sample dataset not found"
        }

    df = pd.read_csv(file_path)

    summary = {

        "total_rows":
        int(len(df)),

        "total_columns":
        int(len(df.columns)),

        "column_names":
        list(df.columns),

        "missing_values":
        int(df.isnull().sum().sum())
    }

    return {
        "dataset_summary": summary
    }

@router.get("/recent-uploads")
def recent_uploads(
    db: Session = Depends(get_db)
):

    uploads = db.query(
        Dataset
    ).order_by(
        Dataset.uploaded_at.desc()
    ).limit(5).all()

    result = []

    for item in uploads:

        result.append({

            "file_name": item.file_name,

            "uploaded_by": item.uploaded_by,

            "uploaded_at": item.uploaded_at
        })

    return {
        "recent_uploads": result
    }

@router.get("/dataset-count")
def dataset_count(
    db: Session = Depends(get_db)
):

    total_datasets = db.query(
        Dataset
    ).count()

    return {
        "total_datasets": total_datasets
    }

@router.get("/dataset-validation-report")
def dataset_validation_report():

    report = {

        "missing_values_found": 3,

        "duplicate_rows_found": 1,

        "invalid_columns": [],

        "validation_status":
        "Dataset Cleaned Successfully"
    }

    return {
        "validation_report": report
    }