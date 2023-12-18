import Cart from '../models/cart.model';
import CartDetail from '../models/cartDetail.model';
import ProductStock from '../models/productStock.model';
import Product from '../models/product.model';

export const findOrCreateCartQuery = async (userId) => {
  let cart = await Cart.findOne({ where: { user_iduser: userId } });

  if (!cart) {
    cart = await Cart.create({
      user_iduser: userId,
      totalQuantity: 0,
      addedAt: new Date(),
      totalPrice: 0,
    });
  }

  return cart;
};

export const getProductStockQuery = async (productStockId) => {
  return ProductStock.findByPk(productStockId, { include: [Product] });
};

export const checkProductQuery = (productStock) => {
  return (
    productStock && productStock.Product && productStock.Product.price != null
  );
};

export const findOrCreateCartDetailQuery = async (cart, item, productStock) => {
  const { quantity } = item;
  const productPrice = productStock.Product.price;

  let existingCartDetail = await CartDetail.findOne({
    where: {
      productStock_idproductStock: item.productStockId,
      cart_idcart: cart.id,
    },
  });

  if (existingCartDetail) {
    existingCartDetail.quantity += quantity;
    existingCartDetail.price += quantity * productPrice;
    await existingCartDetail.save();
  } else {
    existingCartDetail = await CartDetail.create({
      productStock_idproductStock: item.productStockId,
      quantity,
      price: productPrice,
      cart_idcart: cart.id,
    });
  }

  return existingCartDetail;
};

export const updateCartTotalsQuery = (cart, quantity, productPrice) => {
  cart.totalQuantity += quantity;
  cart.totalPrice += quantity * productPrice;
};
