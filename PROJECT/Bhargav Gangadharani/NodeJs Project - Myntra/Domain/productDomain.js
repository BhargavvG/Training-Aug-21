const ProductModel = require("../Model/ProductModel");

class ProductDomain {
  async getAllProducts(req, res) {
    let pageNo = parseInt(req.query.pageNo) || 1;
    let limit = parseInt(req.query.quantity) || 25;
    try {
      // const products = await ProductModel.find({activeStatus: true});
      const products = await ProductModel.aggregate([
        { $match: { activeStatus: true } },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "categoryId",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategory",
            foreignField: "subCategoryId",
            as: "subCategory",
          },
        },
        { $unwind: "$subCategory" },
        {
          $lookup: {
            from: "offers",
            localField: "offer",
            foreignField: "offerId",
            as: "offer",
          },
        },
        { $unwind: "$offer" },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "brandId",
            as: "brand",
          },
        },
        { $unwind: "$brand" },
        {
          $project: {
            "category._id": false,
            "category.details": false,
            "category.__v": false,
            "category.activeStatus": false,
            "subCategory._id": false,
            "subCategory.__v": false,
            "subCategory.activeStatus": false,
            "offer._id": false,
            "offer.details": false,
            "offer.__v": false,
            "offer.activeStatus": false,
            "brand._id": false,
            "brand.details": false,
            "brand.__v": false,
            "brand.activeStatus": false,
          },
        },
      ])
        .skip((pageNo - 1) * limit)
        .limit(limit);
      res.send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async search(req, res) {
    try {
      let expr = req.params.data.replace(/ /g, ".*|.*");
      expr = `.*${expr}.*`;
      let data = {
        activeStatus: true,
        productName: { $regex: expr, $options: "i" },
      };
      if (req.body.category) data.category = { $in: req.body.category };
      if (req.body.subCategory)
        data.subCategory = { $in: req.body.subCategory };
      if (req.body.brand) data.brand = { $in: req.body.brand };
      if (req.body.offer) data.offer = { $in: req.body.offer };
      if (req.body.gender) data.gender = { $in: req.body.gender };
      if (req.body.price) {
        let price = req.body.price.split("-");
        data.offeredPrice = {
          $gt: parseInt(price[0]),
          $lt: parseInt(price[1]),
        };
      }
      let sort = { activeStatus: 1 };
      if (req.query.sort) {
        if (req.query.sort == 1) sort.orders = -1; // Sort - Recommended
        if (req.query.sort == 2) sort.offeredPrice = 1; // Sort - Price low to high
        if (req.query.sort == 3) sort.offeredPrice = -1; // Sort - Price high to low
      }
      let pageNo = parseInt(req.query.pageNo) || 1;
      let limit = parseInt(req.query.quantity) || 25;

      const products = await ProductModel.aggregate([
        {
          $match: data,
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "categoryId",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategory",
            foreignField: "subCategoryId",
            as: "subCategory",
          },
        },
        { $unwind: "$subCategory" },
        {
          $lookup: {
            from: "offers",
            localField: "offer",
            foreignField: "offerId",
            as: "offer",
          },
        },
        { $unwind: "$offer" },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "brandId",
            as: "brand",
          },
        },
        { $unwind: "$brand" },
        {
          $project: {
            "category._id": false,
            "category.details": false,
            "category.__v": false,
            "category.activeStatus": false,
            "subCategory._id": false,
            "subCategory.__v": false,
            "subCategory.activeStatus": false,
            "offer._id": false,
            "offer.details": false,
            "offer.__v": false,
            "offer.activeStatus": false,
            "brand._id": false,
            "brand.details": false,
            "brand.__v": false,
            "brand.activeStatus": false,
          },
        },
      ])
        .skip((pageNo - 1) * limit)
        .limit(limit);
      // .find({productName : {$regex : expr, $options:'i'}})
      res.send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async filter(req, res) {
    let data = { activeStatus: true };
    if (req.body.categories)
      data.category = { $in: req.body.categories.map(Number) };
    if (req.body.subCategories)
      data.subCategory = { $in: req.body.subCategories.map(Number) };
    if (req.body.brands) data.brand = { $in: req.body.brands.map(Number) };
    if (req.body.offers) data.offer = { $in: req.body.offers.map(Number) };
    if (req.body.gender) data.gender = req.body.gender;
    if (req.body.price) {
      let price = req.body.price.split("-");
      data.offeredPrice = { $gt: parseInt(price[0]), $lt: parseInt(price[1]) };
    }
    let sort = { activeStatus: 1 };
    if (req.query.sort) {
      if (req.query.sort == 1) sort.orders = -1; // Sort - Recommended
      if (req.query.sort == 2) sort.offeredPrice = 1; // Sort - Price low to high
      if (req.query.sort == 3) sort.offeredPrice = -1; // Sort - Price high to low
    }
    let pageNo = parseInt(req.query.pageNo) || 1;
    let limit = parseInt(req.query.quantity) || 25;
    try {
      const products = await ProductModel.aggregate([
        { $match: data },
        { $sort: sort },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "categoryId",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategory",
            foreignField: "subCategoryId",
            as: "subCategory",
          },
        },
        { $unwind: "$subCategory" },
        {
          $lookup: {
            from: "offers",
            localField: "offer",
            foreignField: "offerId",
            as: "offer",
          },
        },
        { $unwind: "$offer" },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "brandId",
            as: "brand",
          },
        },
        { $unwind: "$brand" },
        {
          $project: {
            "category._id": false,
            "category.details": false,
            "category.__v": false,
            "category.activeStatus": false,
            "subCategory._id": false,
            "subCategory.__v": false,
            "subCategory.activeStatus": false,
            "offer._id": false,
            "offer.details": false,
            "offer.__v": false,
            "offer.activeStatus": false,
            "brand._id": false,
            "brand.details": false,
            "brand.__v": false,
            "brand.activeStatus": false,
          },
        },
      ])
        .skip((pageNo - 1) * limit)
        .limit(limit);
      res.send(products);
    } catch (err) {
      // console.log(err);
      res.status(500).send(err.message);
    }
  }

  async getProductById(req, res) {
    try {
      const product = await ProductModel.aggregate([
        {
          $match: {
            productId: parseInt(req.params.productId),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "categoryId",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategory",
            foreignField: "subCategoryId",
            as: "subCategory",
          },
        },
        { $unwind: "$subCategory" },
        {
          $lookup: {
            from: "offers",
            localField: "offer",
            foreignField: "offerId",
            as: "offer",
          },
        },
        { $unwind: "$offer" },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "brandId",
            as: "brand",
          },
        },
        { $unwind: "$brand" },
        {
          $project: {
            "category._id": false,
            "category.details": false,
            "category.__v": false,
            "category.activeStatus": false,
            "subCategory._id": false,
            "subCategory.__v": false,
            "subCategory.activeStatus": false,
            "offer._id": false,
            "offer.details": false,
            "offer.__v": false,
            "offer.activeStatus": false,
            "brand._id": false,
            "brand.details": false,
            "brand.__v": false,
            "brand.activeStatus": false,
          },
        },
      ]);
      res.send(product);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getmyProducts(req, res) {
    try {
      const products = await ProductModel.aggregate([
        { $match: { activeStatus: true, seller: req.decoded.userName } },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "categoryId",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategory",
            foreignField: "subCategoryId",
            as: "subCategory",
          },
        },
        { $unwind: "$subCategory" },
        {
          $lookup: {
            from: "offers",
            localField: "offer",
            foreignField: "offerId",
            as: "offer",
          },
        },
        { $unwind: "$offer" },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "brandId",
            as: "brand",
          },
        },
        { $unwind: "$brand" },
        {
          $project: {
            "category._id": false,
            "category.details": false,
            "category.__v": false,
            "category.activeStatus": false,
            "subCategory._id": false,
            "subCategory.__v": false,
            "subCategory.activeStatus": false,
            "offer._id": false,
            "offer.details": false,
            "offer.__v": false,
            "offer.activeStatus": false,
            "brand._id": false,
            "brand.details": false,
            "brand.__v": false,
            "brand.activeStatus": false,
          },
        },
      ]);
      res.send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addProduct(req, res) {
    try {
      let productdata = req.body;
      productdata.seller = req.decoded.userName;
      const product = new ProductModel(productdata);

      await product.save();

      res.send("Product Added");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateProduct(req, res) {
    let productId = req.params.productId;
    try {
      const result = await ProductModel.updateOne(
        { productId: productId, seller: req.decoded.userName },
        {
          $set: {
            productName: req.body.productName,
            category: req.body.category,
            subCategory: req.body.subCategory,
            details: req.body.details,
            offer: req.body.offer,
            brand: req.body.brand,
            actualPrice: req.body.actualPrice,
            offeredPrice: req.body.offeredPrice,
            gender: req.body.gender,
            color: req.body.color,
            img: req.body.img,
            sizes: req.body.sizes,
            specifications: req.body.specifications,
            description: req.body.description,
            features: req.body.features,
          },
        }
      );
      if (result.modifiedCount == 0) {
        res.status(200).send("Product updated successfully");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async removeProduct(req, res) {
    let productId = req.params.productId;

    try {
      const product = await ProductModel.updateOne(
        { productId: productId, seller: req.decoded.userName },
        { $set: { activeStatus: false } }
      );
      res.send("Product removed successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async getDeletedProducts(req, res) {
    try {
      const products = await ProductModel.find({
        activeStatus: false,
        seller: req.decoded.userName,
      });
      res.send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async restoreProduct(req, res) {
    let productId = req.params.productId;

    try {
      const product = await ProductModel.updateOne(
        {
          productId: productId,
          activeStatus: false,
          seller: req.decoded.userName,
        },
        { $set: { activeStatus: true } }
      );
      res.send("Product restored successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = ProductDomain;
