from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# Allow React frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Excel file
df = pd.read_excel("../data/incident_dump.xlsx")


@app.get("/incidents")
def get_incidents(incident_number: str = ""):

    # No incident number entered
    if incident_number == "":

        result = df[
            [
                "Incident Number",
                "Short Description",
                "Priority"
            ]
        ]

    else:

        result = df[
            df["Incident Number"]
            .astype(str)
            .str.contains(incident_number, case=False, na=False)
        ][
            [
                "Incident Number",
                "Short Description",
                "Priority"
            ]
        ]

    return result.to_dict(orient="records")