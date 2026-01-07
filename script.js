// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
  }

  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Show success message (you can replace this with actual form submission)
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');

    // Reset form
    contactForm.reset();
  });
}

// Add to cart functionality - Show popup
const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
const orderPopup = document.getElementById('orderPopup');
const closePopup = document.getElementById('closePopup');
const cancelOrder = document.getElementById('cancelOrder');
const orderForm = document.getElementById('orderForm');
const popupProductName = document.getElementById('popupProductName');

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Get product name from the card
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;

    // Update popup with product name
    popupProductName.textContent = productName;

    // Show popup
    orderPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
});

// Close popup handlers
function closeOrderPopup() {
  orderPopup.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
  orderForm.reset();
}

closePopup.addEventListener('click', closeOrderPopup);
cancelOrder.addEventListener('click', closeOrderPopup);

// Close popup when clicking outside
orderPopup.addEventListener('click', (e) => {
  if (e.target === orderPopup) {
    closeOrderPopup();
  }
});

// Handle order form submission
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    product: popupProductName.textContent,
    name: document.getElementById('orderName').value,
    phone: document.getElementById('orderPhone').value,
    address: document.getElementById('orderAddress').value,
    quantity: document.getElementById('orderQuantity').value,
    note: document.getElementById('orderNote').value
  };

  console.log('Order data:', formData);

  // Show success message
  alert(`Cảm ơn bạn đã đặt hàng!\n\nSản phẩm: ${formData.product}\nSố lượng: ${formData.quantity}\n\nChúng tôi sẽ liên hệ với bạn sớm nhất!`);

  // Close popup and reset form
  closeOrderPopup();
});

// CTA Button handlers
const ctaButtons = document.querySelectorAll('.btn-primary:not(.product-card .btn-primary)');
ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (!button.closest('form')) {
      e.preventDefault();
      // Scroll to products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = productsSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = hero.querySelector('.hero-image-wrapper');
    if (parallax && scrolled < window.innerHeight) {
      parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}

// Product image hover effect enhancement
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  const image = card.querySelector('.product-image img');

  card.addEventListener('mouseenter', () => {
    image.style.transform = 'scale(1.1) rotate(2deg)';
  });

  card.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Product Detail Popup
const productDetailPopup = document.getElementById('productDetailPopup');
const closeDetailPopup = document.getElementById('closeDetailPopup');
const detailAddToCart = document.getElementById('detailAddToCart');
const decreaseQty = document.getElementById('decreaseQty');
const increaseQty = document.getElementById('increaseQty');
const detailQuantity = document.getElementById('detailQuantity');

// Product data
const productData = {
  'Bò Khô Miếng': {
    image: '/Users/huykira/.gemini/antigravity/brain/e09e68be-b22e-4be1-9cc3-280ca1ac9fb9/bo_kho_mieng_1765967030702.png',
    badge: 'Bán Chạy',
    badgeClass: '',
    price: '350.000đ',
    oldPrice: '450.000đ',
    description: 'Bò khô miếng được làm từ thịt bò tươi ngon, ướp với gia vị đặc biệt theo công thức gia truyền. Sản phẩm có độ dày vừa phải, mềm, thơm ngon và đậm đà hương vị truyền thống. Thích hợp để ăn vặt, nhâm nhi hoặc làm quà biếu.'
  },
  'Bò Khô Sợi': {
    image: '/Users/huykira/.gemini/antigravity/brain/e09e68be-b22e-4be1-9cc3-280ca1ac9fb9/bo_kho_soi_1765967136351.png',
    badge: 'Hot',
    badgeClass: 'hot',
    price: '380.000đ',
    oldPrice: '480.000đ',
    description: 'Bò khô xé sợi mềm mại, dễ ăn, được chế biến từ những miếng thịt bò thượng hạng. Sản phẩm có kết cấu sợi mịn, thơm ngon, đậm đà. Đặc biệt thích hợp cho người lớn tuổi và trẻ em, dễ nhai và tiêu hóa.'
  },
  'Combo Bò Khô': {
    image: '/Users/huykira/.gemini/antigravity/brain/e09e68be-b22e-4be1-9cc3-280ca1ac9fb9/bo_kho_hero_1765966955357.png',
    badge: 'Mới',
    badgeClass: 'new',
    price: '950.000đ',
    oldPrice: '1.200.000đ',
    description: 'Combo bò khô đặc biệt bao gồm 3 loại: Bò khô miếng, Bò khô sợi và Bò khô lát mỏng. Đây là lựa chọn hoàn hảo để thưởng thức đa dạng hương vị hoặc làm quà tặng sang trọng cho người thân, đối tác.'
  }
};

// View detail buttons
const viewDetailButtons = document.querySelectorAll('.product-overlay .btn-white');
viewDetailButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const product = productData[productName];

    if (product) {
      // Update popup content
      document.getElementById('detailProductImage').src = product.image;
      document.getElementById('detailProductName').textContent = productName;
      document.getElementById('detailProductPrice').textContent = product.price;
      document.getElementById('detailProductOldPrice').textContent = product.oldPrice;
      document.getElementById('detailProductDescription').textContent = product.description;

      const badge = document.getElementById('detailProductBadge');
      badge.textContent = product.badge;
      badge.className = 'product-detail-badge ' + product.badgeClass;

      // Reset quantity
      detailQuantity.value = 1;

      // Show popup
      productDetailPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close detail popup
function closeProductDetailPopup() {
  productDetailPopup.classList.remove('active');
  document.body.style.overflow = '';
}

closeDetailPopup.addEventListener('click', closeProductDetailPopup);

// Close when clicking outside
productDetailPopup.addEventListener('click', (e) => {
  if (e.target === productDetailPopup) {
    closeProductDetailPopup();
  }
});

// Quantity controls
decreaseQty.addEventListener('click', () => {
  const currentValue = parseInt(detailQuantity.value);
  if (currentValue > 1) {
    detailQuantity.value = currentValue - 1;
  }
});

increaseQty.addEventListener('click', () => {
  const currentValue = parseInt(detailQuantity.value);
  detailQuantity.value = currentValue + 1;
});

// Add to cart from detail popup
detailAddToCart.addEventListener('click', () => {
  const productName = document.getElementById('detailProductName').textContent;
  const quantity = detailQuantity.value;

  // Close detail popup
  closeProductDetailPopup();

  // Open order popup with product info
  popupProductName.textContent = productName;
  document.getElementById('orderQuantity').value = quantity;
  orderPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
