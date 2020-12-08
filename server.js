// Entry point. Where server lives.
const app = require('./lib/app');

//endpoints


app.listen(7890, () => {
    console.log('listenening on 7890');
});
