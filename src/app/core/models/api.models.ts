export interface IService {
  id?: number;
  name?: string;
  type?: string;
  price?: number;
  initialPrice?: number;
  description?: string;
  havePayment?: boolean;
  duration?: number;
  frequency?: number;
}

export interface IPackage {
  id?: number;
  name?: string;
  type?: string;
  monthlyPrice?: number;
  fullPrice?: number;
  services?: IService[];
  isActive?: boolean;
  haveDownPayment?: boolean;
  downPayment?: number;
}

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
}

export interface ContactResponse {
  message: string;
}
