export type User = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  password?:string;
  cartItems?:object;
  __v?:unknown
};

// types.ts
export type ApiError = {
  response?: {
    data?: unknown;
  };
  message?: string;
};

export interface Order {
  _id: string
  userId: string
  items: Item[]
  amount: number
  address: Address
  status: string
  paymentType: string
  isPaid: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Item {
  product: Product
  quantity: number
  _id: string
}

export interface Product {
  _id: string
  name: string
  category: string
  price: number
  offerPrice: number
  image: string[]
  description: string[]
  inStock: boolean
}

export interface Address {
  _id: string
  userId: string
  street: string
  city: string
  state: string
  zipCode: number
  country: string
  phone: string
  __v: number
}

export interface MobileViewProps {
  mobile: boolean;
  ignorecomplainRef: React.Ref<HTMLButtonElement>;
  setShowComplain: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

