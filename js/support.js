// =========================================================
// support.js 
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------- 1. FAQ ACCORDION -------------------- */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Tutup semua item lain agar hanya satu yang terbuka
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) item.classList.add('active');
        });
    });


    /* -------------------- 2. FAQ SEARCH -------------------- */
    const searchInput = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResultsMsg = document.getElementById('no-results');

    if (searchInput) {
        searchInput.addEventListener('input', e => {
            const searchTerm = e.target.value.toLowerCase();
            let hasResults = false;

            faqItems.forEach(item => {
                const questionText = item.querySelector('span')?.textContent.toLowerCase() || "";
                const answerText = item.querySelector('.faq-answer p')?.textContent.toLowerCase() || "";
                const category = item.dataset.category?.toLowerCase() || "";

                const match =
                    questionText.includes(searchTerm) ||
                    answerText.includes(searchTerm) ||
                    category.includes(searchTerm);

                item.classList.toggle('hidden', !match);
                if (match) hasResults = true;
            });

            noResultsMsg.classList.toggle('hidden', hasResults);
        });
    }


    /* -------------------- 3. CATEGORY FILTER CLICK -------------------- */
    const catCards = document.querySelectorAll('.cat-card');

    catCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            if (!searchInput) return;

            searchInput.value = category;
            searchInput.dispatchEvent(new Event('input'));

            // Scroll halus ke FAQ
            document.querySelector('.support-faq').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    /* -------------------- 4. CHAT BUTTON -------------------- */
    const contactBtn = document.getElementById('contact-btn');
    const floatBtn = document.querySelector('.floating-chat-btn');

    function openChat() {
        alert("Connecting you to a Fortnite Support Agent...");
    }

    contactBtn?.addEventListener('click', openChat);
    floatBtn?.addEventListener('click', openChat);

});
