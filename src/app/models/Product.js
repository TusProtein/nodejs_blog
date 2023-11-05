import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Product = new Schema(
    {
        name: { type: String, require: true, maxLength: 255 },
        description: { type: String },
        videoId: { type: String, require: true },
        rating: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Product', Product);
