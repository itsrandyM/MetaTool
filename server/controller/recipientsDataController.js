const RecipientData = require('../models/RecipientData');
const asyncHandler = require('express-async-handler');

// @desc Get all recipient data
// @route GET /recipient-data
// @access Private
const getAllRecipientData = asyncHandler(async (req, res) => {
  const recipientData = await RecipientData.find()
    .populate('recipient token description classification')
    .lean();

  if (!recipientData?.length) {
    return res.status(400).json({ message: 'No recipient data found' });
  }

  res.json(recipientData);
});

// @desc Create new recipient data
// @route POST /recipient-data
// @access Private

// @desc Update recipient data
// @route PATCH /recipient-data
// @access Private
const updateRecipientData = asyncHandler(async (req, res) => {
  const { id, recipient, name, token, description, classification, verified } = req.body;

  if (!id || !recipient || !name || !token || !description || !classification) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const recipientData = await RecipientData.findByIdAndUpdate(id, {
    recipient,
    name,
    token,
    description,
    classification,
    verified,
  });

  if (!recipientData) {
    return res.status(400).json({ message: 'Recipient data not found' });
  }

  res.json({ message: `Recipient data updated` });
});

// @desc Delete recipient data
// @route DELETE /recipient-data
// @access Private
const deleteRecipientData = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Recipient data ID required' });
  }

  const recipientData = await RecipientData.findByIdAndDelete(id);

  if (!recipientData) {
    return res.status(400).json({ message: 'Recipient data not found' });
  }

  const reply = `Recipient data with ID ${recipientData._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllRecipientData,
  updateRecipientData,
  deleteRecipientData,
};
