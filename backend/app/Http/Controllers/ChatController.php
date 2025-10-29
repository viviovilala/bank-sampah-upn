<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Daftar chat']);
    }

    public function store(Request $request)
    {
        $message = $request->input('message');
        return response()->json([
            'message' => 'Pesan berhasil dikirim',
            'data' => $message
        ]);
    }
}
