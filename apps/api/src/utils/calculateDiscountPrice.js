export const calculateDiscountPrice = (originalPrice, discounts, originalQuantity) => {
    // Filter active discounts based on the current date
    const activeDiscounts = discounts
      ?.filter(
        (discount) =>
          new Date(discount?.startDate) <= new Date() && new Date(discount?.endDate) >= new Date()
      )
      .sort((a, b) => new Date(a?.startDate) - new Date(b?.startDate));
  
    if (!activeDiscounts || activeDiscounts.length === 0) {
      // No active discounts, return the original price
      return originalPrice;
    }
  
    // Apply discounts cumulatively
    let discountedPrice = originalPrice;
  
    activeDiscounts.forEach((activeDiscount) => {
      switch (activeDiscount?.DiscountType?.id) {
        case 4: // Direct Discount
        //   if (activeDiscount?.discountValue && activeDiscount?.discountNom) {
        //     const newPrice = originalPrice - activeDiscount?.discountNom;
        //     const discountValue = parseFloat(activeDiscount?.discountValue);
        //     discountedPrice = newPrice - (newPrice * discountValue) / 100;
        //   } else 
          if (activeDiscount?.discountValue && activeDiscount?.distributionId == 1 && activeDiscount?.usageRestrictionId == 1) {
            const discountValue = parseFloat(activeDiscount?.discountValue);
            discountedPrice -= (discountedPrice * discountValue) / 100;
          } else if (activeDiscount?.discountNom && activeDiscount?.distributionId == 1 && activeDiscount?.usageRestrictionId == 1) {
            discountedPrice -= activeDiscount?.discountNom;
          } else {return discountedPrice}
          break;
  
        case 5: // Minimum Amount Discount
          const minimumPurchase = parseFloat(activeDiscount?.minimumPurchase);
          if ((discountedPrice * originalQuantity) >= minimumPurchase && activeDiscount?.distributionId == 1 && activeDiscount?.usageRestrictionId == 1) {
            if (activeDiscount?.discountValue && activeDiscount?.distributionId == 1 && activeDiscount?.usageRestrictionId == 1) {
              const discountValue = parseFloat(activeDiscount?.discountValue);
              discountedPrice -= (discountedPrice * discountValue) / 100;
            } else if (activeDiscount?.discountNom && activeDiscount?.distributionId == 1 && activeDiscount?.usageRestrictionId == 1) {
              discountedPrice -= activeDiscount?.discountNom;
            } else {return discountedPrice}
          }
          break;
  
        case 6: // B O G O
          // if(activeDiscount?.distributionId == 1) {
          // const buyQuantity = activeDiscount?.buy_quantity || 1;
          // const getQuantity = activeDiscount?.get_quantity || 1;
          // const totalQuantity = buyQuantity + getQuantity;
          // const setsCount = Math.floor(discountedPrice / totalQuantity);
          // const discountedPriceBOGO = setsCount * buyQuantity * discountedPrice;
          // discountedPrice = discountedPriceBOGO / totalQuantity;
          // }
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
  