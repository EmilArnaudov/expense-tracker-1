const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z]\w+$/, 'Username can contain only alphanumeric characters ([A-Z] [a-z] [0-9] and \'_\')'],
        minlength: [6, 'Username must be between 6 - 18 characters.'],
        maxlength: [18, 'Username must be between 6 - 18 characters.'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z]\w+$/, 'Password can contain only alphanumeric characters ([A-Z] [a-z] [0-9] and \'_\')'],
        minlength: [8, 'Password must be between 8 - 30 characters.'],
        maxlength: [30, 'Password must be between 8 - 30 characters.']
    }
})

userSchema.pre('save', async () => {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});



const User = mongoose.model('User', userSchema);

module.exports = User;