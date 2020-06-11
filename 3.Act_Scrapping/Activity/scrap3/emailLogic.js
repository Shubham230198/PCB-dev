/*
    This is the logic code of mailing the html page, by using nodemailer.
*/

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendEmail = async function main(html) {
//generated the setting
let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tiwari.98shubham@gmail.com", // generated ethereal user
      pass: "lpraylowmucpehbm", // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Shubham Tiwari 👻" <tiwari.98shubham@gmail.com>', // sender address
    to: "sahityatiwari5@gmail.com", // list of receivers
    subject: "Notice ✔", // Subject line
    html: html, // html body
  });
}
