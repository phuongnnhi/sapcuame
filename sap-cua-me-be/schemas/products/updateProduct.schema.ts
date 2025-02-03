import { createProductSchema } from "./createProduct.schema";


export const updateProductSchema = createProductSchema.fork(Object.keys(createProductSchema.describe().keys), field => field.optional())