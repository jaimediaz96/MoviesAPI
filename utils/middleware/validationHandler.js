const bomm = require('@hapi/boom');
const joi = require('joi');

function validate(data, schema) {
	// If schema is not a joi schema convert to a joi schema object otherwise return schema
	schema = !joi.isSchema(schema) ? joi.object(schema) : schema;
	const { error } = schema.validate(data);
	return error;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = validate(req[check], schema);

    error ? next(bomm.badRequest(error)) : next();
  };
}

module.exports = validationHandler;