import User from '../models/user.model';
import { generateMidtransToken } from '../utils/midtrans';

export const paymentGatewayQuery = async (userId, orderId, totalPrice, shippingCost, products) => {
    try {
      console.log('dataPayment', [userId, orderId, totalPrice, shippingCost, products]);
      const user = await User.findOne({ where: { id: userId } });
      console.log(user);
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