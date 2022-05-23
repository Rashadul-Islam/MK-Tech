import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";

const createProject = asyncHandler(async (req, res) => {
    const { name, category, state, description } = req.body;

    const user = await Project.create({
        name,
        category,
        state,
        description,
    });

    if (user) {
        res.status(201).json({
            success: true,
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

const getProject = asyncHandler(async (req, res) => {
    const { name, category, state, description } = req.body;

    const project = await Project.find({
        state: "open",
    });

    if (project) {
        res.status(201).json({
            project,
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

const memberRequest = asyncHandler(async (req, res) => {
    const request = await Project.aggregate([
        {
            $match: {
                state: { $eq: "open" },
            },
        },
        {
            $lookup: {
                from: "enrolls",
                let: {
                    project: "$_id",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$project", "$$project"],
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "$project",
                            total: { $sum: 1 },
                        },
                    },
                ],
                as: "enroll",
            },
        },
        { $unwind: "$enroll" },
    ]);

    if (request) {
        res.status(201).json({
            request,
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

const progress = asyncHandler(async (req, res) => {
    const { state } = req.body;

    const project = await Project.find({
        state: state,
    });

    if (project) {
        res.status(201).json({
            project,
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

const finish = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const project = await Project.findOneAndUpdate(
        {
            _id: id,
        },
        { $set: { state: "finish" } }
    );

    if (project) {
        res.status(201).json({
            success: true,
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

const complete = asyncHandler(async (req, res) => {
    const { state } = req.body;

    const project = await Project.find({
        state: state,
    });

    if (project) {
        res.status(201).json({
            project,
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

export { createProject, getProject, memberRequest, progress, finish, complete };
