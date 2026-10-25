class MovieController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // 1. Подписка на изменения модели
        this.model.init((movies) => {
            this.currentMovies = movies;
            this.view.render(movies);
        });
        
        // 2. Привязка действий пользователя
        this.view.bindAddMovie(this.handleAddMovie.bind(this));
        this.view.bindMovieActions(
            this.handleToggleWatched.bind(this),
            this.handleDeleteMovie.bind(this)
        );
        this.view.bindClearList(this.handleClearList.bind(this));
    }

    handleAddMovie(title) {
        this.model.addMovie(title);
    }

    async handleToggleWatched(id) {
        // Нужно знать текущий статус — можно хранить актуальный массив в контроллере
        const movie = this.currentMovies?.find(m => m.id === id);
        if (!movie) return;
        await this.model.toggleWatched(id, movie.isWatched);
    }

    async handleDeleteMovie(id) {
        await this.model.deleteMovie(id);
    }

    async handleClearList() {
        await this.model.clearAll();
    }
}

export default MovieController;