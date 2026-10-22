import { db } from '../../prisma/db';

export class HotelService {
    static async createHotel(data: { name: string, description: string, address: string, city: string, price: string, country: string }) {
        return await db.orm.public.Hotel.create({
            name: data.name,
            description: data.description,
            city: data.city,
            address: data.address,
            country: data.country,
        })
    }

    static async getAllHotels(city?: string) {
        if (city) {
        }
    }
}