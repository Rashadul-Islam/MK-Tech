import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Enroll from "../models/enrollModel.js";
import Project from "../models/projectModel.js";

const createEnroll = asyncHandler(async (req, res) => {
    const { project, member, status } = req.body;

    const enroll = await Enroll.create({
        project,
        member,
        status,
    });
    if (enroll) {
        res.status(201).json({
            success: true,
        });
    } else {
        res.status(401);
        throw new Error("Failed to Enroll !!!");
    }
});

const getEnroll = asyncHandler(async (req, res) => {
    const enroll = await Enroll.find({ member: req.params.id });

    if (enroll) {
        res.status(201).json({
            enroll,
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

const getApplied = asyncHandler(async (req, res) => {
    const { status, member } = req.body;
    const applied = await Enroll.find({
        status: status,
        member: member,
    }).populate("project");

    if (applied) {
        res.status(201).json({
            applied,
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

const confirmMember = asyncHandler(async (req, res) => {
    const { project } = req.body;

    const confirm = await Enroll.updateMany(
        {
            project: project,
        },
        {
            $set: {
                status: 1,
            },
        }
    );

    if (confirm) {
        const updateStatus = await Project.findOneAndUpdate(
            { _id: project },
            { $set: { state: "in progress" } }
        );
        if (updateStatus) {
            res.status(201).json({
                success: true,
            });
        } else {
            res.status(401);
            throw new Error("Failed to create course");
        }
    } else {
        res.status(400);
        throw new Error("Project Creation Failled !!!");
    }
});

const progressMember = asyncHandler(async (req, res) => {
    const { id, status } = req.body;
    const member = await Enroll.find({
        status: status,
        project: id,
    }).populate("project").populate("member");

    if (member) {
        res.status(201).json({
            member,
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});


const removeMember = asyncHandler(async (req, res) => {
    const { project, member } = req.body;
    const removeData = await Enroll.findOneAndDelete({
        project: project,
        member: member
    });

    if (removeData) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(401);
        throw new Error("Failed to remove !!!");
    }
});

const progressProject = asyncHandler(async (req, res) => {
    const { id, status } = req.body;
    const project = await Enroll.aggregate([
        {
            $match: {
                member: { $eq: new mongoose.Types.ObjectId(id) },
                status: { $eq: status }
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project"
            }
        },
        { $unwind: "$project" },
        {
            $match: {
                "project.state": { $eq: "in progress" }
            }
        }
    ])

    if (project) {
        res.status(201).json({
            project,
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});


const completedProject = asyncHandler(async (req, res) => {
    const { id, status } = req.body;
    const project = await Enroll.aggregate([
        {
            $match: {
                member: { $eq: new mongoose.Types.ObjectId(id) },
                status: { $eq: status }
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project"
            }
        },
        { $unwind: "$project" },
        {
            $match: {
                "project.state": { $eq: "finish" }
            }
        }
    ])

    if (project) {
        res.status(201).json({
            project,
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

export { createEnroll, getEnroll, getApplied, confirmMember, progressMember, removeMember, progressProject, completedProject };
