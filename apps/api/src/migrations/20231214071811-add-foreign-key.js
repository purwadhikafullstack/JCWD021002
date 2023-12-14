'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     // Address
     await queryInterface.addConstraint('Address', {
      fields: ['user_iduser'],
      type: 'foreign key',
      name: 'fk_address_user',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Address', {
      fields: ['city_idcity'],
      type: 'foreign key',
      name: 'fk_address_city',
      references: {
        table: 'City',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // Cart
    await queryInterface.addConstraint('Cart', {
      fields: ['user_iduser'],
      type: 'foreign key',
      name: 'fk_cart_user',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // await queryInterface.addConstraint('Cart', {
    //   fields: ['cart_idcart'],
    //   type: 'foreign key',
    //   name: 'fk_cart_cartdetail',
    //   references: {
    //     table: 'CartDetail',
    //     field: 'id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // });

    // CartDetail
    await queryInterface.addConstraint('CartDetail', {
      fields: ['productStock_idproductStock'],
      type: 'foreign key',
      name: 'fk_cartdetail_productstock',
      references: {
        table: 'ProductStock',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('CartDetail', {
      fields: ['cart_idcart'],
      type: 'foreign key',
      name: 'fk_cartdetail_cart',
      references: {
        table: 'Cart',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // City
    await queryInterface.addConstraint('City', {
      fields: ['province_idprovince'],
      type: 'foreign key',
      name: 'fk_city_province',
      references: {
        table: 'Province',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // Discount
    await queryInterface.addConstraint('Discount', {
      fields: ['productStock_idproductStock'],
      type: 'foreign key',
      name: 'fk_discount_productstock',
      references: {
        table: 'ProductStock',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // DiscountUsage
    await queryInterface.addConstraint('DiscountUsage', {
      fields: ['user_iduser'],
      type: 'foreign key',
      name: 'fk_discountusage_user',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('DiscountUsage', {
      fields: ['discount_iddiscount'],
      type: 'foreign key',
      name: 'fk_discountusage_discount',
      references: {
        table: 'Discount',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // Journal
    await queryInterface.addConstraint('Journal', {
      fields: ['store_idstore'],
      type: 'foreign key',
      name: 'fk_journal_store',
      references: {
        table: 'Store',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Journal', {
      fields: ['admin_iduser'],
      type: 'foreign key',
      name: 'fk_journal_user',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Journal', {
      fields: ['productStock_idproductStock'],
      type: 'foreign key',
      name: 'fk_journal_productstock',
      references: {
        table: 'ProductStock',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // Order
    await queryInterface.addConstraint('Order', {
      fields: ['user_iduser'],
      type: 'foreign key',
      name: 'fk_order_user',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Order', {
      fields: ['store_idstore'],
      type: 'foreign key',
      name: 'fk_order_store',
      references: {
        table: 'Store',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // await queryInterface.addConstraint('Order', {
    //   fields: ['order_idorder'],
    //   type: 'foreign key',
    //   name: 'fk_order_orderdetail',
    //   references: {
    //     table: 'OrderDetail',
    //     field: 'id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // });

    // OrderDetail
    await queryInterface.addConstraint('OrderDetail', {
      fields: ['order_idorder'],
      type: 'foreign key',
      name: 'fk_orderdetail_order',
      references: {
        table: 'Order',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('OrderDetail', {
      fields: ['productStock_idproductStock'],
      type: 'foreign key',
      name: 'fk_orderdetail_productstock',
      references: {
        table: 'ProductStock',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // Product
    await queryInterface.addConstraint('Product', {
      fields: ['createdBy_iduser'],
      type: 'foreign key',
      name: 'fk_product_user',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // ProductCategory_has_Product
    await queryInterface.addConstraint('ProductCategory_has_Product', {
      fields: ['productCategory_idproductCategory'],
      type: 'foreign key',
      name: 'fk_productcategory_has_product_category',
      references: {
        table: 'ProductCategory',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('ProductCategory_has_Product', {
      fields: ['product_idproduct'],
      type: 'foreign key',
      name: 'fk_productcategory_has_product_product',
      references: {
        table: 'Product',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // ProductCategory
    // await queryInterface.addConstraint('ProductCategory', {
    //   fields: ['productCategory_idproductCategory'],
    //   type: 'foreign key',
    //   name: 'fk_productcategory_productcategory',
    //   references: {
    //     table: 'ProductCategory',
    //     field: 'id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // });

    // ProductImage
    await queryInterface.addConstraint('ProductImage', {
      fields: ['product_idproduct'],
      type: 'foreign key',
      name: 'fk_productimage_product',
      references: {
        table: 'Product',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // ProductStock
    await queryInterface.addConstraint('ProductStock', {
      fields: ['product_idproduct'],
      type: 'foreign key',
      name: 'fk_productstock_product',
      references: {
        table: 'Product',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('ProductStock', {
      fields: ['store_idstore'],
      type: 'foreign key',
      name: 'fk_productstock_store',
      references: {
        table: 'Store',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // Province
    // await queryInterface.addConstraint('Province', {
    //   fields: ['province_idprovince'],
    //   type: 'foreign key',
    //   name: 'fk_province_province',
    //   references: {
    //     table: 'Province',
    //     field: 'id',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // });

    // RatingsAndReviews
    await queryInterface.addConstraint('RatingAndReview', {
      fields: ['user_iduser'],
      type: 'foreign key',
      name: 'fk_ratingandreview_user',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('RatingAndReview', {
      fields: ['product_idproduct'],
      type: 'foreign key',
      name: 'fk_ratingandreview_product',
      references: {
        table: 'Product',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('RatingAndReview', {
      fields: ['order_idorder'],
      type: 'foreign key',
      name: 'fk_ratingandreview_order',
      references: {
        table: 'Order',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // Role
    // await queryInterface.addConstraint('Role', {
    //   fields: ['role_idrole'],
    //   type: 'foreign key',
    //   name: 'fk_role_user',
    //   references: {
    //     table: 'User',
    //     field: 'role_idrole',
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // });

    // Store
    await queryInterface.addConstraint('Store', {
      fields: ['city_idcity'],
      type: 'foreign key',
      name: 'fk_store_city',
      references: {
        table: 'City',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // User
    await queryInterface.addConstraint('User', {
      fields: ['role_idrole'],
      type: 'foreign key',
      name: 'fk_user_role',
      references: {
        table: 'Role',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('User', {
      fields: ['refferalBy_iduser'],
      type: 'foreign key',
      name: 'fk_user_referraluser',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // VoucherProduct
    await queryInterface.addConstraint('VoucherProduct', {
      fields: ['voucher_idvoucher'],
      type: 'foreign key',
      name: 'fk_voucherproduct_voucher',
      references: {
        table: 'Voucher',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('VoucherProduct', {
      fields: ['productStock_idproductStock'],
      type: 'foreign key',
      name: 'fk_voucherproduct_productstock',
      references: {
        table: 'ProductStock',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      // Remove the added constraints in reverse order
    // Example
    // VoucherProduct
 
  }
};
