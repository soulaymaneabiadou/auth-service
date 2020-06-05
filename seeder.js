const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Load models
const User = require('./models/User');

// Load env vars
dotenv.config({ path: './config/.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log('Data Destroyed....');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const getData = async () => {
  try {
    const users = await User.find();
    console.log({ users });
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else if (process.argv[2] === '-s') {
  getData();
}
