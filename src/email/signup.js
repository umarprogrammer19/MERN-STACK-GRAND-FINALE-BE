export const Sign_Up_Email_Format = (fullname, password) => {
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
            background-color: #D84040;
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
            color: #D84040;
            font-size: 22px;
        }
        .content p {
            margin: 10px 0;
            font-size: 16px;
        }
        .content .password-box {
            margin: 20px 0;
            padding: 10px;
            background: #f2f2f2;
            border-left: 4px solid #5CB338;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        .button {
            text-align: center;
            margin-top: 20px;
        }
        .button a {
            text-decoration: none;
            padding: 10px 20px;
            color: white;
            background: #5CB338;
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
            <h1>Welcome to Saylani Microfinance Platform, ${fullname}! 🎉</h1>
        </div>
        <div class="content">
            <h2>Hello ${fullname},</h2>
            <p>We're thrilled to have you on board! Below are your login details to get started:</p>
            <div class="password-box">
                Your Temporary Password: ${password}
            </div>
            <p>Please log in using this password and change it to a secure one after your first login.</p>
        <ul>
            <li>🔎 Explore our loan categories tailored to your needs.</li>
            <li>📈 Calculate and apply for loans effortlessly.</li>
            <li>🤝 Manage your applications and appointments with ease.</li>
        </ul>
            <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>
        <div class="button">
            <a href="#" target="_blank">Log In Now</a>
        </div>
        </div>
            <div class="footer">
            <p>Thank you for choosing Saylani Microfinance! <br> The Saylani Microfinance Team</p>
            <p>© 2025 Saylani Welfare. All rights reserved.</p>
        </div>
    </div>
    </body>
</html>
`;

    return html;
}
