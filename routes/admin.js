const { Router } = require("express");
const route = Router();
var jwt = require("jsonwebtoken");

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

route.post("/login", async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const payload = { username: username };
        let result;

        if (!username || !password) {
            result = "Invalid credentials";
            return;
        }

        result = await generateAuthToken(payload);
        res.json({ token: result });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

async function generateAuthToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 500,
    });
    return accessToken;
}

module.exports = route;
