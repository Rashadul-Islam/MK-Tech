import mongoose from 'mongoose';

const enrollSchema = mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Enroll = mongoose.model('Enroll', enrollSchema);

export default Enroll;