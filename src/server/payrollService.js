import Razorpay from 'razorpay';

// console.log('TESTID', process.env.RAZORPAY_TEST_ID);
// console.log('TESTIDSECRET', process.env.RAZORPAY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default razorpay;
