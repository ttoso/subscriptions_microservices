// This file can be used to generate a valid jwt to use, in a real enviromnent will be
// necessary to use an authenticantion server for this purpose.

const jwt = require('jsonwebtoken');
const config = require('../../config')

// Create token
const token = jwt.sign(
    { user_id: 'test', email: 'test' },
    config.token_key,
    {
      expiresIn: "8h",
    }
  );

console.log(token);