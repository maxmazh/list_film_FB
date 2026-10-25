import MovieModel from './model.js';
import MovieView from './view.js';
import MovieController from './controller.js';

const model = new MovieModel();
const view = new MovieView();
new MovieController(model, view);