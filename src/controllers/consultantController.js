const consultantService = require('../services/consultantService');
const { sendSuccess } = require('../utils/responseHandler');

exports.createConsultant = async (req, res, next) => {
  try {
    const consultant = await consultantService.createConsultant(req.body);
    return sendSuccess(res, 201, 'Consultant created successfully', consultant);
  } catch (error) {
    next(error);
  }
};

exports.getConsultants = async (req, res, next) => {
  try {
    const consultants = await consultantService.getAllConsultants();
    return sendSuccess(res, 200, 'Consultants retrieved successfully', consultants);
  } catch (error) {
    next(error);
  }
};