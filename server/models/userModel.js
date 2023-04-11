import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: [true, 'User with that email already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide a password'],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: 'Passwords do not match',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre hook for password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
