import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";

const createProject = asyncHandler(async (req, res) => {
    const { name, category, state, description } = req.body;

    const user = await Project.create({
        name,
        category,
        state,
        description
    });

    if (user) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

const getProject = asyncHandler(async (req, res) => {
    const { name, category, state, description } = req.body;

    const project = await Project.find({
        state: "open"
    });

    if (project) {
        res.status(201).json({
            project
        });
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

export { createProject, getProject };