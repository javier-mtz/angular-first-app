export interface Car {
    _id: String;
    model: String;
    description: String;
    price: String;
    engine: String;
    images: [String];
    busy: Boolean;
    brand_id: String;
    user_id: String;
    status: Number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CarResponse {
    _id: String;
    model: String;
    description: String;
    price: String;
    engine: String;
    brand: String;
    images: [String];
  }

export interface DeleteResponse {
    message: string;
  }