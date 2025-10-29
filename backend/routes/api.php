
<?php
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ChatController;

Route::post('/transaction', [TransactionController::class, 'store']);
Route::get('/transaction', [TransactionController::class, 'index']);
Route::post('/chat', [ChatController::class, 'store']);
Route::get('/chat', [ChatController::class, 'index']);
