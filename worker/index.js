const keys = require('./keys'); // looking for file that has keys for connecting to other container (connection keys)
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000 // try to reconnect once every 1000 millisec
});
const sub = redisClient.duplicate();

// a function to solve fibonacci sequence calculation known as fibonacci recursive solution
// using a slow solution on purpose for use with the multiple container solution
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// anytime we get a new value in redis we will calculate new value and insert into a hash called values
sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

// sub = subscribe
// subscribe to any insert event
sub.subscribe('insert');
