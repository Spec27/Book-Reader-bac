const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSchemaValidationErrors, bookStatus } = require('../helpers')

const { NEXT, COMPLETED, IN_PROGRESS } = bookStatus

const bookSchema = new Schema(
  {
    title: {
      type: String,
      minLenght: [1, 'Must be minimum 1 symbols. You got {VALUE}'],
      maxLenght: [100, 'Must be maximum 100 symbols. You got {VALUE}'],
      trim: true,
      required: [true, 'Book title is required'],
    },
    author: {
      type: String,
      minLenght: [1, 'Must be minimum 1 symbols. You got {VALUE}'],
      maxLenght: [30, 'Must be maximum 30 symbols. You got {VALUE}'],
      trim: true,
      required: [true, 'Author is required'],
    },
    publishingDate: {
      type: Date,
      required: [true, 'Publishig date is required'],
    },
    pageAmount: {
      type: Number,
      min: [1, 'Minimum amount of pages must be 1'],
      max: [5000, 'Minimum amount of pages must be 5000'],
      required: [true, 'Pages amount is required'],
    },
    status: {
      type: String,
      lowercase: true,
      trim: true,
      enum: {
        values: [COMPLETED, IN_PROGRESS, NEXT],
        message: '{VALUE} is not supported',
      },
      default: NEXT,
    },
    rating: {
      type: Number,
      min: [0, 'Minimum amount of pages must be 0'],
      max: [5, 'Minimum amount of pages must be 5'],
      default: 0,
    },
    summary: {
      type: String,
      minLenght: [1, 'Must be minimum 1 symbols. You got {VALUE}'],
      maxLenght: [1000, 'Must be maximum 1000 symbols. You got {VALUE}'],
      trim: true,
      default: '',
    },
    reader: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Reader person is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

bookSchema.post('save', handleSchemaValidationErrors)

const addBooksSkhema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishingDate: Joi.string().required(),
  pageAmount: Joi.number().required(),
})

const schemas = {
  addBooksSkhema,
}

const Book = model('book', bookSchema)

const updateResumeSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(5),
  summary: Joi.string().trim().min(1, 'utf-8').max(1000, 'utf-8'),
}).or('rating', 'summary')

const updateStatusSchema = Joi.object({
  status: Joi.string().trim().valid(COMPLETED, IN_PROGRESS, NEXT).required(),
})

module.exports = {
  Book,
  updateResumeSchema,
  updateStatusSchema,
  schemas,
}
