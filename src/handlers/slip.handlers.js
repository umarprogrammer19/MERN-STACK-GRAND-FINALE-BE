// getLoanDetails = async (req, res) => {
//     try {
//         const loans = await Loan.find({ userId: req.user.id }); // Fetch loans for the logged-in user

//         if (loans.length === 0) {
//             return res.status(404).json({
//                 message: "No loan requests found for this user."
//             });
//         }

//         res.status(200).json({
//             message: "Loan requests fetched successfully!",
//             loans,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// generateSlip = async (req, res) => {
//     try {
//       const { loanId, appointmentDate, appointmentTime, officeLocation } = req.body;
  
//       // Find the loan request
//       const loan = await Loan.findById(loanId);
//       if (!loan) {
//         return res.status(404).json({ message: "Loan request not found." });
//       }
  
//       // Generate a unique token number
//       const tokenNumber = `TKN-${Date.now()}`;
  
//       // Create QR Code data
//       const qrData = {
//         loanId: loan._id,
//         tokenNumber,
//         appointmentDate,
//         appointmentTime,
//         officeLocation,
//       };
  
//       // Generate QR Code as a Base64 string
//       const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
  
//       // Save slip details to the loan request
//       loan.tokenNumber = tokenNumber;
//       loan.appointmentDetails = { appointmentDate, appointmentTime, officeLocation };
//       loan.qrCode = qrCode;
//       await loan.save();
  
//       // Send slip data as a downloadable response
//       const slipHtml = `
//         <html>
//           <body>
//             <h1>Loan Application Slip</h1>
//             <p>Token Number: ${tokenNumber}</p>
//             <p>Appointment Date: ${appointmentDate}</p>
//             <p>Appointment Time: ${appointmentTime}</p>
//             <p>Office Location: ${officeLocation}</p>
//             <img src="${qrCode}" alt="QR Code" />
//           </body>
//         </html>
//       `;
  
//       const filePath = path.join(__dirname, `../slips/slip-${loanId}.html`);
//       fs.writeFileSync(filePath, slipHtml);
  
//       res.status(200).sendFile(filePath, (err) => {
//         if (err) {
//           res.status(500).json({ message: "Error generating slip." });
//         }
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   };
  