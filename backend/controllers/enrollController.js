import asyncHandler from "express-async-handler";
import Enroll from "../models/enrollModel.js";

const createEnroll = asyncHandler(async (req, res) => {
    const {
        student,
        teacher,
        courseId
    } = req.body;

    const enroll = await Enroll.create({
        student,
        teacher,
        courseId
    })
    if (enroll) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});


const getEnroll = asyncHandler(async (req, res) => {
    const enroll = await Enroll.find({ student: req.params.id })

    if (enroll) {
        res.status(201).json({
            enroll
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

const enrollDetails = asyncHandler(async (req, res) => {
    const enroll = await Enroll.aggregate([{
        $match: {
            student: req.params.id
        },
    },
    {
        $lookup: {
            from: "tutors",
            localField: "teacher",
            foreignField: "user",
            as: "detail"
        }
    },
    { $unwind: "$detail" }
    ])

    if (enroll) {
        res.status(201).json({
            enroll
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

const getQuestion = asyncHandler(async (req, res) => {
    const enroll = await Enroll.aggregate([{
        $match: {
            student: req.params.id
        },
    },
    { $addFields: { course_Id: { $toObjectId: "$courseId" } } },
    {
        $lookup: {
            from: "mcqs",
            localField: "courseId",
            foreignField: "courseId",
            as: "detail"
        }
    },
    { $unwind: "$detail" },
    {
        $lookup: {
            from: "courses",
            localField: "course_Id",
            foreignField: "_id",
            as: "course"
        }
    },
    { $unwind: "$course" },
    {
        $project:{
            title:"$course.title",
            classLevel: "$course.courseLevel",
            topic:"$course.topic",
            create:"$detail.createdAt",
            question:"$detail.questions"
        }
    }
    ])

    if (enroll) {
        res.status(201).json({
            enroll
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

export { createEnroll, getEnroll, enrollDetails, getQuestion };