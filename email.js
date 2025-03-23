import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const getWelcomeTemplate = (name) => `
<div style="max-width: 600px; margin: 20px auto; font-family: 'Arial', sans-serif; line-height: 1.6;">
  <!-- Header with Background -->
  <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 20px; border-radius: 15px 15px 0 0; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Welcome to BuildEstate!</h1>
    <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 16px;">Your Dream Home Awaits</p>
  </div>

  <!-- Main Content -->
  <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
    <!-- Welcome Message -->
    <div style="text-align: center; margin-bottom: 30px;">
      <p style="font-size: 18px; color: #374151; margin: 0;">Hello <strong style="color: #2563eb;">${name}</strong></p>
      <p style="font-size: 16px; color: #4b5563; margin-top: 10px;">
        Welcome to our community of property enthusiasts! Your account has been successfully created.
      </p>
    </div>

    <!-- Features Section -->
    <div style="background: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">Unlock These Features:</h2>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Browse Premium Property Listings
        </li>
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Schedule Property Viewings
        </li>
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Save Favorite Properties
        </li>
        <li style="display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; margin-right: 12px; text-align: center; line-height: 24px; color: #2563eb;">✓</span>
          Direct Contact with Property Owners
        </li>
      </ul>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="${process.env.WEBSITE_URL}/properties"
         style="display: inline-block; padding: 16px 30px; background: linear-gradient(135deg, #2563eb, #1e40af); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
        Start Exploring Properties
      </a>
    </div>

    <!-- Support Section -->
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
      <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Need Assistance?</h3>
      <p style="margin: 0; color: #4b5563;">
        Our support team is available 24/7:
        <br>
        📧 <a href="mailto:support@buildestate.com" style="color: #2563eb; text-decoration: none;">support@buildestate.com</a>
        <br>
        📞 <a href="tel:+1234567890" style="color: #2563eb; text-decoration: none;">+1 (234) 567-890</a>
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 30px;">
    <div style="margin-bottom: 20px;">
      <a href="#" style="display: inline-block; margin: 0 8px;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/facebook-new.png" alt="Facebook" style="width: 24px; height: 24px;">
      </a>
      <a href="#" style="display: inline-block; margin: 0 8px;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/twitter.png" alt="Twitter" style="width: 24px; height: 24px;">
      </a>
      <a href="#" style="display: inline-block; margin: 0 8px;">
        <img src="https://img.icons8.com/ios-filled/24/4a90e2/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;">
      </a>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin: 0;">
      © ${new Date().getFullYear()} BuildEstate. All rights reserved.
    </p>
    <div style="margin-top: 10px;">
      <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Terms of Service</a>
    </div>
  </div>
</div>
`;

