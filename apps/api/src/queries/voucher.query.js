import { Sequelize } from 'sequelize';
import Discount from '../models/discount.model';
import Order from '../models/order.model';
import OrderDetail from '../models/orderDetail.model';
import User from '../models/user.model';
import VoucherUser from '../models/voucherUser.model';
import DiscountType from '../models/discountType.model';
import Product from '../models/product.model';
import ProductStock from '../models/productStock.model';
import UsageRestriction from '../models/usageRestriction.model'
import DiscountDistribution from '../models/discountDistribution.model'
import Store from '../models/store.model'

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

  export const updateOrderTotalShippingVoucherQuery = async (orderId, totalShipping, totalShippingDiscount) => {
    console.log("ini shipping voucher query", orderId, totalShipping, totalShippingDiscount);
    return await Order.update({ totalShipping, totalShippingDiscount }, { where: { id: orderId } });
  };

  export const findReferralQuery = async (referral) => {
      try {
            return await User.findOne({where : {referralCode: referral}})
      } catch (err) {
          throw err;
      }
  } 

  export const findVoucherUserNotUsed = async (voucherId, userId) => {
    return await VoucherUser.findOne({
        where: {
            voucher_idvoucher: voucherId,
            user_iduser: userId,
            amount: { [Sequelize.Op.gt]: 0 },
        }
    })
}

  export const softDeleteVoucherUser = async (voucherId, userId) => {
      return await VoucherUser.update({amount: Sequelize.literal(`amount - 1`)}, {
          where: {
              voucher_idvoucher: voucherId,
              user_iduser: userId,
          }
      })
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
              amount: 1,
          })

          await Discount.update({discountAmount: Sequelize.literal(`discountAmount - 2`)}, { where: { id: voucherId } })

          return result
      } catch (err) {
          throw err;
      }
  }

  export const updateGiveVoucherQuery = async ( voucherId, userId ) => {
    try {
        const result = await VoucherUser.update({
            amount: Sequelize.literal(`amount + 1`),
        }, {
            where: {
            voucher_idvoucher: voucherId,
            user_iduser: userId,
            }
        })

        await Discount.update({discountAmount: Sequelize.literal(`discountAmount - 1`)}, { where: { id: voucherId } })

        return result
    } catch (err) {
        throw err;
    }
}

  export const voucherUserListsQuery = async (userId, page, pageSize) => {
    try {
        console.log("ini di voucher query", userId, page, pageSize);
        const offset = (page - 1) * (pageSize || 0);

        const res = await VoucherUser.findAndCountAll({
            offset: offset,
            limit: pageSize ? pageSize : undefined,
            include: [{
                model: Discount,
                where: {
                    startDate: { [Sequelize.Op.lte]: new Date() }, // Include discounts with start date less than or equal to the current date
                    endDate: { [Sequelize.Op.gte]: new Date() },
                },
                include: [
                    {
                      required: true,
                      model: DiscountType,
                    },
                    {
                      required: true,
                      model: UsageRestriction,
                    //   where: usageRestrictionId ? { id: usageRestrictionId } : {}
                    },
                    // {
                    //   model: ProductStock,
                    //   include: [
                    //     {
                    //       model: Product,
                    //       where: productName ? { name: {
                    //         [Op.like]: `%${productName}%`,
                    //       } } : {}
                    //     }
                    //   ]
                    // }
                  ],
            }],
            where: { user_iduser: userId, amount: { [Sequelize.Op.gt]: 0 } }
        });

      const totalPages = Math.ceil(res.count / (pageSize || res.count));


        return {
            total: res.count,
            data: res.rows,
            totalPages: totalPages,
          };
    } catch (err) {
        throw err;
    }
};