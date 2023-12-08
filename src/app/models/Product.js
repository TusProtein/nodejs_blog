import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, require: true, maxLength: 255 },
    description: { type: String },
    videoId: { type: String },
    cdnId: { type: String },
    rating: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    _id: false,
    timestamps: true,
  },
);

// Custom query helpers
ProductSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    let isValid = ['asc', 'desc'].includes(req.query.type)
      ? req.query.type
      : 'desc';
    return this.sort({
      [req.query.column]: isValid,
    });
  }
  return this;
};

// Add Plugins
ProductSchema.plugin(AutoIncrement);

mongoose.plugin(slug);

ProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

export default mongoose.model('Product', ProductSchema);
