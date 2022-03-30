interface ComponentClass {
  callName: () => void;
  getYechu: () => void;
  getConsole: () => void;
  getWho: () => void;
}

abstract class Component implements ComponentClass {
  constructor() {
    console.log('component');
    this.callName();
  }
  callName() {
    this.getYechu();
    this.getConsole();
    this.getWho();
  }
  getYechu() {
    console.log('Yechu');
  }
  getConsole() {
    console.log('Console');
  }
  getWho() {}
}

class Parang extends Component {
  getwho() {
    console.log('parang');
  }
}

class Joy extends Component {
  getwho() {
    console.log('parang');
  }
}

new Parang();
console.log('=================');
new Joy();
