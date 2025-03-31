function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        age: formData.get('age'),
        gender: formData.get('gender')
    };

    // Store data in localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push(data);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Prepare WhatsApp message
    const message = `New Registration Details:\n\n` +
        `Name: ${data.name}\n` +
        `Phone: ${data.phone}\n` +
        `Address: ${data.address}\n` +
        `Age: ${data.age}\n` +
        `Gender: ${data.gender}`;

    // Open WhatsApp with the registration details
    // Replace MANAGER_PHONE with the actual manager's phone number
    const managerPhone = '+918792200943'; // Update this with the actual manager's phone number
    const whatsappUrl = `https://wa.me/${managerPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Show success message
    alert('Registration successful! Redirecting to WhatsApp...');
    
    // Reset form
    event.target.reset();
}

// Function to validate phone number as user types
document.getElementById('phone').addEventListener('input', function(e) {
    const phoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (phoneNumber.length > 10) {
        e.target.value = phoneNumber.slice(0, 10); // Limit to 10 digits
    } else {
        e.target.value = phoneNumber;
    }
});

// Function to validate age
document.getElementById('age').addEventListener('input', function(e) {
    const age = parseInt(e.target.value);
    if (age < 5) e.target.value = age;
    if (age > 25) e.target.value = age;
});