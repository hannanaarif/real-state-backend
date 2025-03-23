import express from "express";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import validator from "validator";
import crypto from "crypto";
import userModel from "../models/Usermodel.js";
import transporter from "../config/nodemailer.js";
import { getWelcomeTemplate } from "../email.js";

const backendurl = process.env.BACKEND_URL;

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Registeruser = await userModel.findOne({ email });
    if (!Registeruser) {
      return res.json({ message: "Email not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, Registeruser.password);
    if (isMatch) {
      const token = createtoken(Registeruser._id);
      return res.json({ token, user: { name: Registeruser.name, email: Registeruser.email ,role: Registeruser.role}, success: true });
    } else {
      return res.json({ message: "Invalid password", success: false });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "Server error", success: false });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name, email, password);
    if (!validator.isEmail(email)) {
      return res.json({ message: "Invalid email", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword, role });
    await newUser.save();
    const token = createtoken(newUser._id);

    // send email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Welcome to BuildEstate - Your Account Has Been Created",
      html: getWelcomeTemplate(name)
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error occurred:', error);
      }
      console.log('Email sent:', info.response);
    });

    return res.json({ token, user: { name: newUser.name, email: newUser.email }, success: true });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error", success: false });
  }
};


const logout = async (req, res) => {
  try {
    return res.json({ message: "Logged out", success: true });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error", success: false });
  }
};

// get name and email

const getname = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    return res.json(user);
  }
  catch (error) {
    console.error(error);
    return res.json({ message: "Server error", success: false });
  }
}



export { login, register, logout, getname };