import { calculateVoucherPrice } from '../utils/calculateVoucherPrice';
import { findReferralQuery, findVoucherQuery, findVoucherReferralQuery, giveVoucherQuery, updateOrderDetailsVoucherQuery, updateOrderTotalAmountVoucherQuery, usedReferralQuery } from '../queries/voucher.query';

export const useVoucherService = async (order, voucher) => {
    try {

        // Assuming you have an array of OrderDetail items in order.OrderDetails
        const orderDetails = order?.OrderDetails || [];
        const arrayOfObjects = await [voucher];
        let totalAmount2;
        let totalAmountOrder;

        for (const orderDetail of orderDetails) {
            console.log("ini di voucher", orderDetail.productStock_idproductStock, voucher.productStock_idproductStock);
            // Check if the current OrderDetail has the same productStock_idproductStock as res1
            if (orderDetail.productStock_idproductStock === voucher.productStock_idproductStock) {
                // If there is a match, calculate totalAmount
                const totalAmount2 = calculateVoucherPrice(orderDetail.subTotal, arrayOfObjects);
                const subtractions = (order?.totalAmount - totalAmount2);
                
                // Update the current OrderDetail with the voucher information
                const res2 = await updateOrderDetailsVoucherQuery(order.id, orderDetail.id, totalAmount2, orderDetail?.subTotal, subtractions );

                // Perform any additional logic or return res2 as needed
                return subtractions;
                break; // Exit the loop since a match is found
            }
        }

        if (!totalAmount2) {
            // If there is no match, calculate totalAmountOrder
            totalAmountOrder = calculateVoucherPrice(order.totalAmount, arrayOfObjects);
            const subtractions = (order?.totalAmount - totalAmountOrder);

            // Update the order total amount (replace this with your actual update logic)
            const result = await updateOrderTotalAmountVoucherQuery(order.id, totalAmountOrder, subtractions);

            // Do additional logic if needed
            return subtractions;
        }

        // Now you can proceed with your logic using totalAmount and totalAmountOrder

    } catch (err) {
        throw err;
    }
}

export const redeemReferralService = async ( idSelf, referral, ) => {
    try {
        const res1 = await findReferralQuery(referral);
        if(res1) {
            await usedReferralQuery( idSelf, res1?.id );
            const res2 = await findVoucherReferralQuery();
            if(res2?.length > 0) {
                for (let i = 0; i < res2?.length; i++) {
                //   console.log("ini di service",res.id);
                //   console.log("ini di service",category[i]?.id);
      
                  await giveVoucherQuery(res2[i]?.id, res1?.id);
                  await giveVoucherQuery(res2[i]?.id, idSelf);
              }
              }
        }
    } catch (err) {
        throw err;
    }
}
