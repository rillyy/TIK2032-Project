<?php
include 'config.php';

$success = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $stmt = $conn->prepare("INSERT INTO contacts (name, email, message, submitted_at) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        $success = true;
    }

    $stmt->close();
    $conn->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - Rilly's Interactive Pages</title>
    <link rel="stylesheet" href="style4.css">
</head>
<body>
    <div class="loader" id="loader"><div class="loader-spinner"></div></div>
    <div class="bg-particles" id="particles"></div>

    <nav>
        <div class="nav-container">
            <div class="logo">bonjouRilly!</div>
            <div class="links">
                <a href="index.html">Home</a>
                <a href="gallery.html">Gallery</a>
                <a href="blogs.html">Blog</a>
                <a href="contacts.php" class="active">Contact</a>
            </div>
        </div>
    </nav>

    <section class="contact-container">
        <h1>Contact Me</h1>
        <p>Feel free to reach out to me through the form below or my social media!</p>

        <div class="contact-form-container">
            <form class="contact-form" method="POST" action="">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="submit-btn">
                    <span>Send Message</span>
                    <div class="btn-loading" id="btnLoading"></div>
                </button>
            </form>
        </div>

        <div class="other-platforms">
            <h2>Other Platforms</h2>
            <div class="contact-links">
                <p><strong>Instagram:</strong> <a href="https://instagram.com/brrliani_" target="_blank">@brrliani_</a></p>
                <p><strong>Email:</strong> <a href="mailto:brilliani.jeshia2812@gmail.com">brilliani.jeshia2812@gmail.com</a></p>
            </div>
        </div>
    </section>

    <?php if ($success): ?>
    <div class="modal" id="successModal" style="display:block;">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Message Sent!</h3>
                <span class="close" onclick="document.getElementById('successModal').style.display='none'">&times;</span>
            </div>
            <div class="modal-body">
                <p>Thank you for your message! I'll get back to you soon.</p>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <footer>
        <p>&copy; 2025 Brilliani Jeshia Potalangi. All rights reserved. Made with ❤️</p>
    </footer>

    <script src="script4.js"></script>
</body>
</html>
