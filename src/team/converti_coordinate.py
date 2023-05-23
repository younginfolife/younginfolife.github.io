#!/usr/bin/env python3 

import argparse
import pandas as pd 
from geopy.geocoders import Nominatim


class CoordinateManager:
    def __init__(self) -> None:
        self.__geolocator = Nominatim(user_agent="SIMONE PERNICE RTDA IL SUPREMO")
        self.__coordinates = dict() 

    def get_coordinates(self, cityname: str):
        """ Given a city name, returns its coordinates: (latitude, longitude) """

        if ( found := self.__coordinates.get( cityname ) ):
            return found

        location = self.__geolocator.geocode( cityname )
        self.__coordinates[ cityname ] = coordinates = (location.latitude, location.longitude )
        return coordinates

    def initialize(self, city_coords_map: dict):
        """ Initialize stuff"""

        self.__coordinates = city_coords_map.copy() 




if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input_file", type=str, required=True)
    parser.add_argument("-o", "--output_file", type=str, required=True)
    parser.add_argument("--js", type=str, default="members.js")
    parser.add_argument("--geolocate", action="store_true")
    args = parser.parse_args() 


    coordinator = CoordinateManager() 


    if args.geolocate: 
        # geolocator = Nominatim(user_agent="SIMONE PERNICE RTDA IL SUPREMO")

        df = pd.read_csv( args.input_file, sep="\t",  header=0, index_col=None )

        coordinates = { city: coordinator.get_coordinates( city ) for city in df.citta.unique() }
        coo_col = [ coordinates.get(city) for city in df.citta ]

        lats, longs = zip( * coo_col )

        df[ "coords" ] = coo_col
        df[ "latitude" ] = lats
        df[ "longitude" ] = longs

        df.to_csv(args.output_file, sep="\t", index=False, header=True)


    df = pd.read_csv( args.input_file, sep="\t", header=0, index_col=None )
    my_records = list() 


    for cityname, subdf in df.groupby( "citta" ):
        # lat, long = subdf.coords.iloc[0]
        lat = subdf.latitude.iloc[0]
        long = subdf.longitude.iloc[0]

        city_records = sorted([
            [ f"{row.nome} {row.cognome}", cityname, lat, long ]
                for _, row in subdf.iterrows()
        ], key=lambda t: t[0].split(" ")[-1])

        my_records.extend( city_records )




    with open(args.js, "w") as f:
        f.write("export const member_list = ")
        f.write(str(my_records))
    # print(my_records)


    # print(df.columns)