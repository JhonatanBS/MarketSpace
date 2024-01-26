export type ProductDTO = {
  imageProduct: string[]
  name: string;
  description: string;
  is_new: boolean,
  price: string,
  accept_trade: boolean,
  payment_methods: [string[]]
}