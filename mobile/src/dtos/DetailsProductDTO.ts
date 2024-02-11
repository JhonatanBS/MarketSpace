export type DetailsProductDTO = {
  product_images:ImageProps[];
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: MethodsPaymentProps[];
  user: UserProps;
  is_active: boolean;
}

type ImageProps = {
  id: string;
  path: string;
}

type MethodsPaymentProps = {
  key: string;
  name: string;
}

type UserProps = {
  name: string;
  avatar: string;
}

