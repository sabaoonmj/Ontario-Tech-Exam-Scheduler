<template>
  <div class="min-h-screen bg-gradient-to-b from-spirit-navy to-dark-grey text-white">
    <header class="flex justify-between items-center p-6">
      <nav class="flex space-x-6">
        <button class="text-white hover:text-tech-tangerine">Home</button>
        <button class="text-white hover:text-tech-tangerine">Search</button>
        <button class="text-white hover:text-tech-tangerine">Calendar</button>
        <button class="text-white hover:text-tech-tangerine">Contact</button>
      </nav>
      <button class="bg-tech-tangerine text-white px-4 py-2 rounded-md hover:bg-future-blue">View Exams</button>
    </header>
    
    <main class="flex flex-col md:flex-row items-center justify-between px-12 py-16">
      <div class="max-w-lg">
        <h1 class="text-5xl font-bold text-future-blue">Welcome To <br> Ontario Tech Exam Scheduler!</h1>
        <p class="mt-4 text-warm-grey">Add your exams to your calendar with ease! Just search, click add, and export...</p>
        <button class="mt-6 bg-tech-tangerine text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-future-blue">Get Started</button>
      </div>    
    </main>
  </div>
</template>



<style scoped>
.text-future-blue { color: var(--future-blue); }
.text-warm-grey { color: var(--warm-grey); }
.bg-tech-tangerine { background-color: var(--tech-tangerine); }
.bg-future-blue { background-color: var(--future-blue); }
</style>