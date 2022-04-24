export class ProductIntoFridgeWhereQuantityZero{
      constructor(
            public id: number,
            public fridgeId: number,
            public productId: number,
            public productName: string,
            public defaultQuantity: number,
            public fridgeName: string
      ){}
}