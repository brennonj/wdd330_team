export default class Alert {
  constructor() {
    this.path = '../json/alerts.json';
    this.alerts = [];
  }

  async init() {
    await this.getData();
    if (this.alerts.length && this.alerts[0].message.length) {
      this.createAlerts();
    }
  }

  async getData() {
    const data = await fetch(this.path);
    if (data.ok) {
      this.alerts = await data.json();
    }
  }

  async createAlerts() {
    let section = document.createElement('section');
    section.classList.add('alert-list');

    this.alerts.forEach((alert) => {
      let p = document.createElement('p');
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background.length
        ? alert.background
        : 'royalblue';
      p.style.color = alert.color.length ? alert.color : 'white';
      section.appendChild(p);
    });

    document.getElementsByTagName('main')[0].prepend(section);
  }
}
