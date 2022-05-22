import asyncHandler from "express-async-handler";
import Enroll from "../models/enrollModel.js";

const createEnroll = asyncHandler(async (req, res) => {
    const {
        project,
        member,
        status
    } = req.body;

    const enroll = await Enroll.create({
        project,
        member,
        status
    })
    if (enroll) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(401);
        throw new Error("Failed to Enroll !!!");
    }
});


const getEnroll = asyncHandler(async (req, res) => {
    const enroll = await Enroll.find({ member: req.params.id })

    if (enroll) {
        res.status(201).json({
            enroll
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

const getApplied = asyncHandler(async (req, res) => {
    const applied = await Enroll.find({ status: 0, student: req.params.id }).populate("project")

    if (applied) {
        res.status(201).json({
            applied
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

export { createEnroll, getEnroll, getApplied };