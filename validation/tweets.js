const Validator = require("validator");

const validText = require('./valid-text.js');

const CONSTANTS = {
  min: 5,
  max: 140,
}

module.exports = function(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: CONSTANTS.min, max: CONSTANTS.max })) {
    errors.text = `Text must be between ${CONSTANTS.min} and ${CONSTANTS.max} characters`;
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}