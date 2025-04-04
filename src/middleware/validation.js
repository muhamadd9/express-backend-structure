import ErrorResponse from "../utils/response/errorResponse.js";

const validate = (schema) => (req, res, next) => {
  const data = { ...req.body, ...req.params, ...req.query };
  if (req.file || req.files?.length) {
    data.attachments = req.file || req.files;
  }
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    // Return validation errors
    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));
    return next(new ErrorResponse(errors, 400));
  }

  next();
};

export default validate;
