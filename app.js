const express  = require('express');
const app      = express();
const routes   = require('./routes');

//Static files
app.use('/static', express.static('public'));
//Set view engine
app.set('view engine', 'pug');
//Set routes
app.use(routes.get());

//Handle route not found
app.use(routes.notFound);
app.use(routes.handleError);

//Listening app
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});