const orderForm = document.getElementById('order-form');
const orderResult = document.getElementById('order-result');

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const item = formData.get('item');
  const notes = formData.get('notes').trim();

  const friendlyItem = {
    cookies: 'Cookie Box',
    cakePops: 'Cake Pops',
    cakesicles: 'Cakesicles',
    cinnamonRolls: 'Cinnamon Rolls',
    chocolateStrawberries: 'Chocolate Covered Strawberries',
    carrotCake: 'Carrot Cake',
    tresLeches: 'Tres Leches',
    bananaBread: 'Banana Bread',
    partySmall: 'Party Package - Small',
    partyMedium: 'Party Package - Medium',
    partyLarge: 'Party Package - Large',
    partyXLarge: 'Party Package - X-Large',
  }[item] || 'dessert item';

  const subject = encodeURIComponent(`Order Request: ${friendlyItem}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nItem: ${friendlyItem}\nNotes: ${notes}\n\nPlease follow up to confirm pickup or delivery.`
  );

  const mailto = `mailto:juliettecarlo128@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;

  orderResult.textContent = `Thanks, ${name}! Your order draft is ready in your email app. Send it to complete the order.`;
});

// Tabs navigation: smooth scroll and active state
document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.top-tabs .tab'));
  const sections = tabs.map(t => document.querySelector(t.getAttribute('href'))).filter(Boolean);

  function clearActive() {
    tabs.forEach(t => t.classList.remove('active'));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(tab.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      clearActive();
      tab.classList.add('active');
    });
  });

  // highlight tab on scroll
  function onScroll() {
    let found = false;
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 120) {
        clearActive();
        const active = tabs.find(t => t.getAttribute('href') === '#'+s.id);
        if (active) active.classList.add('active');
        found = true;
        break;
      }
    }
    if (!found) clearActive();
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
