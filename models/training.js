const Joi = require('joi')
const { Schema, model } = require('mongoose')

const { handleSchemaValidationErrors, trainingStatus } = require('../helpers')

const { ACTIVE, FINISHED } = trainingStatus

const trainingSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    finishDate: {
      type: Date,
      required: [true, 'Finish date is required'],
    },
    pageAmount: {
      type: Number,
      min: [1, 'Minimum amount of pages must be 1'],
      max: [1000, 'Minimum amount of pages must be 1000'],
      // required: [true, 'Pages amount is required'],
    },
    status: {
      type: String,
      lowercase: true,
      trim: true,
      enum: {
        values: [ACTIVE, FINISHED],
        message: '{VALUE} is not supported',
      },
      default: ACTIVE,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: [true, 'Book id is required'],
    },
    participator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Reader person is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

trainingSchema.post('save', handleSchemaValidationErrors)

const updateTrainingStatusSchema = Joi.object({
  status: Joi.string().trim().valid(ACTIVE, FINISHED).required(),
})

const startTrainingSchema = Joi.object({
  startDate: Joi.string().required(),
  finishDate: Joi.string().required(),
  book: Joi.string().required(),
})

const Training = model('training', trainingSchema)

module.exports = {
  Training,
  updateTrainingStatusSchema,
  startTrainingSchema,
}
