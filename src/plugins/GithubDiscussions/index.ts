export default () => {
  const name = 'GitHub Discussions';
  const version = 0.1;
  const author = 'mktcode';

  const sayHello = (name) =>{
    console.log(`Hello ${name}!`)
  }

  return {
    name,
    version,
    author,
    sayHello
  }
}