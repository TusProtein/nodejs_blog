import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, require: true, maxLength: 255 },
    description: { type: String },
    videoId: { type: String },
    cdnId: { type: String },
    rating: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);

// Add Plugins
mongoose.plugin(slug);
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export default mongoose.model('Product', Product);
