const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
      phone: { type: String, required: true },
    email: { type: String, required: true },
      role: { type: String, required: true }
  }
);

AdminSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

const Admin = mongoose.model('Admin', AdminSchema);

exports.Admin = Admin;
