export type ProductDTO = {
  product_images: string[];
  name: string;
  description: string;
  is_new: boolean,
  price: number,
  accept_trade: boolean,
  payment_methods: [string[]]
}
