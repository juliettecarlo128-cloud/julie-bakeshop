const orderForm = document.getElementById('order-form');
const orderResult = document.getElementById('order-result');
const copyButton = document.getElementById('copy-email');

const orderEmail = 'juliettecarlo128@gmail.com';

function showCopyAction() {
  if (copyButton) {
    copyButton.parentElement?.classList.add('visible');
  }
}

function hideCopyAction() {
  if (copyButton) {
    copyButton.parentElement?.classList.remove('visible');
  }
}

if (orderForm && orderResult) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const orderType = (formData.get('orderType') || 'Pickup').toString();
    const item = formData.get('item') || '';
    const notes = (formData.get('notes') || '').toString().trim();

    if (!name || !email || !phone || !item) {
      orderResult.textContent = 'Please complete your name, email, phone, and item selection before sending the order.';
      hideCopyAction();
      return;
    }

    const friendlyItem = {
      cookies: 'Cookie Box',
      cakePops: 'Cake Pops',
      cakesicles: 'Cakesicles',
      cinnamonRolls: 'Cinnamon Rolls',
      chocolateStrawberries: 'Chocolate Covered Strawberries',
      carrotCake: 'Carrot Cake',
      tresLeches: 'Tres Leches',
      bananaBread: 'Banana Bread',
      dotCakes: 'Dot Cakes',
      partySmall: 'Party Package - Small',
      partyMedium: 'Party Package - Medium',
      partyLarge: 'Party Package - Large',
      partyXLarge: 'Party Package - X-Large',
    }[item] || 'dessert item';

    const subject = encodeURIComponent(`Order Request: ${friendlyItem}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrder type: ${orderType}\nItem: ${friendlyItem}\nNotes: ${notes || 'None'}\n\nPlease follow up to confirm pickup or delivery details.`
    );

    const mailto = `mailto:${orderEmail}?subject=${subject}&body=${body}`;

    orderResult.textContent = `Thanks, ${name}! Your order draft is being opened in your email app. If nothing opens, copy this email address and send your order manually: ${orderEmail}.`;
    showCopyAction();

    const mailLink = document.createElement('a');
    mailLink.href = mailto;
    mailLink.style.display = 'none';
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);
  });
}

if (copyButton) {
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(orderEmail).then(() => {
      orderResult.textContent = `Email address copied: ${orderEmail}. Paste it into your email app to send your order.`;
    }).catch(() => {
      orderResult.textContent = `Copy failed. Please use this email address: ${orderEmail}`;
    });
  });
}

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

