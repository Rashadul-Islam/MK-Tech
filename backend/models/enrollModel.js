import mongoose from 'mongoose';

const enrollSchema = mongoose.Schema(
    {
        student: {
            type: String,
            required: true
        },
        teacher: {
            type: String,
            required: true
        },
        courseId: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Enroll = mongoose.model('Enroll', enrollSchema);

export default Enroll;