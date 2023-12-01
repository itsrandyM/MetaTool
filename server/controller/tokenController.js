const Token = require('../models/Token');
const asyncHandler = require('express-async-handler');

// @desc Get all tokens
// @route GET /tokens
// @access Private
const getAllTokens = asyncHandler(async (req, res) => {
  const tokens = await Token.find().populate('User').lean();

  if (!tokens?.length) {
    return res.status(400).json({ message: 'No tokens found' });
  }

  res.json(tokens);
});

// @desc Create new token
// @route POST /tokens
// @access Private
const createNewToken = asyncHandler(async (req, res) => {
  const { User, tokenName } = req.body;

  if (!User || !tokenName) {
    return res.status(400).json({ message: 'Both User and tokenName are required' });
  }

  const token = await Token.create({ User, tokenName });

  if (token) {
    res.status(201).json({ message: 'New token created', token });
  } else {
    res.status(400).json({ message: 'Invalid token data received' });
  }
});

// @desc Update a token
// @route PATCH /tokens
// @access Private
const updateToken = asyncHandler(async (req, res) => {
  const { id, User, tokenName } = req.body;

  if (!id || !User || !tokenName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const token = await Token.findByIdAndUpdate(id, { User, tokenName });

  if (!token) {
    return res.status(404).json({ message: 'Token not found' });
  }

  res.json({ message: 'Token updated', token });
});

// @desc Delete a token
// @route DELETE /tokens
// @access Private
const deleteToken = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Token ID required' });
  }

  const token = await Token.findByIdAndDelete(id);

  if (!token) {
    return res.status(404).json({ message: 'Token not found' });
  }

  const reply = `Token with ID ${token._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllTokens,
  createNewToken,
  updateToken,
  deleteToken,
};
