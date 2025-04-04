<template>
  <div class="contact-page">
    <div class="contact-card">
      <h2 class="contact-title">Contact Us</h2>
      <form class="contact-form" @submit.prevent="sendMessage">
        <input type="text" v-model="name" placeholder="Name" class="contact-input" />
        <input type="email" v-model="email" placeholder="Email" class="contact-input" />
        <textarea v-model="message" placeholder="Message" class="contact-textarea"></textarea>
        <button type="submit" class="contact-button">Send Message</button>
      </form>
      <!-- Confirmation message -->
      <div v-if="sent" class="confirmation-message">
        <p>Your message has been sent successfully!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define the form fields and sent status
const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)

const sendMessage = () => {
  // Here you would typically send the form data to the server

  // For now, we'll simulate a successful send
  sent.value = true

  // Hide the confirmation message after 3 seconds
  setTimeout(() => {
    sent.value = false
  }, 3000)
}
</script>

<style scoped>
.contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  background-color: var(--light);
  min-height: calc(100vh - var(--topbar-height));
}

.contact-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px; /* Increase the max width of the box */
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-input,
.contact-textarea {
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--grey);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--light);
  color: var(--dark);
  transition: border 0.2s;
}

.contact-input:focus,
.contact-textarea:focus {
  border-color: var(--primary);
  outline: none;
}

.contact-textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-button {
  background-color: var(--tech-tangerine);
  color: white;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: background 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.contact-button:hover {
  background-color: #d94e1a;
}

/* Confirmation Message */
.confirmation-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--primary);
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


</style>


