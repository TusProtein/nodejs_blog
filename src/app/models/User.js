import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import findOrCreate from 'mongoose-findorcreate';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // _id: { type: String, required: true },
  facebookId: { type: String, required: true },
  username: String,
  password: String,
  role: Number,
});

UserSchema.plugin(findOrCreate);

UserSchema.methods.verifyPassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);
