export interface Brand {
    _id: String;
    name: String;
    color: String;
    logo: String;
    status: Number;
    createdAt: Date;
    updatedAt: Date;
}

export interface BrandResponse {
    name: string;
    color: string;
    logo: string;
    status: number;
    _id: string;
  }

export interface DeleteResponse {
    message: string;
  }