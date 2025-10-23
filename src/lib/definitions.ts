export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  role: "Patient" | "Doctor";
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    city: string;
    rating: number;
    contact: string;
}

export interface Message {
    role: 'user' | 'bot';
    content: string;
}

export interface SimpleUser {
    email: string;
}
