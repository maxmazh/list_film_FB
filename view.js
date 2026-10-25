class MovieView {
    constructor() {
        this.filmsNode = document.querySelector('.js_list_films');
        this.inputNode = document.querySelector('.js_input_film');
        this.btnInputNode = document.querySelector('.js_btn_input_film');
        this.btnClearListNode = document.querySelector('.js_btn_clear_list');
    }

    // Рендер списка (получает массив фильмов от контроллера)
    render(movies) {
        this.filmsNode.innerHTML = '';

        if (movies.length === 0) {
            this.filmsNode.innerHTML = '<p class="empty">Добавь фильм в список...</p>';
            return;
        }

        movies.forEach((film) => {
            const div = document.createElement('div');
            div.className = 'film';
            if (film.isWatched) div.classList.add('watched');
            div.dataset.id = film.id;

            const circle = document.createElement('p');
            circle.className = 'circle';
            circle.textContent = '○';
            if (film.isWatched) circle.classList.add('watched');

            const titleEl = document.createElement('p');
            titleEl.className = 'films_title';
            titleEl.textContent = film.title;
            if (film.isWatched) titleEl.classList.add('watched');

            const close = document.createElement('p');
            close.className = 'close';
            close.textContent = film.close;

            div.append(circle, titleEl, close);
            this.filmsNode.appendChild(div);
        });
    }

    // Обработчик добавления
    bindAddMovie(handler) {
        this.btnInputNode.addEventListener('click', () => {
            const title = this.inputNode.value.trim();
            if (title === '') {
                alert('Введите название фильма!');
                return;
            }
            handler(title);

            this.inputNode.value = '';
            this.inputNode.focus();
        });

        // Enter = нажатие кнопки
        this.inputNode.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.btnInputNode.click();
        });
    }

    // Обработчик клика по фильму (вычеркнуть/вернуть) и удаления
    bindMovieActions(onToggle, onDelete) {
        this.filmsNode.addEventListener('click', (e) => {
            const filmEl = e.target.closest('.film');
            if (!filmEl) return;

            const id = filmEl.dataset.id;

            if (e.target.classList.contains('close')) {
                onDelete(id);
            } else {
                onToggle(id);
            }
        });
    }

    // Обработчик очистки списка
    bindClearList(handler) {
        this.btnClearListNode.addEventListener('click', () => {
            if (!confirm('Очистить весь список фильмов?')) return;
            handler();
            this.inputNode.value = '';
            this.inputNode.focus();
        });
    }
}

export default MovieView;