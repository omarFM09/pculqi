declare namespace Express {
    export interface Request {
        tarjeta: {
            email: string;
            card_number: string;
            expiration_year: string;
            expiration_month: string;
            // Otras propiedades de tarjetadatos si las tienes
        };
    }
}