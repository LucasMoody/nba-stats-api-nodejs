function queueWithPause(collection, func, interval) {
  return collection.reduce((promise, item) => {
    return promise.then(
      _ =>
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            func(item);
            resolve();
          }, interval);
        })
    );
  }, Promise.resolve());
}

module.exports = {
  queueWithPause: queueWithPause
};
