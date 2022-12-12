const { Router } = require("express");
const route = Router();
const CategoryModel = require("../models/category");
const GalleryModel = require("../models/gallery");

route.get("/like/:imageId", async (req, res, next) => {
    try {
        const imageId = req.params.imageId;
        if (!image) {
            res.status(400).send("Bad Request");
        }

        let likeValue;

        const imageDetails = GalleryModel.findOne({ _id: imageId });

        if (imageDetails) {
            if (imageDetails.like) {
                likeValue = 0;
            } else {
                likeValue = 1;
            }
        }

        await GalleryModel.updateOne(
            { _id: imageId },
            { $set: { like: likeValue } }
        );

        res.send("Favorite updated successfully");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

route.get("/discover/:category/:shuffle", async (req, res, next) => {
    const category = req.params.category;
    const shuffle = req.params.shuffle;
    const sortByDate = req.query.sortByDate;
    const filterByLike = req.query.filterByLike;

    if (!category) {
        res.status(400).send("Bad Request");
    }

    let sort = 1;
    let skip = parseInt(shuffle) || 0;

    if (sortByDate) {
        if (sortByDate == "asc") {
            sort = 1;
        } else if (sortByDate == "desc") {
            sort = -1;
        }
    }

    const filter = {};
    if (filterByLike) {
        filter = { like: 1 };
    }

    await GalleryModel.find({ category: { $in: [category] }, ...filter })
        .sort({ createdAt: sort })
        .skip(skip)
        .limit(4);
    res.send("Image added successfully!");
});

module.exports = route;
