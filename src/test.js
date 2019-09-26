function someAsyncFunc(cb) {
  console.log('someAsyncFunc() called')
  setTimeout(() => cb(), 100);
}

function otherAsyncFunc(cb) {
  console.log('otherAsyncFunc() called')
  setTimeout(() => cb('otherAsyncFunc() result'), 100);
}

const someFunc = () => new Promise(resolve => someAsyncFunc(resolve))
const otherFunc = () => new Promise(resolve => otherAsyncFunc(resolve))

const MyApi = (previousActions = Promise.resolve()) => {
  return {
    someFunc: () => MyApi(previousActions.then(someFunc)),
    otherFunc: (cb) => MyApi(previousActions.then(otherFunc).then(res => cb(res))),
  };
}

const api = MyApi();
exports.api = api;

console.log("before chain")
api
  .someFunc()
  .someFunc()
  .otherFunc(result => console.log(result))
  .someFunc()
  .otherFunc(result => console.log(result))
console.log("after chain")