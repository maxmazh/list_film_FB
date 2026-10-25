import { db } from './firebase.js';
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    writeBatch,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

class MovieModel {
    constructor() {
        this.collectionRef = collection(db, 'movies');
        this.onMoviesChanged = null;
    }

    // Подписка на изменения в реальном времени
    init(onMoviesChanged) {
        this.onMoviesChanged = onMoviesChanged;

        const q = query(this.collectionRef, orderBy('createdAt', 'asc'));

        onSnapshot(q, (snapshot) => {
            const movies = [];
            snapshot.forEach((docSnap) => {
                movies.push({
                    id: docSnap.id,
                    ...docSnap.data()
                });
            });
            this.onMoviesChanged(movies);
        });
    }

    // Добавление фильма
    async addMovie(title) {
        await addDoc(this.collectionRef, {
            title: title,
            isWatched: false,
            createdAt: serverTimestamp()
        });
        // Перерисовка произойдёт автоматически через onSnapshot
    }

    // Переключение статуса "просмотрено"
    async toggleWatched(id, currentStatus) {
        const movieRef = doc(db, 'movies', id);
        await updateDoc(movieRef, { isWatched: !currentStatus });
    }

    // Удаление фильма
    async deleteMovie(id) {
        const movieRef = doc(db, 'movies', id);
        await deleteDoc(movieRef);
    }

    // Очистка всего списка
    async clearAll() {
        const snapshot = await getDocs(this.collectionRef);
        if (snapshot.empty) return;

        const batch = writeBatch(db);
        snapshot.forEach((docSnap) => {
            batch.delete(docSnap.ref);
        });
        await batch.commit();
    }
}

export default MovieModel;