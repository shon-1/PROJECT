
import DeliveryModel from "../models/DeliveryModel.js";
import UserModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

//---------------------------------------------------------- Save order and delivery guy to delivery table

export const chooseOrderForDeliveryController = async (req, res) => {
  const { orderId } = req.params;
 //console.log("Body ==",req.body);
  const { userId } = req.body; 
  
// console.log("Order ID:", orderId);
// console.log("Delivery User ID:", userId);

  try {
    // Check if the order has already been chosen for delivery
    const existingDelivery = await DeliveryModel.findOne({ orderId });
    if (existingDelivery) {
      return res.status(400).send({
        success: false,
        message: "Order has already been chosen for delivery",
      });
    }

    // Save to mongo
    const deliveryOrder = new DeliveryModel({
      userId: userId,
      orderId: orderId,
    });
    await deliveryOrder.save();

    res.status(200).send({
      success: true,
      message: "Order chosen for delivery successfully",
      deliveryOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in choosing order for delivery",
      error: error.message,
    });
  }
};


//--------------------------------------------------------------not in delivery

export const getOrdersNotInDelivery= async (req, res) => {
  try {
    // Find all orders that do not have corresponding records in the delivery table
    const ordersNotInDelivery = await orderModel.find({
      _id: { $nin: await DeliveryModel.distinct("orderId") }
    });

    res.status(200).send({
      success: true,
      message: "Orders not in delivery retrieved successfully",
      orders: ordersNotInDelivery
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving orders not in delivery",
      error: error.message
    });
  }
};

//------------------------------------------------------ in delivery

export const getOrdersInDelivery= async (req, res) => {
  try {
    // Find all orders that do not have corresponding records in the delivery table
    const ordersNotInDelivery = await orderModel.find({
      _id: { $in: await DeliveryModel.distinct("orderId") }
    });

    res.status(200).send({
      success: true,
      message: "Orders not in delivery retrieved successfully",
      orders: ordersNotInDelivery
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving orders not in delivery",
      error: error.message
    });
  }
};