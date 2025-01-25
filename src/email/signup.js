export const Sign_Up_Email_Format = (fullname) => {
    const html = `
    <!DOCTYPE html>
        <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #4caf50;
            color: white;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: left;
            color: #333;
        }
        .content h2 {
            color: #4caf50;
            font-size: 22px;
        }
        .content p {
            margin: 10px 0;
            font-size: 16px;
        }
        .button {
            text-align: center;
            margin-top: 20px;
        }
        .button a {
            text-decoration: none;
            padding: 10px 20px;
            color: white;
            background: #4caf50;
            border-radius: 4px;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #777;
        }
  </style>
</head>
    <body>
        <div class="email-container">
            <div class="header">
            <h1>Welcome to Our Platform, ${fullname}! 🎉</h1>
        </div>
        <div class="content">
            <h2>Hello ${fullname},</h2>
            <p>We're so excited to have you on board! Here's what you can look forward to:</p>
        <ul>
            <li>🌟 Explore exciting features designed just for you.</li>
            <li>💬 Connect with a vibrant community.</li>
            <li>📈 Unlock new opportunities to grow and succeed.</li>
        </ul>
            <p>If you ever have questions, our team is here to help you. Just reply to this email or visit our support page.</p>
        <div class="button">
            <a href="#" target="_blank">Get Started Now</a>
        </div>
        </div>
            <div class="footer">
            <p>Thank you for joining us! <br> The Team at Our Platform</p>
            <p>© 2025 Umar Farooq. All rights reserved.</p>
        </div>
    </div>
    </body>
</html>
`;

    return html;
}


