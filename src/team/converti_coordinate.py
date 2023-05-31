#!/usr/bin/env python3 

import argparse
import pandas as pd 
from geopy.geocoders import Nominatim

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import os, logging


class SpreadsheetManager:
    # If modifying these scopes, delete the file token.json.
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

    def __init__(self) -> None:
        creds = None

        # The file token.json stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SpreadsheetManager.SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file( 'credentials.json', SpreadsheetManager.SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(creds.to_json())

        self.__creds = creds 



    def get_spreadsheet(self, spreadsheet_id: str, sheet_id: str) -> pd.DataFrame:
        try:
            service = build('sheets', 'v4', credentials=self.__creds)

            # Call the Sheets API
            sheet = service.spreadsheets()
            result = sheet.values().get(spreadsheetId=spreadsheet_id,
                                        range=sheet_id).execute()
            
            if (values := result.get('values', [])) is False:
                print('No data found.')
                return

            columns = values.pop(0) 
            data = [ row for row in values ]

            df = pd.DataFrame( data = data, columns = columns )
            return df 

        except HttpError as err:
            print(err) 



class CoordinateManager:
    def __init__(self, city_coords_map: dict = None) -> None:
        self.__geolocator = Nominatim(user_agent="SIMONE PERNICE RTDA IL SUPREMO")
        self.__coordinates = city_coords_map.copy() if city_coords_map else dict() 

    def get_coordinates(self, cityname: str):
        """ Given a city name, returns its coordinates: (latitude, longitude) """

        if ( found := self.__coordinates.get( cityname ) ):
            return found

        location = self.__geolocator.geocode( cityname )
        self.__coordinates[ cityname ] = coordinates = (location.latitude, location.longitude )
        return coordinates




if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    # parser.add_argument("-i", "--input_file", type=str, required=True)
    # parser.add_argument("-o", "--output_file", type=str, required=True)
    parser.add_argument("--js", type=str, default="members.js")
    # parser.add_argument("--geolocate", action="store_true")
    args = parser.parse_args() 

    spreadsheet_id = "1urvnXcliGEyf2roUhnyQQtegYi0GYPmlU9SAj7wasHQ"
    sheetname = "Form Responses 1"

    df = SpreadsheetManager().get_spreadsheet( spreadsheet_id, sheetname )
    assert df is not None 
    df.columns = ["useless", "nome", "cognome", "uni", "citta", "ruolo", "email", "formazione", "ambiti"]

    logging.info(f"Spreadsheet obtained successfully: {df.shape}")
    

    # if True:#args.geolocate: 
        # df = pd.read_csv( args.input_file, sep="\t",  header=0, index_col=None )

    coordinator = CoordinateManager() 
    ## get coordinates for each city 
    coordinates = { city: coordinator.get_coordinates( city ) for city in df.citta.unique() }
    ## build the city column for each person on the dataframe 
    coo_col = [ coordinates.get(city) for city in df.citta ]
    ## extract latitude and longitude from the previous list 
    lats, longs = zip( * coo_col )

    ## add the new columns to the dataframe 
    df[ "coords" ] = coo_col
    df[ "latitude" ] = lats
    df[ "longitude" ] = longs   

        ## save the resulting dataframe 
        # df.to_csv(args.output_file, sep="\t", index=False, header=True)
    # else:
    #     df = pd.read_csv( args.input_file, sep="\t", header=0, index_col=None )
        
    ## convert dataframe to a list of dictionaries 
    my_records = df.fillna("").to_dict("records")
    ## sort record by surname 
    my_records.sort( key = lambda d: d["cognome"])


    with open(args.js, "w") as f:
        f.write("export const member_list = ")
        f.write(str(my_records))
        