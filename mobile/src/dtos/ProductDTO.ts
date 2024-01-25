export type ProductDTO = {
  name: string;
  description: string;
  is_new: boolean,
  price: number,
  accept_trade: boolean,
  payment_methods: []
}