var express = require('express');
var router = express.Router();
const userModels = require('../models/user')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const secretKey = "utdqppoymykncgsp"
const abc = 10
const otpStore = {};

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const data = await userModels.find()
  res.json(data)
});

// Add 
router.post('/add', async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    const user = await userModels.findOne({ email });
    const username1 = await userModels.findOne({ username });
    if (user || username1) {
      res.json({ status: 0, message: "Tài khoản đã tồn tại" });
    } else {
      const hash = await bcrypt.hash(password, abc);
      const newUser = {
        name: "null",
        adress: "null",
        email: email,
        sdt: null,
        username: username,
        password: hash,
      };

      res.json({ status: 1, message: "Đăng ký thành công", newUser });
      await userModels.create(newUser);
    }
  } catch (error) {
    console.log("Thêm tài khoản ko thành công", error)
  }
});

// login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body 
    const user = await userModels.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        await user.save();
        res.json({
          status: 1,
          message: "Đăng nhập thành công",
          user,
        });
      } else {
        res.json({ status: 0, message: "Mật khẩu không đúng" });
      }
    } else {
      res.json({ status: 0, message: "Tài khoản không tồn tại" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Lỗi khi đăng nhập", err });
  }
});

function generateOTP() {
  // Tạo một mã OTP ngẫu nhiên gồm 6 ký tự
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// gửi mã otp
// http://localhost:3000/users/send-otp
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    // Kiểm tra xem email có tồn tại trong hệ thống hay không
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email không tồn tại trong hệ thống" });
    }
    // Nếu email tồn tại, tiếp tục tạo mã OTP và gửi email
    const otp = generateOTP(); // Tạo mã OTP
    // Lưu mã OTP và email vào cơ sở dữ liệu tạm thời
    otpStore[email] = otp;
    // Gửi email với mã OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khaintps35811@fpt.edu.vn",
        pass: secretKey, // Sử dụng secretKey thay vì hardcode mật khẩu
      },
    });

    const mailOptions = {
      from: "khaintps35811@fpt.edu.vn",
      to: email,
      subject: "Khôi phục mật khẩu",
      text: `${otp}`,
    };

    const OTP = mailOptions.text

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể gửi email" });
      } else {
        // console.log("Email sent: " + JSON.stringify(info));
        console.log("mailOptions mailOptions: " + JSON.stringify(mailOptions.text));
        res.status(200).json({ success: true, message: "Gửi mã OTP về email thành công", OTP });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
});

// quên mật khẩu
// http://localhost:3000/users/reset-password
router.post("/reset-password", async (req, res) => {
  // request lấy dữ liệu từ client
  const { email, otp, newPassword } = req.body;

  // Kiểm tra xem OTP có khớp với email không
  if (otpStore[email] === otp) {
    try {
      // Tìm người dùng trong cơ sở dữ liệu bằng email
      const user = await userModels.findOne({ email });

      if (!user) {
        return res.status(400).json({ success: false, message: "Không có thông tin người dùng" });
      }

      // Mã hóa mật khẩu mới trước khi cập nhật
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Cập nhật mật khẩu mới trong cơ sở dữ liệu
      user.password = hashedPassword;
      await user.save();

      // Xóa OTP khỏi cơ sở dữ liệu tạm thời
      delete otpStore[email];

      res.status(200).json({ success: true, message: "Đổi mật khẩu thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  } else {
    // response trả về cho client
    res.status(400).json({ success: false, message: "Mã OTP không hợp lệ" });
  }
});

module.exports = router;
