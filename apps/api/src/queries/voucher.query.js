import { Sequelize } from 'sequelize';
import Discount from '../models/discount.model';
import Order from '../models/order.model';
import OrderDetail from '../models/orderDetail.model';
import User from '../models/user.model';
import VoucherUser from '../models/voucherUser.model';


export const findVoucherQuery = async (id) => {
    try {
        const result = await Discount.findAll({where : { id: id }})
        return result;
    } catch (err) {
        throw err;
    }
}

export const updateOrderTotalAmountVoucherQuery = async (orderId, totalAmount, totalDiscount) => {
    console.log("ini di update order query", orderId, totalAmount);
    return await Order.update({ totalAmount, totalDiscount }, { where: { id: orderId } });
  };
  
  export const updateOrderDetailsVoucherQuery = async (orderId, orderDetailId, subTotalNew, subTotalOld, totalDiscount) => {
    try {
        console.log("ini di voucher query", orderId, orderDetailId, subTotalNew, subTotalOld);
        const totalAmountOrder = (subTotalOld - subTotalNew)
        const res1 = await Order.update({ totalAmount: Sequelize.literal(`totalAmount - ${totalAmountOrder}`), totalDiscount: totalDiscount }, {where: {id: orderId}})
      const result = await OrderDetail.update(
          {
              subTotal: subTotal
          },
          {where : {id: orderDetailId}}
      )

      return result;
    } catch (err) {
      throw err;
    }
  };

  export const findReferralQuery = async (referral) => {
      try {
            return await User.findOne({where : {referralCode: referral}})
      } catch (err) {
          throw err;
      }
  } 

  export const usedReferralQuery = async ( idSelf, idAnother ) => {
      try {
          const result = await User.update(
              {
                  referralBy_iduser: idAnother
              }, {where: {
                  id: idSelf,
              }}
          )

          return result;
      } catch (err) {
          throw err;
      }
  }

  export const findVoucherReferralQuery = async (  ) => {
      try {
          return await Discount.findAll({where: {referralCode: 1}});
      } catch (err) {
          throw err;
      }
  }

  export const giveVoucherQuery = async ( voucherId, userId ) => {
      try {
          const result = await VoucherUser.create({
              voucher_idvoucher: voucherId,
              user_iduser: userId,
              used: 0,
          })

          return result
      } catch (err) {
          throw err;
      }
  }