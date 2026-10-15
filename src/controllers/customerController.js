const customerService = require("../services/customerService");
const { sendSuccess } = require("../utils/responseHandler");

exports.createCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    return sendSuccess(res, 201, "Customer created successfully", customer);
  } catch (error) {
    next(error);
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getAllCustomers();
    return sendSuccess(res, 200, "Customers retrieved successfully", customers);
  } catch (error) {
    next(error);
  }
};
