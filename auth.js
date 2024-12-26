const correctPasswordHash = '384fde3636e6e01e0194d2976d8f26410af3e846e573379cb1a09e2f0752d8cc'; // 这应该是正确密码的哈希值

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.getElementById('submitButton').addEventListener('click', async () => {
    let password = document.getElementById('passwordInput').value;
    let messageElement = document.getElementById('message');

    if (password === '') {
        messageElement.textContent = 'Password cannot be empty.';
        return;
    }

    try {
        let hashedPassword = await hashPassword(password);

        if (hashedPassword === correctPasswordHash) {
            document.getElementById('protectedContent').style.display = 'block';
            document.getElementById('loginForm').style.display = 'none';
        } else {
            messageElement.textContent = 'Incorrect password.';
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        messageElement.textContent = 'An error occurred.';
    }
});