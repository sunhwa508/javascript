'use strict';
// Object-oriented programming
// class: template
// object: instance of a class
// Javascript classes
//   - introduces in ES6
// 클래스가 도입되기 전까진 클래스를 정의하지 않고 오브젝트를 만들 수 있었다.
// 오브젝트를 만들때 function을 이용해 만들 수 있었다
//   - syntactical sugar over prototype-based inheritance
class Person {
  //constructor
  constructor(name, age) {
    // fields
    this.name = name;
    this.age = age;
  }
  //methods
  speak() {
    console.log(`${this.name}: hello!`);
  }
}

//새로운 오브젝트 생성
const ellie = new Person('ellie', 20);
console.log(ellie);

// Getter and setters
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    if (value < 0) {
      throw Error('age can not be negative');
    }
    this._age = value < 0 ? 0 : value;
  }
}
const user1 = new User('Steve', 'Job', -1);
console.log(user1);

// 3. Fields (public, private)
class Experiment {
  publicField = 2;
  #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

// 4.static properties and methods
// static 메소드 : 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.
class Article {
  static publisher = 'Dream Coding';
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }
  static printPublisher() {
    console.log(Article.publisher);
  }
}

// 5.Inheritance
// a way for one class to extend another class
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color of`);
  }

  getArea() {
    return width * this.height;
  }
}

class Rectangle extends Shape() {}
class Triangle extends Shape() {
  // 오버라이딩 된다.
  draw() {
    // 부모의 draw도 호출되면서 추가적으로 호출
    super.draw();
    console.log('▲');
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
  toString() {
    return `Triangle color ${this.color}`;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();

const triangle = new Triangle(20, 20, 'blue');
triangle.draw();

// 6. Class checking: instanceOf
// 클래스를 이용해서 만들어진 새로운 인스턴스이다.
// rectangle이 Rectangle 클래스의 오브젝트인지 확인!
// true, false 를 리턴
console.log(rectangle instanceof Rectangle); //T
console.log(triangle instanceof Rectangle); //F
console.log(triangle instanceof Triangle); //T
console.log(triangle instanceof Shape); //T
console.log(triangle instanceof Object); //T
