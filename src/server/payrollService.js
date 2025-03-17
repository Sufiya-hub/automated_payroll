import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default razorpay;
