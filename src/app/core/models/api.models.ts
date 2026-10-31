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

/** Post del blog (GET Check/blog — casing real del payload del API). */
export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  picture?: string;
  createdDate?: string;
  companyID?: number;
  categoryID?: number;
  cantView?: number;
}

/** Comentario de un post (GET Check/comments). */
export interface IComment {
  id?: number;
  content?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdDate?: string;
  postsId?: number;
}

/** Categoría del blog (GET api/Categories, público; solo id/nombre). */
export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
}

/** POST Check/blog?token= (alta de comentario; el back setea createdDate). */
export interface CommentPayload {
  firstName: string;
  lastName: string;
  email: string;
  content: string;
  postsId: number;
}

/** Respuesta { message, type } de los endpoints Check. */
export interface CheckResponse {
  message?: string;
  type?: number;
}
