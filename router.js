import Router from 'express'
import UserController from "./controllers/UserController.js";
import PostController from "./controllers/PostController.js";
import DialogController from "./controllers/DialogController.js";
import MessagesController from "./controllers/MessagesController.js";

const router = new Router()

// Users
router.post('/users/register', UserController.register) // Регистрация пользователя -> id, name, surname
router.get('/users/getUserInfo/:id', UserController.getUserInfo) // Получение информации о пользователе -> name, surname, status
router.get('/users/login/:email', UserController.login) // Вход по почте -> id, name, surname, status
router.put('/users/changeStatus', UserController.changeStatus) // Изменения статуса пользователя -> id, status
router.get('/users/checkUserExists/:id', UserController.checkUserExists) // Проверка существует ли пользователь с данным id -> true / false

// Posts
router.post('/posts/create', PostController.create) // Создание поста -> Post
router.get('/posts/getAllUsersPosts/:id', PostController.getAllUsersPosts) // Полчение списка постов для пользователя -> List[Posts]
router.delete('/posts/delete/:id', PostController.delete) // Удаление поста -> Post

// Dialogs
router.post('/dialogs/create', DialogController.create) // Создание нового диалога -> Dialog
router.get('/dialogs/getAllUsersDialogs/:id', DialogController.getAllUsersDialogs) // Получение списка диалогов пользователя -> List[Dialogs]
router.put('/dialogs/updateLastMessage', DialogController.updateLastMessage) // Обновление последнего сообщения в диалоге -> dialogId, lastMessage, lastMessageAuthor

// Messages
router.get('/messages/getAllFromDialog/:id', MessagesController.getByDialogId) // Получение всех сообщений в диалоге -> List[Message]
router.post('/messages/create', MessagesController.create) // Создает сообщение в диалоге, обновляет последнее сообщение в диалоге -> Message

export default router