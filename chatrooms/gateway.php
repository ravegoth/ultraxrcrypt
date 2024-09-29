<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $chatroom = isset($_GET['chatroom']) ? $_GET['chatroom'] : '';
} else {
    $chatroom = isset($_POST['chatroom']) ? $_POST['chatroom'] : '';
}

if ($chatroom === '') {
    exit('No chatroom specified.');
}

$chatroom_hash = hash('sha256', 'chatroom' . $chatroom);
$chat_file = __DIR__ . '/chats/' . $chatroom_hash . '.txt';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($chat_file)) {
        echo file_get_contents($chat_file);
    } else {
        echo '';
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    if ($username === '' || $message === '') {
        exit('Invalid parameters.');
    }

    if (!file_exists(__DIR__ . '/chats')) {
        mkdir(__DIR__ . '/chats', 0777, true);
    }

    $encrypted_message = $message;

    $current_content = '';
    if (file_exists($chat_file)) {
        $current_content = file_get_contents($chat_file);
    }

    $new_content = $current_content . $encrypted_message . "\n";
    file_put_contents($chat_file, $new_content);

    echo 'Message sent.';
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (file_exists($chat_file)) {
        unlink($chat_file);
        echo 'Chatroom deleted.';
    } else {
        echo 'Chatroom does not exist.';
    }
} else {
    exit('Invalid request method.');
}
