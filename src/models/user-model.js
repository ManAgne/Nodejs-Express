const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  cartItems: {
    type: [{
      cupId: {
        type: Schema.Types.ObjectId,
        ref: 'Cup',
        required: true,
      },
      amount: {
        type: Number,
        required: true
      }
    }],
    default: []
  },
  favoredCups: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Cup',
      required: true,
    }],
    default: []
  },
  img: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const userValidationSchema = yup.object({
  email: yup
    .string().typeError('User.email must be a string')
    .required('User.email is required')
    .email('Invalid User.email format')
    .test(
      'email-check',
      'User.email already exists',
      async (email) => {
        const foundUser = await UserModel.findOne({ email });

        return foundUser === null;
      }
    ),

  password: yup.string().typeError('User.password must be a string')
    .required('User.password is required')
    .min(8, 'User.password must have at least 8 symbols')
    .max(32, 'User.password must be no more than 32 symbols')
    .matches(/[a-z]/, 'User.password must have at least one lowercase letter')
    .matches(/[A-Z]/, 'User.password must have at least one uppercase letter')
    .matches(/\d/, 'User.password must have at least one number')
    .matches(/\W/, 'User.password must have at least one special symbol'),

  passwordConfirmation: yup.string().typeError('User.passwordConfirmation must be a string')
    .required('User.passwordConfirmation is required')
    .oneOf([yup.ref('password')], 'User.passwordConfirmation does not match User.password'),

  role: yup.string().typeError('User.role must be a string')
    .oneOf(['USER', 'ADMIN']),

  cartItems: yup
    .array(yup.object({
      cupId: yup.string().typeError('User.cartItems element.cupId must be a string')
        .required('User.cartItems element.cupId is required')
        .test(
          'is-mongo-object-id',
          'User.cartItems element.cupId must be valid MongoDB object Id',
          Types.ObjectId.isValid
        ),
      amount: yup.number().typeError('User.cartItems element.amount must be a number')
        .required('User.cartItems element.amount is required')
        .positive('User.cartItems element.amount must be positive'),
    })),

  favoredCups: yup
    .array(yup.string().typeError('User.favoredCups element must be a string')
      .required('User.favoredCups element is required')
      .test(
        'is-mongo-object-id',
        'User.favoredCups element must be valid MongoDB object Id',
        Types.ObjectId.isValid
      )),

  img: yup
    .string().typeError('User.img must be a string')
    .required('User.img is required'),
});

const userUpdateValidationSchema = yup.object({
  email: yup
    .string().typeError('User.email must be a string')
    .email('Invalid User.email format')
    .test(
      'email-check',
      'User.email already exists',
      async (email) => {
        const foundUser = await UserModel.findOne({ email });

        return foundUser === null;
      }
    ),

  password: yup
    .string().typeError('User.password must be a string')
    .min(8, 'User.password must have at least 8 symbols')
    .max(32, 'User.password must be no more than 32 symbols')
    .matches(/[a-z]/, 'User.password must have at least one lowercase letter')
    .matches(/[A-Z]/, 'User.password must have at least one uppercase letter')
    .matches(/\d/, 'User.password must have at least one number')
    .matches(/\W/, 'User.password must have at least one special symbol')
    .oneOf([yup.ref('passwordConfirmation')], 'User.password does not match User.passwordConfirmation'),

  passwordConfirmation: yup.string().typeError('User.passwordConfirmation must be a string'),

  role: yup.string().typeError('User.role must be a string')
    .oneOf(['USER', 'ADMIN']),

  cartItems: yup
    .array(yup.object({
      cupId: yup.string().typeError('User.cartItems element.cupId must be a string')
        .required('User.cartItems element.cupId is required')
        .test(
          'is-mongo-object-id',
          'User.cartItems element.cupId must be valid MongoDB object Id',
          Types.ObjectId.isValid
        ),
      amount: yup.number().typeError('User.cartItems element.amount must be a number')
        .required('User.cartItems element.amount is required')
        .positive('User.cartItems element.amount must be positive'),
    })),

  favoredCups: yup
    .array(yup.string().typeError('User.favoredCups element must be a string')
      .required('User.favoredCups element is required')
      .test(
        'is-mongo-object-id',
        'User.favoredCups element must be valid MongoDB object Id',
        Types.ObjectId.isValid
      )),

  img: yup.string().typeError('User.img must be a string')
});

userSchema.statics.validate = (userData) => userValidationSchema.validate(userData);
userSchema.statics.validateUpdate = (userData) => userUpdateValidationSchema.validate(userData);

const UserModel = model('User', userSchema);

UserModel.validate

module.exports = UserModel;