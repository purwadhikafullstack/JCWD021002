import Order from '../models/order.model';
import User from '../models/user.model';
import { generateMidtransToken } from '../utils/midtrans';

export const paymentGatewayQuery = async (userId, orderId, totalPrice, shippingCost, products) => {
    try {
      const user = await User.findOne({ where: { id: userId } });
       const midtransToken = await generateMidtransToken(
              orderId,
              totalPrice,
              products,
              shippingCost,
              user.id,
              user.username,
              user.email
            );
        return midtransToken;
    } catch (err) {
      throw err
    }
  }

  export const updatePaymentOrderQuery = async (orderId, paymentMethod, paymentCode, paymentStatus) => {
    return await Order.update(
      { paymentMethod: paymentMethod, paymentCode: paymentCode, paymentStatus: paymentStatus },
      { where: { id: orderId } },
    );
  };