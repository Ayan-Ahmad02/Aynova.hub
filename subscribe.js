let timeLeft = 120; // 2 min = 120 sec
const timer = document.getElementById("timer");
const overlay = document.getElementById("paymentOverlay");
const qrCode = document.getElementById("qrCode");
const paidBtn = document.getElementById("paidBtn");
const paymentDetails = document.getElementById("paymentDetails");

// ✅ Payment Link (UPI)
const paymentLink = "upi://pay?pa=example@upi&pn=MyWebsite&am=100&cu=INR";

// ✅ Optional: Generate QR Code automatically if needed
// qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentLink)}`;

// ✅ Countdown Timer
const countdown = setInterval(() => {
  if (!timer) return; // Safety check if element not found

  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  timer.innerText = `Free Trial: ${min}:${sec < 10 ? "0" + sec : sec}`;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    if (overlay) overlay.style.display = "flex";
  }

  timeLeft--;
}, 1000);

// ✅ After Payment Button Click
if (paidBtn) {
  paidBtn.addEventListener("click", () => {
    if (overlay) overlay.style.display = "none";

    if (paymentDetails) {
      paymentDetails.innerHTML = `
        <p>✅ Payment Successful!</p>
        <p>Amount: ₹100</p>
        <p>Transaction ID: TXN${Date.now()}</p>
        <p>Date: ${new Date().toLocaleString()}</p>
      `;
    }
  });
}
