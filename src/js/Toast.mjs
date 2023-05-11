class Toast {
  constructor(type = 'success') {
    this.container = document.createElement('div');
    this.container.classList.add('toast-container', `toast-container-${type}`);
    document.body.appendChild(this.container);
  }

  show(message) {
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.classList.add('toast', `toast-${this.container.classList[1]}`);
    toastEl.innerHTML = `<span>${message}</span><span class="toast-close">&times;</span>`;

    // Append toast element to container
    this.container.appendChild(toastEl);

    // Close toast on click
    const closeEl = toastEl.querySelector('.toast-close');
    closeEl.addEventListener('click', () => {
      this.container.removeChild(toastEl);
    });

    // Remove toast after 3 seconds
    setTimeout(() => {
      this.container.removeChild(toastEl);
    }, 3000);

    // Stack toasts on top of each other
    const toasts = this.container.querySelectorAll('.toast');
    let offset = 0;
    for (let i = 0; i < toasts.length; i++) {
      const height = toasts[i].offsetHeight;
      toasts[i].style.top = `${offset}px`;
      offset += height + 10; // Add 10px spacing
    }
  }
}
