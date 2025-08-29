import Brand from "./brand.model.js";
import Category from "./category.model.js";
import Seller from "./seller.model.js";
import Product from "./product.model.js";
import ProductImage from "./productImage.model.js";
import InventoryLog from "./inventoryLog.model.js";
import Review from "./review.model.js";

// Associations
Brand.hasMany(Product, { foreignKey: "brand_id", as: "products" });
Product.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });

Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

Seller.hasMany(Product, { foreignKey: "seller_id", as: "products" });
Product.belongsTo(Seller, { foreignKey: "seller_id", as: "seller" });

Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Product.hasMany(InventoryLog, { foreignKey: "product_id", as: "inventory_logs" });
InventoryLog.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Product.hasMany(Review, { foreignKey: "product_id", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Self relation for Category parent-child
Category.hasMany(Category, { foreignKey: "parent_id", as: "children" });
Category.belongsTo(Category, { foreignKey: "parent_id", as: "parent" });

export {
    Brand,
    Category,
    Seller,
    Product,
    ProductImage,
    InventoryLog,
    Review,
};
