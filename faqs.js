document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    // Close all open FAQs
    document.querySelectorAll('.faq-question').forEach(btn => btn.setAttribute('aria-expanded', 'false'));

    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
