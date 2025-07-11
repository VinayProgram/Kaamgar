export interface CreateAlertDto {
    title: string
    active: boolean
    address: string
    alertBy: string
    alertUserType: string
    categoryId: string
    description: string
    location: Location
    maxPrice: number
    minPrice: number
    pincode: string
    selfDestroy: boolean
    skillId: string
  }
  
  export interface Location {
    longitude: number
    latitude: number
  }  