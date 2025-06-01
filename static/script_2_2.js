// static/script_2_2.js
document.addEventListener('DOMContentLoaded', function() {
    const socket = io();
    const roleGuesser = document.getElementById('role-guesser');
    const roleCreator = document.getElementById('role-creator');
    const startGameBtn = document.getElementById('start-game');
    const statusMessage = document.getElementById('status-message');
    const leaveGameBtn = document.getElementById('leave-game');
    
    let selectedRole = null;
    
    function chooseRole(role) {
        selectedRole = role;
        
        // Обновляем UI
        roleGuesser.classList.remove('selected');
        roleCreator.classList.remove('selected');
        document.getElementById(`role-${role}`).classList.add('selected');
        
        // Отправляем на сервер
        socket.emit('choose_role_2_2', {
            room: window.room,
            session_id: window.session_id,
            role: role
        });
        
        // Проверяем можно ли начать игру
        checkStartConditions();
    }
    
    function checkStartConditions() {
        // Здесь должна быть логика проверки готовности всех игроков
        // Временно просто разрешаем нажать кнопку
        startGameBtn.disabled = !selectedRole;
    }
    
    function startGame() {
        if (!selectedRole) return;
        
        socket.emit('start_game_2_2', {
            room: window.room,
            session_id: window.session_id
        });
    }
    
    leaveGameBtn.addEventListener('click', function() {
        window.location.href = '/room_setup';
    });
    
    // Обработчики событий от сервера
    socket.on('roles_updated_2_2', function(data) {
        // Обновляем UI в соответствии с текущими ролями
        console.log('Roles updated:', data);
    });
    
    socket.on('redirect_2_2', function(data) {
        window.location.href = data.url;
    });
    
    // Инициализация
    socket.emit('join_room_2_2', {
        room: window.room,
        session_id: window.session_id
    });
});