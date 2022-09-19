const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const productSchema = Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
}, {
    timeStamps: true
});

const productValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Product.title must be a string')
    .required('Product.title is required'),
  description: yup
    .string().typeError('Product.description must be a string')
    .required('Product.description is required'),
  categoryId: yup
    .string().typeError('Cup.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Cup.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('Cup.categoryId is required'),
  img: yup
    .string().typeError('Product.img must be a string')
    .required('Product.img is required'),
  price: yup
    .number().typeError('Product.price must be a number')
    .required('Product.price is required')
    .positive('Product.price must be positive')
});

const productUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Product.title must be a string'),
  description: yup.string().typeError('Product.description must be a string'),
  categoryId: yup.string().typeError('Cup.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Cup.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  img: yup.string().typeError('Product.img must be a string'),
  price: yup.number()
    .typeError('Product.price must be a number')
    .positive('Product.price must be positive'),
});

productSchema.statics.validate = (productData) => productValidationSchema.validateSync(productData)
productSchema.statics.validateUpdate = (productData) => productUpdateValidationSchema.validateSync(productData)

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;
