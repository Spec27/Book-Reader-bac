const { RequestError } = require('../../helpers')
const { User } = require('../../models')

const resetUserProgress = async (req, res) => {
  const { id: userId } = req.params
  const { progress, _id: authenticatedUserId } = req.user

  if (userId !== authenticatedUserId.toString()) throw RequestError(403)

  if (Array.isArray(progress) && progress?.length === 0)
    throw RequestError(400, 'Progress is already set to empty')

  const resetedUserProgress = await User.findByIdAndUpdate(
    userId,
    { progress: [] },
    {
      new: true,
      select: {
        progress: 1,
      },
    }
  )

  res.json({ message: 'User progress was reset to empty result' })
}

module.exports = { resetUserProgress }
