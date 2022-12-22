const { Router } = require("express");
const route = Router();
const CategoryModel = require("../models/category");
const GalleryModel = require("../models/gallery");

route.get("/add-category/:categoryName", async (req, res, next) => {
    try {
        const categoryName = req.params.categoryName;

        if (!categoryName) {
            res.status(400).send("Bad Request");
        }

        // write logic for checking duplicate category

        const categoryDetails = CategoryModel.find({ name: categoryName });

        if (categoryDetails) {
        } else {
            const newCategoryData = { name: categoryName };
            await CategoryModel.create(newCategoryData);
            res.send("Category created successfully!");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

route.post("/add-image", async (req, res, next) => {
    try {
        const name = req.body.name;
        const category = req.body.category;
        const imageUrl = req.body.imageUrl;

        if (!name || !category.length || !imageUrl) {
            res.status(400).send("Bad Request");
        }

        const newGalleryData = {
            name: name,
            category: category,
            imageUrl: imageUrl,
        };

        await GalleryModel.create(newGalleryData);
        res.send("Image added successfully!");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = route;
