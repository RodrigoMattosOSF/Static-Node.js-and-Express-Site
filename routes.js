const express      = require('express');
const { projects } = require('./data.json');

class Routes {
    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        const that = this;

        this.router.get('/', function(req, res) {
            res.render('index', {
                projects : projects
            });
        });

        this.router.get('/about', function(req, res) {
            res.render('about');
        });

        this.router.get('/project/:id', function(req, res, next) {
            const { id }    = req.params;
            const projectID = parseInt(id);

            if (isNaN(projectID) || !projects[projectID]) {
                const err = new Error('Not a Project');
                err.status  = 404;
                err.message = 'Not a Project!';
                that.handleError(err, req, res, next);
            } else {
                res.render('project', {
                    project : projects[projectID]
                });
            }
            
        });

    }

    get() {
        return this.router;
    }

    handleError(err, req, res, next) {
        res.locals.error = err;
        res.status(err.status);
        res.render('error', {
            error : err
        });
    }

    notFound(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        err.message= "Page not Found!"
        next(err);
    }
}

module.exports = new Routes();