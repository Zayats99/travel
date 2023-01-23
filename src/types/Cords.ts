type Longitude = number

type Latitude = number

// export type Cords = [Longitude, Latitude]
export interface Cords extends Array<Longitude | Latitude> {
  0: Longitude
  1: Latitude
}
