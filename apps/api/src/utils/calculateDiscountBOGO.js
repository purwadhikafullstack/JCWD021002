export const calculateDiscountBOGO = (originalQuantity, discounts) => {
    // Filter active discounts based on the current date
    const activeDiscounts = discounts
      ?.filter(
        (discount) =>
          new Date(discount?.startDate) <= new Date() && new Date(discount?.endDate) >= new Date()
      )
      .sort((a, b) => new Date(a?.startDate) - new Date(b?.startDate));
  
    if (!activeDiscounts || activeDiscounts.length === 0) {
      // No active discounts, return the original price
      return originalQuantity;
    }
  
    // Apply discounts cumulatively
    let discountedPrice = originalQuantity;
  
    activeDiscounts.forEach((activeDiscount) => {
      switch (activeDiscount?.DiscountType?.id) {
        case 4: // Direct Discount
        //   if (activeDiscount?.discountValue && activeDiscount?.discountNom) {
        //     const newPrice = originalPrice - activeDiscount?.discountNom;
        //     const discountValue = parseFloat(activeDiscount?.discountValue);
        //     discountedPrice = newPrice - (newPrice * discountValue) / 100;
        //   } else 
        //   if (activeDiscount?.discountValue && activeDiscount?.distributionId == 1) {
        //     const discountValue = parseFloat(activeDiscount?.discountValue);
        //     discountedPrice -= (discountedPrice * discountValue) / 100;
        //   } else if (activeDiscount?.discountNom && activeDiscount?.distributionId == 1) {
        //     discountedPrice -= activeDiscount?.discountNom;
        //   } else {return discountedPrice}
          break;
  
        case 5: // Minimum Amount Discount
        //   const minimumPurchase = parseFloat(activeDiscount?.minimumPurchase);
        //   if (discountedPrice >= minimumPurchase && activeDiscount?.distributionId == 1) {
        //     const discountValueMinAmount = parseFloat(activeDiscount?.discountValue);
        //     discountedPrice -= discountValueMinAmount;
        //   }
          break;
  
        case 6: // B O G O
          if(activeDiscount?.distributionId == 1) {
          const buyQuantity = activeDiscount?.buy_quantity || 1;
          const getQuantity = activeDiscount?.get_quantity || 1;
          const totalQuantity = originalQuantity >= buyQuantity ? Math.floor(originalQuantity / buyQuantity) * (buyQuantity + getQuantity) : originalQuantity;
          discountedPrice = totalQuantity;
          }
          break;
  
        case 7: // Voucher
          // Handle voucher discount logic here

          break;
  
        default:
          break;
      }
    });
  
    return discountedPrice;
  };
  