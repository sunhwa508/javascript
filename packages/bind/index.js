// call apply bind this를 명시적으로 지정해 주는 경우

function foo() {
  console.log(this.a);
}
var obj1 = { a: 2, foo: foo };
var obj2 = { a: 3, foo: foo };

obj1.foo(); //2
obj2.foo(); //3

obj1.foo.call(obj2); //3
obj2.foo.call(obj1); //2

// new 바인딩
function foo(something) {
  this.a = something;
}

var obj1 = { foo: foo };
var obj2 = {};

obj1.foo(2); // this = obj1
console.log(obj1.a); //2

obj1.foo.call(obj2, 3);
// call 사용방법 : fun.call(thisArg[, arg1[, arg2[, ...]]])

// => obj2 = {foo : foo};
// this.a = obj2, obj2.a = 3

console.log(obj2.a); //3

// new 바인딩
var bar = new obj1.foo(4);

console.log(obj1.a); //2
console.log(bar.a); //4

function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);

bar = function bar(something) {
  obj1.a = something;
};

bar(2);
console.log(obj1.a); //2

var baz = new bar(3);
console.log(obj1.a); //2
console.log(baz.a); //3

// bind 사용법
// func.bind(thisArg[, arg1[, arg2[, ...]]])

function bind(fn, obj) {
  return function () {
    // apply 사용법
    // fun.apply(thisArg, [argsArray])
    fn.apply(obj, arguments);
  };
}
